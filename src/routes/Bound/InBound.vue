<template>
    <PageHeaderLayout title="入库记录">
        <template slot="content">
            <span>填写入库产品和数量</span>
        </template>
        <a-card :bordered="false">
            <a-form-model ref="ruleForm" :model="formInline" :label-col=" { span: 4 ,}" :wrapper-col="{ span: 6 }" :rules="rules">
                <a-row>
                    <a-col span="12">
                <a-form-model-item label="产品" :label-col=" { span: 8 ,}" :wrapper-col="{ span: 12 }" prop="productId">
                    <a-select placeholder="" v-model="formInline.productId" @select="selectProduct">
                        <a-select-option v-for="prod in this.products" :key="prod.id" :value="prod.id">
                            {{prod.name+'-'+prod.specification}}
                        </a-select-option>
                    </a-select>
                </a-form-model-item>
                    </a-col>
                    <a-col span="12">
                    <a-form-model-item label="规格" :label-col=" { span: 8 }" :wrapper-col="{ span: 12}" prop="specification">
                        <a-input v-model="formInline.specification" :disabled="true"  />
                </a-form-model-item>
                    </a-col>
                </a-row>
                <a-row>
                    <a-col span="12">
                <a-form-model-item label="数量" :label-col=" { span: 8 ,}" :wrapper-col="{ span: 12 }" prop="amount">
                    <a-input v-model="formInline.amount" placeholder="填写数量" />
                </a-form-model-item>
                    </a-col>
                    <a-col span="12">
                        <a-form-model-item label="单位" :label-col=" { span: 8 ,}" :wrapper-col="{ span: 12 }" prop="unit">
                            <a-input v-model="formInline.unit" />
                        </a-form-model-item>
                    </a-col>
                </a-row>
                <a-form-model-item label="备注" :label-col=" { span: 4 ,}" :wrapper-col="{ span: 16 }">
                    <a-input v-model="formInline.remark" type="textarea" placeholder="备注" />
                </a-form-model-item>
                <a-form-model-item :wrapper-col="{ span: 14, offset: 8 }">
                    <a-button type="primary" @click="handleSubmit">
                        提交
                    </a-button>
                </a-form-model-item>
            </a-form-model>
        </a-card>
    </PageHeaderLayout>
</template>

<script>
import PageHeaderLayout from "@/layouts/PageHeaderLayout";
import {Input, message} from "ant-design-vue";
import qs from 'qs';

export default {
    components: {
        PageHeaderLayout,
        TextArea: Input.TextArea, // eslint-disable-line
    },
  name: "InBound",
    data() {
        return {
            formInline: {
                productId: '',
                specification: '',
                remark: '',
            },
            rules:{
                productId:[
                    { required: true, message: '产品必选', trigger: 'blur' }
                ],
                amount:[
                    { pattern: /^[0-9]{1,8}$/, message: '8位内数字', trigger: 'change' },
                    { required: true, message: '数量必填', trigger: 'blur' },

                ],
            },
            products:[],
        };
    },
    mounted() {
        //查询产品
        const params={
            status:"P",
            start:0,
            limit:100,
        };
        this.$axios.get(`/apic/product/list?${qs.stringify(params)}`).then((res) => {
            if (res && res.data.success) {
                message.success("查询成功");
                this.products = res.data.list;
            }
        })
    },
    methods: {
        selectProduct(val){
            console.log("选择", val);
          for(const idx in this.products){
              console.log(idx);
              if(this.products[idx].id == val){
                  this.formInline.specification = this.products[idx].specification;
              }
          }
        },
        handleSubmit() {
            console.log("收到表单", this.formInline);
            for(const idx in this.products){
                if(this.products[idx].id == this.formInline.productId){
                    this.formInline.productName = this.products[idx].name;
                }
            }
            this.$refs.ruleForm.validate(valid => {
                if (valid) {
                    this.$axios.post("/apic/bound/inbound", this.formInline).then((res) => {
                        if (res && res.data.success) {
                            this.$router.push('/inbound/success');
                        }else if(res && !res.data.success){
                            message.error(res.data.message);
                        }
                    }).catch(function (error) {
                        console.log(error);
                    });
                } else {
                    message.error("请检查栏位");
                    return false;
                }
            });


        },
    },
};
</script>

<style lang="less" scoped>
@import "./style.less";
</style>
