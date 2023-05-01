<template>
    <PageHeaderLayout title="出货记录">
        <a-card :bordered="false">
            <div class="tableList">
                <div class="tableListForm">
                    <a-form @submit="handleSearch" layout="inline" :autoFormCreate="(form)=>{this.form = form}">
                        <a-row>
                            <a-col :span="6">
                                <a-form-item label="客户名称" fieldDecoratorId="custom">
                                    <a-input placeholder="请输入"/>
                                </a-form-item>
                            </a-col>
                            <a-col :span="6">
                                <span class="submitButtons">
                                    <a-button type="primary" htmlType="submit">
                                        查询
                                    </a-button>
                                </span>
                            </a-col>
                        </a-row>
                    </a-form>
                </div>
                <div class="tableListOperator">
                    <a-button icon="plus" type="primary" @click="addOutbound()">
                        新增出货单
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
                      <a-button type="link" @click="showDetail(record.id)">详情</a-button>
                    </span>
                </a-table>
            </div>
        </a-card>
    </PageHeaderLayout>
</template>

<script>
import PageHeaderLayout from "@/layouts/PageHeaderLayout";
import moment from "moment";
import {message, Modal} from "ant-design-vue";
import qs from 'qs';

export default {
    name: "ReviewList",
    components: {
        PageHeaderLayout,
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
                    title: "客户名称",
                    dataIndex: "custom"
                },
                {
                    title: "时间",
                    dataIndex: "boundTime",
                    sorter: true,
                    customRender: val => (
                        <span>{moment(val).format("YYYY-MM-DD HH:mm:ss")}</span>
                    )
                },
                {
                    title: "总价",
                    dataIndex: "total"
                },
                {
                    title: "提交人",
                    dataIndex: "creator"
                },
                {
                    title: "操作",
                    scopedSlots: {customRender: 'action'}
                }
            ]
        };
    },
    mounted() {
        const param ={
            start: 0,
            limit: this.tablePagination.pageSize,
            status: "N"
        };
        this.queryList(param);
    },
    methods: {
        addOutbound(){
            this.$router.push('/bound/add-outbound');
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
                    limit: this.tablePagination.pageSize,
                    status: "N"
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
                    status: 'N'
                };
                this.formValues = values;
                this.queryList(values);
            });

        },
        queryList(params) {
            this.$axios.get(`/apic/boundDoc/list?${qs.stringify(params)}`).then((res) => {
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
        showDetail(id) {
            this.$router.push({path:'/bound/out-detail',query: {id:id}});
        },
        review(record){
            const that = this;
            Modal.confirm({
                title: '请审批订单?',
                content: '订单客户:' + record.custom,
                okText: '审批通过',
                okType: 'primary',
                cancelText: '取消',
                onOk() {
                    that.$axios.get(`/apic/order/pass/${record.id}`).then((res) => {
                        if (res && res.data.success) {
                            message.success("审批成功");
                            const param ={
                                start: 0,
                                limit: that.tablePagination.pageSize,
                                status: "N"
                            };
                            that.queryList(param);
                        }else if(res && !res.data.success){
                            message.error(res.data.message);
                        }
                    }).catch(function (error) {
                        console.log(error);
                    });
                },
            });
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
@import "./BoundList.less";
</style>

