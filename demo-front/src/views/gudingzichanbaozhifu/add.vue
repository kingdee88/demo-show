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
                    <div class="head-name">固定资产维保支付</div>
                    <span></span>
                    <a @click="close" class="window-close">
                        <Icon type="ios-close" size="31" class="ivu-icon-ios-close"/>
                    </a>
                </div>
            </div>

            <Card>
                <Row type="flex" justify="space-between" :gutter="32">
                    <Col span="24" style="border-right: 1px solid rgba(233, 232, 233, 0.6);">
                        <Form ref="form" :model="apply" :label-width="120" :rules="formValidate">
                            <h4 class="h4-title">基本信息</h4>
                            <Row :gutter="32">
                                <Col span="24">
                                    <FormItem label="申请单号" prop="name">
                                        <Input v-model="apply.name" style="width: 320px; margin-right: 10px;"/>
                                        <Button type="primary" @click="selectApply">选择</Button>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="资产类型" prop="atype">
                                        <RadioGroup v-model="apply.atype">
                                            <Radio :label="1" disabled>一般资产维保</Radio>
                                            <Radio :label="2" disabled>车辆维保</Radio>
                                        </RadioGroup>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="登记日期" prop="checktime">
                                        <Input v-model="apply.checktime" style="width: 320px"/>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="登记人" prop="checkuser">
                                        <Input v-model="apply.checkuser" style="width: 320px" readonly/>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="登记部门" prop="cdepartment">
                                        <Input v-model="apply.cdepartment" style="width: 320px" readonly/>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="维保资产" prop="manasset">
                                        <Input v-model="apply.manasset" style="width: 320px" readonly/>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="维保类型" prop="mantype">
                                        <Select v-model="apply.mantype" placeholder="请选择" style="width: 320px" disabled>
                                            <Option v-if="apply.atype==2" :value="10">更换机油</Option>
                                            <Option v-if="apply.atype==2" :value="11">更换轮胎</Option>
                                            <Option v-if="apply.atype==2" :value="12">洗车</Option>
                                            <Option v-if="apply.atype==2" :value="13">其他</Option>
                                            <Option v-if="apply.atype==1" :value="20">设备维护保养</Option>
                                        </Select>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="维保时间" prop="mantime">
                                        <DatePicker
                                                v-model="apply.mantime"
                                                type="date"
                                                format="yyyy-MM-dd"
                                                clearable
                                                placeholder="维保时间"
                                                style="width: 320px" disabled></DatePicker>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="供应商" prop="supplier">
                                        <Input v-model="apply.supplier" style="width: 320px" readonly>
                                            <Button slot="append" icon="ios-bookmarks"></Button>
                                        </Input>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="维护人" prop="manuser">
                                        <Input v-model="apply.manuser" style="width: 320px" readonly/>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="联系电话" prop="manmobile">
                                        <Input v-model="apply.manmobile" style="width: 320px" readonly/>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="预算指标" prop="bindex">
                                        <Select v-model="apply.bindex" placeholder="请选择" style="width: 320px" disabled>
                                            <Option :value="1">固定资产维保</Option>
                                        </Select>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="指标可用金额(元)" prop="ibalance">
                                        <Input v-model="apply.ibalance" style="width: 320px" readonly/>
                                    </FormItem>
                                </Col>
                                <Col span="24">
                                    <FormItem label="预估金额(元)" prop="pamount">
                                        <Input v-model="apply.pamount" style="width: 320px" readonly/>
                                    </FormItem>
                                </Col>
                                <Col span="12" v-if="apply.mantype==10 || apply.mantype==11">
                                    <FormItem label="当前公里数" prop="ckmeter">
                                        <Input v-model="apply.ckmeter" style="width: 320px" readonly/>
                                    </FormItem>
                                </Col>
                                <Col span="12" v-if="apply.mantype==10 || apply.mantype==11">
                                    <FormItem label="上次公里数" prop="lkmeter">
                                        <Input v-model="apply.lkmeter" style="width: 320px" readonly/>
                                    </FormItem>
                                </Col>
                                <Col span="24">
                                    <FormItem label="确认金额" prop="camount">
                                        <Input v-model="apply.camount" style="width: 320px"/>
                                    </FormItem>
                                </Col>
                            </Row>
                            <h4 class="h4-title">结算信息</h4>
                            <Row :gutter="32">
                                <Col span="12">
                                    <FormItem label="结算方式" prop="settlement">
                                        <Select v-model="apply.settlement" placeholder="请选择" style="width: 320px">
                                            <Option :value="1">现金</Option>
                                            <Option :value="2">支票</Option>
                                            <Option :value="3">公务卡</Option>
                                            <Option :value="4">网银转账</Option>
                                        </Select>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="是否含电子发票" prop="einvoice">
                                        <RadioGroup v-model="apply.einvoice">
                                            <Radio :label="0">否</Radio>
                                            <Radio :label="1">是</Radio>
                                        </RadioGroup>
                                    </FormItem>
                                </Col>
                                <Col span="24">
                                    <FormItem label="发票数量" prop="inumber">
                                        <Input v-model="apply.inumber" style="width: 320px"/>
                                    </FormItem>
                                </Col>
                                <Col span="24">
                                    <FormItem label="支付说明" prop="pdescription">
                                        <Input type="textarea" v-model="apply.pdescription" :rows="4" />
                                    </FormItem>
                                </Col>
                            </Row>
                            <div class="table" style="margin-bottom: 20px">
                                <Button class="button" @click="addTable" style="margin-bottom: 15px" type="primary">新增</Button>
                                <Table :columns="columns1" :data="datas" class="table-fixbug"></Table>
                            </div>
                            <Form-item class="br">
                                <Button type="dashed" @click="close">取消</Button>
                                <Button @click="handleSubmit" :loading="submitLoading" type="primary">
                                    送审
                                </Button>
                            </Form-item>
                        </Form>
                    </Col>
                </Row>
            </Card>
        </Card>
        <Modal title="维保申请单" v-model="applyModel" :styles="{top: '20px', width: '1000px'}">
            <Table border
                   :columns="columns"
                   :data="data"
                   width="960"
                   sortable="custom"
                   ref="table">
                <template slot-scope="{ row, index }" slot="action">
                    <Button type="primary" size="small" style="margin-right: 5px" @click="actionSelect()">
                        选择
                    </Button>
                </template>
            </Table>
            <p slot="footer"></p>
        </Modal>
    </div>
</template>

<script>
    export default {
        name: "add",
        data() {
            return {
                submitLoading: false, // 表单提交状态
                apply: {},
                applyModel: false,
                data: [{
                    manasset: '琼AA2765B', mantype: '更换机油', mantime: '2020-06-12',
                    manuser: 'test1', manmobile: '13109908777', pamount: '980'
                }],
                columns: [
                    {title: "维保资产", key: "manasset"},
                    {title: "维保类型", key: "mantype"},
                    {title: "维保时间", key: "mantime"},
                    {title: "维护人", key: "manuser"},
                    {title: "联系电话", key: "manmobile"},
                    {title: "预估金额(元)", key: "pamount"},
                    {title: '操作', slot: 'action', width: 150, align: 'center'}
                ],
                columns1: [
                    {
                        title: "发票类型",
                        key: "name",
                        render: (h, { row, index }) => {
                            return h("Input", {
                                props: {
                                    value: row.name
                                },
                                on: {
                                    input: val => {
                                        this.data[index].name = val;
                                    }
                                }
                            });
                        }
                    },
                    {
                        title: "发票代码",
                        key: "hobby",
                        render: (h, { row, index }) => {
                            return h("Input", {
                                props: {
                                    value: row.hobby
                                },
                                on: {
                                    input: val => {
                                        this.data[index].hobby = val;
                                    }
                                }
                            });
                        }
                    },
                    {
                        title: "发票号码",
                        key: "job",
                        render: (h, { row, index }) => {
                            return h("Input", {
                                props: {
                                    value: row.job
                                },
                                on: {
                                    input: val => {
                                        this.data[index].job = val;
                                    }
                                }
                            });
                        }
                    },
                    {
                        title: "发票金额(元)",
                        key: "sss",
                        render: (h, { row, index }) => {
                            return h("Input", {
                                props: {
                                    value: row.sss
                                },
                                on: {
                                    input: val => {
                                        this.data[index].sss = val;
                                    }
                                }
                            });
                        }
                    },
                    {
                        title: "附件",
                        key: "operation",
                        render: (h, { row, index }) => {
                            return h(
                                "Button",
                                {
                                    props: {
                                        icon: 'ios-cloud-upload-outline'
                                    },
                                },
                                "上传附件"
                            );
                        }
                    },
                    {
                        title: "操作",
                        key: "operation",
                        render: (h, { row, index }) => {
                            return h(
                                "a",
                                {
                                    on: {
                                        click: () => {
                                            this.data.splice(index, 1);
                                        }
                                    }
                                },
                                "删除"
                            );
                        }
                    }
                ],
                datas: [
                    {
                        name: "",
                        hobby: "",
                        job: ""
                    }
                ],
                options:['电影','游戏','看书']
            };
        },
        methods: {
            init() {
            },
            addTable() {
                const addData = {
                    name: "",
                    hobby: "",
                    job: ""
                };
                this.datas.push(addData);
            },
            handleReset() {
                this.$refs.form.resetFields();
            },
            handleSubmit() {
                /*this.$refs.form.validate(valid => {
                    if (valid) {
                        // 模拟成功
                        this.submitLoading = false;
                        this.$Message.success("添加成功");
                        this.submited();
                    }
                });*/
                this.submitLoading = false;
                this.submited();
            },
            close() {
                this.$emit("close", true);
            },
            submited() {
                this.$emit("submited", true);
            },
            selectApply(){
                this.applyModel = true;
            },
            actionSelect() {
                this.applyModel = false;
                this.apply = {
                    atype: 2, checkuser: 'test1', cdepartment: '部门1',
                    manasset: '琼AA2765B', mantype: 10, mantime: '2020-06-12',
                    supplier: '大陆保养店', manuser: 'test1', manmobile: '13109908777', pamount: '980',
                    bindex: 1, ibalance: 256489, ckmeter: 23378, lkmeter: 13579, camount: 968
                };
            }
        },
        mounted() {
            this.init();
        }
    };
</script>
