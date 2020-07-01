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
                    <div class="head-name">支出事项配置</div>
                    <span></span>
                    <a @click="close" class="window-close">
                        <Icon type="ios-close" size="31" class="ivu-icon-ios-close"/>
                    </a>
                </div>
            </div>

            <Card>
                <Row type="flex" justify="space-between" :gutter="32">
                    <Col span="24" style="border-right: 1px solid rgba(233, 232, 233, 0.6);">
                        <Form ref="form" :model="form" :label-width="120">
                            <Table
                                    style="margin-bottom: 20px"
                                    size="small"
                                    :loading="loading"
                                    border
                                    :columns="columns"
                                    :data="data"
                                    sortable="custom"
                                    @on-sort-change="changeSort"
                                    @on-selection-change="showSelect"
                                    ref="table">
                            </Table>
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
                        <!--                        <Row type="flex" justify="end" class="page" style="margin-top: 20px">-->
                        <!--                            <Page-->
                        <!--                                    :current="searchForm.pageNumber"-->
                        <!--                                    :total="total"-->
                        <!--                                    :page-size="searchForm.pageSize"-->
                        <!--                                    @on-change="changePage"-->
                        <!--                                    @on-page-size-change="changePageSize"-->
                        <!--                                    :page-size-opts="[15,20,50]"-->
                        <!--                                    size="small"-->
                        <!--                                    show-total-->
                        <!--                                    show-elevator-->
                        <!--                                    show-sizer-->
                        <!--                            ></Page>-->
                        <!--                        </Row>-->
                    </Col>
                </Row>
            </Card>
        </Card>
    </div>
</template>

<script>
    const data = [{
        "ID": "1001010101",
        "PAY_ITEM_CODE": "1001010101",
        "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919183429h0hkmadbll",
        "PAY_ITEM_NAME": "岗位工资",
        "IS_MANAGE_DEPT_DECLARE": "1",
        "PAY_ITEM_DESC": null,
        "MANAGE_DEPT_NAME": "院办",
        "SELECTED_ID": "00000000000000000000000000000020200601122239430803v18t0av3hk",
        "PARENT_NAME": "全国工资",
        "DATA_SELECTED": "00000000000000000000000000000020200601122239430803v18t0av3hk"
    },
        {
            "ID": "1001010102",
            "PAY_ITEM_CODE": "1001010102",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919183429h0hkmadbll",
            "PAY_ITEM_NAME": "薪级工资",
            "IS_MANAGE_DEPT_DECLARE": "1",
            "PAY_ITEM_DESC": null,
            "MANAGE_DEPT_NAME": "院办",
            "SELECTED_ID": "000000000000000000000000000000202006011222394249605fn865o7ml",
            "PARENT_NAME": "全国工资",
            "DATA_SELECTED": "000000000000000000000000000000202006011222394249605fn865o7ml"
        },
        {
            "ID": "1001010201",
            "PAY_ITEM_CODE": "1001010201",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919183429h0hkmadbll",
            "PAY_ITEM_NAME": "特区津贴",
            "IS_MANAGE_DEPT_DECLARE": "1",
            "PAY_ITEM_DESC": null,
            "MANAGE_DEPT_NAME": "院办",
            "SELECTED_ID": "00000000000000000000000000000020200601122239511705mkwbc3f5co",
            "PARENT_NAME": "基础性绩效工资",
            "DATA_SELECTED": "00000000000000000000000000000020200601122239511705mkwbc3f5co"
        }];
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
                data: data,
                columns: [
                    {
                        type: "selection",
                        width: 60,
                        align: "center",
                        fixed: "left"
                    },
                    {
                        title: "预算事项编码",
                        key: "PAY_ITEM_CODE",
                        minWidth: 120
                    },
                    {
                        title: "预算事项名称",
                        key: "PAY_ITEM_NAME",
                        minWidth: 120
                    },
                    {
                        title: "上级预算事项",
                        key: "PARENT_NAME",
                        minWidth: 120
                    },
                    {
                        title: "归口代编",
                        key: "IS_MANAGE_DEPT_DECLARE",
                        minWidth: 120
                    },
                    {
                        title: "归口管理部门",
                        key: "MANAGE_DEPT_NAME",
                        minWidth: 120
                    },
                    {
                        title: "事项定义",
                        key: "PAY_ITEM_DESC",
                        minWidth: 120
                    },
                ],
                columns2: [
                    {
                        title: "附件类型",
                        key: "title",
                        minWidth: 150
                    },
                    {
                        title: "文件名",
                        key: "value"
                    },
                    {
                        title: "操作",
                        key: "value",
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
