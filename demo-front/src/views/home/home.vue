<style lang="less">
    @import "./home.less";
    @import "../../styles/common.less";
</style>

<template>
    <div>
        <div
                class="home"
        >
            <Row :gutter="10">
                <Col
                        :lg="24"
                        :xl="8"
                >
                    <Row :gutter="10">
                        <Col
                                :lg="12"
                                :xl="24"
                                :style="{marginBottom: '10px'}"
                        >
                            <Card>
                                <Row
                                        type="flex"
                                        class="user-info"
                                >
                                    <Col span="8">
                                        <Row
                                                class-name="made-child-con-middle"
                                                type="flex"
                                                align="middle"
                                        >
                                            <img
                                                    class="avator-img"
                                                    :src="avatarPath"
                                            />
                                        </Row>
                                    </Col>
                                    <Col
                                            span="16"
                                            style="padding-left:6px;"
                                    >
                                        <Row
                                                class-name="made-child-con-middle"
                                                type="flex"
                                                align="middle"
                                        >
                                            <div>
                                                <b class="card-user-info-name">{{ username }}</b>
                                                <p>您好，test11 欢迎您的使用</p>
                                            </div>
                                        </Row>
                                    </Col>
                                </Row>
                                <div class="line-gray"></div>
                                <Row class="margin-top-8">
                                    <Col span="8">
                                        <p class="notwrap">本次登录地点:</p>
                                    </Col>
                                    <Col
                                            span="16"
                                            class="padding-left-8"
                                    >{{city}}
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                        <Col
                                :lg="12"
                                :xl="24"
                                style="margin-bottom: 10px;"
                        >
                            <Card>
                                <p slot="title">
              <span style="display: flex;align-items: center">
              <Icon
                      custom="iconfont icon-notice"
                      size="20"
                      style="margin-right:5px"
              />
              通知公告
              </span>
                                </p>
                                <p slot="extra"></p>
                                <div style="height: 268px;">
                                  <Table height="260"
                                         size="small"
                                         :loading="loading"
                                         :columns="columns"
                                         :data="data"
                                         sortable="custom"
                                         ref="table"
                                  ></Table>
                                </div>
                            </Card>
                        </Col>
                    </Row>
                </Col>
                <Col
                        :lg="24"
                        :xl="16"
                >
                    <Row :gutter="5">
                        <Col
                                :sm="24"
                                :md="12"
                                :lg="6"
                                :style="{marginBottom: '10px'}"
                        >
                            <info-card
                                    id-name="user_created_count"
                                    :end-val="count.createUser"
                                    iconType="md-person-add"
                                    color="#2d8cf0"
                                    intro-text="当前用户数量"
                            ></info-card>
                        </Col>
                        <Col
                                :sm="24"
                                :md="12"
                                :lg="6"
                                :style="{marginBottom: '10px'}"
                        >
                            <info-card
                                    id-name="visit_count"
                                    :end-val="count.visit"
                                    iconType="ios-eye"
                                    color="#64d572"
                                    :iconSize="50"
                                    intro-text="待办事项"
                            ></info-card>
                        </Col>
                        <Col
                                :sm="24"
                                :md="12"
                                :lg="6"
                                :style="{marginBottom: '10px'}"
                        >
                            <info-card
                                    id-name="collection_count"
                                    :end-val="count.collection"
                                    iconType="iconfont icon-icon-evection"
                                    :isCustom="true"
                                    color="#ffd572"
                                    intro-text="出差人数"
                            ></info-card>
                        </Col>
                        <Col
                                :sm="24"
                                :md="12"
                                :lg="6"
                                :style="{marginBottom: '10px'}"
                        >
                            <info-card
                                    id-name="transfer_count"
                                    :end-val="count.transfer"
                                    :isCustom="true"
                                    iconType="iconfont icon-youhao"
                                    color="#f25e43"
                                    intro-text="平均油耗"
                                    :decimalPlaces="1"
                            ></info-card>
                        </Col>
                    </Row>
                    <Row>
                        <Col
                                :lg="24"
                                :xl="12"
                                style="padding: 0 5px 10px 0;"
                        >
                            <Card>
                                <p slot="title" style="overflow:visible">
              <span style="display: flex;align-items: center">
                <Icon
                        custom="iconfont icon-daibanshixiang"
                        size="20"
                        style="margin-right:5px"
                ></Icon>
                待办事项
              </span>
                                </p>
                                <div style="height:368px;overflow: hidden">
                                    <Table height="360"
                                           size="small"
                                           :loading="loading"
                                           :columns="columns"
                                           :data="data"
                                           sortable="custom"
                                           ref="table"
                                    ></Table>
                                </div>
                            </Card>
                        </Col>
                        <Col
                                :lg="24"
                                :xl="12"
                                style="padding: 0 0 10px 5px;"
                        >
                            <Card>
                                <p slot="title">
                                    <Icon
                                            type="ios-map"
                                            style="margin-right:5px"
                                    ></Icon>
                                  全国出差情况
                                </p>
                                <div
                                        id="comments"
                                        class="comment-container"
                                ></div>
                            </Card>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row :gutter="10">
                <Col
                        :lg="24"
                        :xl="16"
                        :style="{marginBottom: '10px'}"
                >
                    <visit-volume/>
                </Col>
                <Col
                        :lg="24"
                        :xl="8"
                        :style="{marginBottom: '10px'}"
                >
                    <visit-separation/>
                </Col>
            </Row>
        </div>
    </div>
</template>

<script>
    import {ipInfo} from "@/api/index";
    import visitVolume from "./components/visitVolume.vue";
    import visitSeparation from "./components/visitSeparation.vue";
    import infoCard from "./components/infoCard.vue";
    import Cookies from "js-cookie";

    export default {
        name: "home",
        components: {
            visitVolume,
            visitSeparation,
            infoCard
        },
        data() {
            return {
                showVideo: false,
                count: {
                    createUser: 149,
                    visit: 13,
                    collection: 56,
                    transfer: 8.9
                },
                city: "",
                username: "",
                data: [{
                    "category": "预警",
                    "content": "test11：<br\/>&nbsp;&nbsp;&nbsp;&nbsp;您好！<br\/>&nbsp;&nbsp;&nbsp;&nbsp;合同名称【123】，合同编号【HT-00000174】，付\/收款阶段【验收款】将于2020-07-02到期，请您关注或处理。",
                    "id": "000000000000000000000000000000202006270200000590615ftt8dtdvi",
                    "name": "【合同阶段付\/收款提醒】合同名称：123",
                    "noticeId": "00000000000000000000000000000020200611155914073497p5k02wr3hn",
                    "state": "1",
                    "timeCreate": "2020-06-27",
                    "timeUpdate": "2020-06-27",
                    "type": "5",
                    "userCreateId": null,
                    "userCreateName": null,
                    "userRecipientId": "000000000000000000000000000000201806281223358542duhvhnl6o26o",
                    "userRecipientName": "test11",
                    "userSenderId": null,
                    "userSenderName": "系统",
                    "userUpdateId": null,
                    "userUpdateName": null
                },
                    {
                        "category": "流程",
                        "content": "test11：<br\/>&nbsp;&nbsp;&nbsp;&nbsp;您好！<br\/>&nbsp;&nbsp;&nbsp;&nbsp;你有以下任务：项目负责人审核，请及时处理。",
                        "id": "000000000000000000000000000000202006241126522661594hjiks2fel",
                        "name": "你有以下任务：项目负责人审核，请及时处理。",
                        "noticeId": null,
                        "state": "1",
                        "timeCreate": "2020-06-24",
                        "timeUpdate": null,
                        "type": "2",
                        "userCreateId": null,
                        "userCreateName": null,
                        "userRecipientId": "000000000000000000000000000000201806281223358542duhvhnl6o26o",
                        "userRecipientName": "test11",
                        "userSenderId": null,
                        "userSenderName": "系统",
                        "userUpdateId": null,
                        "userUpdateName": null
                    },
                    {
                        "category": "流程",
                        "content": "test11：<br\/>&nbsp;&nbsp;&nbsp;&nbsp;您好！<br\/>&nbsp;&nbsp;&nbsp;&nbsp;你有以下任务：项目负责人审核，请及时处理。",
                        "id": "0000000000000000000000000000002020061115524346147152bkltb18i",
                        "name": "你有以下任务：项目负责人审核，请及时处理。",
                        "noticeId": null,
                        "state": "1",
                        "timeCreate": "2020-06-11",
                        "timeUpdate": null,
                        "type": "2",
                        "userCreateId": null,
                        "userCreateName": null,
                        "userRecipientId": "000000000000000000000000000000201806281223358542duhvhnl6o26o",
                        "userRecipientName": "test11",
                        "userSenderId": null,
                        "userSenderName": "系统",
                        "userUpdateId": null,
                        "userUpdateName": null
                    },
                    {
                        "category": "任务",
                        "content": "您提交的单据：JK-000128发生退票,原因为：账户信息不正确,出纳处理意见为：12345678。<br\/>请及时联系出纳修改账户信息，以免影响正常收款，谢谢配合！",
                        "id": "00000000000000000000000000000020200602100644275239o6cka00msn",
                        "name": "单据JK-000128付款失败通知",
                        "noticeId": null,
                        "state": "1",
                        "timeCreate": "2020-06-02",
                        "timeUpdate": "2020-06-02",
                        "type": "1",
                        "userCreateId": null,
                        "userCreateName": null,
                        "userRecipientId": "000000000000000000000000000000201806281223358542duhvhnl6o26o",
                        "userRecipientName": "test11",
                        "userSenderId": null,
                        "userSenderName": "test11",
                        "userUpdateId": null,
                        "userUpdateName": null
                    },
                    {
                        "category": "任务",
                        "content": "您提交的单据：BX-000246发生退票,原因为：账户信息不正确,出纳处理意见为：123456。<br\/>请及时联系出纳修改账户信息，以免影响正常收款，谢谢配合！",
                        "id": "00000000000000000000000000000020200602100353691945b48kbf38vo",
                        "name": "单据BX-000246付款失败通知",
                        "noticeId": null,
                        "state": "1",
                        "timeCreate": "2020-06-02",
                        "timeUpdate": "2020-06-02",
                        "type": "1",
                        "userCreateId": null,
                        "userCreateName": null,
                        "userRecipientId": "000000000000000000000000000000201806281223358542duhvhnl6o26o",
                        "userRecipientName": "test11",
                        "userSenderId": null,
                        "userSenderName": "123456",
                        "userUpdateId": null,
                        "userUpdateName": null
                    },
                    {
                        "category": "任务",
                        "content": "采购项目:CGXM-2020-000025未付金额24.0已结转至2019年外科,离休费上年结转指标。<br\/>2019年请使用此指标开展采购支付业务。",
                        "id": "00000000000000000000000000000020200528123309060750wqqtout4km",
                        "name": "关联2018年外科指标：（离休费）的采购项目:CGXM-2020-000025已结转",
                        "noticeId": null,
                        "state": "1",
                        "timeCreate": "2020-05-28",
                        "timeUpdate": "2020-05-28",
                        "type": "1",
                        "userCreateId": null,
                        "userCreateName": null,
                        "userRecipientId": "000000000000000000000000000000201806281223358542duhvhnl6o26o",
                        "userRecipientName": "test11",
                        "userSenderId": null,
                        "userSenderName": "test11",
                        "userUpdateId": null,
                        "userUpdateName": null
                    },
                    {
                        "category": "任务",
                        "content": "采购项目:CGXM-2020-000026未付金额43.0已结转至2019年外科,离休费上年结转指标。<br\/>2019年请使用此指标开展采购支付业务。",
                        "id": "00000000000000000000000000000020200528123309296306u44ndfcljo",
                        "name": "关联2018年外科指标：（离休费）的采购项目:CGXM-2020-000026已结转",
                        "noticeId": null,
                        "state": "1",
                        "timeCreate": "2020-05-28",
                        "timeUpdate": "2020-05-28",
                        "type": "1",
                        "userCreateId": null,
                        "userCreateName": null,
                        "userRecipientId": "000000000000000000000000000000201806281223358542duhvhnl6o26o",
                        "userRecipientName": "test11",
                        "userSenderId": null,
                        "userSenderName": "test11",
                        "userUpdateId": null,
                        "userUpdateName": null
                    },
                    {
                        "category": "任务",
                        "content": "您好，您的<a href='#' onclick='do_view_pur_bid_doc_byId(\"00000000000000000000000000000020200528120650353897kwu418kqdm\")'>招标文件管理<\/a>,审批已经结束！",
                        "id": "00000000000000000000000000000020200528120711816062h9kcpnp1vn",
                        "name": "招标文件管理审批流程结束通知",
                        "noticeId": null,
                        "state": "1",
                        "timeCreate": "2020-05-28",
                        "timeUpdate": "2020-05-28",
                        "type": "1",
                        "userCreateId": null,
                        "userCreateName": null,
                        "userRecipientId": "000000000000000000000000000000201806281223358542duhvhnl6o26o",
                        "userRecipientName": "test11",
                        "userSenderId": null,
                        "userSenderName": "test11",
                        "userUpdateId": null,
                        "userUpdateName": null
                    }],
                columns: [
                    {
                        title: "消息名称",
                        key: "name",
                        tooltip: true,
                        ellipsis: true,
                        render: (h, params) => {
                            return h(
                                "a",
                                {
                                    on: {
                                        click: () => {
                                        }
                                    }
                                },
                                params.row.name
                            );
                        }
                    },
                    {
                        title: "分类",
                        key: "category",
                        width: 90
                    },
                    {
                        title: "发送人",
                        key: "userSenderName",
                        width: 90
                    },
                    {
                        title: "发送时间",
                        key: "timeCreate"
                    }
                ]
            };
        },
        computed: {
            currNav() {
                return this.$store.state.app.currNav;
            },
            avatarPath() {
                return 'http://static.kdcodes.cn/def_mal.png';
            }
        },
        methods: {
            init() {
                let userInfo = JSON.parse(Cookies.get("userInfo"));
                this.username = userInfo.nickname;
                ipInfo().then(res => {
                    if (res.success) {
                        this.city = res.result;
                    }
                });
            },
            showNotice() {
                getNotice().then(res => {
                    if (res.success) {
                        if (!res.result) {
                            return;
                        }
                        let data = res.result;
                        if (
                            data.open &&
                            (data.title || data.content) &&
                            data.position == "HOME"
                        ) {
                            this.$Notice.info({
                                title: data.title,
                                desc: data.content,
                                duration: data.duration
                            });
                        }
                    }
                });
            }
        },
        mounted() {
            this.init();
        }
    };
</script>
