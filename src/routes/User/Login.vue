<template>
    <div class="main">
        <div class="login">
            <a-form @submit="handleSubmit" :autoFormCreate="(form)=>{this.form = form}">
                <a-tabs
                    :animated="false"
                    class="tabs"
                    :activeKey="type"
                    @change="onTabChange"
                >
                    <a-tab-pane key="account" tab="手机号密码登录">
                        <Alert
                            v-if="login.status === 'error' && login.type === 'account' && !submitting"
                            style="margin-bottom: 24px;"
                            message="账户或密码错误"
                            type="error"
                            showIcon
                        />
                        <a-form-item
                            fieldDecoratorId="phone"
                            :fieldDecoratorOptions="{
                                rules: [
                                    {
                                        required: true,
                                        message: '请输入手机号！',
                                    },
                                ],
                            }"
                        >
                            <a-input size="large" name="phone" placeholder="输入手机号">
                                <template slot="prefix">
                                    <a-icon type="user" class="prefixIcon" />
                                </template>
                            </a-input>
                        </a-form-item>
                        <a-form-item
                            fieldDecoratorId="password"
                            :fieldDecoratorOptions="{
                                rules: [
                                    {
                                        required: true,
                                        message: '请输入密码',
                                    },
                                ],
                            }"
                        >
                            <a-input type="password" size="large" name="password" placeholder="888888/123456">
                                <template slot="prefix">
                                    <a-icon type="lock" class="prefixIcon" />
                                </template>
                            </a-input>
                        </a-form-item>
                    </a-tab-pane>
                </a-tabs>
                <div>
                    <Checkbox :checked="autoLogin" @change="changeAutoLogin">
                        自动登录
                    </Checkbox>
                </div>
                <a-form-item>
                    <a-button size="large" class="submit" type="primary" htmlType="submit" :loading="submitting">登录</a-button>
                </a-form-item>
            </a-form>
        </div>
    </div>
</template>

<script>
import { Checkbox, Alert } from "ant-design-vue";

export default {
  name: "Login",
  components: {
    Checkbox,
    Alert
  },
  computed: {
    submitting() {
      return this.$store.state.login.loading;
    },
    login() {
      return this.$store.state.login.login || {};
    },
    activeFileds() {
      if (this.type == "account") {
        return ["phone", "password"];
      } else {
        return ["mobile", "captcha"];
      }
    }
  },
  mounted() {
    console.log(this);
  },
  destroyed() {
    this.$store.dispatch("login/clearLogin");
  },
  data() {
    return {
      type: "account",
      autoLogin: true,
      count: 0
    };
  },
  methods: {
    changeAutoLogin(e) {
      this.autoLogin = e.target.checked;
    },
    onTabChange(type) {
      this.type = type;
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields(
        this.activeFileds,
        { force: true },
        (err, values) => {
          if (!err) {
            this.$store.dispatch("login/login", {
              params: {
                ...values,
                type: this.type,
                callback: (user) => {
                    sessionStorage.setItem('userId', user.id);
                    sessionStorage.setItem('userName', user.name);
                    sessionStorage.setItem('companyName', user.companyName);
                    sessionStorage.setItem('companyId', user.companyId);
                    sessionStorage.setItem('isLogin', 'true');
                  this.$router.push("/");
                }
              }
            });
          }
        }
      );
    },
    onGetCaptcha() {
      let count = 59;
      this.count = count;
      this.interval = setInterval(() => {
        count -= 1;
        this.count = count;
        if (count === 0) {
          clearInterval(this.interval);
        }
      }, 1000);
    }
  }
};
</script>

<style lang="less">
@import "./Login.less";
</style>

