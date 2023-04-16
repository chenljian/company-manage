<template>
    <a-modal
        title="新建产品"
        :visible="this.canVisit"
        @ok="okHandle"
        @cancel="handleModalVisible"
    >
        <a-form :autoFormCreate="(form)=>{this.createForm = form}">
            <a-form-item
                :labelCol="{ span: 5 }"
                :wrapperCol="{ span: 15 }"
                label="产品名称"
                fieldDecoratorId="name"
                :fieldDecoratorOptions="{
                        rules: [{ required: true, message: 'Please input some description...' }],
                    }"
            >
                <a-input placeholder="请输入" />
            </a-form-item>
            <a-form-item
                :labelCol="{ span: 5 }"
                :wrapperCol="{ span: 15 }"
                label="规格"
                fieldDecoratorId="specification"
                :fieldDecoratorOptions="{
                        rules: [{ required: true, message: 'Please input some description...' }],
                    }"
            >
                <a-input placeholder="请输入" />
            </a-form-item>
            <a-form-item
                :labelCol="{ span: 5 }"
                :wrapperCol="{ span: 15 }"
                label="描述"
                fieldDecoratorId="description"
                :fieldDecoratorOptions="{
                        rules: [],
                    }"
            >
                <a-input type="textarea" placeholder="Basic usage"  />
            </a-form-item>
            <a-form-item
                :labelCol="{ span: 5 }"
                :wrapperCol="{ span: 15 }"
                label="状态"
                fieldDecoratorId="status"
                :fieldDecoratorOptions="{
                        rules: [{ required: true, message: 'Please input some description...' }],
                    }"
            >
                <a-select placeholder="请选择" style="width: 100%;" >
                    <a-select-option  value="P">生产中</a-select-option>
                    <a-select-option value="N">已停产</a-select-option>
                </a-select>
            </a-form-item>
        </a-form>
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
        // 'a-modal': Modal,
    },
    props: {
        product: {
            type: Object,
            default: ()=>{
                {
                }
            }
        },
        handleOk: {
            type: Function,
            default: (val) => {console.log("提交", val)}
        },
    },
    data(){
      return {
          canVisit:false,
      }
    },
    methods:{
        showForm(){
            this.canVisit = true;
        },
        hideForm(){
            this.canVisit = false;
        },
        okHandle() {
            this.createForm.validateFields((err, fieldsValue) => {
                if (err) return;
                this.createForm.resetFields();
                this.handleOk(fieldsValue);
                // this.handleAdd(fieldsValue);
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
