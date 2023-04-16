<template>
    <PageHeaderLayout title="查询表格">
        <a-card :bordered="false">
            <div class="tableList">
                <div class="tableListForm">
                    <a-form @submit="handleSearch" layout="inline" :autoFormCreate="(form)=>{this.form = form}">
                        <a-row :gutter="{ md: 8, lg: 24, xl: 48 }">
                            <a-col :md="8" :sm="24">
                                <a-form-item label="产品名称" fieldDecoratorId="name">
                                    <a-input placeholder="请输入" />
                                </a-form-item>
                            </a-col>
                            <a-col :md="8" :sm="24">
                                <a-form-item label="状态" fieldDecoratorId="status">
                                    <a-select placeholder="请选择" style="width: 100%;">
                                        <a-select-option value="">全部</a-select-option>
                                        <a-select-option value="P">生产中</a-select-option>
                                        <a-select-option value="N">已停产</a-select-option>
                                    </a-select>
                                </a-form-item>
                            </a-col>
                            <a-col :md="8" :sm="24">
                                <span class="submitButtons">
                                    <a-button type="primary" htmlType="submit">
                                        查询
                                    </a-button>
                                    <a-button style="margin-left: 8px;" @click="handleFormReset">
                                        重置
                                    </a-button>
                                </span>
                            </a-col>
                        </a-row>
                    </a-form>
                </div>
                <div class="tableListOperator">
                    <a-button icon="plus" type="primary" @click="handleModalVisible(true)">
                        新建
                    </a-button>
                    <span v-if="selectedRows.length > 0">
                        <a-button>批量操作</a-button>
                        <a-dropdown>
                            <template slot="overlay">
                                <a-menu @click="handleMenuClick" :selectedKeys="[]">
                                    <a-menu-item key="remove">删除</a-menu-item>
                                    <a-menu-item key="approval">批量审批</a-menu-item>
                                </a-menu>
                            </template>
                            <a-button>
                                更多操作 <a-icon type="down" />
                            </a-button>
                        </a-dropdown>
                    </span>
                </div>
                <commonTable
                    :selectedRows="selectedRows"
                    :loading="loading"
                    :list="data.list"
                    :columns="columns"
                    :onSelectRow="handleSelectRows"
                    :onChange="handleStandardTableChange"
                    :totalCount="data.size"
                />
            </div>
        </a-card>
        <!-- <CreateForm {...parentMethods} modalVisible={modalVisible} /> -->
        <ProductForm ref="productForm" :visible="modalVisible"></ProductForm>

    </PageHeaderLayout>
</template>

<script>
import PageHeaderLayout from "@/layouts/PageHeaderLayout";
import commonTable from "@/components/commonTable";
import ProductForm from "./ProductForm.vue";
import moment from "moment";
import { Badge, message } from "ant-design-vue";
export default {
  name: "TableList",
  components: {
    PageHeaderLayout,
    commonTable,
    ProductForm
  },
  created() {
    this.$store.dispatch("tableList/getList", { params: {} });
  },
  destroyed() {
    this.$store.dispatch("tableList/clearList");
  },
  computed: {
    data() {
      return this.$store.state.tableList.list;
    },
    loading() {
      return this.$store.state.tableList.loading;
    }
  },
  data() {
    const statusMap = {
        "P":"success",
        "N":"error",
    };
        // "default","processing", "success", "error"];
    const status = {
        "P":"生产中",
        "N":"已停产"
    };
    return {
      modalVisible: false,
      selectedRows: [],
      formValues: {},
      columns: [
        {
          title: "产品名称",
          dataIndex: "name"
        },
        {
          title: "产品规格",
          dataIndex: "specification"
        },
        // {
        //   title: "服务调用次数",
        //   dataIndex: "callNo",
        //   sorter: true,
        //   align: "right",
        //   customRender: val => `${val} 万`,
        //   // mark to display a total number
        //   needTotal: true
        // },
        {
          title: "状态",
          dataIndex: "status",
          filters: [
            {
              text: status["P"],
              value: "P"
            },
            {
              text: status["N"],
              value: "N"
            },
          ],
          onFilter: (value, record) => record.status.toString() === value,
          customRender: val => {
            return <Badge status={statusMap[val]} text={status[val]} />;
          }
        },
        {
          title: "创建时间",
          dataIndex: "createTime",
          sorter: true,
          customRender: val => (
            <span>{moment(val).format("YYYY-MM-DD HH:mm:ss")}</span>
          )
        },
        {
          title: "操作",
          customRender: () => (
            <div>
              <a-button type="link">详情</a-button>
              <a-divider type="vertical" />
              <a-button type="link">修改</a-button>
              <a-divider type="vertical" />
              <a-button type="link" style="color:red">删除</a-button>
            </div>
          )
        }
      ]
    };
  },
  methods: {
    handleModalVisible(flag) {
      this.modalVisible = !!flag;
      this.$refs.productForm.showForm();
    },
    handleSearch(e) {
      e.preventDefault();
      this.form.validateFields((err, fieldsValue) => {
        if (err) return;
        console.log("查询参数", fieldsValue);
        const values = {
          ...fieldsValue,
          updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf()
        };
        this.formValues = values;
        this.$store.dispatch("tableList/getList", { params: values });
      });
    },
    handleFormReset() {
      this.form.resetFields();
      this.formValues = {};
      this.$store.dispatch("tableList/getList", { params: {} });
    },
    handleSelectRows(rows) {
      this.selectedRows = rows;
    },
    handleStandardTableChange(pagination, filtersArg, sorter) {
      console.log("表格更新", pagination, filtersArg, sorter)
      const filters = Object.keys(filtersArg).reduce((obj, key) => {
        const newObj = { ...obj };
        newObj[key] = this.getValue(filtersArg[key]);
        return newObj;
      }, {});

      const params = {
        currentPage: pagination.current,
        pageSize: pagination.pageSize,
        ...this.formValues,
        ...filters
      };
      if (sorter.field) {
        params.sorter = `${sorter.field}_${sorter.order}`;
      }
      this.$store.dispatch("tableList/getList", { params });
    },
    getValue(obj) {
      return Object.keys(obj)
        .map(key => obj[key])
        .join(",");
    },
    handleMenuClick(e) {
      if (!this.selectedRows) return;

      switch (e.key) {
        case "remove":
          this.$store.dispatch("tableList/deleteList", {
            params: {
              no: this.selectedRows.map(row => row.no).join(",")
            },
            callback: () => {
              this.selectedRows = [];
            }
          });
          break;
        default:
          break;
      }
    },

    handleAdd(fields) {
      this.$store.dispatch("tableList/addList", {
        params: { description: fields.desc }
      });

      message.success("添加成功");
      this.modalVisible = false;
    }
  }
};
</script>

<style lang="less">
@import "./TableList.less";
</style>

