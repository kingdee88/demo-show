<style lang="less">
    @import "../../styles/single-common.less";
</style>
<template>
    <div>
        <Card>
            <div slot="title">
                <div class="edit-head">
                    <a @click="close" class="back-title">
                        <Icon type="ios-arrow-back"/> 返回
                    </a>
                    <div class="head-name">资产维修支付单</div>
                    <span></span>
                    <a @click="close" class="window-close">
                        <Icon type="ios-close" size="31" class="ivu-icon-ios-close"/>
                    </a>
                </div>
            </div>

            <Card>
                <Row type="flex" justify="space-between" :gutter="32">
                    <Col :xl="21" :xxl="16" style="border-right: 1px solid rgba(233, 232, 233, 0.6);">
                        <Form ref="form" :model="payment" :label-width="120" :rules="formValidate">
                            <h4 class="h4-title">基本信息</h4>
                            <Row :gutter="32">
                                <Col span="12">
                                    <FormItem label="维修支付单号" prop="name">
                                        {{payment.name}}
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="申请日期" prop="date">
                                        <Input v-model="payment.date" style="width: 320px"/>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="维修单号" prop="rname">
                                        <Input v-model="payment.rname" style="width: 320px">
                                            <Button slot="append" icon="ios-bookmark"></Button>
                                        </Input>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="报修资产名称" prop="aname">
                                        <Input v-model="payment.aname" style="width: 320px"/>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="报修时间" prop="rtime">
                                        <Input v-model="payment.rtime" style="width: 320px"/>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="报修部门" prop="rdepartment">
                                        <Input v-model="payment.rdepartment" style="width: 320px"/>
                                    </FormItem>
                                </Col>
                                <Col span="24">
                                    <FormItem label="维修费用" prop="ramount">
                                        <Input v-model="payment.ramount" style="width: 320px"/>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="维修方" prop="repairer">
                                        <Input v-model="payment.repairer" style="width: 320px"/>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="开户行名称" prop="bname">
                                        <Input v-model="payment.bname" style="width: 320px"/>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="账户名称" prop="aname">
                                        <Input v-model="payment.aname" style="width: 320px"/>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="银行账号" prop="baccount">
                                        <Input v-model="payment.baccount" style="width: 320px"/>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="申请人" prop="aman">
                                        <Input v-model="payment.aman" style="width: 320px"/>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="申请部门" prop="adepartment">
                                        <Input v-model="payment.adepartment" style="width: 320px">
                                            <Button slot="append" icon="ios-home"></Button>
                                        </Input>
                                    </FormItem>
                                </Col>
                                <Col span="24">
                                    <FormItem label="预算指标" prop="budget">
                                        <Input v-model="payment.budget" style="width: 320px">
                                            <Button slot="append" icon="ios-book"></Button>
                                        </Input>
                                    </FormItem>
                                </Col>
                                <Col span="24">
                                    <FormItem label="指标可用金额" prop="bbalance">
                                        <Input v-model="payment.bbalance" style="width: 320px"/>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="结算方式" prop="settlement">
                                        <Select v-model="payment.settlement" placeholder="请选择">
                                            <Option :value="0">网银转账</Option>
                                        </Select>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="是否含电子发票" prop="einvoice">
                                        <RadioGroup v-model="payment.einvoice">
                                            <Radio :label="0">否</Radio>
                                            <Radio :label="1">是</Radio>
                                        </RadioGroup>
                                    </FormItem>
                                </Col>
                                <Col span="24">
                                    <FormItem label="发票及附件数" prop="ainumber">
                                        <Input v-model="payment.ainumber" style="width: 320px"/>
                                    </FormItem>
                                </Col>
                                <Col span="24">
                                    <FormItem label="事由摘要" prop="rabstract">
                                        <Input v-model="payment.rabstract"/>
                                    </FormItem>
                                </Col>
                                <Col span="24">
                                    <FormItem label="事由说明" prop="description">
                                        <Input type="textarea" v-model="payment.description" :rows="4"/>
                                    </FormItem>
                                </Col>
                            </Row>
                            <h4 class="h4-title">维修支付信息</h4>
                            <Tabs value="name1">
                                <TabPane label="费用明细" name="name1">
                                    <Table
                                            border
                                            :columns="columns"
                                            :data="data"
                                            sortable="custom"
                                            ref="table"></Table>
                                </TabPane>
                                <TabPane label="发票信息" name="name2">
                                    <Table
                                            border
                                            :columns="columns2"
                                            :data="data2"
                                            sortable="custom"
                                            ref="table" ></Table>
                                </TabPane>
                            </Tabs>
                            <Form-item class="br">
                                <Button @click="handleSubmit" :loading="submitLoading" type="default">
                                    暂存
                                </Button>
                                <Button type="dashed" @click="close">关闭</Button>
                                <Button @click="handleSubmit" :loading="submitLoading" type="primary">
                                    送审
                                </Button>
                            </Form-item>
                        </Form>
                    </Col>
                    <Col :xl="3" :xxl="8">
                        <div class="operation">
                            <div class="s-modal">
                                <h4 class="h4-title">相关制度</h4>
                                <div class="content">无</div>
                            </div>
                        </div>
                        <div class="operation">
                            <div class="s-modal">
                                <h4 class="h4-title">预算指标情况</h4>
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
        name: "add",
        data() {
            return {
                submitLoading: false, // 表单提交状态
                payment: {
                    id: "", name: "送审后自动生成", einvoice: 0, settlement: 0,
                    date: new Date().getFullYear() + '-' + (new Date().getMonth()+1) + '-' + new Date().getDate(),
                    aman: 'kwj', adepartment: '普通外科病区'
                },
                // 表单验证规则
                formValidate: {
                    rname: [{required: true, message: "不能为空", trigger: "blur"}],
                    bname: [{required: true, message: "不能为空", trigger: "blur"}],
                    aname: [{required: true, message: "不能为空", trigger: "blur"}],
                    baccount: [{required: true, message: "不能为空", trigger: "blur"}],
                    aman: [{required: true, message: "不能为空", trigger: "blur"}],
                    budget: [{required: true, message: "不能为空", trigger: "blur"}],
                    settlement: [{required: true, message: "不能为空", trigger: "blur"}],
                    ainumber: [{required: true, message: "不能为空", trigger: "blur"}],
                    rabstract: [{required: true, message: "不能为空", trigger: "blur"}]
                },
                data2: [],
                data: [],
                columns: [
                    {
                        title: "费用明细",
                        key: "a"
                    },
                    {
                        title: "开支标准",
                        key: "b"
                    },
                    {
                        title: "报销申请金额(元)",
                        key: "c"
                    },
                    {
                        title: "备注",
                        key: "d",
                        width: 150
                    }
                ],
                columns2: [
                    {
                        title: "发票类型",
                        key: "a"
                    },
                    {
                        title: "发票代码",
                        key: "b"
                    },
                    {
                        title: "发票号码",
                        key: "c"
                    },
                    {
                        title: "发票金额(元)",
                        key: "d"
                    },
                    {
                        title: "附件",
                        key: "e"
                    }
                ]
            };
        },
        methods: {
            init() {
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
                        //     this.$Message.success("添加成功");
                        //     this.submited();
                        //   }
                        // });
                        // 模拟成功
                        this.submitLoading = false;
                        this.$Message.success("添加成功");
                        this.submited();
                    }
                });
            },
            close() {
                this.$emit("close", true);
            },
            submited() {
                this.$emit("submited", true);
            }
        },
        mounted() {
            this.init();
        }
    };
</script>
