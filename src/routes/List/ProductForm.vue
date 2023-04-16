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
                fieldDecoratorId="desc"
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
                fieldDecoratorId="desc"
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
                fieldDecoratorId="desc"
                :fieldDecoratorOptions="{
                        rules: [{ required: true, message: 'Please input some description...' }],
                    }"
            >
                <a-textarea placeholder="请输入" :rows="3" />
            </a-form-item>
            <a-form-item
                :labelCol="{ span: 5 }"
                :wrapperCol="{ span: 15 }"
                label="状态"
                fieldDecoratorId="desc"
                :fieldDecoratorOptions="{
                        rules: [{ required: true, message: 'Please input some description...' }],
                    }"
            >
                <a-input placeholder="请输入" />
            </a-form-item>
        </a-form>
    </a-modal>
</template>

<script>
export default {
    name: "ProductForm",
    props: {
        visible: {
            type: Boolean,
            default: false
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
        okHandle() {
            this.createForm.validateFields((err, fieldsValue) => {
                if (err) return;
                this.createForm.resetFields();
                this.handleAdd(fieldsValue);
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
