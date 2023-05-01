<template>
    <div>
        <a-table
            :loading="loading"
            :columns="columns"
            :dataSource="data"
            :pagination="false"
            :rowClassName="record => {
                return 'editable' ? 'editable' : '';
            }"
        />
            <a-button
                style="width: 100%; margin-top: 16px; margin-bottom: 8px;"
                type="dashed"
                @click="showOutboundForm"
                icon="plus"
            >
                新增出货产品
            </a-button>
        <OutboundForm ref="outboundForm" :products="products" title="新增出货产品" :handleOk="this.newMember"></OutboundForm>
    </div>
</template>

<script>
import { message } from "ant-design-vue";
import OutboundForm from "./OutboundForm.vue";
import qs from 'qs';



export default {
  name: "TableForm",
    components: {
        OutboundForm
    },
  props: {
    value: {
      type: Array
    },
    onChange: {
      type: Function
    }
  },
  created() {
    this.data = this.value;
  },

  watch: {
    // eslint-disable-next-line
    value(val, oldVal) {
      this.data = val;
    }
  },
    mounted() {
        //查询产品
        const params={
            status:"P",
            start:0,
            limit:100,
        };
        this.$axios.get(`/apic/product/list?${qs.stringify(params)}`).then((res) => {
            if (res && res.data.success) {
                message.success("查询成功");
                this.products = res.data.list;
            }else if(res && !res.data.success){
                message.error(res.data.message);
            }
        })
    },
  data() {
    return {
      loading: false,
      index: 0,
      data: [],
      cacheOriginData: {},
        products:[],
      columns: [
        {
          title: "产品名称",
          dataIndex: "productName",
          key: "productName",
          width: "20%",
        },
        {
          title: "规格",
          dataIndex: "specification",
          key: "specification",
          width: "20%",
        },
        {
          title: "单位",
          dataIndex: "unit",
          key: "unit",
          width: "10%",
        },
          {
              title: "数量",
              dataIndex: "amount",
              key: "amount",
              width: "10%",
              customRender: (text, record) => {
                  if (record.editable) {
                      return (
                          <a-input
                              value={text}
                              onChange={e =>
                                  this.handleFieldChange(e, "amount", record.key)
                              }
                              onKeyPress={e => this.handleKeyPress(e, record.key)}
                              placeholder="数量"
                          />
                      );
                  }
                  return text;
              }
          },
          {
              title: "单价",
              dataIndex: "unitPrice",
              key: "unitPrice",
              width: "10%",
              customRender: (text, record) => {
                  if (record.editable) {
                      return (
                          <a-input
                              value={text}
                              onChange={e =>
                                  this.handleFieldChange(e, "unitPrice", record.key)
                              }
                              onKeyPress={e => this.handleKeyPress(e, record.key)}
                              placeholder="单价"
                          />
                      );
                  }
                  return text;
              }
          },
          {
              title: "金额",
              dataIndex: "totalPrice",
              key: "totalPrice",
              width: "10%",
          },
        {
          title: "操作",
          key: "action",
          customRender: (text, record) => {
            if (!!record.editable && this.loading) {
              return null;
            }
            if (record.editable) {
              if (record.isNew) {
                return (
                  <span>
                    <a onClick={e => this.saveRow(e, record.key)}>添加</a>
                    <a-divider type="vertical" />
                    <a-popconfirm
                      title="是否要删除此行？"
                      onConfirm={() => this.remove(record.key)}
                    >
                      <a>删除</a>
                    </a-popconfirm>
                  </span>
                );
              }
              return (
                <span>
                  <a onClick={e => this.saveRow(e, record.key)}>保存</a>
                  <a-divider type="vertical" />
                  <a onClick={e => this.cancel(e, record.key)}>取消</a>
                </span>
              );
            }
            return (
              <span>
                <a onClick={e => this.toggleEditable(e, record.key)}>编辑</a>
                <a-divider type="vertical" />
                <a-popconfirm
                  title="是否要删除此行？"
                  onConfirm={() => this.remove(record.key)}
                >
                  <a>删除</a>
                </a-popconfirm>
              </span>
            );
          }
        }
      ]
    };
  },
  methods: {
      showOutboundForm(){
          this.$refs.outboundForm.showForm();
      },
    newMember(newProd) {
          newProd.key = this.index;
      const newData = this.data.map(item => ({ ...item }));
      newData.push(newProd);
      this.index += 1;
      this.data = newData;
      this.$refs.outboundForm.hideForm();
      this.onChange(this.data);
    },
    handleFieldChange(e, fieldName, key) {
      const newData = this.data.map(item => ({ ...item }));
      const target = this.getRowByKey(key, newData);
      if (target) {
        target[fieldName] = e.target.value;
        const price = Number(target.amount)*Number(target.unitPrice);
        target.totalPrice =price.toFixed(2);
        this.data = newData;
      }
    },
    handleKeyPress(e, key) {
      if (e.key === "Enter") {
        this.saveRow(e, key);
      }
    },
      selectProduct(val){
          console.log("选择", val);
      },
    remove(key) {
      const newData = this.data.filter(item => item.key !== key);
      this.data = newData;
      this.onChange(newData);
    },
    getRowByKey(key, newData) {
      return (newData || this.data).filter(item => item.key === key)[0];
    },
    saveRow(e, key) {
      //   e.persist();
      this.loading = true;
      setTimeout(() => {
        if (this.clickedCancel) {
          this.clickedCancel = false;
          return;
        }
        const target = this.getRowByKey(key) || {};
        if (!target.unitPrice || !target.amount) {
          message.error("请填写完整单价数量信息。");
          e.target.focus();
          this.loading = false;
          return;
        }
        delete target.isNew;
        this.toggleEditable(e, key);
        this.onChange(this.data);
        this.loading = false;
      }, 500);
    },
    cancel(e, key) {
      this.clickedCancel = true;
      e.preventDefault();
      const newData = this.data.map(item => ({ ...item }));
      const target = this.getRowByKey(key, newData);
      if (this.cacheOriginData[key]) {
        Object.assign(target, this.cacheOriginData[key]);
        target.editable = false;
        delete this.cacheOriginData[key];
      }
      this.data = newData;
      this.clickedCancel = false;
    },
    toggleEditable(e, key) {
          console.log("编辑", e,key);
      e.preventDefault();
      const newData = this.data.map(item => ({ ...item }));
      const target = this.getRowByKey(key, newData);
      if (target) {
        // 进入编辑状态时保存原始数据
        if (!target.editable) {
          this.cacheOriginData[key] = { ...target };
        }
        target.editable = !target.editable;
        this.data = newData;
      }
    }
  }
};
</script>

<style lang="less">
@import "./style.less";
</style>
