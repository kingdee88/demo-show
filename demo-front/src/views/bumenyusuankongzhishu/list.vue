<style lang="less">
    @import "../../styles/table-common.less";
</style>
<template>
    <div class="search">
        <add v-if="currView=='add'" @close="currView='index'" @submited="submited"/>
        <edit v-if="currView=='edit'" @close="currView='index'" @submited="submited" :data="formData"/>
        <detail v-if="currView=='detail'" @close="currView='index'" @submited="submited" :data="formData"/>
        <audit v-if="currView=='audit'" @close="currView='index'" @submited="submited"/>
        <change v-if="currView=='change'" @close="currView='index'" @submited="submited"/>
        <Card v-show="currView=='index'">
            <Row class="operation">
                <Button @click="add" type="primary" icon="md-add">新增</Button>
                <!--<Button @click="audit" type="primary" icon="ios-checkbox-outline">事前申请审核</Button>
                <Button @click="change" type="primary" icon="ios-list-box-outline">我的事前申请变更</Button>-->
                <Button @click="delAll" icon="md-trash">批量删除</Button>
                <Button @click="handleDropdown('exportData')" icon="md-cloud-download">导出所选数据</Button>
                <Button icon="md-cloud-upload">导入</Button>
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
                        <Input
                                :value="row.PLAN_VALUE"
                                :clearable="false"
                                :disabled=" false"
                                placeholder="请输入"/>
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
    </div>
</template>

<script>
    import axios from 'axios';
    import add from "./add.vue";
    import edit from "./edit.vue";
    import audit from "./audit";
    import change from "./change";
    import detail from "./detail";
    export default {
        name: "xiangmushenbaojihua",
        components: {
            add,
            edit,
            audit,
            change,
            detail
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
                loading: true, // 表单加载状态
                searchForm: {
                    // 搜索框对应data对象
                    pageNumber: 1, // 当前页数
                    pageSize: 15, // 页面大小
                    sort: "createTime", // 默认排序字段
                    order: "desc" // 默认排序方式
                },
                selectList: [], // 多选数据
                selectCount: 0, // 多选计数
                columns: [],
                historyData: [],
                data: [], // 表单数据
                total: 0 // 表单数据总数
            };
        },
        methods: {
            init() {
                this.getDataList();
            },
            handleSelectDep (v) {
                this.searchForm.departmentId = v;
            },
            dropDown () {
                if (this.drop) {
                    this.dropDownContent = "展开查询";
                    this.dropDownIcon = "ios-arrow-down";
                } else {
                    this.dropDownContent = "收起";
                    this.dropDownIcon = "ios-arrow-up";
                }
                this.drop = !this.drop;
            },
            handleSearch () {
                this.searchForm.pageNumber = 1;
                this.searchForm.pageSize = 10;
                // this.getUserList();
            },
            handleReset () {
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
                let _start = ( v- 1 ) * this.searchForm.pageSize;
                let _end = v * this.searchForm.pageSize;
                this.data = this.historyData.slice(_start,_end);
            },
            changePageSize(v) {
                this.searchForm.pageSize = v;
                let _start = ( this.searchForm.pageNumber - 1 ) * v;
                let _end = this.searchForm.pageNumber * v;
                this.data = this.historyData.slice(_start,_end);
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
                this.loading = true;

                axios.get('/mock/bumenyusuankongzhishu.json').then(res => {
                    this.columns = res.headers.map(res => {
                        return {
                            title: res,
                            key: res,
                            minWidth:200
                        }
                    });
                    this.columns.unshift({
                        type: "selection",
                        width: 60,
                        align: "center",
                        fixed: "left"
                    });
                    this.columns.push( {
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
                    this.columns[2]['slot'] = 'mbz';
                    this.historyData = res.records;
                    // 初始化显示，小于每页显示条数，全显，大于每页显示条数，取前每页条数显示
                    if(this.historyData.length < this.searchForm.pageSize){
                        this.data = this.historyData;
                    }else{
                        this.data = this.historyData.slice(0,this.searchForm.pageSize);
                    }
                    this.total = this.historyData.length;
                    this.loading = false;


                });
            },
            add() {
                this.currView = "add";
            },
            audit() {
                this.currView = "audit";
            },
            change () {
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
            handleDropdown (name) {
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
                        this.selectList.forEach(function(e) {
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
