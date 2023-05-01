<template>
    <PageHeaderLayout
        title="出货单"
        wrapperClassName="advancedForm"
    >
        <template slot="content">
            <span>填写出货单</span>
        </template>
<!--        <a-form layout="vertical" hideRequiredMark :autoFormCreate="(form)=>{this.form = form}">-->
        <a-card title="龙岩市新热佳科技有限公司" :bordered="false" :headStyle="{ 'text-align': 'center','font-weight': 'bold' }">
            <a-form-model :model="formInline" :rules="rules" ref="form">
            <a-row>
                <a-col span="12">
                    <a-form-model-item label="客户：" :label-col=" { span: 3,}" :wrapper-col="{ span: 10 }" prop="custom">
                        <a-input show-time v-model="formInline.custom"  />
                    </a-form-model-item>
                </a-col>
                <a-col span="8" offset="4">
                    <a-form-model-item label="时间：" :label-col=" { span: 4 }" :wrapper-col="{ span: 12}" prop="boundTime">
                        <a-date-picker show-time v-model="formInline.boundTime"  />
                    </a-form-model-item>
                </a-col>
            </a-row>
            </a-form-model>
                    <a-form layout="vertical" hideRequiredMark :autoFormCreate="(form)=>{this.form = form}">
            <a-form-item
                fieldDecoratorId="members"
                :fieldDecoratorOptions="{
                    initialValue: tableData,
                }"
            >
                <TableForm :onChange="(data)=>this.changeMembers(data)" />
            </a-form-item>
                    </a-form>
            <a-row>
                <a-col span="6" offset="18">
                    <a-form-model-item label="合计金额：" :label-col=" { span: 8 }" :wrapper-col="{ span: 4}" prop="total">
                        <span>{{this.formInline.total}}</span>
                    </a-form-model-item>
                </a-col>
            </a-row>
            <div style="text-align: center">
            <a-button @click="print" type="primary" >提交</a-button>
            </div>
        </a-card>
        <FooterToolbar :style="`width: ${width}`">
          <span v-if="!(form && form.getFieldsError()) || (form && Object.keys(form.getFieldsError()).filter(key => form.getFieldsError()[key]).length === 0)" />
            <span v-else class="errorIcon">
                <a-popover
                    title="表单校验信息"
                    overlayClassName="errorPopover"
                    trigger="click"
                    :getPopupContainer="trigger => trigger.parentNode"
                >
                    <template slot="content" v-for="key in (form && Object.keys(form.getFieldsError()) || [])">
                        <li v-if="form.getFieldsError()[key]" :key="key" class="errorListItem" @click="() => scrollToField(key)">
                            <a-icon type="cross-circle-o" class="errorIcon" />
                            <div class="errorMessage">{{ form.getFieldsError()[key][0] }}</div>
                            <div class="errorField">{{ fieldLabels[key] }}</div>
                        </li>
                    </template>
                    <a-icon type="exclamation-circle" />
                </a-popover>
                {{ Object.keys(form.getFieldsError()).filter(key => form.getFieldsError()[key]).length }}
            </span>
            <a-button type="primary" @click="validate" :loading="submitting">
                提交
            </a-button>
        </FooterToolbar>
<!--        </a-form>-->

    </PageHeaderLayout>
</template>

<script>
import PageHeaderLayout from "@/layouts/PageHeaderLayout";
import FooterToolbar from "@/components/FooterToolbar";
import TableForm from "./TableForm";
import {message} from "ant-design-vue";

export default {
  name: "AdvancedForm",
  components: {
    PageHeaderLayout,
    FooterToolbar,
    TableForm
  },
  computed: {
  },
  created() {
    window.addEventListener("resize", this.resizeFooterToolbar);
  },
  destroyed() {
    window.removeEventListener("resize", this.resizeFooterToolbar);
  },
  data() {
    return {
        formInline:{
            custom:'',
            boundTime:'',
            total:0,
        },
        rules:{
            custom: [
                { required: true, message: '请填写客户名称', trigger: 'blur' },
            ],
            boundTime:[
                { required: true, message: '填写时间', trigger: 'change'}
            ]
        },
      width: "100%",
      submitting: false,
      fieldLabels: {
        name: "仓库名",
        url: "仓库域名",
        owner: "仓库管理员",
        approver: "审批人",
        dateRange: "生效日期",
        type: "仓库类型",
        name2: "任务名",
        url2: "任务描述",
        owner2: "执行人",
        approver2: "责任人",
        dateRange2: "生效日期",
        type2: "任务类型"
      },
      tableData: [
      ],
      form: undefined
    };
  },

  methods: {
      print() {
          console.log("tableData", this.form.getFieldsValue());
          if(this.form.getFieldsValue().members.length <= 0){
              message.error("没有出货产品");
              return;
          }
          this.$refs.form.validate(valid => {
              if (valid) {
                  const param={
                      custom: this.formInline.custom,
                      boundTime: this.formInline.boundTime,
                      total:this.formInline.total,
                      outboundList: this.form.getFieldsValue().members
                  };
                  console.log("参数", param);

                  this.$axios.post("/apic/bound/outbound", param).then((res) => {
                      if (res && res.data.success) {
                          this.$router.push({path:'/outbound/success',query: {id: res.data.id}});
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
    validate() {
      this.form.validateFieldsAndScroll((error, values) => {
        if (!error) {
          // submit the values
          console.log(values);
        }
      });
    },
    scrollToField(fieldKey) {
      const labelNode = document.querySelector(`label[for="${fieldKey}"]`);
      if (labelNode) {
        labelNode.scrollIntoView(true);
      }
    },
    changeMembers(data) {

        let num = new Number(0);
        for(const idx in data){
            num = num + Number(data[idx].totalPrice);
        }
        this.formInline.total = num.toFixed(2);
        console.log("刷新值", num);
      this.form.setFieldsValue({ members: data });
    },
    resizeFooterToolbar() {
      const sider = document.querySelectorAll(".ant-layout-sider")[0];
      const width = `calc(100% - ${sider.style.width})`;
      if (this.width !== width) {
        this.width = width;
      }
    }
  }
};
</script>

<style lang="less">
@import "./style.less";

@media print {
    .ant-form-item {
        line-height: 1;
        margin-bottom:0px;
    }
    .button{
        display: none;
    }

}
</style>
