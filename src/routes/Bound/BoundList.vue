<template>
    <PageHeaderLayout title="查询表格">
        <a-card :bordered="false">
            <div class="tableList">
                <div class="tableListForm">
                    <a-form @submit="handleSearch" layout="inline" :autoFormCreate="(form)=>{this.form = form}">
                        <a-row>
                            <a-col :span="7">
                                <a-form-item label="客户名称" fieldDecoratorId="productId">
                                    <a-select placeholder="选择产品"  >
                                        <a-select-option value="">全部</a-select-option>
                                        <a-select-option v-for="prod in this.products" :key="prod.id" :value="prod.id">
                                            {{prod.name+'-'+prod.specification}}
                                        </a-select-option>
                                    </a-select>
                                </a-form-item>
                            </a-col>
                            <a-col :span="6" offset="1">
                                <a-form-item label="类型" fieldDecoratorId="boundType">
                                    <a-select placeholder="请选择" style="width: 100%;">
                                        <a-select-option value="">全部</a-select-option>
                                        <a-select-option value="I">入库</a-select-option>
                                        <a-select-option value="O">出库</a-select-option>
                                    </a-select>
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
                <a-table
                    :dataSource="reslist"
                    :columns="columns"
                    :pagination="tablePagination"
                    @change="this.pageChange"
                    rowKey="id"
                >
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
    name: "BoundList",
    components: {
        PageHeaderLayout,
    },
    created() {
        const params={
            start:0,
            limit:100,
        };
        this.$axios.get(`/apic/product/list?${qs.stringify(params)}`).then((res) => {
            if (res && res.data.success) {
                message.success("查询成功");
                this.products = res.data.list;
            }
        });
    },
    destroyed() {
        // this.$store.dispatch("tableList/clearList");
    },
    computed: {
    },
    data() {
        return {
            products:[],
            tablePagination: {
                showSizeChanger: true,
                showQuickJumper: true,
                total: 0,
                pageSize: 10,
                current: 1,
                showTotal: (total)=>{return `共${total}条`},
            },
            formValues: {},
            reslist:[],
            columns: [
                {
                    title: "产品名称",
                    dataIndex: "productName"
                },
                {
                    title: "规格",
                    dataIndex: "specification"
                },
                {
                    title: "类型",
                    dataIndex: "boundType",
                    customRender: val => (
                        <span>{this.formatBoundType(val)}</span>

                    )
                },
                {
                    title: "数量",
                    dataIndex: "amount"
                },
                {
                    title: "单位",
                    dataIndex: "unit"
                },
                {
                    title: "单价",
                    dataIndex: "unitPrice"
                },
                {
                    title: "总价",
                    dataIndex: "totalPrice"
                },
                {
                    title: "提交人",
                    dataIndex: "creator"
                },
                {
                    title: "提交时间",
                    dataIndex: "createTime",
                    customRender: val => (
                        <span>{moment(val).format("YYYY-MM-DD HH:mm:ss")}</span>
                    )
                }
            ]
        };
    },
    mounted() {
        const param ={
            start: 0,
            limit: this.tablePagination.pageSize,
        };
        this.queryList(param);
    },
    methods: {
        handleSearch(e) {
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
            this.$axios.get(`/apic//bound/list?${qs.stringify(params)}`).then((res) => {
                if (res && res.data.success) {
                    message.success("查询成功");
                    this.reslist = res.data.list;
                    this.tablePagination.total = res.data.size;
                }
            })
        },
        formatBoundType(type){
            if(type == 'O'){
                return '出库';
            }
            return '入库';
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
    }
};
</script>

<style lang="less">
@import "./BoundList.less";
</style>

