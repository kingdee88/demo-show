<style lang="less">
    @import "../../styles/table-common.less";
</style>
<template>
    <div class="search">
        <Card>
            <Row type="flex" justify="start">
                <Col :md="6">
                    <!--                    <div show-icon>-->
                    <!--                        支出事项分类：-->
                    <!--                        <Select v-model="formData.ywfl" disabled placeholder="支出事项分类" clearable style="width: 200px">-->
                    <!--                            <Option value="0">业务经费</Option>-->
                    <!--                        </Select>-->
                    <!--                    </div>-->
                    <div class="tree-bar" :style="{maxHeight: maxHeight}">
                        <Tree
                                @on-select-change="selectTree"
                                ref="tree"
                                :data="treeData"
                        ></Tree>
                        <Spin size="large" fix v-if="loading"></Spin>
                    </div>
                </Col>
                <Col :md="18">
                    <add v-if="currView=='add'" @close="currView='index'" @submited="submited"/>
                    <edit v-if="currView=='edit'" @close="currView='index'" @submited="submited" :data="formData"/>
                    <detail v-if="currView=='detail'" @close="currView='index'" @submited="submited" :data="formData"/>
                    <audit v-if="currView=='audit'" @close="currView='index'" @submited="submited"/>
                    <change v-if="currView=='change'" @close="currView='index'" @submited="submited"/>
                    <Card v-show="currView=='index'">
                        <Row class="operation">
<!--                            <Button @click="add" type="primary" icon="md-add">新增</Button>-->
                            <!--<Button @click="audit" type="primary" icon="ios-checkbox-outline">事前申请审核</Button>
                            <Button @click="change" type="primary" icon="ios-list-box-outline">我的事前申请变更</Button>
                            <Button @click="delAll" icon="md-trash">批量删除</Button>
                            <Button @click="handleDropdown('exportData')" icon="md-cloud-download">导出所选数据</Button>-->
                            <Button icon="md-cloud-download" type="primary">导入</Button>
                            <Button @click="getDataList" icon="md-refresh">刷新</Button>
                            <!--                <Button type="dashed" @click="openTip=!openTip">{{openTip ? "关闭提示" : "开启提示"}}</Button>-->
                        </Row>
                        <Row v-show="openTip">
                            <Alert show-icon>
                                已选择
                                <span class="select-count">{{selectCount}}</span> 项
                                <a class="select-clear" @click="clearSelectAll">清空</a>
                            </Alert>
                        </Row>
                       <!-- <Row
                                v-show="openSearch"
                                @keydown.enter.native="handleSearch"
                        >

                            <Form
                                    ref="searchForm"
                                    :model="searchForm"
                                    inline
                                    :label-width="70"
                            >
                                <Form-item
                                        label="事项编码"
                                        prop="nickname"
                                >
                                    <Input
                                            type="text"
                                            v-model="searchForm.nickname"
                                            clearable
                                            placeholder="请输入用户名"
                                            style="width: 200px"
                                    />
                                </Form-item>

                                <Form-item
                                        label="事项名称"
                                        prop="mobile"
                                >
                                    <Input
                                            type="text"
                                            v-model="searchForm.mobile"
                                            clearable
                                            placeholder=""
                                            style="width: 200px"
                                    />
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
                                </Form-item>
                            </Form>
                        </Row>-->
                        <Row>
                            <Table
                                    :loading="loading"
                                    border
                                    :columns="columns"
                                    :data="data"
                                    ref="table"
                                    sortable="custom"
                                    @on-sort-change="changeSort"
                                    @on-selection-change="changeSelect"
                            >
                                <template slot-scope="{ row, index }" slot="mbz">
                                    <Select
                                            v-model="row.b"
                                            placeholder="申请类型"
                                            clearable
                                            style="width: 200px"
                                    >
                                        <Option
                                                v-for="item in row.c"
                                                :value="item.id"
                                                :key="item.id"
                                                :label="item.name"
                                        >
                                        </Option>
                                    </Select>
                                </template>
                            </Table>
                        </Row>
                        <Row type="flex" justify="end" class="page">
                            <Page
                                    :current="searchForm.pageNumber"
                                    :total="total"
                                    :page-size="searchForm.pageSize"
                                    @on-change="changePage"
                                    @on-page-size-change="changePageSize"
                                    :page-size-opts="[10,20,50]"
                                    size="small"
                                    show-total
                                    show-elevator
                                    show-sizer
                            ></Page>
                        </Row>
                    </Card>
                </Col>
            </Row>
        </Card>
        <Modal :title="modalTitle" v-model="roleModalVisible" :mask-closable="false" :width="500">
            <Form ref="roleForm" :model="roleForm" :label-width="80" :rules="roleFormValidate">
                <FormItem label="上传文档" prop="name">
                    <Upload action="">
                        <Button icon="ios-cloud-upload-outline">上传文档</Button>
                    </Upload>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button type="text" @click="roleModalVisible = false">取消</Button>
                <Button type="primary" :loading="submitLoading" @click="roleModalVisible = false"">提交</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    // import axios from 'axios';
    // import add from "./add.vue";
    // import edit from "./edit.vue";
    // import audit from "./audit";
    // import change from "./change";
    // import detail from "./detail";

    export default {
        name: "xiangmushenbaojihua",
        components: {
            // add,
            // edit,
            // audit,
            // change,
            // detail
        },
        data() {
            return {
                modalTitle: '上传文件',
                roleModalVisible: false,
                roleForm: {},
                strict: true,
                maxHeight: "500px",
                openTip: false, // 显示提示
                openSearch: true,
                drop: false,
                dropDownContent: "展开查询",
                dropDownIcon: "ios-arrow-down",
                formData: {
                    ywfl: '0'
                },
                currView: "index",
                loading: false, // 表单加载状态
                searchForm: {
                    // 搜索框对应data对象
                    pageNumber: 1, // 当前页数
                    pageSize: 15, // 页面大小
                    sort: "createTime", // 默认排序字段
                    order: "desc" // 默认排序方式
                },
                selectList: [], // 多选数据
                selectCount: 0, // 多选计数
                columns: [{
                    title: '交通工具',
                    key: 'a'
                },{
                    title: '交通等级',
                    key: 'b',
                    slot: 'mbz'
                }],
                historyData: [],
                data: [{
                    a: '火车',
                    b: 1,
                    c: [{id: 1, name: '火车软席（软座、软卧）、高铁/动车商务座、全列软席列车一等软座'}]
                },{
                    a: '飞机',
                    b: 1,
                    c: [{id: 1, name: '头等舱'}]
                },{
                    a: '轮船',
                    b: 1,
                    c: [{id: 1, name: '一等舱'}]
                },{
                    a: '其他交通工具',
                    b: 1,
                    c: [{id: 1, name: '其他'}]
                },{
                    a: '单位公务用车',
                    b: 1,
                    c: [{id: 1, name: '单位公务车辆'}]
                },], // 表单数据
                total: 0, // 表单数据总数
                treeData: []
            };
        },
        methods: {
            selectTree(v) {
                let id = v[0]['id'];
                if (id === '11') {
                    this.data = [{
                        a: '设备维修合同模板',
                        b: '2019-06-20 13:53:46'
                    },{
                        a: '设备采购合同',
                        b: '2019-06-20 13:52:51'
                    }]
                } else if (id === '12') {
                    this.data = [{
                        a: '工程合同模板',
                        b: '2019-06-20 13:54:36'
                    }]
                } else if (id === '13') {
                    this.data = [{
                        a: '审计服务合同',
                        b: '2019-06-20 13:55:27'
                    },{
                        a: '后勤服务合同',
                        b: '2019-06-20 13:55:05'
                    }]
                } else if (id === '14') {
                    this.data = [{
                        a: '采购管理制度',
                        b: '2019-06-20 13:50:21'
                    }]
                } else if (id === '15') {
                    this.data = [{
                        a: '合同法',
                        b: '2020-05-14 12:51:58'
                    }]
                } else if (id === '16') {
                    this.data = []
                }
            },
            renderContent(h, {root, node, data}) {
                let icon = "";
                if (data.level == 0) {
                    icon = "ios-navigate";
                } else if (data.level == 1) {
                    icon = "md-list-box";
                } else if (data.level == 2) {
                    icon = "md-list";
                } else if (data.level == 3) {
                    icon = "md-radio-button-on";
                } else {
                    icon = "md-radio-button-off";
                }
                return h("span", [
                    h("span", [
                        h("Icon", {
                            props: {
                                type: icon,
                                size: "16"
                            },
                            style: {
                                "margin-right": "8px",
                                "margin-bottom": "3px"
                            }
                        }),
                        h("span", data.title)
                    ])
                ]);
            },
            init() {
                this.getDataList();
                this.initTree();
            },
            handleSelectDep(v) {
                this.searchForm.departmentId = v;
            },
            dropDown() {
                if (this.drop) {
                    this.dropDownContent = "展开查询";
                    this.dropDownIcon = "ios-arrow-down";
                } else {
                    this.dropDownContent = "收起";
                    this.dropDownIcon = "ios-arrow-up";
                }
                this.drop = !this.drop;
            },
            handleSearch() {
                this.searchForm.pageNumber = 1;
                this.searchForm.pageSize = 10;
                // this.getUserList();
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
            },
            submited() {
                this.currView = "index";
                this.getDataList();
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
            changeSort(e) {
                this.searchForm.sort = e.key;
                this.searchForm.order = e.order;
                if (e.order == "normal") {
                    this.searchForm.order = "";
                }
                this.getDataList();
            },
            clearSelectAll() {
                this.$refs.table.selectAll(false);
            },
            changeSelect(e) {
                this.selectList = e;
                this.selectCount = e.length;
            },
            getDataList() {
                // this.loading = true;

                // axios.get('/mock/bumenyewujingfeipeizhi.json').then(res => {
                //     this.columns = res.headers.map(res => {
                //         return {
                //             title: res,
                //             key: res,
                //             minWidth: 200
                //         }
                //     });
                //     this.columns.unshift({
                //         type: "selection",
                //         width: 60,
                //         align: "center",
                //         fixed: "left"
                //     });
                //     this.columns.push({
                //         title: "操作",
                //         key: "action",
                //         align: "center",
                //         fixed: 'right',
                //         width: 200,
                //         render: (h, params) => {
                //             return h("div", [
                //                 h(
                //                     "Button",
                //                     {
                //                         props: {
                //                             type: "primary",
                //                             size: "small",
                //                             icon: "ios-create-outline"
                //                         },
                //                         style: {
                //                             marginRight: "5px"
                //                         },
                //                         on: {
                //                             click: () => {
                //                                 this.edit(params.row);
                //                             }
                //                         }
                //                     },
                //                     "编辑"
                //                 ),
                //                 h(
                //                     "Button",
                //                     {
                //                         props: {
                //                             type: "error",
                //                             size: "small",
                //                             icon: "md-trash"
                //                         },
                //                         on: {
                //                             click: () => {
                //                                 this.remove(params.row);
                //                             }
                //                         }
                //                     },
                //                     "删除"
                //                 )
                //             ]);
                //         }
                //     });
                //     this.columns[1] = Object.assign(this.columns[1], {
                //             render: (h, params) => {
                //                 return h(
                //                     "a",
                //                     {
                //                         on: {
                //                             click: () => {
                //                                 this.showDetail(params.row);
                //                             }
                //                         }
                //                     },
                //                    params.row[this.columns[1]['key']]
                //                 );
                //             }
                //         }
                //     );
                //     this.historyData = res.records;
                //     // 初始化显示，小于每页显示条数，全显，大于每页显示条数，取前每页条数显示
                //     if (this.historyData.length < this.searchForm.pageSize) {
                //         this.data = this.historyData;
                //     } else {
                //         this.data = this.historyData.slice(0, this.searchForm.pageSize);
                //     }
                //     this.total = this.historyData.length;
                //     this.loading = false;
                //
                //
                // });
            },
            add() {
                this.roleModalVisible = true;
            },
            audit() {
                this.currView = "audit";
            },
            change() {
                this.currView = "change";
            },
            edit(v) {
                // 转换null为""
                for (let attr in v) {
                    if (v[attr] == null) {
                        v[attr] = "";
                    }
                }
                let str = JSON.stringify(v);
                let data = JSON.parse(str);
                this.formData = data;
                this.currView = "edit";
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
                this.formData = data;
                this.currView = "detail";
            },
            remove(v) {
                this.$Modal.confirm({
                    title: "确认删除",
                    // 记得确认修改此处
                    content: "您确认要删除 " + v.APPLY_FORM_NO + " ?",
                    loading: true,
                    onOk: () => {
                        // 删除
                        // this.deleteRequest("请求地址，如/deleteByIds/" + v.id).then(res => {
                        //   this.$Modal.remove();
                        //   if (res.success) {
                        //     this.$Message.success("操作成功");
                        //     this.getDataList();
                        //   }
                        // });
                        // 模拟请求成功
                        this.$Message.success("操作成功");
                        this.$Modal.remove();
                        this.getDataList();
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
                        }
                    });
                } else if (name == "exportAll") {
                    this.modalExportAll = true;
                } else if (name == "importData") {
                }
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
                        // 批量删除
                        // this.deleteRequest("请求地址，如/deleteByIds/" + ids).then(res => {
                        //   this.$Modal.remove();
                        //   if (res.success) {
                        //     this.$Message.success("操作成功");
                        //     this.clearSelectAll();
                        //     this.getDataList();
                        //   }
                        // });
                        // 模拟请求成功
                        this.$Message.success("操作成功");
                        this.$Modal.remove();
                        this.clearSelectAll();
                        this.getDataList();
                    }
                });
            },
            initTree() {
                    this.treeData = [{
                        "rootName": "1",
                        "id": "1",
                        "title": "职级",
                        "expand": true,
                        "children": [
                            {
                                "id": "11",
                                "title": "省部级",
                                "expand": true,
                                "checked": true,
                                "selected": true
                            },
                            {
                                "id": "12",
                                "title": "厅局级",
                                "expand": true
                            },
                            {
                                "id": "13",
                                "title": "其他",
                                "expand": true
                            }
                        ]
                    }]
            },
            renderContent(h, {root, node, data}) {
                let icon = "";
                if (data.level == 0) {
                    icon = "ios-navigate";
                } else if (data.level == 1) {
                    icon = "md-list-box";
                } else if (data.level == 2) {
                    icon = "md-list";
                } else if (data.level == 3) {
                    icon = "md-radio-button-on";
                } else {
                    icon = "md-radio-button-off";
                }
                return h("span", [
                    h("span", [
                        h("Icon", {
                            props: {
                                type: icon,
                                size: "16"
                            },
                            style: {
                                "margin-right": "8px",
                                "margin-bottom": "3px"
                            }
                        }),
                        h("span", data.title)
                    ])
                ]);
            },
            download () {
                // https://static.kdcodes.cn/%E5%90%88%E5%90%8C.docx
            }
        },
        mounted() {
            this.init();
            let height = document.documentElement.clientHeight;
            this.maxHeight = Number(height - 287) + "px";
        }
    };
</script>
