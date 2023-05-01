<template>
    <PageHeaderLayout
        title="出货单详情"
        wrapperClassName="advancedForm"
    >
        <template slot="content">
            <span>查看及打印出货单详情</span>
        </template>
        <a-card title="龙岩市新热佳科技有限公司" :bordered="false" :headStyle="{ 'text-align': 'center','font-weight': 'bold' }" class="print">
            <a-row class="detail-row">
                <a-col :span="4" class="term">客户</a-col>
                <a-col :span="12">{{formInline.custom}}</a-col>
                <a-col :span="2" class="term">时间</a-col>
                <a-col :span="4">{{ moment(formInline.boundTime).format('YYYY-MM-DD HH:mm')}}</a-col>
            </a-row>
            <a-table
                :columns="columns"
                :dataSource="tableData"
                :pagination="false"
                rowKey="id"
            />

            <a-row>
                <a-col :span="8" class="term">送货单位及经手人（签字/盖章）</a-col>
                <a-col :span="8"></a-col>
                <a-col span="4">
                   合计金额:
                </a-col>
                <a-col span="4">
                    ￥{{this.formInline.total}}元
                </a-col>
            </a-row>
            <div style="text-align: center">
            <a-button @click="print" type="primary" class="button">打印</a-button>
            <a-button @click="back" class="button">返回</a-button>
            </div>
        </a-card>
    </PageHeaderLayout>
</template>

<script>
import PageHeaderLayout from "@/layouts/PageHeaderLayout";
import {message} from "ant-design-vue";
import moment from "moment";
import qs from 'qs';

export default {
  name: "OutDetail",
  components: {
    PageHeaderLayout,
  },
  mounted(){
      console.log("接收倒参数",this.$route.query);
      this.$axios.get("/apic/boundDoc/query/"+this.$route.query.id).then((res) => {
          if (res && res.data.success) {
              this.formInline = res.data.object;
              this.formInline.total = Number(res.data.object.total).toFixed(2);
          }else if(res && !res.data.success){
              message.error(res.data.message);
          }
      }).catch(function (error) {
          console.log(error);
      });
      const param={
          outboundId: this.$route.query.id,
          boundType:'O',
          start:0,
          limit:100,
      }
      this.$axios.get(`/apic/bound/list?${qs.stringify(param)}`).then((res) => {
          if (res && res.data.success) {
              this.tableData = res.data.list;
          }else if(res && !res.data.success){
              message.error(res.data.message);
          }
      }).catch(function (error) {
          console.log(error);
      });
  },
  created() {
    // window.addEventListener("resize", this.resizeFooterToolbar);
  },
  destroyed() {
    // window.removeEventListener("resize", this.resizeFooterToolbar);
  },
  data() {
    return {
        columns: [
            {
                title: "产品名称",
                dataIndex: "productName",
                key: "productName",
                width: "20%",
            },
            {
                title: "规格",
                dataIndex: "specification",
                key: "specification",
                width: "20%",
            },
            {
                title: "单位",
                dataIndex: "unit",
                key: "unit",
                width: "10%",
            },
            {
                title: "数量",
                dataIndex: "amount",
                key: "amount",
                width: "10%",
            },
            {
                title: "单价",
                dataIndex: "unitPrice",
                key: "unitPrice",
                width: "10%",
            },
            {
                title: "金额",
                dataIndex: "totalPrice",
                key: "totalPrice",
                width: "10%",
            }],
        moment,
        formInline:{
            custom:'',
            boundTime:'',
            total:0,
        },
      tableData: [
      ],
    };
  },

  methods: {
      print() {
          const printContext = document.getElementsByClassName("print")[0]  //获取目标区域的HTML结构
          document.body.innerHTML = printContext.innerHTML   //替换网页的html内容
          window.print()   //打印
          window.location.reload()  //刷新页面，因为网页的html被替换后很丑
      },
      back(){
          this.$router.go(-1);
      }
  }
};
</script>

<style lang="less">
@import "./style.less";

.term {
    // Line-height is 22px IE dom height will calculate error
    text-align: left;

    &:after {
        content: ":";
        margin: 0 8px 0 2px;
        position: relative;
        top: -0.5px;
    }
}

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
