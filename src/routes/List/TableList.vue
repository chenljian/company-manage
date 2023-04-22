<template>
    <PageHeaderLayout title="查询表格">
        <a-card :bordered="false">
            <div class="tableList">
                <div class="tableListForm">
                    <a-form @submit="handleSearch" layout="inline" :autoFormCreate="(form)=>{this.form = form}">
                        <a-row :gutter="{ md: 8, lg: 24, xl: 48 }">
                            <a-col :md="8" :sm="24">
                                <a-form-item label="产品名称" fieldDecoratorId="name">
                                    <a-input placeholder="请输入"/>
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
                                更多操作 <a-icon type="down"/>
                            </a-button>
                        </a-dropdown>
                    </span>
                </div>
                <a-table
                    :selectedRows="selectedRows"
                    :loading="loading"
                    :dataSource="reslist"
                    :columns="columns"
                    :onSelectRow="handleSelectRows"
                    :onChange="handleStandardTableChange"
                    :pagination="tablePagination"
                    @change="this.pageChange"
                    rowKey="id"
                >
                    <span slot="action" slot-scope="text, record">
                      <a-button type="link" @click="showEdit(record)">修改</a-button>
                      <a-divider type="vertical"/>
                      <a-button type="link" @click="showDetail(record)">详情</a-button>
                      <a-divider type="vertical"/>
                      <a-button type="link" style="color:red" @click="showDelete(record)">删除</a-button>
                    </span>
                </a-table>
            </div>
        </a-card>
        <ProductForm ref="productForm" title="新建产品" :handleOk="handleAdd"></ProductForm>
        <ProductForm ref="editForm" title="编辑产品" :handleOk="handleEdit"></ProductForm>
        <ProductForm ref="detailForm" title="产品详情" :handleOk="handleDetail" ></ProductForm>

    </PageHeaderLayout>
</template>

<script>
import PageHeaderLayout from "@/layouts/PageHeaderLayout";
import ProductForm from "./ProductForm.vue";
import moment from "moment";
import {Badge, message, Modal} from "ant-design-vue";
import qs from 'qs';

export default {
    name: "TableList",
    components: {
        PageHeaderLayout,
        ProductForm
    },
    created() {
        this.$store.dispatch("tableList/getList", {params: {}});
    },
    destroyed() {
        this.$store.dispatch("tableList/clearList");
    },
    computed: {
        loading() {
            return this.$store.state.tableList.loading;
        },
    },
    data() {
        const statusMap = {
            "P": "success",
            "N": "error",
        };
        // "default","processing", "success", "error"];
        const status = {
            "P": "生产中",
            "N": "已停产"
        };
        return {
            tablePagination: {
                showSizeChanger: true,
                showQuickJumper: true,
                total: 0,
                pageSize: 10,
                current: 1,
                showTotal: (total)=>{return `共${total}条`},
            },
            showPrd: {},
            modalVisible: false,
            editVisible: false,
            selectedRows: [],
            reslist: [],
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
                        return <Badge status={statusMap[val]} text={status[val]}/>;
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
                    scopedSlots: {customRender: 'action'}
                }
            ]
        };
    },
    methods: {
        handleModalVisible(flag) {
            if (flag) {
                this.$refs.productForm.showForm();
            }
        },
        handleSearch(e) {
            console.log("查询", e);
            e.preventDefault();
            this.form.validateFields((err, fieldsValue) => {
                if (err) return;
                console.log("查询参数", fieldsValue);
                this.tablePagination.current = 1;
                const values = {
                    ...fieldsValue,
                    updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
                    start: 0,
                    limit: this.tablePagination.pageSize
                };
                this.formValues = values;
                this.queryList(values);
            });
        },

        pageChange(e){
            this.tablePagination.current = e.current;
            this.form.validateFields((err, fieldsValue) => {
                if (err) return;
                const values = {
                    ...fieldsValue,
                    updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
                    start: (e.current-1)*e.pageSize,
                    limit: e.pageSize,
                };
                this.formValues = values;
                this.queryList(values);
            });

        },
        queryList(params) {
            this.$axios.get(`/apic/product/list?${qs.stringify(params)}`).then((res) => {
                if (res && res.data.success) {
                    message.success("查询成功");
                    this.reslist = res.data.list;
                    this.tablePagination.total = res.data.size;
                }
            })
        },

        showEdit(record) {
            console.log("修改", record);
            // this.showPrd = record;
            this.$refs.editForm.showForm(record);
        },
        showDetail(record) {
            console.log("修改", record);
            // this.showPrd = record;
            this.$refs.detailForm.showForm(record);
        },
        showDelete(record){
            const that = this;
            Modal.confirm({
                title: '确定删除产品?',
                content: '产品名称：' + record.name,
                okText: '确定',
                okType: 'danger',
                cancelText: '取消',
                onOk() {
                    that.$axios.get(`/apic/product/delete?id=${record.id}`).then((res) => {
                        if (res && res.data.success) {
                            message.success("删除成功");
                            that.queryList(that.formValues);
                        }
                    })
                },
            });
        },
        handleFormReset() {
            this.form.resetFields();
            this.formValues = {};
            this.$store.dispatch("tableList/getList", {params: {}});
        },
        handleSelectRows(rows) {
            this.selectedRows = rows;
        },
        handleStandardTableChange(pagination, filtersArg, sorter) {
            console.log("表格更新", pagination, filtersArg, sorter)
            const filters = Object.keys(filtersArg).reduce((obj, key) => {
                const newObj = {...obj};
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
            this.$store.dispatch("tableList/getList", {params});
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
            console.log("收到", fields);
            // this.$store.dispatch("tableList/addList", {
            //   params: { description: fields.desc }
            // });
            this.$axios.post("/apic/product/add", fields).then((res) => {
                if (res && res.data.success) {
                    message.success("添加成功");
                    this.queryList(this.formValues);
                    this.$refs.productForm.hideForm();
                }
            }).catch(function (error) {
                console.log(error);
            });
        },
        handleEdit(fields) {
            console.log("修改", fields);
            this.$axios.post("/apic/product/edit", fields).then((res) => {
                if(!res){
                    message.error("接口返回"+res);
                } else if (res.data.success) {
                    message.success("修改成功");
                    this.queryList(this.formValues);
                    this.$refs.editForm.hideForm();
                } else {
                    message.error(res.data.message);
                }

            }).catch(function (error) {
                console.log(error);
            });
        },
        handleDetail() {
            this.$refs.detailForm.hideForm();
        }
    }
};
</script>

<style lang="less">
@import "./TableList.less";
</style>

