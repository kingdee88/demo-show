<style lang="less">
    @import "../../../styles/single-common.less";
</style>
<template>
    <div>
        <Card>
            <div slot="title">
                <div class="edit-head">
                    <a @click="close" class="back-title">
                        <Icon type="ios-arrow-back" />返回
                    </a>
                    <div class="head-name">一般经费</div>
                    <span></span>
                    <a @click="close" class="window-close">
                        <Icon type="ios-close" size="31" class="ivu-icon-ios-close" />
                    </a>
                </div>
            </div>
            <Card class="detail-app">
                <p class="show-info">经办人部门：{{form.APPLY_DEPT_NAME}}   经办人：test11   申请日期：{{form.TIME_CREATE}}   申请单号：{{form.APPLY_FORM_NO}}</p>
                <Row type="flex" justify="space-between" :gutter="32">
                    <Col span="16" style="border-right: 1px solid rgba(233, 232, 233, 0.6);">
                        <Form ref="form" :model="form" :label-width="120" :rules="formValidate">
                            <h4 class="h4-title">申请基本信息</h4>
                            <Row :gutter="32">
                                <Col span="24">
                                    <FormItem label="关联行政申请：" prop="name">
                                        {{form.name}}
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="申请人：" prop="name">
                                        {{form.AGENT_USER_NAME}}
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="申请部门：" prop="name">
                                        {{form.APPLY_DEPT_NAME}}
                                    </FormItem>
                                </Col>
                                <Col span="24">
                                    <FormItem label="申请人电话：" prop="name">
                                        {{form.MOBILE}}
                                    </FormItem>
                                </Col>
                                <Col span="24">
                                    <FormItem label="预算指标：" prop="name">
                                        {{form.ITEM_PAY_ITEM_NAME}}
                                    </FormItem>
                                </Col>
                                <Col span="24">
                                    <FormItem label="指标可用金额：" prop="name">
                                        {{form.APPLY_AMOUNT}}
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="拟安排时间：" prop="name">
                                        {{form.date}}
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="拟参与人数：" prop="name">
                                        {{form.name}}
                                    </FormItem>
                                </Col>
                                <Col span="24">
                                    <FormItem label="是否需借款：" prop="name">
                                        否
                                    </FormItem>
                                </Col>
                                <Col span="24">
                                    <FormItem label="事由摘要：" prop="name">
                                        {{form.REASON_DIGEST}}
                                    </FormItem>
                                </Col>
                                <Col span="24">
                                    <FormItem label="申请事务：" prop="name">
                                        {{form.description}}
                                    </FormItem>
                                </Col>
                            </Row>
                            <h4 class="h4-title">费用预算</h4>
                            <Table
                                    border
                                    :columns="columns"
                                    :data="datas"
                                    sortable="custom"
                                    ref="table"
                            >
                            </Table>
                            <div class="sum-text">
                                申请金额：{{NumberToChinese(datas[0]['c'])}} {{datas[0]['c']}}.00
                            </div>
                        </Form>
                    </Col>
                    <Col span="8">
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
                                    <p>{{form.INDEX_NAME}}</p>
                                    <Progress :percent="100" :stroke-width="20" text-inside />
                                </div>
                            </div>
                            <div class="s-modal">
                                <h4 class="h4-title">审批过程</h4>
                                <div class="content">
                                    <Timeline>
                                        <TimelineItem>{{form.APPLY_DEPT_NAME}} test11 任务</TimelineItem>
                                        <TimelineItem color="green">
                                            <Icon type="md-checkmark-circle" slot="dot"></Icon>
                                            <span>{{form.APPLY_DEPT_NAME}} 05/18 20:03 任务同意</span>
                                        </TimelineItem>
                                    </Timeline>
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
                formValidate: {
                },
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
            NumberToChinese(m){
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
