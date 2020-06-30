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
                    <div class="head-name">固定资产新增</div>
                    <span></span>
                    <a @click="close" class="window-close">
                        <Icon type="ios-close" size="31" class="ivu-icon-ios-close"/>
                    </a>
                </div>
            </div>

            <Card>
                <Row type="flex" justify="space-between" :gutter="32">
                    <Col span="24" style="border-right: 1px solid rgba(233, 232, 233, 0.6);">
                        <Form ref="form" :model="assets" :label-width="120" :rules="formValidate">
                            <h4 class="h4-title">资产基本信息</h4>
                            <Row :gutter="32">
                                <Col span="12">
                                    <FormItem label="资产编号" prop="code">
                                        <Input v-model="assets.code" style="width: 320px"/>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="资产财务分类" prop="acategory">
                                        <Input v-model="assets.acategory" style="width: 320px"/>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="资产字典" prop="dictionary">
                                        <Input v-model="assets.dictionary" style="width: 320px">
                                            <Button slot="append" icon="ios-bookmarks"></Button>
                                        </Input>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="资产名称" prop="name">
                                        <Input v-model="assets.name" style="width: 320px"/>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="品牌" prop="brand">
                                        <Input v-model="assets.brand" style="width: 320px"/>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="规格型号" prop="model">
                                        <Input v-model="assets.model" style="width: 320px"/>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="计量单位" prop="uom">
                                        <Input v-model="assets.uom" style="width: 320px"/>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="数量" prop="qty">
                                        <Input v-model="assets.qty" style="width: 320px"/>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="取得方式" prop="method">
                                        <Select v-model="assets.method" placeholder="请选择" style="width: 320px">
                                            <Option :value="buy" selected="selected">购入</Option>
                                        </Select>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="取得日期" prop="acdate">
                                        <DatePicker
                                                v-model="assets.acdate"
                                                type="date"
                                                format="yyyy-MM-dd"
                                                clearable
                                                placeholder="取得日期"
                                                style="width: 320px"></DatePicker>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="归属部门" prop="department">
                                        <Input v-model="assets.department" style="width: 320px">
                                            <Button slot="append" icon="ios-bookmarks"></Button>
                                        </Input>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="责任人" prop="handler">
                                        <Input v-model="assets.handler" style="width: 320px">
                                            <Button slot="append" icon="ios-person"></Button>
                                        </Input>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="启用日期" prop="stdate">
                                        <DatePicker
                                                v-model="assets.stdate"
                                                type="date"
                                                format="yyyy-MM-dd"
                                                clearable
                                                placeholder="启用日期"
                                                style="width: 320px"></DatePicker>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="使用状态" prop="ustate">
                                        <Select v-model="assets.ustate" placeholder="请选择" style="width: 320px">
                                            <Option :value="using">使用中</Option>
                                        </Select>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="使用部门" prop="udepartment">
                                        <Input v-model="assets.udepartment" style="width: 320px">
                                            <Button slot="append" icon="ios-bookmarks"></Button>
                                        </Input>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="使用人" prop="uman">
                                        <Input v-model="assets.uman" style="width: 320px">
                                            <Button slot="append" icon="ios-person"></Button>
                                        </Input>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="使用方向" prop="udirection">
                                        <Select v-model="assets.udirection" placeholder="请选择" style="width: 320px">
                                            <Option :value="self">自用</Option>
                                        </Select>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="存放区域" prop="szone">
                                        <Select v-model="assets.szone" placeholder="请选择" style="width: 320px">
                                            <Option :value="0">请选择</Option>
                                        </Select>
                                    </FormItem>
                                </Col>
                                <Col span="24">
                                    <FormItem label="存放地点" prop="saddress">
                                        <Input v-model="assets.saddress" style="width: 320px"/>
                                    </FormItem>
                                </Col>
                                <Col span="24">
                                    <FormItem label="备注" prop="note">
                                        <Input type="textarea" v-model="assets.note" :rows="4"/>
                                    </FormItem>
                                </Col>
                            </Row>
                            <h4 class="h4-title">财务信息</h4>
                            <Row :gutter="32">
                                <Col span="12">
                                    <FormItem label="资金来源" prop="morigin">
                                        <Select v-model="assets.morigin" placeholder="请选择" style="width: 320px">
                                            <Option :value="0">请选择</Option>
                                        </Select>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="价值类型" prop="vtype">
                                        <Select v-model="assets.vtype" placeholder="请选择" style="width: 320px">
                                            <Option :value="market">市场价值</Option>
                                        </Select>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="资产原值(元)" prop="avalue">
                                        <Input v-model="assets.avalue" style="width: 320px"/>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="是否折旧" prop="depreciation">
                                        <Select v-model="assets.depreciation" placeholder="请选择" style="width: 320px">
                                            <Option :value="0">否</Option>
                                        </Select>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="折旧/摊销方法" prop="depmethod">
                                        <Select v-model="assets.depmethod" placeholder="请选择" style="width: 320px">
                                            <Option :value="avgyear">平均年限法</Option>
                                        </Select>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="折旧/摊销(月数)" prop="depmonth">
                                        <Input v-model="assets.depmonth" style="width: 320px"/>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="资产状态" prop="astate">
                                        <Select v-model="assets.astate" placeholder="请选择" style="width: 320px">
                                            <Option :value="0">请选择</Option>
                                        </Select>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="财政资金(元)" prop="ffunds">
                                        <Input v-model="assets.ffunds" style="width: 320px"/>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="入账人" prop="eman">
                                        <Input v-model="assets.eman" style="width: 320px">
                                            <Button slot="append" icon="ios-person"></Button>
                                        </Input>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="入账日期" prop="edate">
                                        <DatePicker
                                                v-model="assets.edate"
                                                type="date"
                                                format="yyyy-MM-dd"
                                                clearable
                                                placeholder="入账日期"
                                                style="width: 320px"></DatePicker>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="会计凭证号" prop="vouchercode">
                                        <Input v-model="assets.vouchercode" style="width: 320px"/>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="凭证日期" prop="voucherdate">
                                        <DatePicker
                                                v-model="assets.voucherdate"
                                                type="date"
                                                format="yyyy-MM-dd"
                                                clearable
                                                placeholder="凭证日期"
                                                style="width: 320px"></DatePicker>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="会计科目" prop="account">
                                        <Input v-model="assets.account" style="width: 320px">
                                            <Button slot="append" icon="ios-bookmarks"></Button>
                                        </Input>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="国库预算项目" prop="gkbudget">
                                        <Input v-model="assets.gkbudget" style="width: 320px">
                                            <Button slot="append" icon="ios-bookmarks"></Button>
                                        </Input>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="国库编码" prop="gkcode">
                                        <Input v-model="assets.gkcode" style="width: 320px"/>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="国标码" prop="gbcode">
                                        <Input v-model="assets.gbcode" style="width: 320px"/>
                                    </FormItem>
                                </Col>
                            </Row>
                            <Form-item class="br">
                                <Button @click="handleSubmit" :loading="submitLoading" type="primary">
                                    保存
                                </Button>
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
        name: "gudingzichan-add",
        data() {
            return {
                submitLoading: false, // 表单提交状态
                assets: {
                    id: "", name: "", qty: 1, method: "buy"
                },
                // 表单验证规则
                formValidate: {
                    name: [{required: true, message: "不能为空", trigger: "blur"}]
                }
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
