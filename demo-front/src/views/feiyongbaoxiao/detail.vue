<style lang="less">
    @import "../../styles/single-common.less";
</style>
<template>
    <div>
        <Card>
            <div slot="title">
                <div class="edit-head">
                    <a @click="close" class="back-title">
                        <Icon type="ios-arrow-back"/>
                        返回
                    </a>
                    <div class="head-name">费用报销申请</div>
                    <span></span>
                    <a @click="close" class="window-close">
                        <Icon type="ios-close" size="31" class="ivu-icon-ios-close"/>
                    </a>
                </div>
            </div>
            <Card class="detail-app">
                <p class="show-info">经办人部门：{{form.APPLY_DEPT_NAME}} 经办人：demo 申请日期：{{form.TIME_CREATE}}
                    申请单号：{{form.APPLY_FORM_NO}}</p>
                <Row type="flex" justify="space-between" :gutter="32">
                    <Col :xl="21" :xxl="16" style="border-right: 1px solid rgba(233, 232, 233, 0.6);">
                        <Form ref="form" :model="form" :label-width="130" :rules="formValidate">
                            <h4 class="h4-title">报销基本信息</h4>
                            <Row :gutter="32">
                                <Col span="12">
                                    <FormItem label="关联事先申请:">
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="关联行政申请:">
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="报销申请人:">
                                        demo
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="报销部门:">
                                        {{form.k}}
                                    </FormItem>
                                </Col>
                                <Col span="24">
                                    <FormItem label="申请人电话:">
                                    </FormItem>
                                </Col>
                            </Row>
                            <h4 class="h4-title">预算指标信息</h4>
                            <Row :gutter="32">


                                <Col span="24">
                                    <FormItem label="预算指标:">
                                        {{form.b}}({{form.c}})
                                    </FormItem>
                                </Col>
                                <Col span="24">
                                    <FormItem label="支出事项:">
                                        {{form.e}}
                                    </FormItem>
                                </Col>
                                <Col span="24">
                                    <FormItem label="指标可用金额:">
                                        10034.00
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="代还借款金额:">
                                    8466
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="是否冲抵借款:">
                                        冲抵借款
                                    </FormItem>
                                </Col>
                                <Col span="24">
                                    <FormItem label="结算方式:" prop="name">
                                        <CheckboxGroup v-model="ttt">
                                            <Checkbox label="现金" readonly></Checkbox>
                                            <Checkbox label="网银转账" readonly></Checkbox>
                                            <Checkbox label="支票" readonly></Checkbox>
                                            <Checkbox label="公务卡" readonly></Checkbox>
                                            <Checkbox label="往来" readonly></Checkbox>
                                        </CheckboxGroup>
                                    </FormItem>
                                </Col>
                                <Col span="24">
                                    <FormItem label="是否录入发票信息:" prop="name">
                                        否
                                    </FormItem>
                                </Col>
                                <Col span="24">
                                    <FormItem label="发票及附件数:" prop="name">
                                    </FormItem>
                                </Col>
                                <Col span="24">
                                    <FormItem label="事由摘要:" prop="name">
                                    </FormItem>
                                </Col>
                                <Col span="24">
                                    <FormItem label="事由说明:" prop="name">
                                    </FormItem>
                                </Col>
                            </Row>
                            <h4 class="h4-title">报销内容信息</h4>
                            <Tabs value="name1">
                                <TabPane label="费用明细" name="name1">
                                    <Table
                                            border
                                            :columns="columns"
                                            :data="data"
                                            sortable="custom"
                                            ref="table"
                                    ></Table>
                                </TabPane>
                                <TabPane label="发票信息" name="name2">
                                    <Table
                                            border
                                            :columns="columns2"
                                            :data="data2"
                                            sortable="custom"
                                            ref="table"
                                    ></Table>
                                </TabPane>
                            </Tabs>
                            <h4 class="h4-title">借款冲抵</h4>
                            <Table
                                    border
                                    :columns="columns3"
                                    :data="data3"
                                    sortable="custom"
                                    ref="table"
                            ></Table>
                            <h4 class="h4-title">收款方信息</h4>
                            <Table
                                    border
                                    :columns="columns4"
                                    :data="data4"
                                    sortable="custom"
                                    ref="table"
                            ></Table>
                            <h4 class="h4-title">附件上传</h4>
                            <Table
                                    style="margin-bottom: 20px"
                                    border
                                    :columns="columns5"
                                    :data="data5"
                                    sortable="custom"
                                    ref="table"
                            ></Table>
                            <Form-item class="br">
                                <Button
                                        @click="handleSubmit"
                                        :loading="submitLoading"
                                        type="primary"
                                >送审
                                </Button>
                                <Button @click="handleReset">重置</Button>
                                <Button type="dashed" @click="close">关闭</Button>
                            </Form-item>
                        </Form>
                    </Col>
                    <Col :xl="3" :xxl="8">
                        <div class="operation">
                            <div class="s-modal">
                                <h4 class="h4-title">风险提示</h4>
                                <div class="content">无</div>
                            </div>
                            <div class="s-modal">
                                <h4 class="h4-title">相关制度</h4>
                                <div class="content">无</div>
                            </div>
                            <div class="s-modal">
                                <h4 class="h4-title">预算指标情况</h4>
                                <div class="content">
                                    <p>{{form.b}}({{form.c}})</p>
                                    <Progress :percent="99" :stroke-width="20" text-inside/>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Card>
        </Card>
    </div>
</template>

<script>
    export default {
        name: "edit",
        props: {
            data: Object
        },
        data() {
            return {
                ttt: '网银转账',
                loading: false, // 表单加载状态
                submitLoading: false, // 表单提交状态
                form: {
                    id: "",
                    name: ""
                },
                datas: [{
                    c: 0
                }],
                columns: [
                    {
                        title: "费用明细",
                        key: "a",
                        minWidth: 150
                    },
                    {
                        title: "开支标准",
                        key: "b",
                        width: 150
                    },
                    {
                        title: "申请金额(元)",
                        key: "c",
                        width: 150
                    },
                    {
                        title: "备注",
                        key: "d"
                    }
                ],
                // 表单验证规则
                formValidate: {},
                unit: ["仟", "佰", "拾", "", "仟", "佰", "拾", "", "角", "分"],
            };
        },
        methods: {
            init() {
                this.handleReset();
                this.form = this.data;
                this.datas = [{
                    a: this.form.ITEM_PAY_ITEM_NAME,
                    b: '据实列支',
                    c: this.form.APPLY_AMOUNT,
                    d: ''
                }]
            },
            handleReset() {
                this.$refs.form.resetFields();
            },
            handleSubmit() {
                this.$refs.form.validate(valid => {
                    if (valid) {
                        // this.postRequest("请求路径", this.form).then(res => {
                        //   this.submitLoading = false;
                        //   if (res.success) {
                        //     this.$Message.success("编辑成功");
                        //     this.submited();
                        //   }
                        // });
                        // 模拟成功
                        this.submitLoading = false;
                        this.$Message.success("编辑成功");
                        this.submited();
                    }
                });
            },
            close() {
                this.$emit("close", true);
            },
            submited() {
                this.$emit("submited", true);
            },
            toDx(n) {   //阿拉伯数字转换函数
                switch (n) {
                    case "0":
                        return "零";
                    case "1":
                        return "壹";
                    case "2":
                        return "贰";
                    case "3":
                        return "叁";
                    case "4":
                        return "肆";
                    case "5":
                        return "伍";
                    case "6":
                        return "陆";
                    case "7":
                        return "柒";
                    case "8":
                        return "捌";
                    case "9":
                        return "玖";
                }
            },
            NumberToChinese(m) {
                m *= 100;
                m += "";
                var length = m.length;

                var result = "";
                for (var i = 0; i < length; i++) {
                    if (i == 2) {
                        result = "元" + result;
                    } else if (i == 6) {
                        result = "万" + result;
                    }
                    if (m.charAt(length - i - 1) == 0) {
                        if (i != 0 && i != 1) {
                            if (result.charAt(0) != '零' && result.charAt(0) != '元' && result.charAt(0) != '万') {
                                result = "零" + result;
                            }
                        }
                        continue;
                    }
                    result = this.toDx(m.charAt(length - i - 1)) + this.unit[this.unit.length - i - 1] + result;
                }
                result += result.charAt(result.length - 1) == '元' ? "整" : "";
                return result;
            }

        },
        mounted() {
            this.init();
        }
    };
</script>
