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
                label="产品名称"
                prop="name"
            >
                <a-input v-model="formData.name" placeholder="请输入产品名称" />
            </a-form-model-item>
            <a-form-item
                :labelCol="{ span: 5 }"
                :wrapperCol="{ span: 15 }"
                label="规格"
                prop="specification"
            >
                <a-input v-model="formData.specification" placeholder="例如:1200x12mm" />
            </a-form-item>
            <a-form-item
                :labelCol="{ span: 5 }"
                :wrapperCol="{ span: 15 }"
                label="描述"
                prop="description"
            >
                <a-input type="textarea" v-model="formData.description" placeholder="Basic usage"  />
            </a-form-item>
            <a-form-item
                :labelCol="{ span: 5 }"
                :wrapperCol="{ span: 15 }"
                label="状态"
                prop="status"
            >
                <a-select v-model="formData.status" placeholder="请选择" style="width: 100%;" >
                    <a-select-option  value="P">生产中</a-select-option>
                    <a-select-option value="N">已停产</a-select-option>
                </a-select>
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
        product: {
            type: Object,
            default: ()=>{
                {
                }
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
              name: '',
              specification: '',
              description: '',
              status: 'P',
          },
          rules:{
              name: [
                  { required: true, message: '请填写产品名称', trigger: 'blur' },
                  { min: 1, max: 20, message: '1~20个字符', trigger: 'blur' },
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
