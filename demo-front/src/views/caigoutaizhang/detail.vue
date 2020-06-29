<style lang="less">
    @import "../../styles/single-common.less";
</style>
<template>
    <div>
        <Card>
            <div slot="title">
                <div class="edit-head">
                    <a @click="close" class="back-title">
                        <Icon type="ios-arrow-back" />返回
                    </a>
                    <div class="head-name">采购项目</div>
                    <span></span>
                    <a @click="close" class="window-close">
                        <Icon type="ios-close" size="31" class="ivu-icon-ios-close" />
                    </a>
                </div>
            </div>
            <Card class="detail-app">
                <Row type="flex" justify="space-between" :gutter="32">
                    <Col span="16" style="border-right: 1px solid rgba(233, 232, 233, 0.6);">
                        <Form ref="form" :model="form" :label-width="120" :rules="formValidate">
                            <h4 class="h4-title">基本信息</h4>
                            <Row :gutter="32">
                                <Col span="12">
                                    <FormItem label="项目编号：" prop="name">
                                        CGXM-2019-0000017
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="项目名称：" prop="name">
                                        采购
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="项目申请人：" prop="name">
                                        test11
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="项目申请医院：" prop="name">
                                       演示医院
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="支付方式：" prop="name">
                                        合同支付
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="申请日期：" prop="name">
                                        2020-06-01
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="预算指标：" prop="name">
                                        固定资产购置费
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="可用金额：" prop="name">
                                        1234567890
                                    </FormItem>
                                </Col>
                                <Col span="24">
                                    <FormItem label="资金来源：" prop="name">
                                        
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="项目负责人：" prop="name">
                                        test11
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="负责人电话：" prop="name">
                                        13337888888
                                    </FormItem>
                                </Col>
                                  <Col span="24">
                                    <FormItem label="申请事由：" prop="name">
                                        
                                    </FormItem>
                                </Col>
                            </Row>
                            <h4 class="h4-title">采购信息</h4>
                            <Row :gutter="32">
                                <Col span="12">
                                    <FormItem label="采购性质：" prop="name">
                                        自行采购
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="采购组织形式：" prop="name">
                                        部门集中采购
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="代理机构类型：" prop="name">
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="采购方式：" prop="name">
                                       公开招标
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="采购预算金额：" prop="name">
                                        500.00
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="控制价：" prop="name">
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="项目执行结果：" prop="name">
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="结果日期：" prop="name">
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="是否涉密：" prop="name">
                                        否
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="采购编号：" prop="name">
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="招标要求：" prop="name">
                                        不分包
                                    </FormItem>
                                </Col>
                            </Row>
                            <h4 class="h4-title">明细信息</h4>
                            <Table
                                    border
                                    :columns="columns"
                                    :data="datas"
                                    sortable="custom"
                                    ref="table"
                            >
                            </Table>
                        </Form>
                    </Col>
                    <Col span="8">
                        <div class="operation">
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
                    a:'00202',
                    b:'建设工程',
                    d: '否',
                    e:'个',
                    f:'123.00',
                    g:'12',
                    h:'1476.00'
                }],
                columns: [
                    {
                        title: "采购品目",
                        key: "a",
                        minWidth: 150
                    },
                    {
                        title: "名称",
                        key: "b",
                        width: 150
                    },
                    {
                        title: "规格型号",
                        key: "c",
                        width: 150
                    },
                    {
                        title: "是否进口",
                        key: "d"
                    },
                    {
                        title: "数量单位",
                        key: "e"
                    },
                    {
                        title: "单价(元)",
                        key: "f"
                    },
                    {
                        title: "采购数量",
                        key: "g"
                    },
                    {
                        title: "预算金额(元)",
                        key: "h"
                    },
                    {
                        title: "备注",
                        key: "i"
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
                    a:'00202',
                    b:'建设工程',
                    d: '否',
                    e:'个',
                    f:'123.00',
                    g:'12',
                    h:'1476.00'
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
