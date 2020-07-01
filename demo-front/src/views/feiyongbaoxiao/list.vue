<style lang="less">
    @import "../../styles/table-common.less";
</style>
<template>
    <div class="search">
        <add v-if="currView=='add'" @close="currView='index'" @submited="submited"/>
        <edit v-if="currView=='edit'" @close="currView='index'" @submited="submited" :data="formData"/>
        <detail v-if="currView=='detail'" @close="currView='index'" @submited="submited" :data="formData"/>
        <audit v-if="currView=='batchadd'" @close="currView='index'" @submited="submited"/>
        <change v-if="currView=='change'" @close="currView='index'" @submited="submited"/>
        <hbbx v-if="currView=='hbbx'" @close="currView='index'" @submited="submited"></hbbx>
        <Card v-show="currView=='index'">
            <Row class="operation">
                <Button @click="add" type="primary" icon="md-add">我要报销</Button>
                <Button @click="batchadd" type="primary" icon="ios-checkbox-outline">我要合并报销</Button>
                <Button @click="change" type="primary" icon="ios-list-box-outline">涉密报销</Button>
                <Button @click="edit" type="primary" icon="ios-list-box-outline">我要借款</Button>
                <!-- <Button @click="delAll" icon="md-trash">批量删除</Button> -->
                <!-- <Button @click="handleDropdown('exportData')" icon="md-cloud-download">导出所选数据</Button> -->
                <!-- <Button icon="md-cloud-upload">导入</Button> -->
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
            <Row
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
                            label="申请单号"
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
                            label="预算指标"
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
                            label="支出事项"
                            prop="email"
                    >
                        <Input
                                type="text"
                                v-model="searchForm.email"
                                clearable
                                placeholder=""
                                style="width: 200px"
                        />
                    </Form-item>
                    <span v-if="drop">
            <Form-item
                    label="事由摘要"
                    prop="username"
            >
              <Input
                      type="text"
                      v-model="searchForm.username"
                      clearable
                      placeholder=""
                      style="width: 200px"
              />
            </Form-item>
           <Form-item
                   label="申请类型"
                   prop="sex"
           >
              <Select
                      v-model="searchForm.sex"
                      placeholder="申请类型"
                      clearable
                      style="width: 200px"
              >
                  <Option value="">-请选择-</Option>
                      <Option value="1">一般经费</Option>
                      <Option value="2">差旅费</Option>
                      <Option value="3">国内接待费</Option>
                      <Option value="4">会议费</Option>
                      <Option value="5">培训费</Option>
                      <Option value="6">出国费</Option>
                      <Option value="10">劳务费</Option>
                      <Option value="13">外宾接待费</Option>
              </Select>
            </Form-item>
                         <Form-item
                                 label="申请人"
                                 prop="username"
                         >
              <Input
                      type="text"
                      v-model="searchForm.username"
                      clearable
                      placeholder=""
                      style="width: 200px"
              />
            </Form-item>
                              <Form-item
                                      label="审核状态"
                                      prop="sex"
                              >
              <Select
                      v-model="searchForm.sex"
                      placeholder="审核状态"
                      clearable
                      style="width: 200px"
              >
                  <Option value="">-请选择-</Option>
                      <Option value="0">草稿</Option>
                      <Option value="1">待审批</Option>
                      <Option value="2">已审批</Option>
                      <Option value="3">已驳回</Option>
                      <Option value="4">已终止</Option>
              </Select>
            </Form-item>
                        </span>
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
                        <a
                                class="drop-down"
                                @click="dropDown"
                        >
                            {{dropDownContent}}
                            <Icon :type="dropDownIcon"></Icon>
                        </a>
                    </Form-item>
                </Form>
            </Row>
            <Row>
                <Tabs type="card">
                    <TabPane label="报销申请">
                        <Table
                                :loading="loading"
                                border
                                :columns="columns"
                                :data="data"
                                ref="table"
                                sortable="custom"
                                @on-sort-change="changeSort"
                                @on-selection-change="changeSelect"
                        ></Table>
                    </TabPane>
                    <TabPane label="借款申请">
                        <Table
                                :loading="loading"
                                border
                                :columns="columns1"
                                :data="data1"
                                ref="table"
                                sortable="custom"
                                @on-sort-change="changeSort"
                                @on-selection-change="changeSelect"
                        ></Table>
                    </TabPane>
                </Tabs>
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
    </div>
</template>

<script>
    import axios from 'axios';
    import add from "./add.vue";
    import edit from "./edit.vue";
    import detail from "./detail.vue";
    import hbbx from "./hbbx";
    // import audit from "./audit";
    import change from "./change";
    // import batchadd from "./batchadd";

    export default {
        name: "xiangmushenbaojihua",
        components: {
            add,
            edit,
            // audit,
            detail,
            change,
            // batchadd,
            hbbx
        },
        data() {
            return {
                openTip: false, // 显示提示
                openSearch: true,
                drop: false,
                dropDownContent: "展开查询",
                dropDownIcon: "ios-arrow-down",
                formData: {},
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
                columns: [
                    {
                        title: '报销单号',
                        key: 'a',
                        minWidth: 160,
                        fixed: 'left',
                        render: (h, params) => {
                            return h(
                                "a",
                                {
                                    on: {
                                        click: () => {
                                            this.showDetail(params.row);
                                        }
                                    }
                                },
                                params.row['a']
                            );
                        }
                    },
                    {
                        title: '预算指标',
                        key: 'b',
                        minWidth: 100
                    },
                    {
                        title: '指标来源',
                        key: 'c',
                        minWidth: 100
                    },
                    {
                        title: '支出事项',
                        key: 'd',
                        minWidth: 100
                    },
                    {
                        title: '申请日期',
                        key: 'e',
                        minWidth: 120
                    },
                    {
                        title: '事由摘要',
                        key: 'f',
                        minWidth: 120
                    },
                    {
                        title: '报销金额',
                        key: 'g',
                        minWidth: 120
                    },
                    {
                        title: '实报金额',
                        key: 'h',
                        minWidth: 120
                    },
                    {
                        title: '报销部门',
                        key: 'i',
                        minWidth: 120
                    },
                    {
                        title: '报销申请人',
                        key: 'j',
                        minWidth: 120
                    },
                    {
                        title: '审核状态',
                        key: 'k',
                        minWidth: 140
                    },
                    {
                        title: '财务处理状态',
                        key: 'l',
                        minWidth: 140
                    },
                    {
                        title: '当前操作环节',
                        key: 'm',
                        minWidth: 130
                    },
                    {
                        title: '当前操作人',
                        key: 'n',
                        minWidth: 120
                    },
                    {
                        title: '报销类型',
                        key: 'o',
                        minWidth: 120
                    },
                    {
                        title: '结算方式',
                        key: 'p',
                        minWidth: 120
                    },
                    {
                        title: '经办人',
                        key: 'q',
                        minWidth: 120
                    },
                    {
                        title: '关联事前申请',
                        key: 'r',
                        minWidth: 130
                    },
                    {
                        title: "操作",
                        key: "action",
                        align: "center",
                        fixed: 'right',
                        width: 200,
                        render: (h, params) => {
                            return h("div", [
                                h(
                                    "Button",
                                    {
                                        props: {
                                            type: "primary",
                                            size: "small",
                                            icon: "ios-create-outline"
                                        },
                                        style: {
                                            marginRight: "5px"
                                        },
                                        on: {
                                            click: () => {
                                                this.edit(params.row);
                                            }
                                        }
                                    },
                                    "编辑"
                                ),
                                h(
                                    "Button",
                                    {
                                        props: {
                                            type: "error",
                                            size: "small",
                                            icon: "md-trash"
                                        },
                                        on: {
                                            click: () => {
                                                this.remove(params.row);
                                            }
                                        }
                                    },
                                    "删除"
                                )
                            ]);
                        }
                    }
                ],
                historyData: [],
                data: [
                    {
                        a: '送审之后生成单号',
                        b: '离休费',
                        c: '上年结转',
                        e: '离休费',
                        f: '2020-06-01',
                        h: '',
                        i: '0',
                        j: '-',
                        k: '普通外科病区',
                        l: 'test11',
                        m: '草稿',
                        n: '',
                        o: '',
                        p: '',
                        s: 8846,
                        t: 0,
                        u: '网银转账'
                    }
                ], // 表单数据
                total: 0, // 表单数据总数
                columns1: [
                    {
                        title: '借款单号',
                        key: 'a1',
                        minWidth: 100
                    },
                    {
                        title: '借款金额',
                        key: 'a2',
                        minWidth: 100
                    },
                    {
                        title: '还款金额',
                        key: 'a3',
                        minWidth: 100
                    },
                    {
                        title: '借款部门',
                        key: 'a4',
                        minWidth: 100
                    },
                    {
                        title: '借款人',
                        key: 'a5',
                        minWidth: 100
                    },
                    {
                        title: '经办人',
                        key: 'a6',
                        minWidth: 100
                    },
                    {
                        title: '借款日期',
                        key: 'a7',
                        minWidth: 100
                    },
                    {
                        title: '详细事由',
                        key: 'a8',
                        minWidth: 100
                    },
                    {
                        title: '审核状态',
                        key: 'a9',
                        minWidth: 100
                    },
                    {
                        title: '财务处理状态',
                        key: 'a10',
                        minWidth: 130
                    },
                    {
                        title: '当前操作环节',
                        key: 'a11',
                        minWidth: 130
                    },
                    {
                        title: '当前操作人',
                        key: 'a12',
                        minWidth: 130
                    },
                    {
                        title: '最近还款日期',
                        key: 'a13',
                        minWidth: 130
                    },
                    {
                        title: '借款状态',
                        key: 'a14',
                        minWidth: 100
                    },
                    {
                        title: '操作',
                        key: 'a15',
                        minWidth: 100
                    }
                ],
                data1: []
            };
        },
        methods: {
            init() {
                this.getDataList();
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

                /*axios.get('/mock/data.json').then(res => {
                    this.columns = res.headers.map(res => {
                        return {
                            title: res,
                            key: res,
                            minWidth: 120
                        }
                    });
                    this.columns.unshift({
                        type: "selection",
                        width: 60,
                        align: "center",
                        fixed: "left"
                    });
                    this.columns.push({
                        title: "操作",
                        key: "action",
                        align: "center",
                        fixed: 'right',
                        width: 200,
                        render: (h, params) => {
                            return h("div", [
                                h(
                                    "Button",
                                    {
                                        props: {
                                            type: "primary",
                                            size: "small",
                                            icon: "ios-create-outline"
                                        },
                                        style: {
                                            marginRight: "5px"
                                        },
                                        on: {
                                            click: () => {
                                                this.edit(params.row);
                                            }
                                        }
                                    },
                                    "编辑"
                                ),
                                h(
                                    "Button",
                                    {
                                        props: {
                                            type: "error",
                                            size: "small",
                                            icon: "md-trash"
                                        },
                                        on: {
                                            click: () => {
                                                this.remove(params.row);
                                            }
                                        }
                                    },
                                    "删除"
                                )
                            ]);
                        }
                    });
                    this.columns[1] = Object.assign(this.columns[1], {
                            render: (h, params) => {
                                return h(
                                    "a",
                                    {
                                        on: {
                                            click: () => {
                                                this.showDetail(params.row);
                                            }
                                        }
                                    },
                                   params.row[this.columns[1]['key']]
                                );
                            }
                        }
                    );
                    this.historyData = res.records;
                    // 初始化显示，小于每页显示条数，全显，大于每页显示条数，取前每页条数显示
                    if (this.historyData.length < this.searchForm.pageSize) {
                        this.data = this.historyData;
                    } else {
                        this.data = this.historyData.slice(0, this.searchForm.pageSize);
                    }
                    this.total = this.historyData.length;
                    this.loading = false;


                });*/
            },
            add() {
                this.currView = "add";
            },
            audit() {
                this.currView = "audit";
            },
            change() {
                this.currView = "change";
            },
            batchadd () {
                this.currView = "hbbx";
            },
            edit(v) {
                // 转换null为""
                // for (let attr in v) {
                //     if (v[attr] == null) {
                //         v[attr] = "";
                //     }
                // }
                // let str = JSON.stringify(v);
                // let data = JSON.parse(str);
                // this.formData = data;
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
            }
        },
        mounted() {
            this.init();
        }
    };
</script>
