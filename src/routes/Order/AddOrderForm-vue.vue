<template>
    <PageHeaderLayout title="新增订单">
        <template slot="content">
            <span>填写新热佳生产单</span>
        </template>
        <a-card :bordered="false">
            <a-form-model ref="ruleForm" :model="formInline" :label-col=" { span: 4 ,}" :wrapper-col="{ span: 6 }" :rules="rules">
                <a-row>
                    <a-col span="12">
                <a-form-model-item label="下单时间" :label-col=" { span: 8 ,}" :wrapper-col="{ span: 12 }" prop="orderTime">
                    <a-date-picker show-time v-model="formInline.orderTime"  />
                </a-form-model-item>
                    </a-col>
                    <a-col span="12">
                    <a-form-model-item label="交货时间" :label-col=" { span: 8 }" :wrapper-col="{ span: 12}" prop="deliverTime">
                        <a-date-picker show-time v-model="formInline.deliverTime"  />
                </a-form-model-item>
                    </a-col>
                </a-row>
                <a-row>
                    <a-col span="12">
                <a-form-model-item label="客户" :label-col=" { span: 8 ,}" :wrapper-col="{ span: 12 }" prop="custom">
                    <a-input v-model="formInline.custom" placeholder="客户名称" />
                </a-form-model-item>
                    </a-col>
                    <a-col span="12">
                <a-form-model-item label="参考" :label-col=" { span: 8 ,}" :wrapper-col="{ span: 12 }">
                    <a-input v-model="formInline.consult" placeholder="参考人员" />
                </a-form-model-item>
                    </a-col>
                </a-row>
                <a-row>
                    <a-col span="12">
                        <a-form-model-item label="规格" :label-col=" { span: 8 ,}" :wrapper-col="{ span: 12 }">
                            <a-input v-model="formInline.specification" placeholder="规格" />
                        </a-form-model-item>
                    </a-col>
                    <a-col span="12">
                        <a-form-model-item label="电压" :label-col=" { span: 8 ,}" :wrapper-col="{ span: 12 }">
                            <a-input v-model="formInline.voltage"  placeholder="电压" />
                        </a-form-model-item>
                    </a-col>
                </a-row>
                <a-row>
                    <a-col span="12">
                        <a-form-model-item label="功率" :label-col=" { span: 8 ,}" :wrapper-col="{ span: 12 }">
                            <a-input v-model="formInline.power" placeholder="Username" />
                        </a-form-model-item>
                    </a-col>
                    <a-col span="12">
                        <a-form-model-item label="数量" :label-col=" { span: 8 ,}" :wrapper-col="{ span: 12 }">
                            <a-input v-model="formInline.amount" placeholder="填写数量" />
                        </a-form-model-item>
                    </a-col>
                </a-row>
                <a-form-model-item label="图示" :label-col=" { span: 4 ,}" :wrapper-col="{ span: 16 }">
                    <a-input v-model="formInline.illustration" type="textarea" placeholder="图示" />
                </a-form-model-item>
                <a-form-model-item label="备注" :label-col=" { span: 4 ,}" :wrapper-col="{ span: 16 }">
                    <a-input v-model="formInline.remark" type="textarea" placeholder="备注" />
                </a-form-model-item>
                <a-row>
                    <a-col span="12">
                        <a-form-model-item label="压缩电阻" :label-col=" { span: 8 ,}" :wrapper-col="{ span: 12 }">
                            <a-input v-model="formInline.comResistance" placeholder="压缩电阻" />
                        </a-form-model-item>
                    </a-col>
                    <a-col span="12">
                        <a-form-model-item label="成品电阻" :label-col=" { span: 8 ,}" :wrapper-col="{ span: 12 }">
                            <a-input v-model="formInline.finResistance" type="password" placeholder="Password" />
                        </a-form-model-item>
                    </a-col>
                </a-row>
                <a-row>
                    <a-col span="12">
                        <a-form-model-item label="空管材质" :label-col=" { span: 8 ,}" :wrapper-col="{ span: 12 }">
                            <a-input v-model="formInline.material" placeholder="Username" />
                        </a-form-model-item>
                    </a-col>
                    <a-col span="12">
                        <a-form-model-item label="填充物" :label-col=" { span: 8 ,}" :wrapper-col="{ span: 12 }">
                            <a-input v-model="formInline.filler" type="password" placeholder="Password" />
                        </a-form-model-item>
                    </a-col>
                </a-row>
                <a-row>
                    <a-col span="12">
                        <a-form-model-item label="空管" :label-col=" { span: 8 ,}" :wrapper-col="{ span: 12 }">
                            <a-input v-model="formInline.pipeA" placeholder="空管规格" />
                            <a-input v-model="formInline.pipeB" placeholder="空管长度" />
                        </a-form-model-item>
                    </a-col>
                    <a-col span="12">
                        <a-form-model-item label="镁棒" :label-col=" { span: 8 ,}" :wrapper-col="{ span: 12 }">
                            <a-input v-model="formInline.magnesiumRodA" placeholder="镁棒长" />
                            <a-input v-model="formInline.magnesiumRodA" placeholder="镁棒宽" />
                        </a-form-model-item>
                    </a-col>
                </a-row>
                <a-row>
                    <a-col span="12">
                        <a-form-model-item label="镍铬" :label-col=" { span: 8 ,}" :wrapper-col="{ span: 12 }">
                            <a-input v-model="formInline.nickelChromiumA" placeholder="镍铬A" />
                            <a-input v-model="formInline.nickelChromiumB" placeholder="镍铬B" />
                        </a-form-model-item>
                    </a-col>
                    <a-col span="12">
                        <a-form-model-item label="引棒" :label-col=" { span: 8 ,}" :wrapper-col="{ span: 12 }">
                            <a-input v-model="formInline.guideRodA" placeholder="引棒类型" />
                            <a-input v-model="formInline.guideRodB" placeholder="引棒长度" />
                        </a-form-model-item>
                    </a-col>
                </a-row>
                <a-row>
                    <a-col span="12">
                        <a-form-model-item label="镁头" :label-col=" { span: 8 ,}" :wrapper-col="{ span: 12 }">
                            <a-input v-model="formInline.magnesiumHeadA" placeholder="镁头" />
                            <a-input v-model="formInline.magnesiumHeadB" placeholder="镁头" />
                        </a-form-model-item>
                    </a-col>
                    <a-col span="12">
                        <a-form-model-item label="镁底" :label-col=" { span: 8 ,}" :wrapper-col="{ span: 12 }">
                            <a-input v-model="formInline.magnesiumBaseA" placeholder="镁底" />
                            <a-input v-model="formInline.magnesiumBaseB" placeholder="镁底" />
                        </a-form-model-item>
                    </a-col>
                </a-row>
                <a-row>
                    <a-col span="12">
                        <a-form-model-item label="出线" :label-col=" { span: 8 ,}" :wrapper-col="{ span: 12 }">
                            <a-input v-model="formInline.outLineA" placeholder="出线类型" />
                            <a-input v-model="formInline.outLineB" placeholder="出线长度" />
                        </a-form-model-item>
                    </a-col>
                    <a-col span="12">
                        <a-form-model-item label="技术课" :label-col=" { span: 8 ,}" :wrapper-col="{ span: 12 }">
                            <a-input v-model="formInline.techClass" placeholder="技术课" />
                        </a-form-model-item>
                    </a-col>
                </a-row>
                <a-row>
                    <a-col span="12">
                        <a-form-model-item label="生产课" :label-col=" { span: 8 ,}" :wrapper-col="{ span: 12 }">
                            <a-input v-model="formInline.prodClass" placeholder="生产课人员" />
                        </a-form-model-item>
                    </a-col>
                    <a-col span="12">
                        <a-form-model-item label="QC/仓管" :label-col=" { span: 8 ,}" :wrapper-col="{ span: 12 }">
                            <a-input v-model="formInline.warehouse" placeholder="QC/仓管" />
                        </a-form-model-item>
                    </a-col>
                </a-row>
                <a-form-model-item :wrapper-col="{ span: 14, offset: 8 }">
                    <a-button type="primary" @click="handleSubmit">
                        提交
                    </a-button>
                    <a-button style="margin-left: 10px;">
                        取消
                    </a-button>
                </a-form-model-item>
            </a-form-model>
        </a-card>
    </PageHeaderLayout>
</template>

<script>
import PageHeaderLayout from "@/layouts/PageHeaderLayout";
import {Input, message} from "ant-design-vue";
export default {
    components: {
        PageHeaderLayout,
        TextArea: Input.TextArea, // eslint-disable-line
    },
  name: "AddOrderForm",
    data() {
        return {
            formInline: {
                orderTime: '',
                deliverTime: '',
                user: '',
                password: '',
            },
            rules:{
                orderTime:[
                    { required: true, message: '下单时间必填', trigger: 'change' }
                ],
                deliverTime:[
                    { required: true, message: '交付时间必填', trigger: 'change' }
                ],
                custom: [
                    { required: true, message: '请填写客户名称', trigger: 'blur' },
                    { min: 1, max: 100, message: '100个字符内', trigger: 'blur' },
                ],
                status:[
                    { required: true, message: 'Please input some description...', trigger: 'blur'}
                ]
            },
        };
    },
    methods: {
        handleSubmit() {
            console.log("收到表单", this.formInline);
            this.$refs.ruleForm.validate(valid => {
                if (valid) {
                    this.$axios.post("/apic/order/add", this.formInline).then((res) => {
                        if (res && res.data.success) {
                            message.success("添加成功");
                            this.$router.push({path:'/order/add-success',query: {id: res.data.id}});
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
