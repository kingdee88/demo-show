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
                    <div class="head-name">新增油卡加油</div>
                    <span></span>
                    <a @click="close" class="window-close">
                        <Icon type="ios-close" size="31" class="ivu-icon-ios-close"/>
                    </a>
                </div>
            </div>

            <Card>
                <Row type="flex" justify="space-between" :gutter="32">
                    <Col :xl="24" style="border-right: 1px solid rgba(233, 232, 233, 0.6);">
                        <Form ref="form" :model="form" :label-width="140" :rules="formValidate">
                            <h4 class="h4-title">申请信息</h4>
                            <Row :gutter="32">
                                <Col span="12">
                                    <FormItem label="车辆：" prop="name">
                                        <Select
                                                v-model="form.car"
                                                placeholder="选择车辆"
                                                clearable
                                                style="width: 320px"
                                        >
                                            <Option value="0">琼AA2765B</Option>
                                            <Option value="1">琼AD6774C</Option>
                                            <Option value="2">琼A61347E</Option>
                                        </Select>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="加油卡号：" prop="name">
                                        <Input v-model="form.sa" style="width: 320px">
                                            <Button slot="append" icon="ios-bookmarks"></Button>
                                        </Input>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="司机：" prop="name">
                                        <Select
                                                v-model="form.car"
                                                placeholder="选择司机"
                                                clearable
                                                style="width: 320px"
                                        >
                                            <Option value="0">赵强</Option>
                                            <Option value="1">连长熊</Option>
                                        </Select>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="加油量：" prop="name">
                                        <Input v-model="form.sd" style="width: 320px">
                                            <Button slot="append" icon="ios-bookmarks"></Button>
                                        </Input>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="单价：" prop="name">
                                        <Input v-model="form.sx" style="width: 320px">
                                            <Button slot="append" icon="ios-bookmarks"></Button>
                                        </Input>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="总价(元)：" prop="name">
                                        <Input v-model="form.se" style="width: 320px">
                                            <Button slot="append" icon="ios-bookmarks"></Button>
                                        </Input>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="加油后里程：" prop="name">
                                        <Input v-model="form.as" style="width: 320px">
                                            <Button slot="append" icon="ios-bookmarks"></Button>
                                        </Input>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="上次机油后里程：" prop="name">
                                        <Input v-model="form.lc" style="width: 320px">
                                            <Button slot="append" icon="ios-bookmarks"></Button>
                                        </Input>
                                    </FormItem>
                                </Col>
                            </Row>
                            <h4 class="h4-title">公务用车申请单</h4>
                            <Table
                                    style="margin-bottom: 20px"
                                    border
                                    :columns="columns"
                                    :data="data"
                                    sortable="custom"
                                    ref="table"
                            ></Table>
                            <Form-item class="br">
                                <Button
                                        @click="handleSubmit"
                                        :loading="submitLoading"
                                        type="primary"
                                >保存
                                </Button>
                                <Button @click="handleReset">重置</Button>
                                <Button type="dashed" @click="close">关闭</Button>
                            </Form-item>
                        </Form>
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
                form: {
                    id: "",
                    name: ""
                },
                // 表单验证规则
                formValidate: {
                    name: [{required: true, message: "不能为空", trigger: "blur"}]
                },
                data: [{
                    a: 'CC20200626001',
                    b: '未绑定加油记录',
                    c: '赵强',
                    d: '海口',
                    e: '儋州',
                    f: '2020年6月27日',
                    g: '2020年6月27日'
                }],
                columns: [
                    {
                        title: '请选择',
                        align: 'center',
                        key: 'checkBox',
                        width: 80,
                        render: (h, params) => {
                            let _self = this;
                            return h('div', [
                                h('Checkbox', {
                                    props: {
                                        value: params.row.checkBox
                                    },
                                    on: {
                                        'on-change': (e)=> {
                                            if (e == false) {
                                                _self.disabled = true
                                            }
                                            _self.data.forEach((items) => {  //先取消所有对象的勾选，checkBox设置为false
                                                _self.$set(items, 'checkBox', false)
                                            });
                                            _self.data[params.index].checkBox = e;  //再将勾选的对象的checkBox设置为true
                                        }
                                    }
                                })
                            ])
                        }
                    },
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
                        title: "司机",
                        key: "c",
                        width: 150
                    },
                    {
                        title: "出发地",
                        key: "d",
                        width: 150
                    },
                    {
                        title: "目的地",
                        key: "e",
                        width: 150
                    },
                    {
                        title: "出发事件",
                        key: "f",
                        width: 150
                    },
                    {
                        title: "返回时间",
                        key: "g",
                        width: 150
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
