<template>
    <PageHeaderLayout>
        <div class="standardList">
            <a-card :bordered="false">
                <a-row>
                    <a-col :sm="8" :xs="24">
                        <div class="headerInfo">
                            <span>本月已交付订单</span>
                            <p>8个</p>
                            <em />
                        </div>
                    </a-col>
                    <a-col :sm="8" :xs="24">
                        <div class="headerInfo">
                            <span>未交付订单</span>
                            <p>3个</p>
                        </div>
                    </a-col>
                </a-row>
            </a-card>

            <a-card
                class="listCard"
                :bordered="false"
                title="订单列表"
                style="margin-top: 24px;"
                :bodyStyle="{ padding: '0 32px 40px 32px' }"
            >
                <template slot="extra">
                    <div className="extraContent" @change="this.queryOrder">
                        <RadioGroup  v-model="conditions.status" >
                            <RadioButton value="">全部</RadioButton>
                            <RadioButton value="N">审批中</RadioButton>
                            <RadioButton value="P">生产中</RadioButton>
                            <RadioButton value="S">已完成</RadioButton>
                        </RadioGroup>
                        <Search class="extraContentSearch" placeholder="请输入客户名称" v-model="conditions.custom" @search="this.queryOrder" />
                    </div>
                </template>
                <a-button type="dashed" style="width: 100%; margin-bottom: 8px;" @click="addOrder" icon="plus">添加</a-button>
                <a-list
                    size="large"
                    rowKey="id"
                    :loading="loading"
                    :pagination="paginationProps"
                    :dataSource="list"
                >
                    <a-list-item slot="renderItem" slot-scope="item">
                        <template slot="actions">
                            <a-button type="link" @click="showDetail(item.id)">详情</a-button>
                        </template>
                        <template slot="actions">
                            <a-dropdown>
                                <template slot="overlay">
                                    <a-menu>
                                        <a-menu-item>
                                            <a-button type="link" @click="finishOrder(item.id)">完成</a-button>
                                        </a-menu-item>
                                         <a-menu-item>
                                            <a-button type="link" style="color: red" @click="cancelOrder(item.id)">取消订单</a-button>
                                        </a-menu-item>
                                    </a-menu>
                                </template>
                                <a>
                                    更多
                                    <a-icon type="down" />
                                </a>
                            </a-dropdown>
                        </template>
                        <a-list-item-meta :description="item.specification + '\xa0\xa0\xa0\xa0\xa0\xa0\xa0'+ item.amount" `>
                            <template slot="title">
                                <a>{{item.custom}}</a>
                            </template>
                        </a-list-item-meta>
                        <div class="listContent">
                            <div class="listContentItem">
                                <span>创建人</span>
                                <p>{{ item.creator}}</p>
                            </div>
                            <div class="listContentItem">
                                <span>创建时间</span>
                                <p>{{ moment(item.createTime).format('YYYY-MM-DD HH:mm') }}</p>
                            </div>
                            <div class="listContentItem">
                                <p>{{formatStatus(item.status)}}</p>
                            </div>
<!--                            <div class="listContentItem">-->
<!--                                <Progress v-if="item.status=='normal'" :percent="item.percent" :strokeWidth="6" style="width: 180px;" />-->
<!--                                <Progress v-else :percent="item.percent" :status="`${item.status}`" :strokeWidth="6" style="width: 180px;" />-->
<!--                            </div>-->
                        </div>
                    </a-list-item>
                </a-list>
            </a-card>
        </div>
    </PageHeaderLayout>
</template>

<script>
import PageHeaderLayout from "@/layouts/PageHeaderLayout";
import {Radio, Input, Progress, message, Modal} from "ant-design-vue";
import moment from "moment";
import qs from 'qs';
export default {
  name: "OrderList",
  components: {
    PageHeaderLayout,
    RadioGroup: Radio.Group,
    RadioButton: Radio.Button,
    Search: Input.Search,
    Progress // eslint-disable-line
  },
  mounted() {
      const param = this.conditions;
      param.start = 0;
      param.limit = this.paginationProps.pageSize;
      this.queryList(param);

  },
  destroyed() {
    this.$store.dispatch("fakeList/clearList");
  },
  computed: {

    // loading() {
    //   return this.$store.state.fakeList.loading;
    // }
  },
  data() {
    return {
      paginationProps: {
        showSizeChanger: true,
        showQuickJumper: true,
          current:1,
        pageSize: 5,
          pageSizeOptions:['5'],
        total: 0,
        onChange:this.pageChange
      },
      moment,
        list:[],
        conditions:{
          status:'',
          custom:'',
        },
        loading:true,
    };
  },
  methods:{
      formatStatus(sts) {
          if(sts == "N"){
              return "待审批";
          }else if(sts == "P"){
              return "生产中";
          }else if(sts == "C"){
              return "已取消";
          }else if(sts == "F"){
              return "已完成";
          }
          return sts;
      },
      addOrder(){
          this.$router.push('/order/add-order');
      },
      showDetail(id){
          this.$router.push({path:'/order/detail',query: {id:id}});
      },
      finishOrder(id){
          this.$axios.get(`/apic/order/finish/${id}`).then((res) => {
              if (res && res.data.success) {
                  message.success("订单完成");
                  this.queryOrder();
              }else if(res && !res.data.success){
                  message.error(res.data.message);
              }
          }).catch(function (error) {
              console.log(error);
          });
      },
      cancelOrder(id){
          const that = this;
          Modal.confirm({
              title: '确定取消订单?',
              okText: '确定',
              okType: 'danger',
              cancelText: '取消',
              onOk() {
                  that.$axios.get(`/apic/order/cancel/${id}`).then((res) => {
                      if (res && res.data.success) {
                          message.error("取消成功");
                          this.queryOrder();
                      }else if(res && !res.data.success){
                          message.error(res.data.message);
                      }
                  }).catch(function (error) {
                      console.log(error);
                  });
              },
          });

      },
      pageChange(page,size){
          this.paginationProps.current = page;
          const param = this.conditions;
          param.start = (page-1)*size;
          param.limit = size;
          this.queryList(param);
      },
      queryList(param){
          this.loading = true;
          this.$axios.get(`/apic/order/list?${qs.stringify(param)}`).then((res) => {
              this.loading = false;
              if (res && res.data.success) {
                  this.list = res.data.list;
                  this.paginationProps.total = res.data.size;
              }else if(res && !res.data.success){
                  message.error(res.data.message);
              }
          }).catch(function (error) {
              console.log(error);
          });
      },
      queryOrder(){
          this.paginationProps.current = 1;
          const param = this.conditions;
          param.start = 0;
          param.limit = this.paginationProps.pageSize;
          this.queryList(param);
      }
  }
};
</script>

<style lang="less">
@import "./OrderList.less";
</style>

