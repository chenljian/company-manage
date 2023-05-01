<template>
    <PageHeaderLayout>
        <a-card :bordered="false">
            <Result
                type="success"
                title="提交成功"
                description="提交出入库成功"
                style="margin-top: 48; margin-bottom: 16px;"
            >
                <template slot="actions">
                    <a-button type="primary" @click="addOrder">继续提交</a-button>
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
    addOrder(){
        this.$router.push('/bound/inbound');
    }
  }
};
</script>

<style lang="less" scoped>
</style>

