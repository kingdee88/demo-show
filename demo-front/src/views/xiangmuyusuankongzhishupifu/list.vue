<style lang="less">
    @import "../../styles/table-common.less";
</style>
<template>
    <div class="search">
        <Card>
            <Row
                    v-show="openSearch"
                    @keydown.enter.native="handleSearch"
            >
                <div style="display: flex;justify-content: space-between;">
                    <Form>
                        <Form-item class="br" label="">
                            <Button icon="md-refresh">刷新</Button>
                        </Form-item>
                    </Form>
                    <Form
                            ref="searchForm"
                            :model="searchForm"
                            inline
                            :label-width="70"
                    >
                        <Form-item
                                label="预算年度"
                                prop="sex"
                        >
                            <Select
                                    v-model="searchForm.year"
                                    placeholder="预算年度"
                                    clearable
                                    style="width: 200px"
                            >
                                <Option value="0">2020</Option>
                                <Option value="1">2019</Option>
                                <Option value="2">2020</Option>
                            </Select>
                        </Form-item>
                        <Form-item
                                style="margin-left:-35px;"
                                class="br"
                        >
                            <Button
                                    @click="handleSearch"
                                    type="primary"
                                    icon="ios-search"
                            >搜索
                            </Button>
                            <Button @click="handleReset">重置</Button>
                            <Button icon="md-refresh">刷新</Button>
                        </Form-item>
                    </Form>
                </div>
            </Row>
            <!--      <Row class="operation">
                    <Button
                      @click="add"
                      type="primary"
                      icon="md-add"
                    >添加</Button>
                    <Button
                      @click="delAll"
                      icon="md-trash"
                    >批量删除</Button>
                    <Button
                      type="dashed"
                      @click="openSearch=!openSearch"
                    >{{openSearch ? "关闭搜索" : "开启搜索"}}</Button>
                   &lt;!&ndash; <Button
                      type="dashed"
                      @click="openTip=!openTip"
                    >{{openTip ? "关闭提示" : "开启提示"}}</Button>&ndash;&gt;
                  </Row>-->
            <Row v-show="openTip">
                <Alert show-icon>
                    已选择
                    <span class="select-count">{{selectCount}}</span> 项
                    <a
                            class="select-clear"
                            @click="clearSelectAll"
                    >清空</a>
                </Alert>
            </Row>
            <Row>
                <Table
                        row-key="ID"
                        :loading="loading"
                        border
                        :columns="columns"
                        :data="data"
                        sortable="custom"
                        ref="table"
                >
                </Table>
            </Row>
        </Card>
        <Modal
                :title="modalTitle"
                v-model="depModalVisible"
                :mask-closable="false"
                :width="500"
                class="depModal"
        >
            <Form :label-width="85">
                <FormItem label="确认状态">
                    <Select v-model="dataType" transfer>
                        <Option :value="0">同意</Option>
                        <Option :value="1">驳回</Option>
                        <Option :value="2">否决</Option>
                    </Select>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button type="text" @click="depModalVisible=false">取消</Button>
                <Button type="primary" @click="depModalVisible=false">提交</Button>
            </div>
        </Modal>

        <Modal
                v-model="modalExportAll"
                title="确认导出"
                :loading="loadingExport"
                @on-ok="exportAll"
        >
            <p>您确认要导出全部 {{total}} 条数据？</p>
        </Modal>

        <check-password
                ref="checkPass"
                @on-success="resetPass"
        />
    </div>
</template>

<script>
    import {
        getUserListData,
        enableUser,
        disableUser,
        deleteUser,
        getAllUserData,
        resetUserPass
    } from "@/api/index";
    import util from "@/libs/util.js";
    import departmentChoose from "../my-components/xboot/department-choose";
    import checkPassword from "@/views/my-components/xboot/check-password";

    const data = [
        {
            "ID": "0000000000000000000000000000002020060214401873467802cv0joclk",
            "PROJECT_ID": "0000000000000000000000000000002020051312494336632743sf4kbq5h",
            "BUDGET_AMOUNT": 1000.0,
            "APPROVAL_AMOUNT": 0.0,
            "AUDITING_RESULT": "1",
            "APPROVAL_RESULT": null,
            "PROJECT_CODE": "P-20200513-0504",
            "PROJECT_NAME": "项目tese",
            "BEGIN_YEAR": 2018,
            "APPLY_DEPT_ID": "00000000000000000000000000000020171120183917350kf63167aospmi",
            "APPLY_USER_ID": "00000000000000000000000000000020190527094928770987mi865bt6fo",
            "APPLY_USER_NAME": "刘拾辉",
            "APPLY_DEPT_NAME": "组织人事处（老干处）"
        },
        {
            "ID": "00000000000000000000000000000020200602144018734673s21ci3rwio",
            "PROJECT_ID": "000000000000000000000000000000202005111931144078961uqnewwepm",
            "BUDGET_AMOUNT": 100.0,
            "APPROVAL_AMOUNT": 0.0,
            "AUDITING_RESULT": "1",
            "APPROVAL_RESULT": null,
            "PROJECT_CODE": "P-20200511-0503",
            "PROJECT_NAME": "123",
            "BEGIN_YEAR": 2018,
            "APPLY_DEPT_ID": "00000000000000000000000000000020171120183918329shwh56d7wl9bj",
            "APPLY_USER_ID": "000000000000000000000000000000201711281623510600aj4l6r5ls0vj",
            "APPLY_USER_NAME": "config",
            "APPLY_DEPT_NAME": "秘书处"
        },
        {
            "ID": "000000000000000000000000000000202006021440187346687l44rb4anm",
            "PROJECT_ID": "00000000000000000000000000000020191112165937028700ms4pw9t60i",
            "BUDGET_AMOUNT": 600.0,
            "APPROVAL_AMOUNT": 0.0,
            "AUDITING_RESULT": "1",
            "APPROVAL_RESULT": null,
            "PROJECT_CODE": "P-20191112-0501",
            "PROJECT_NAME": "xx项目",
            "BEGIN_YEAR": 2018,
            "APPLY_DEPT_ID": "0000000000000000000000000000002017112018391787987fwp711ns2ih",
            "APPLY_USER_ID": "000000000000000000000000000000201806281223358542duhvhnl6o26o",
            "APPLY_USER_NAME": "kwj",
            "APPLY_DEPT_NAME": "行政后勤处"
        },
        {
            "ID": "0000000000000000000000000000002020060214401873466293sbja62ih",
            "PROJECT_ID": "000000000000000000000000000000201904171003173906365h58om38nn",
            "BUDGET_AMOUNT": 12.0,
            "APPROVAL_AMOUNT": 0.0,
            "AUDITING_RESULT": "1",
            "APPROVAL_RESULT": null,
            "PROJECT_CODE": "P-20190417-0499",
            "PROJECT_NAME": "测试6666",
            "BEGIN_YEAR": 2018,
            "APPLY_DEPT_ID": "0000000000000000000000000000002017112018391787987fwp711ns2ih",
            "APPLY_USER_ID": "000000000000000000000000000000201806281223358542duhvhnl6o26o",
            "APPLY_USER_NAME": "kwj",
            "APPLY_DEPT_NAME": "行政后勤处"
        },
        {
            "ID": "000000000000000000000000000000202006021440187346444eln3ram1k",
            "PROJECT_ID": "00000000000000000000000000000020190329160236839938sqefjh7anm",
            "BUDGET_AMOUNT": 110000.0,
            "APPROVAL_AMOUNT": 0.0,
            "AUDITING_RESULT": "1",
            "APPROVAL_RESULT": null,
            "PROJECT_CODE": "P-20190329-0498",
            "PROJECT_NAME": "专用设备购置项目",
            "BEGIN_YEAR": 2018,
            "APPLY_DEPT_ID": "00000000000000000000000000000020171120183919207nenuanrpjih7n",
            "APPLY_USER_ID": "00000000000000000000000000000020171120184041954mp7t7jlmkbpoj",
            "APPLY_USER_NAME": "何葵",
            "APPLY_DEPT_NAME": "行政后勤处"
        },
        {
            "ID": "00000000000000000000000000000020200602144018734638fukwtdmojo",
            "PROJECT_ID": "00000000000000000000000000000020190215174537268685squ17j16rn",
            "BUDGET_AMOUNT": 1000.0,
            "APPROVAL_AMOUNT": 0.0,
            "AUDITING_RESULT": "1",
            "APPROVAL_RESULT": null,
            "PROJECT_CODE": "P-20190215-0497",
            "PROJECT_NAME": "污水处理池",
            "BEGIN_YEAR": 2018,
            "APPLY_DEPT_ID": "00000000000000000000000000000020171120183919207nenuanrpjih7n",
            "APPLY_USER_ID": "00000000000000000000000000000020171120184041954mp7t7jlmkbpoj",
            "APPLY_USER_NAME": "何葵",
            "APPLY_DEPT_NAME": "行政后勤处"
        },
        {
            "ID": "00000000000000000000000000000020200602144018734633tavua9904j",
            "PROJECT_ID": "00000000000000000000000000000020190213165340124989c5pdq4s0hi",
            "BUDGET_AMOUNT": 111.0,
            "APPROVAL_AMOUNT": 0.0,
            "AUDITING_RESULT": "1",
            "APPROVAL_RESULT": null,
            "PROJECT_CODE": "P-20190213-0496",
            "PROJECT_NAME": "test",
            "BEGIN_YEAR": 2018,
            "APPLY_DEPT_ID": "00000000000000000000000000000020171120183919207nenuanrpjih7n",
            "APPLY_USER_ID": "00000000000000000000000000000020171120184041954mp7t7jlmkbpoj",
            "APPLY_USER_NAME": "何葵",
            "APPLY_DEPT_NAME": "行政后勤处"
        },
        {
            "ID": "00000000000000000000000000000020200602144018734628aobkl4lvqk",
            "PROJECT_ID": "000000000000000000000000000000201811272221063220426woo15mksl",
            "BUDGET_AMOUNT": 400.0,
            "APPROVAL_AMOUNT": 0.0,
            "AUDITING_RESULT": "1",
            "APPROVAL_RESULT": null,
            "PROJECT_CODE": "P-20181127-0494",
            "PROJECT_NAME": "业务工作经费",
            "BEGIN_YEAR": 2018,
            "APPLY_DEPT_ID": "00000000000000000000000000000020171120183919183429h0hkmadbll",
            "APPLY_USER_ID": "000000000000000000000000000000201806281223358542duhvhnl6o26o",
            "APPLY_USER_NAME": "kwj",
            "APPLY_DEPT_NAME": "院办"
        },
        {
            "ID": "00000000000000000000000000000020200602144018734622kb5u47p5pn",
            "PROJECT_ID": "00000000000000000000000000000020181123090407145164d5ijcctu6n",
            "BUDGET_AMOUNT": 700000.0,
            "APPROVAL_AMOUNT": 0.0,
            "AUDITING_RESULT": "1",
            "APPROVAL_RESULT": null,
            "PROJECT_CODE": "P-20181123-0493",
            "PROJECT_NAME": "2018医管局科研经费",
            "BEGIN_YEAR": 2018,
            "APPLY_DEPT_ID": "00000000000000000000000000000020171120183919675akkpj0e2p664k",
            "APPLY_USER_ID": "000000000000000000000000000000201711281623510600aj4l6r5ls0vj",
            "APPLY_USER_NAME": "config",
            "APPLY_DEPT_NAME": "财务科"
        },
        {
            "ID": "00000000000000000000000000000020200602144018734618foau9sns8l",
            "PROJECT_ID": "0000000000000000000000000000002018091419352036565788bn8fd5dj",
            "BUDGET_AMOUNT": 100.0,
            "APPROVAL_AMOUNT": 0.0,
            "AUDITING_RESULT": "1",
            "APPROVAL_RESULT": null,
            "PROJECT_CODE": "0101010303",
            "PROJECT_NAME": "test当当当当当当当",
            "BEGIN_YEAR": 2018,
            "APPLY_DEPT_ID": "00000000000000000000000000000020171120183917435v7uhfl89h3f8h",
            "APPLY_USER_ID": "00000000000000000000000000000020171120184044001fnalnb0t534an",
            "APPLY_USER_NAME": "赵文",
            "APPLY_DEPT_NAME": "秘书处"
        },
        {
            "ID": "000000000000000000000000000000202006021440187346127lw0q4wuoi",
            "PROJECT_ID": "00000000000000000000000000000020180720094439984rn9f4dsu3r03i",
            "BUDGET_AMOUNT": 800.0,
            "APPROVAL_AMOUNT": 0.0,
            "AUDITING_RESULT": "1",
            "APPROVAL_RESULT": null,
            "PROJECT_CODE": "P-20180903-0492",
            "PROJECT_NAME": "测试3",
            "BEGIN_YEAR": 2018,
            "APPLY_DEPT_ID": "00000000000000000000000000000020171120183917350kf63167aospmi",
            "APPLY_USER_ID": "000000000000000000000000000000201806281223358542duhvhnl6o26o",
            "APPLY_USER_NAME": "kwj",
            "APPLY_DEPT_NAME": "组织人事处（老干处）"
        },
        {
            "ID": "00000000000000000000000000000020200602144018734607739oa8moho",
            "PROJECT_ID": "00000000000000000000000000000020180702163212496kvp0nlr0vuvmj",
            "BUDGET_AMOUNT": 3000.0,
            "APPROVAL_AMOUNT": 0.0,
            "AUDITING_RESULT": "1",
            "APPROVAL_RESULT": null,
            "PROJECT_CODE": "P-20180702-0489",
            "PROJECT_NAME": "测试03",
            "BEGIN_YEAR": 2018,
            "APPLY_DEPT_ID": "00000000000000000000000000000020171120183917350kf63167aospmi",
            "APPLY_USER_ID": "000000000000000000000000000000201806281223358542duhvhnl6o26o",
            "APPLY_USER_NAME": "kwj",
            "APPLY_DEPT_NAME": "组织人事处（老干处）"
        },
        {
            "ID": "00000000000000000000000000000020200602144018734600bsf7tp2oni",
            "PROJECT_ID": "00000000000000000000000000000020180702162535477ktfue6fviwboo",
            "BUDGET_AMOUNT": 20000.0,
            "APPROVAL_AMOUNT": 0.0,
            "AUDITING_RESULT": "1",
            "APPROVAL_RESULT": null,
            "PROJECT_CODE": "P-20180702-0488",
            "PROJECT_NAME": "测试02",
            "BEGIN_YEAR": 2018,
            "APPLY_DEPT_ID": "00000000000000000000000000000020171120183917350kf63167aospmi",
            "APPLY_USER_ID": "000000000000000000000000000000201806281223358542duhvhnl6o26o",
            "APPLY_USER_NAME": "kwj",
            "APPLY_DEPT_NAME": "组织人事处（老干处）"
        },
        {
            "ID": "00000000000000000000000000000020200602144018734595psh63l3vii",
            "PROJECT_ID": "00000000000000000000000000000020180627175326430n56lc4rfrwmjm",
            "BUDGET_AMOUNT": 100000.0,
            "APPROVAL_AMOUNT": 0.0,
            "AUDITING_RESULT": "1",
            "APPROVAL_RESULT": null,
            "PROJECT_CODE": "P-20180627-0487",
            "PROJECT_NAME": "测试01",
            "BEGIN_YEAR": 2018,
            "APPLY_DEPT_ID": "00000000000000000000000000000020171120183919207nenuanrpjih7n",
            "APPLY_USER_ID": "00000000000000000000000000000020171120184041980pr0e7bmpuuc2l",
            "APPLY_USER_NAME": "张清",
            "APPLY_DEPT_NAME": "行政后勤处"
        },
        {
            "ID": "000000000000000000000000000000202006021440187345902f5qbu3m8o",
            "PROJECT_ID": "00000000000000000000000000000020180419180622252do66ctq6m6mvk",
            "BUDGET_AMOUNT": 0.0,
            "APPROVAL_AMOUNT": 0.0,
            "AUDITING_RESULT": "1",
            "APPROVAL_RESULT": null,
            "PROJECT_CODE": "P-20180419-0485",
            "PROJECT_NAME": "购买大型设备一批",
            "BEGIN_YEAR": 2018,
            "APPLY_DEPT_ID": "00000000000000000000000000000020171120183919207nenuanrpjih7n",
            "APPLY_USER_ID": "00000000000000000000000000000020171120184041954mp7t7jlmkbpoj",
            "APPLY_USER_NAME": "何葵",
            "APPLY_DEPT_NAME": "行政后勤处"
        },
        {
            "ID": "000000000000000000000000000000202006021440187345844054ee6bpn",
            "PROJECT_ID": "00000000000000000000000000000020171130092612438qlkb67u2u49lj",
            "BUDGET_AMOUNT": 0.0,
            "APPROVAL_AMOUNT": 0.0,
            "AUDITING_RESULT": "1",
            "APPROVAL_RESULT": null,
            "PROJECT_CODE": "P-20171130-0483",
            "PROJECT_NAME": "应用Pender健康促进模式对社区糖尿病的健康管理研究",
            "BEGIN_YEAR": 2018,
            "APPLY_DEPT_ID": "00000000000000000000000000000020171120183917435v7uhfl89h3f8h",
            "APPLY_USER_ID": "00000000000000000000000000000020171120184044001fnalnb0t534an",
            "APPLY_USER_NAME": "赵文",
            "APPLY_DEPT_NAME": "秘书处"
        },
        {
            "ID": "000000000000000000000000000000202006021440187345794j8m3fijtj",
            "PROJECT_ID": "00000000000000000000000000000020171130092316710fqfma8wjuhrah",
            "BUDGET_AMOUNT": 0.0,
            "APPROVAL_AMOUNT": 0.0,
            "AUDITING_RESULT": "1",
            "APPROVAL_RESULT": null,
            "PROJECT_CODE": "P-20171130-0482",
            "PROJECT_NAME": "社区老年人生命质量及健康素养干预的研究",
            "BEGIN_YEAR": 2018,
            "APPLY_DEPT_ID": "00000000000000000000000000000020171120183917435v7uhfl89h3f8h",
            "APPLY_USER_ID": "00000000000000000000000000000020171120184044001fnalnb0t534an",
            "APPLY_USER_NAME": "赵文",
            "APPLY_DEPT_NAME": "秘书处"
        },
        {
            "ID": "00000000000000000000000000000020200602144018734573wob1m8a2en",
            "PROJECT_ID": "000000000000000000000000000000201711221753197285hu3qd89oh9po",
            "BUDGET_AMOUNT": 0.0,
            "APPROVAL_AMOUNT": 0.0,
            "AUDITING_RESULT": "1",
            "APPROVAL_RESULT": null,
            "PROJECT_CODE": "FTWS2015051",
            "PROJECT_NAME": "基于全成本核算管理的社区卫生服务绩效管理机制的研究",
            "BEGIN_YEAR": 2018,
            "APPLY_DEPT_ID": "00000000000000000000000000000020171120183917435v7uhfl89h3f8h",
            "APPLY_USER_ID": "00000000000000000000000000000020171120184044001fnalnb0t534an",
            "APPLY_USER_NAME": "赵文",
            "APPLY_DEPT_NAME": "秘书处"
        },
        {
            "ID": "00000000000000000000000000000020200602144018734567fvuui5ovek",
            "PROJECT_ID": "00000000000000000000000000000020171122175319718jwck14r8vlkph",
            "BUDGET_AMOUNT": 0.0,
            "APPROVAL_AMOUNT": 0.0,
            "AUDITING_RESULT": "1",
            "APPROVAL_RESULT": null,
            "PROJECT_CODE": "FTWS2015004",
            "PROJECT_NAME": "基于肿瘤-宿主界面炎性微环境探讨复方苦参注射液的抗癌机制",
            "BEGIN_YEAR": 2018,
            "APPLY_DEPT_ID": "00000000000000000000000000000020171120183917435v7uhfl89h3f8h",
            "APPLY_USER_ID": "00000000000000000000000000000020171120184044001fnalnb0t534an",
            "APPLY_USER_NAME": "赵文",
            "APPLY_DEPT_NAME": "秘书处"
        },
        {
            "ID": "000000000000000000000000000000202006021440187345613hibfh06qo",
            "PROJECT_ID": "00000000000000000000000000000020171122175319712vocrdv2l3ci9i",
            "BUDGET_AMOUNT": 0.0,
            "APPROVAL_AMOUNT": 0.0,
            "AUDITING_RESULT": "1",
            "APPROVAL_RESULT": null,
            "PROJECT_CODE": "FTWS2014051",
            "PROJECT_NAME": "基于灰度关联分析法的医疗安全风险评估模式研究",
            "BEGIN_YEAR": 2018,
            "APPLY_DEPT_ID": "00000000000000000000000000000020171120183917435v7uhfl89h3f8h",
            "APPLY_USER_ID": "00000000000000000000000000000020171120184044001fnalnb0t534an",
            "APPLY_USER_NAME": "赵文",
            "APPLY_DEPT_NAME": "秘书处"
        }];
    export default {
        name: "user-manage",
        components: {
            departmentChoose,
            checkPassword
        },
        data() {
            return {
                modalTitle: '项目预算1上报批确认',
                depModalVisible: false,
                height: 510,
                showUser: false,
                showType: "0",
                loading: true,
                openSearch: true,
                openTip: false,
                operationLoading: false,
                loadingExport: true,
                modalExportAll: false,
                drop: false,
                dropDownContent: "展开",
                dropDownIcon: "ios-arrow-down",
                selectCount: 0,
                selectList: [],
                dataDep: [],
                searchKey: "",
                searchForm: {
                    id: "",
                    year: '0',
                    username: "",
                    departmentId: "",
                    mobile: "",
                    email: "",
                    sex: "",
                    type: "",
                    status: "",
                    pageNumber: 1,
                    pageSize: 15,
                    sort: "createTime",
                    order: "desc",
                    startDate: "",
                    endDate: ""
                },
                form: {},
                columns: [
                    // {
                    //     type: "selection",
                    //     width: 60,
                    //     align: "center",
                    //     fixed: "left"
                    // },
                    {
                        title: "预算年份",
                        key: "PROJECT_CODE",
                        minWidth: 160
                    },
                    {
                        title: "预算金额（元）",
                        key: "PROJECT_NAME",
                        width: 180,
                        tree: true
                    },
                    {
                        title: "下达时间",
                        key: "BUDGET_AMOUNT",
                        minWidth: 140
                    }
                ],
                data: [],
                historyData: [],
                exportData: [],
                total: 0,
                dictSex: this.$store.state.dict.sex
            };
        },
        methods: {
            init() {
                // util.arrayToTree(data, {id: 'ID', pid: 'PARENT_ID'})
                this.getUserList();
            },
            handleSelectDepTree(v) {
                this.form.departmentId = v;
            },
            handleSelectDep(v) {
                this.searchForm.departmentId = v;
            },
            selectDateRange(v) {
                if (v) {
                    this.searchForm.startDate = v[0];
                    this.searchForm.endDate = v[1];
                }
            },
            getUserList() {
                // 多条件搜索用户列表
                this.loading = true;
                getUserListData(this.searchForm).then(res => {
                    this.loading = false;
                    this.data = [];
                    this.total = this.data.length;
                });
            },
            handleSearch() {
                this.searchForm.pageNumber = 1;
                this.searchForm.pageSize = 10;
                this.getUserList();
            },
            handleReset() {
                this.$refs.searchForm.resetFields();
                this.searchForm.pageNumber = 1;
                this.searchForm.pageSize = 10;
                this.selectDate = null;
                this.searchForm.startDate = "";
                this.searchForm.endDate = "";
                this.selectDep = [];
                this.searchForm.departmentId = "";
                // 重新加载数据
                this.getUserList();
            },
            changeSort(e) {
                this.searchForm.sort = e.key;
                this.searchForm.order = e.order;
                if (e.order == "normal") {
                    this.searchForm.order = "";
                }
                this.getUserList();
            },
            getRoleList() {
                getAllRoleList().then(res => {
                    if (res.success) {
                        this.roleList = res.result;
                    }
                });
            },
            handleDropdown(name) {
                if (name == "refresh") {
                    this.getUserList();
                } else if (name == "reset") {
                    if (this.selectCount <= 0) {
                        this.$Message.warning("您还未选择要重置密码的用户");
                        return;
                    }
                    this.$refs.checkPass.show();
                } else if (name == "exportData") {
                    if (this.selectCount <= 0) {
                        this.$Message.warning("您还未选择要导出的数据");
                        return;
                    }
                    this.$Modal.confirm({
                        title: "确认导出",
                        content: "您确认要导出所选 " + this.selectCount + " 条数据?",
                        onOk: () => {
                            this.$refs.exportTable.exportCsv({
                                filename: "用户数据"
                            });
                        }
                    });
                } else if (name == "exportAll") {
                    this.modalExportAll = true;
                } else if (name == "importData") {
                    this.$Modal.info({
                        title: "请获取完整版",
                        content: "支付链接: http://xpay.exrick.cn/pay?xboot"
                    });
                }
            },
            exportAll() {
                getAllUserData().then(res => {
                    this.modalExportAll = false;
                    if (res.success) {
                        this.exportData = res.result;
                        setTimeout(() => {
                            this.$refs.exportTable.exportCsv({
                                filename: "用户全部数据"
                            });
                        }, 1000);
                    }
                });
            },
            resetPass() {
                this.$Modal.confirm({
                    title: "确认重置",
                    content:
                        "您确认要重置所选的 " +
                        this.selectCount +
                        " 条用户数据密码为【123456】?",
                    loading: true,
                    onOk: () => {
                        let ids = "";
                        this.selectList.forEach(function (e) {
                            ids += e.id + ",";
                        });
                        ids = ids.substring(0, ids.length - 1);
                        resetUserPass({ids: ids}).then(res => {
                            this.$Modal.remove();
                            if (res.success) {
                                this.$Message.success("操作成功");
                                this.clearSelectAll();
                                this.getUserList();
                            }
                        });
                    }
                });
            },
            showDetail(v) {
                // 转换null为""
                for (let attr in v) {
                    if (v[attr] == null) {
                        v[attr] = "";
                    }
                }
                let str = JSON.stringify(v);
                let data = JSON.parse(str);
                this.form = data;
                this.showType = "0";
                this.showUser = true;
            },
            add() {
                this.showType = "2";
                this.showUser = true;
            },
            edit(v) {
                this.depModalVisible = true;
            },
            enable(v) {
                this.$Modal.confirm({
                    title: "确认启用",
                    content: "您确认要启用用户 " + v.username + " ?",
                    loading: true,
                    onOk: () => {
                        enableUser(v.id).then(res => {
                            this.$Modal.remove();
                            if (res.success) {
                                this.$Message.success("操作成功");
                                this.getUserList();
                            }
                        });
                    }
                });
            },
            disable(v) {
                this.$Modal.confirm({
                    title: "确认禁用",
                    content: "您确认要禁用用户 " + v.username + " ?",
                    loading: true,
                    onOk: () => {
                        disableUser(v.id).then(res => {
                            this.$Modal.remove();
                            if (res.success) {
                                this.$Message.success("操作成功");
                                this.getUserList();
                            }
                        });
                    }
                });
            },
            remove(v) {
                this.$Modal.confirm({
                    title: "确认删除",
                    content: "您确认要删除用户 " + v.username + " ?",
                    loading: true,
                    onOk: () => {
                        deleteUser({ids: v.id}).then(res => {
                            this.$Modal.remove();
                            if (res.success) {
                                this.$Message.success("删除成功");
                                this.getUserList();
                            }
                        });
                    }
                });
            },
            dropDown() {
                if (this.drop) {
                    this.dropDownContent = "展开";
                    this.dropDownIcon = "ios-arrow-down";
                } else {
                    this.dropDownContent = "收起";
                    this.dropDownIcon = "ios-arrow-up";
                }
                this.drop = !this.drop;
            },
            showSelect(e) {
                this.exportData = e;
                this.selectList = e;
                this.selectCount = e.length;
            },
            clearSelectAll() {
                this.$refs.table.selectAll(false);
            },
            delAll() {
                if (this.selectCount <= 0) {
                    this.$Message.warning("您还未选择要删除的数据");
                    return;
                }
                this.$Modal.confirm({
                    title: "确认删除",
                    content: "您确认要删除所选的 " + this.selectCount + " 条数据?",
                    loading: true,
                    onOk: () => {
                        let ids = "";
                        this.selectList.forEach(function (e) {
                            ids += e.id + ",";
                        });
                        ids = ids.substring(0, ids.length - 1);
                        deleteUser({ids: ids}).then(res => {
                            this.$Modal.remove();
                            if (res.success) {
                                this.$Message.success("删除成功");
                                this.clearSelectAll();
                                this.getUserList();
                            }
                        });
                    }
                });
            },
            changePage(v) {
                this.searchForm.pageNumber = v;
                this.clearSelectAll();
                let _start = (v - 1) * this.searchForm.pageSize;
                let _end = v * this.searchForm.pageSize;
                this.data = this.historyData.slice(_start, _end);
            },
            changePageSize(v) {
                this.searchForm.pageSize = v;
                let _start = (this.searchForm.pageNumber - 1) * v;
                let _end = this.searchForm.pageNumber * v;
                this.data = this.historyData.slice(_start, _end);
            },
        },
        mounted() {
            // 计算高度
            this.height = Number(document.documentElement.clientHeight - 230);
            this.init();
        }
    };
</script>
