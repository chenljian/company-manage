<template>
    <PageHeaderLayout>
        <a-card :bordered="false">
            <Result
                type="success"
                title="提交成功"
                description="提交结果成功，等待公司相关人员审批"
                style="margin-top: 48; margin-bottom: 16px;"
            >
                <template slot="actions">
                    <a-button type="primary" @click="addOrder">继续新增订单</a-button>
                    <a-button @click="seeThisOrder">查看本订单</a-button>
                </template>
            </Result>
        </a-card>
  </PageHeaderLayout>
</template>

<script>
import PageHeaderLayout from "@/layouts/PageHeaderLayout";
import Result from "@/components/Result";
export default {
  name: "Success",
  components: {
    PageHeaderLayout,
    Result,
  },
  mounted() {
      console.log("接收倒参数",this.$route.query)
  },
  methods:{
    seeThisOrder(){
        this.$router.push({path:'/order/detail',query: {id:this.$route.query.id}});
    },
    addOrder(){
        this.$router.push('/order/add-order');
    }
  }
};
</script>

<style lang="less" scoped>
</style>

