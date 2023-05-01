<template>
    <div class="container">
        <div class="content">
            <div class="top">
                <div class="header">
                    <router-link to="/">
                    <img alt="logo" class="logo" :src="logo" />
                    <span class="title">见 微 知 著</span>
                    </router-link>
                </div>
<!--                <div class="desc">Ant Design 是西湖最具影响力的 Web 设计规范</div>-->
                <div class="desc">专注为中小微企业信息化建设服务 助力中小微企业走向世界 </div>
            </div>
            <router-view />
        </div>
        <GlobalFooter :links="links">
            <template slot="copyright">
                Copyright <a-icon type="copyright" /> 2023 福建·长汀见微设计出品
            </template>
        </GlobalFooter>
    </div>
</template>

<script>
import logo from "@/assets/logo.png";
import GlobalFooter from "@/components/GlobalFooter";
export default {
  name: "UserLayout",
  components: {
    GlobalFooter
  },
  data() {
    const links = [
      // {
      //   key: "help",
      //   title: "帮助",
      //   href: ""
      // },
      // {
      //   key: "privacy",
      //   title: "隐私",
      //   href: ""
      // },
      // {
      //   key: "terms",
      //   title: "条款",
      //   href: ""
      // }
    ];
    return {
      links,
      logo
    };
  }
};
</script>

<style lang="less" scoped>
@import "./UserLayout.less";
</style>
