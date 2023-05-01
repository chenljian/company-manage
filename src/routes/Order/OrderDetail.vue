<template>
    <PageHeaderLayout title="生产单详情" >
        <div >
        <a-card :bordered="false" title="新热佳生产单" :headStyle="{ 'text-align': 'center',fontWeight: 'bold' }" class="print">
            <a-row class="detail-row">
                <a-col :span="4" class="term">下单时间</a-col>
                <a-col :span="8">{{ moment(formInline.orderTime).format('YYYY-MM-DD HH:mm')}}</a-col>
                <a-col :span="4" class="term">交货时间</a-col>
                <a-col :span="8">{{ moment(formInline.deliverTime).format('YYYY-MM-DD HH:mm')}}</a-col>
            </a-row>
            <a-row class="detail-row">
                <a-col :span="4" class="term">客户</a-col>
                <a-col :span="8">{{ formInline.custom }}</a-col>
                <a-col :span="4" class="term">参考</a-col>
                <a-col :span="8">{{ formInline.consult }}</a-col>
            </a-row>
            <a-row class="detail-row">
                <a-col :span="4" class="term">规格</a-col>
                <a-col :span="8">{{ formInline.specification }}</a-col>
                <a-col :span="4" class="term">电压</a-col>
                <a-col :span="8">{{ formInline.voltage }}</a-col>
            </a-row>
            <a-row class="detail-row">
                <a-col :span="4" class="term">功率</a-col>
                <a-col :span="8">{{ formInline.power }}</a-col>
                <a-col :span="4" class="term">数量</a-col>
                <a-col :span="8">{{ formInline.amount }}</a-col>
            </a-row>
            <a-row class="detail-row">
                <a-col :span="4" class="term">图示</a-col>
                <a-col :span="20">{{ formInline.illustration }}</a-col>
            </a-row>
            <a-row class="detail-row">
                <a-col :span="4" class="term">备注</a-col>
                <a-col :span="20">{{ formInline.remark }}</a-col>
            </a-row>
            <a-row class="detail-row">
                <a-col :span="4" class="term">压缩电阻</a-col>
                <a-col :span="8">{{ formInline.comResistance }}</a-col>
                <a-col :span="4" class="term">成品电阻</a-col>
                <a-col :span="8">{{ formInline.finResistance }}</a-col>
            </a-row>
            <a-row class="detail-row">
                <a-col :span="4" class="term">空管材质</a-col>
                <a-col :span="8">{{ formInline.material }}</a-col>
                <a-col :span="4" class="term">填充物</a-col>
                <a-col :span="8">{{ formInline.filler }}</a-col>
            </a-row>
            <a-row class="detail-row">
                <a-col :span="4" class="term">空管</a-col>
                <a-col :span="4">{{ formInline.pipeA }}</a-col>
                <a-col :span="4">{{ formInline.pipeB }}</a-col>
                <a-col :span="4" class="term">镁棒</a-col>
                <a-col :span="4">{{ formInline.magnesiumRodA }}</a-col>
                <a-col :span="4">{{ formInline.magnesiumRodA }}</a-col>
            </a-row>
            <a-row class="detail-row">
                <a-col :span="4" class="term">镍铬</a-col>
                <a-col :span="4">{{ formInline.nickelChromiumA }}</a-col>
                <a-col :span="4">{{ formInline.nickelChromiumB }}</a-col>
                <a-col :span="4" class="term">引棒</a-col>
                <a-col :span="4">{{ formInline.guideRodA }}</a-col>
                <a-col :span="4">{{ formInline.guideRodB }}</a-col>
            </a-row>
            <a-row class="detail-row">
                <a-col :span="4" class="term">镁头</a-col>
                <a-col :span="4">{{ formInline.magnesiumHeadA }}</a-col>
                <a-col :span="4">{{ formInline.magnesiumHeadB }}</a-col>
                <a-col :span="4" class="term">镁底</a-col>
                <a-col :span="4">{{ formInline.magnesiumBaseA }}</a-col>
                <a-col :span="4">{{ formInline.magnesiumBaseB }}</a-col>
            </a-row>
            <a-row class="detail-row">
                <a-col :span="4" class="term">出线</a-col>
                <a-col :span="4">{{ formInline.outLineA }}</a-col>
                <a-col :span="4">{{ formInline.outLineB }}</a-col>
                <a-col :span="4" class="term">技术课</a-col>
                <a-col :span="8">{{ formInline.techClass }}</a-col>
            </a-row>
            <a-row class="detail-row">
                <a-col :span="4" class="term">生产课</a-col>
                <a-col :span="8">{{ formInline.prodClass }}</a-col>
                <a-col :span="4" class="term">QC/仓管</a-col>
                <a-col :span="8">{{ formInline.warehouse }}</a-col>
            </a-row>
            <a-form-model :model="formInline" :label-col=" { span: 4 ,}" :wrapper-col="{ span: 6 }">
                <a-form-model-item :wrapper-col="{ span: 14, offset: 8 }">
                    <a-button type="primary" class="button" @click="print">
                        打印
                    </a-button>
                    <a-button style="margin-left: 10px;" class="button" @click="back">
                        返回
                    </a-button>
                </a-form-model-item>
            </a-form-model>
        </a-card>

        </div>
    </PageHeaderLayout>
</template>

<script>
import PageHeaderLayout from "@/layouts/PageHeaderLayout";
import {Input, message} from "ant-design-vue";
import moment from "moment";

export default {
    components: {
        PageHeaderLayout,
        TextArea: Input.TextArea, // eslint-disable-line
    },
  name: "AddOrderForm",
    data() {
        return {
            moment,
            formInline: {
                orderTime: '2023-10-12 12:00:00',
                deliverTime: '2023-10-12 12:00:00',
                custom: '对方科技有限公司',
                consult: '罗秋鑫',
            },
        };
    },
    mounted() {
        console.log("接收倒参数",this.$route.query);
        this.$axios.get(`/apic/order/query/${this.$route.query.id}`).then((res) => {
            this.loading = false;
            if (res && res.data.success) {
                this.formInline = res.data.object;
            }else if(res && !res.data.success){
                message.error(res.data.message);
            }
        }).catch(function (error) {
            console.log(error);
        });
    },
    methods: {
        print() {
            const printContext = document.getElementsByClassName("print")[0]  //获取目标区域的HTML结构
            document.body.innerHTML = printContext.innerHTML   //替换网页的html内容
            window.print()   //打印
            window.location.reload()  //刷新页面，因为网页的html被替换后很丑
        },
        back(){
            this.$router.go(-1);
        }
    },
};
</script>

<style lang="less" scoped>
@import "./style.less";
.ant-form-item {
    line-height: 1;
    margin-bottom:10px;
}
.detail-row{
    line-height: 2;
    margin-bottom:10px;
    font-size: 15px;
}
.term {
    // Line-height is 22px IE dom height will calculate error
    text-align: right;
    font-weight: bold;

    &:after {
        content: ":";
        margin: 0 8px 0 2px;
        position: relative;
        top: -0.5px;
    }
}

.detail {
    line-height: 22px;
    width: 100%;
    padding-bottom: 16px;
    color: @text-color;
    display: table-cell;
}
@media print {
    .ant-form-item {
        line-height: 1;
        margin-bottom:0px;
    }
    .button{
        display: none;
    }
    .detail-row{
        line-height: 2;
        margin-bottom:10px;
        font-size: 20px;
    }

}
</style>
