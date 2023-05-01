<template>
    <a-modal
        :title="title"
        :visible="this.canVisit"
        @ok="okHandle"
        @cancel="handleModalVisible"
    >
        <a-form-model :model="formData" :rules="rules" ref="form">
            <a-form-model-item
                :labelCol="{ span: 5 }"
                :wrapperCol="{ span: 15 }"
                label="产品"
                prop="productId"
            >
                <a-select placeholder="" v-model="formData.productId" @select="selectProduct">
                    <a-select-option v-for="prod in this.products" :key="prod.id" :value="prod.id">
                        {{prod.name+'-'+prod.specification}}
                    </a-select-option>
                </a-select>
            </a-form-model-item>
            <a-form-item
                :labelCol="{ span: 5 }"
                :wrapperCol="{ span: 15 }"
                label="规格"
                prop="specification"
            >
                <a-input v-model="formData.specification" :disabled="true" />
            </a-form-item>
            <a-form-item
                :labelCol="{ span: 5 }"
                :wrapperCol="{ span: 15 }"
                label="单位"
                prop="unit"
            >
                <a-input v-model="formData.unit" placeholder="填写单位"  />
            </a-form-item>
            <a-form-item
                :labelCol="{ span: 5 }"
                :wrapperCol="{ span: 15 }"
                label="数量"
                prop="amount"
            >
                <a-input v-model="formData.amount"   @change="calTotalPrice"/>
            </a-form-item>
            <a-form-item
                :labelCol="{ span: 5 }"
                :wrapperCol="{ span: 15 }"
                label="单价"
                prop="unitPrice"
            >
                <a-input v-model="formData.unitPrice" @change="calTotalPrice" />
            </a-form-item>
            <a-form-item
                :labelCol="{ span: 5 }"
                :wrapperCol="{ span: 15 }"
                label="金额"
                prop="totalPrice"
            >
                <a-input v-model="formData.totalPrice" :disabled="true"  />
            </a-form-item>
        </a-form-model>
    </a-modal>
</template>

<script>
import Vue from 'vue'
import {  Modal } from 'ant-design-vue';
Vue.use(Modal)

export default {
    name: "ProductForm",
    components: {
        'a-modal': Modal,
    },
    props: {
        products: {
            type: Array,
            default: ()=>{
                []
            }
        },
        title:{
            type: String,
            default: '产品'
        },
        handleOk: {
            type: Function,
            default: (val) => {console.log("提交", val)}
        },
    },
    watch:{
        // 此处监听variable变量，当期有变化时执行
        product(newVal){
            // item1为新值，item2为旧值
            console.log("收到新值");
            this.formData = newVal;
        }
    },
    data(){
      return {
          canVisit:false,
          formData: {
              productId: '',
              productName: '',
              specification: '',
              unit:'',
              amount:0,
              unitPrice:0,
              totalPrice: 0,
          },
          rules:{
              productId: [
                  { required: true, message: '请选择产品', trigger: 'blur' },
              ],
              status:[
                  { required: true, message: 'Please input some description...', trigger: 'blur'}
              ]
          },
      }
    },
    mounted(){
      console.log("我好了mounted", this.form);
    },
    methods:{
        selectProduct(val){
            console.log("选择", val);
            for(const idx in this.products){
                if(this.products[idx].id == val){
                    this.formData.specification = this.products[idx].specification;
                    this.formData.productName = this.products[idx].name;
                }
            }
        },
        calTotalPrice(){
            const price = Number(this.formData.amount)*Number(this.formData.unitPrice);
            this.formData.totalPrice = price.toFixed(2);
        },
        showForm(val){
            this.canVisit = true;
            if(val != undefined){
                this.formData = {...val};
            }else {
                this.formData = {};
            }
        },
        hideForm(){
            this.canVisit = false;
        },
        okHandle() {
            this.$refs.form.validate(valid => {
                if (valid) {
                    console.log("执行提交", this.formData);
                    this.handleOk(this.formData);
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        handleModalVisible(flag) {
            console.log("取消", flag);
            this.canVisit = false;
        },
    }
}
</script>

<style scoped>

</style>
