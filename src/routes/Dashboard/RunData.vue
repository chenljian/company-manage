<template>
    <div>
        <a-row :gutter="24">
            <a-col v-bind="topColResponsiveProps">
                <ChartCard
                    :bordered="false"
                    title="总销售额"
                    :contentHeight="46"
                >
                    <template slot="action">
                        <a-tooltip title="指标说明">
                            <a-icon type="info-circle-o" />
                        </a-tooltip>
                    </template>
                    <template slot="total">
                        <span>{{ yuan(126560) }}</span>
                    </template>
<!--                    <template slot="content">-->
<!--                        <Trend flag="up" style="margin-right: 16px">-->
<!--                            <template slot="number">-->
<!--                                周同比 <span class="trendText">12%</span>-->
<!--                            </template>-->
<!--                        </Trend>-->
<!--                        <Trend flag="down">-->
<!--                            <template slot="number">-->
<!--                                日环比 <span class="trendText">11%</span>-->
<!--                            </template>-->
<!--                        </Trend>-->
<!--                    </template>-->
                    <template slot="footer">
                        <Field label="日均销售额" :value="'￥'+ numeral(12423).format('0,0')" />
                    </template>
                </ChartCard>
            </a-col>
            <a-col v-bind="topColResponsiveProps">
                <ChartCard
                    :bordered="false"
                    title="总出单量"
                    :contentHeight="46"
                >
<!--                    <template slot="action">-->
<!--                        <a-tooltip title="指标说明">-->
<!--                            <a-icon type="info-circle-o" />-->
<!--                        </a-tooltip>-->
<!--                    </template>-->
                    <template slot="total">
                        <span>{{ 126560 }}</span>
                    </template>
<!--                    <template slot="content">-->
<!--                        <Trend flag="up" style="margin-right: 16px">-->
<!--                            <template slot="number">-->
<!--                                周同比 <span class="trendText">12%</span>-->
<!--                            </template>-->
<!--                        </Trend>-->
<!--                        <Trend flag="down">-->
<!--                            <template slot="number">-->
<!--                                日环比 <span class="trendText">11%</span>-->
<!--                            </template>-->
<!--                        </Trend>-->
<!--                    </template>-->
                    <template slot="footer">
                        <Field label="日均出单" :value="numeral(12423).format('0,0')" />
                    </template>
                </ChartCard>
            </a-col>
        </a-row>

        <a-card :loading="loading" :bordered="false" :bodyStyle="{'padding': 0}">
            <div class="salesCard">
                <a-tabs size="large" :tabBarStyle="{'marginBottom': 24}">
                    <template slot="tabBarExtraContent">
<!--                        <div class="salesExtraWrap">-->
<!--                            <div class="salesExtra">-->
<!--                                <a :class="isActive('today')" @click="() => this.selectDate('today')">今日</a>-->
<!--                                <a :class="isActive('week')" @click="() => this.selectDate('week')">本周</a>-->
<!--                                <a :class="isActive('month')" @click="() => this.selectDate('month')">本月</a>-->
<!--                                <a :class="isActive('year')" @click="() => this.selectDate('year')">全年</a>-->
<!--                            </div>-->
<!--                            <a-range-picker-->
<!--                                :value="rangePickerValue"-->
<!--                                @change="handleRangePickerChange"-->
<!--                                style="width: 256px;"-->
<!--                            />-->
<!--                        </div>-->
                    </template>
                    <a-tab-pane tab="销售额" key="sales">
                        <a-row>
                            <a-col :xl="24" :lg="24" :md="24" :sm="24" :xs="24">
                                <div class="salesBar">
                                    <Bar :height="295" title="销售额趋势" :data="salesData" />
                                </div>
                            </a-col>
<!--                            <a-col :xl="8" :lg="12" :md="12" :sm="24" :xs="24">-->
<!--                                <div class="salesRank">-->
<!--                                <h4 class="rankingTitle">门店销售额排名</h4>-->
<!--                                <ul class="rankingList">-->
<!--                                    <li v-for="(item, i) in rankingListData" :key="item.title">-->
<!--                                        <span :class="i < 3 ? 'active' : ''">{{ i + 1 }}</span>-->
<!--                                        <span>{{ item.title }}</span>-->
<!--                                        <span>{{ numeral(item.total).format('0,0') }}</span>-->
<!--                                    </li>-->
<!--                                </ul>-->
<!--                                </div>-->
<!--                            </a-col>-->
                        </a-row>
                    </a-tab-pane>
<!--                    <a-tab-pane tab="访问量" key="views">-->
<!--                        <a-row>-->
<!--                            <a-col :xl="16" :lg="12" :md="12" :sm="24" :xs="24">-->
<!--                                <div class="salesBar">-->
<!--                                    <Bar :height="292" title="访问量趋势" :data="salesData" />-->
<!--                                </div>-->
<!--                            </a-col>-->
<!--                            <a-col :xl="8" :lg="12" :md="12" :sm="24" :xs="24">-->
<!--                                <div class="salesRank">-->
<!--                                <h4 class="rankingTitle">门店访问量排名</h4>-->
<!--                                <ul class="rankingList">-->
<!--                                    <li v-for="(item, i) in rankingListData" :key="item.title">-->
<!--                                        <span :class="i < 3 ? 'active' : ''">{{ i + 1 }}</span>-->
<!--                                        <span>{{ item.title }}</span>-->
<!--                                        <span>{{ numeral(item.total).format('0,0') }}</span>-->
<!--                                    </li>-->
<!--                                </ul>-->
<!--                                </div>-->
<!--                            </a-col>-->
<!--                        </a-row>-->
<!--                    </a-tab-pane>-->
                </a-tabs>
            </div>
        </a-card>

  </div>
</template>

<script>
import Trend from "@/components/Trend";
import NumberInfo from "@/components/NumberInfo";
import numeral from "numeral";
import { getTimeDistance } from "@/utils/utils";
import moment from "moment";
import cloneDeep from "lodash/cloneDeep";

import {
  ChartCard,
  yuan,
  MiniArea,
  MiniBar,
  MiniProgress,
  Field,
  Bar,
  Pie,
  colors,
  TimelineChart,
  MiniPie
} from "@/components/Charts";

export default {
  name: "Analysis",
  components: {
    Trend,
    ChartCard,
    Field,
    MiniArea,
    MiniBar,
    MiniProgress,
    Bar,
    NumberInfo,
    Pie,
    TimelineChart,
    MiniPie
  },
  created() {
    this.$store.dispatch("analysis/getChartData");
    const rankingListData = [];
    for (let i = 0; i < 7; i += 1) {
      rankingListData.push({
        title: `工专路 ${i} 号店`,
        total: 323234
      });
    }
    this.rankingListData = rankingListData;
  },
  destroyed() {
    this.$store.dispatch("analysis/clearChartData");
  },
  computed: {
    loading() {
      return this.$store.state.analysis.loading;
    },
    visitData() {
      //   console.log(this.$store.state.analysis.chartData);
      return this.$store.state.analysis.chartData.visitData || [];
    },
    salesData() {
      return this.$store.state.analysis.chartData.salesData || [];
    },
    visitData2() {
      return this.$store.state.analysis.chartData.visitData2 || [];
    },
    searchData() {
      return this.$store.state.analysis.chartData.searchData || [];
    },
    offlineData() {
      return this.$store.state.analysis.chartData.offlineData || [];
    },
    activeKey() {
      return (
        this.currentTabKey || (this.offlineData[0] && this.offlineData[0].name)
      );
    },
    salesPieData() {
      const allData = this.$store.state.analysis.chartData;
      return (
        (this.salesType === "all"
          ? allData["salesTypeData"]
          : this.salesType === "online"
            ? allData["salesTypeDataOnline"]
            : allData["salesTypeDataOffline"]) || []
      );
    },
    offlineChartData() {
      const arr = cloneDeep(
        this.$store.state.analysis.chartData.offlineChartData
      );
      arr.map(item => {
        return (item.x = moment(item.x).format("HH:mm"));
      });
      return arr || [];
    }
  },
  data() {
    return {
      numeral,
      yuan,
      colors,
      topColResponsiveProps: {
        xs: 24,
        sm: 12,
        md: 12,
        lg: 12,
        xl: 12,
        style: "margin-bottom: 24px;"
      },
      rangePickerValue: getTimeDistance("year"),
      salesType: "all",
      currentTabKey: "",
      columns: [
        {
          title: "排名",
          dataIndex: "index",
          key: "index"
        },
        {
          title: "搜索关键词",
          dataIndex: "keyword",
          key: "keyword",
          customRender: text => <a href="/">{text}</a>
        },
        {
          title: "用户数",
          dataIndex: "count",
          key: "count",
          sorter: (a, b) => a.count - b.count,
          className: "alignRight"
        },
        {
          title: "周涨幅",
          dataIndex: "range",
          key: "range",
          sorter: (a, b) => a.range - b.range,
          customRender: (text, record) => (
            <Trend flag={record.status === 1 ? "down" : "up"}>
              <template slot="number">
                <span style={{ marginRight: 4 }}>{text}%</span>
              </template>
            </Trend>
          ),
          align: "right"
        }
      ]
    };
  },
  methods: {
    handleRangePickerChange(rangePickerValue) {
      this.rangePickerValue = rangePickerValue;
      this.$store.dispatch("analysis/getChartData");
    },
    selectDate(type) {
      this.rangePickerValue = getTimeDistance(type);
      this.$store.dispatch("analysis/getChartData");
    },
    isActive(type) {
      const value = getTimeDistance(type);
      if (!this.rangePickerValue[0] || !this.rangePickerValue[1]) {
        return;
      }
      if (
        this.rangePickerValue[0].isSame(value[0], "day") &&
        this.rangePickerValue[1].isSame(value[1], "day")
      ) {
        return "currentDate";
      }
    },
    handleChangeSalesType(e) {
      this.salesType = e.target.value;
    },
    handleTabChange(key) {
      this.currentTabKey = key;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
@import "./Analysis.less";
</style>
