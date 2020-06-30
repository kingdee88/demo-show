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
                    <div class="head-name">详情</div>
                    <span></span>
                    <a @click="close" class="window-close">
                        <Icon type="ios-close" size="31" class="ivu-icon-ios-close"/>
                    </a>
                </div>
            </div>
            <Card class="detail-app">
                <Row type="flex" justify="space-between" :gutter="32">
                    <Col :xl="24" style="border-right: 1px solid rgba(233, 232, 233, 0.6);">
                        <Form ref="form" :model="form" :label-width="120" :rules="formValidate">
                            <h4 class="h4-title">基本信息</h4>
                            <Row :gutter="32">
                                <Col span="12">
                                    <FormItem label="车牌号：" prop="name">
                                        {{form.a}}
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="月份：" prop="name">
                                        2020年6月
                                    </FormItem>
                                </Col>
                            </Row>
                            <h4 class="h4-title">公务用车申请单</h4>
                            <Table
                                    style="margin-bottom: 20px"
                                    border
                                    :columns="columns"
                                    :data="datas"
                                    sortable="custom"
                                    ref="table"
                            >
                            </Table>
                            <Row :gutter="32">
                                <Col span="4">
                                    <FormItem label="月初里程：" prop="name">
                                        39801
                                    </FormItem>
                                </Col>
                                <Col span="4">
                                    <FormItem label="月末里程：" prop="name">
                                        40757
                                    </FormItem>
                                </Col>
                                <Col span="4">
                                    <FormItem label="行驶里程：" prop="name">
                                        956
                                    </FormItem>
                                </Col>
                                <Col span="4">
                                    <FormItem label="加油次数：" prop="name">
                                        3
                                    </FormItem>
                                </Col>
                                <Col span="4">
                                    <FormItem label="加油合计：" prop="name">
                                        93
                                    </FormItem>
                                </Col>
                                <Col span="4">
                                    <FormItem label="平均油耗：" prop="name">
                                        9.7
                                    </FormItem>
                                </Col>
                            </Row>
                        </Form>
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
                    a: 'sq20200617002',
                    b: '已绑定加油记录',
                    c: 1,
                    d: 49,
                    e: 521,
                    f: 40322,
                    g: '赵强',
                    h: '海口',
                    i: '儋州',
                    j: '2020年6月19日',
                    k: '2020年6月19日'
                },
                    {
                        a: 'sq20200619005',
                        b: '已绑定加油记录',
                        c: 1,
                        d: 17,
                        e: 156,
                        f: 40478,
                        g: '赵强',
                        h: '海口',
                        i: '儋州',
                        j: '2020年6月22日',
                        k: '2020年6月22日'
                    },
                    {
                        a: 'sq20200621002',
                        b: '未绑定加油记录',
                        c: 1,
                        d: 27,
                        e: 279,
                        f: 40757,
                        g: '赵强',
                        h: '海口',
                        i: '海口东站',
                        j: '2020年6月23日',
                        k: '2020年6月23日'
                    }],
                columns: [
                    {
                        title: "申请单号",
                        key: "a",
                        minWidth: 150
                    },
                    {
                        title: "状态",
                        key: "b",
                        width: 150
                    },
                    {
                        title: "加油次数",
                        key: "c",
                        width: 150
                    },
                    {
                        title: "加油量",
                        key: "d"
                    },
                    {
                        title: "行驶里程",
                        key: "e"
                    },
                    {
                        title: "加油后里程",
                        key: "f"
                    },
                    {
                        title: "司机",
                        key: "g"
                    },
                    {
                        title: "出发地",
                        key: "h"
                    }, {
                        title: "目的地",
                        key: "i"
                    },
                    {
                        title: "出发时间",
                        key: "j",
                        tooltip: true
                    },
                    {
                        title: "返回时间",
                        key: "k",
                        tooltip: true
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
