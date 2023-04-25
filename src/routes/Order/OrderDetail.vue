<template>
    <PageHeaderLayout title="生产单详情" >
        <div >
        <a-card :bordered="false" title="新热佳生产单" :headStyle="{ 'text-align': 'center',fontWeight: 'bold' }" class="print">
            <a-row class="detail-row">
                <a-col :span="4" class="term">下单时间</a-col>
                <a-col :span="8">{{ formInline.orderTime }}</a-col>
                <a-col :span="4" class="term">交货时间</a-col>
                <a-col :span="8">{{ formInline.deliverTime }}</a-col>
            </a-row>
            <a-row class="detail-row">
                <a-col :span="4" class="term">客户</a-col>
                <a-col :span="8">{{ formInline.custom }}</a-col>
                <a-col :span="4" class="term">参考</a-col>
                <a-col :span="8">{{ formInline.consult }}</a-col>
            </a-row>
            <a-form-model :model="formInline" :label-col=" { span: 4 ,}" :wrapper-col="{ span: 6 }">
                <a-row>
                    <a-col span="12">
                        <a-form-model-item label="规格" :label-col=" { span: 8 ,}" :wrapper-col="{ span: 12 }">
                            <a-input v-model="formInline.specification" placeholder="规格" />
                        </a-form-model-item>
                    </a-col>
                    <a-col span="12">
                        <a-form-model-item label="电压" :label-col=" { span: 8 ,}" :wrapper-col="{ span: 12 }">
                            <a-input v-model="formInline.voltage"  placeholder="电压" />
                        </a-form-model-item>
                    </a-col>
                </a-row>
                <a-row>
                    <a-col span="12">
                        <a-form-model-item label="功率" :label-col=" { span: 8 ,}" :wrapper-col="{ span: 12 }">
                            <a-input v-model="formInline.power" placeholder="Username" />
                        </a-form-model-item>
                    </a-col>
                    <a-col span="12">
                        <a-form-model-item label="数量" :label-col=" { span: 8 ,}" :wrapper-col="{ span: 12 }">
                            <a-input v-model="formInline.amount" placeholder="填写数量" />
                        </a-form-model-item>
                    </a-col>
                </a-row>
                <a-form-model-item label="图示" :label-col=" { span: 4 ,}" :wrapper-col="{ span: 16 }">
                    <a-input v-model="formInline.amount" type="textarea" placeholder="图示" />
                </a-form-model-item>
                <a-form-model-item label="备注" :label-col=" { span: 4 ,}" :wrapper-col="{ span: 16 }">
                    <a-input v-model="formInline.amount" type="textarea" placeholder="备注" />
                </a-form-model-item>
                <a-row>
                    <a-col span="12">
                        <a-form-model-item label="压缩电阻" :label-col=" { span: 8 ,}" :wrapper-col="{ span: 12 }">
                            <a-input v-model="formInline.comResistance" placeholder="压缩电阻" />
                        </a-form-model-item>
                    </a-col>
                    <a-col span="12">
                        <a-form-model-item label="成品电阻" :label-col=" { span: 8 ,}" :wrapper-col="{ span: 12 }">
                            <a-input v-model="formInline.finResistance" type="password" placeholder="Password" />
                        </a-form-model-item>
                    </a-col>
                </a-row>
                <a-row>
                    <a-col span="12">
                        <a-form-model-item label="空管材质" :label-col=" { span: 8 ,}" :wrapper-col="{ span: 12 }">
                            <a-input v-model="formInline.material" placeholder="Username" />
                        </a-form-model-item>
                    </a-col>
                    <a-col span="12">
                        <a-form-model-item label="填充物" :label-col=" { span: 8 ,}" :wrapper-col="{ span: 12 }">
                            <a-input v-model="formInline.filler" type="password" placeholder="Password" />
                        </a-form-model-item>
                    </a-col>
                </a-row>
                <a-row>
                    <a-col span="12">
                        <a-form-model-item label="空管" :label-col=" { span: 8 ,}" :wrapper-col="{ span: 12 }">
                            <a-input v-model="formInline.pipeA" placeholder="空管规格" />
                            <a-input v-model="formInline.pipeB" placeholder="空管长度" />
                        </a-form-model-item>
                    </a-col>
                    <a-col span="12">
                        <a-form-model-item label="镁棒" :label-col=" { span: 8 ,}" :wrapper-col="{ span: 12 }">
                            <a-input v-model="formInline.magnesiumRodA" placeholder="镁棒长" />
                            <a-input v-model="formInline.magnesiumRodA" placeholder="镁棒宽" />
                        </a-form-model-item>
                    </a-col>
                </a-row>
                <a-row>
                    <a-col span="12">
                        <a-form-model-item label="镍铬" :label-col=" { span: 8 ,}" :wrapper-col="{ span: 12 }">
                            <a-input v-model="formInline.nickelChromiumA" placeholder="镍铬A" />
                            <a-input v-model="formInline.nickelChromiumB" placeholder="镍铬B" />
                        </a-form-model-item>
                    </a-col>
                    <a-col span="12">
                        <a-form-model-item label="引棒" :label-col=" { span: 8 ,}" :wrapper-col="{ span: 12 }">
                            <a-input v-model="formInline.guideRodA" placeholder="引棒类型" />
                            <a-input v-model="formInline.guideRodB" placeholder="引棒长度" />
                        </a-form-model-item>
                    </a-col>
                </a-row>
                <a-row>
                    <a-col span="12">
                        <a-form-model-item label="镁头" :label-col=" { span: 8 ,}" :wrapper-col="{ span: 12 }">
                            <a-input v-model="formInline.magnesiumHeadA" placeholder="镁头" />
                            <a-input v-model="formInline.magnesiumHeadB" placeholder="镁头" />
                        </a-form-model-item>
                    </a-col>
                    <a-col span="12">
                        <a-form-model-item label="镁底" :label-col=" { span: 8 ,}" :wrapper-col="{ span: 12 }">
                            <a-input v-model="formInline.magnesiumBaseA" placeholder="镁底" />
                            <a-input v-model="formInline.magnesiumBaseA" placeholder="镁底" />
                        </a-form-model-item>
                    </a-col>
                </a-row>
                <a-row>
                    <a-col span="12">
                        <a-form-model-item label="出线" :label-col=" { span: 8 ,}" :wrapper-col="{ span: 12 }">
                            <a-input v-model="formInline.outLineA" placeholder="出线类型" />
                            <a-input v-model="formInline.outLineB" placeholder="出线长度" />
                        </a-form-model-item>
                    </a-col>
                    <a-col span="12">
                        <a-form-model-item label="技术课" :label-col=" { span: 8 ,}" :wrapper-col="{ span: 12 }">
                            <a-input v-model="formInline.techClass" placeholder="技术课" />
                        </a-form-model-item>
                    </a-col>
                </a-row>
                <a-row>
                    <a-col span="12">
                        <a-form-model-item label="生产课" :label-col=" { span: 8 ,}" :wrapper-col="{ span: 12 }">
                            <a-input v-model="formInline.prodClass" placeholder="生产课人员" />
                        </a-form-model-item>
                    </a-col>
                    <a-col span="12">
                        <a-form-model-item label="QC/仓管" :label-col=" { span: 8 ,}" :wrapper-col="{ span: 12 }">
                            <a-input v-model="formInline.warehouse" placeholder="QC/仓管" />
                        </a-form-model-item>
                    </a-col>
                </a-row>
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
import { Input } from "ant-design-vue";
export default {
    components: {
        PageHeaderLayout,
        TextArea: Input.TextArea, // eslint-disable-line
    },
  name: "AddOrderForm",
    data() {
        return {
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
    line-height: 1.5;
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

}
</style>
