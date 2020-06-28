<style lang="less">
    @import "./home.less";
    @import "../../styles/common.less";

    .tt-s {
        color: #000;

        &.active {
            color: #2d8cf0;
        }
    }
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
                                    <a class="tt-s" @click="setMap(1)" :class="{'active': currMenu === 1}">全国出差情况</a>
                                    <a class="tt-s" style="margin-left: 12px" @click="setMap(2)"
                                       :class="{'active': currMenu === 2}">海口市出差情况</a>
                                </p>
                                <div
                                        id="comments"
                                        class="comment-container"
                                >
                                    <el-amap vid="amapUpstream" :animate-enable="false" :expand-zoom-range="true"
                                             :zoom-enable="false"
                                             :jog-enable="false" :double-click-zoom="false" :default-cursor="'move'"
                                             :center="center" :zoom="zoom" :events="events" :zooms="zooms"
                                             style="flex: 1;">
                                        <el-amap-info-window
                                                :position="currentWindow.position"
                                                :content="currentWindow.content"
                                                :visible="currentWindow.visible"
                                                :events="currentWindow.events">
                                        </el-amap-info-window>
                                    </el-amap>
                                </div>
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

    let polygons = [];

    export default {
        name: "home",
        components: {
            visitVolume,
            visitSeparation,
            infoCard
        },
        data() {
            return {
                currMenu: 1,
                zoom: 4,
                zooms: [4, 12],
                center: [105.404, 34.915],
                areaName: '全国',
                cacheAreaName: '', // 缓存区域名称
                events: {
                    init: (map) => {
                        AMapUI.loadUI(['control/BasicControl', 'misc/PointSimplifier'], (BasicControl, PointSimplifier) => {
                            this.map = map;
                            this.initMap(BasicControl, PointSimplifier);
                            this.map.setMapStyle('amap://styles/811d604cccbfcf9b8386c39c837d83bd');
                        });
                    },
                    click(e) {
                        // 这里通过高德 SDK 完成。
                        let geocoder = new AMap.Geocoder({
                            radius: 1000,
                            extensions: 'all'
                        });
                        let {lng, lat} = e.lnglat;
                        geocoder.getAddress([lng, lat], function (status, result) {
                            if (status === 'complete' && result.info === 'OK') {
                                if (result && result.regeocode) {
                                    // console.log(result.regeocode);
                                }
                            }
                        });
                    }
                },
                currentWindow: {
                    position: [0, 0],
                    content: '',
                    events: {},
                    visible: false
                },
                showVideo: false,
                count: {
                    createUser: 149,
                    visit: 13,
                    collection: 56,
                    transfer: 8.9
                },
                city: "",
                username: "",
                data: [
                    {
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
            },
            initMap(BasicControl, PointSimplifier) {
                // 初始化行政区
                let opts = {
                    subdistrict: 0, // 返回下一级行政区
                    showbiz: false, // 最后一级返回街道信息
                    level: 'district',
                    extensions: 'all'
                };
                this.district = new AMap.DistrictSearch(opts);

                this.pointSimplifierIns = new PointSimplifier({
                    map: this.map, // 所属的地图实例
                    autoSetFitView: false, // 禁止自动更新地图视野
                    zIndex: 190,
                    getPosition: (item) => {
                        if (!item) {
                            return null;
                        }
                        // 返回经纬度
                        return item.lngLatLine.split(",");
                    },
                    getHoverTitle: (dataItem, idx) => {
                        // console.log(dataItem);
                        return `<p>姓名：${dataItem.name}</p><p>申请单：${dataItem.no}</p>`;
                    },
                    renderConstructor: PointSimplifier.Render.Canvas.GroupStyleRender,
                    renderOptions: {
                        // 点的样式
                        pointStyle: {
                            width: 6,
                            height: 6,
                            fillStyle: 'rgb(0, 133, 255)',
                            lineWidth: 3,
                            strokeStyle: 'rgba(0, 133, 255, 0.2)'
                        },
                        pointHoverStyle: {
                            width: 10,
                            height: 10,
                            fillStyle: 'rgb(0, 133, 255)',
                            lineWidth: 4,
                            strokeStyle: 'rgba(0, 133, 255, 0.2)'
                        },
                        // 鼠标hover时的title信息
                        hoverTitleStyle: {
                            position: 'top',
                            classNames: 'redTest'
                        },
                        topNAreaStyle: {
                            autoGlobalAlphaAlpha: [0, 0]
                        },
                        getGroupId: function (item, idx) {

                            return item.groupId;
                        },
                        groupStyleOptions: function (gid) {

                            return groupStyleMap[gid];
                        }
                    }
                });
                const onIconLoad = () => {
                    this.pointSimplifierIns.renderLater();
                };

                function onIconError(e) {
                    alert('图片加载失败！');
                }

                const groupStyleMap = {
                    '0': {
                        pointStyle: {
                            //绘制点占据的矩形区域
                            content: PointSimplifier.Render.Canvas.getImageContent(
                                'https://webapi.amap.com/ui/1.1/ui/misc/PointSimplifier/examples/imgs/bike.png', onIconLoad, onIconError),
                            //宽度
                            width: 16,
                            //高度
                            height: 16,
                            //定位点为中心
                            offset: ['-50%', '-50%'],
                            fillStyle: null,
                            //strokeStyle: null
                        }
                    },
                    '1': {
                        pointStyle: {
                            //绘制点占据的矩形区域
                            content: PointSimplifier.Render.Canvas.getImageContent(
                                'https://webapi.amap.com/ui/1.1/ui/misc/PointSimplifier/examples/imgs/people.png', onIconLoad, onIconError),
                            //宽度
                            width: 16,
                            //高度
                            height: 16,
                            //定位点为中心
                            offset: ['-50%', '-50%'],
                            fillStyle: null,
                            // strokeStyle: null
                        }
                    },
                    '2': {
                        pointStyle: {
                            //绘制点占据的矩形区域
                            content: PointSimplifier.Render.Canvas.getImageContent(
                                'https://webapi.amap.com/ui/1.1/ui/misc/PointSimplifier/examples/imgs/truck.png', onIconLoad, onIconError),
                            //宽度
                            width: 16,
                            //高度
                            height: 16,
                            //定位点为中心
                            offset: ['-50%', '-50%'],
                            fillStyle: null,
                            //strokeStyle: null
                        }
                    },
                    '3': {
                        pointStyle: {
                            //绘制点占据的矩形区域
                            content: PointSimplifier.Render.Canvas.getImageContent(
                                'https://webapi.amap.com/ui/1.1/ui/misc/PointSimplifier/examples/imgs/taxi.png', onIconLoad, onIconError),
                            //宽度
                            width: 16,
                            //高度
                            height: 16,
                            //定位点为中心
                            offset: ['-50%', '-50%'],
                            fillStyle: null,
                            //strokeStyle: null
                        }
                    }
                };
                window.setMapParams = (name, type, id) => {
                    let params = {
                        baseInformation: this.downstreamTypeText[this.mapFilterData.downstreamType],
                        name: this.areaName,
                        zoom: this.map.getZoom(),
                        mapFilterData: this.mapFilterData,
                        center: this.areaSelectCenter,
                        filterType: this.filterType
                    };
                    this.setMapStep(JSON.stringify(params));
                    this.$router.push({name, params: {type, id}});
                };
                // this.pointSimplifierIns.on('pointClick', (e, record) => {
                //     this.currentWindow.visible = false;
                //     this.$nextTick(() => {
                //         this.currentWindow.visible = true;
                //         this.currentWindow.position = record.data.lngLatLine;
                //         this.currentWindow.content = `<span>${record.data.name}</span>`;
                //     });
                // });
                let ddd = [
                    {
                        "lngLatLine": "113.864691,22.942327",
                        "groupId": 1,
                        "name": "汤勇",
                        "no": 5563292580288060
                    }, {
                        "lngLatLine": "120.412618,36.382612",
                        "groupId": 1,
                        "name": "杨敏",
                        "no": 4995246358719300
                    }, {
                        "lngLatLine": "113.370643,22.938827",
                        "groupId": 1,
                        "name": "余静",
                        "no": 4614622633516321
                    }, {
                        "lngLatLine": "113.001181,23.120518",
                        "groupId": 1,
                        "name": "魏杰",
                        "no": 7618350936393732
                    }, {
                        "lngLatLine": "112.985037,23.15046",
                        "groupId": 1,
                        "name": "陈敏",
                        "no": 722864702225568
                    }, {
                        "lngLatLine": "113.890205,22.798043",
                        "groupId": 1,
                        "name": "邹娟",
                        "no": 7349118382385829
                    }, {
                        "lngLatLine": "110.361899,20.026695",
                        "groupId": 1,
                        "name": "汪明",
                        "no": 1631479873032551
                    }, {
                        "lngLatLine": "113.682288,34.618975",
                        "groupId": 1,
                        "name": "毛秀英",
                        "no": 941072419555643
                    }, {
                        "lngLatLine": "121.434529,31.215641",
                        "groupId": 1,
                        "name": "段娟",
                        "no": 4337801241196650
                    }, {
                        "lngLatLine": "109.488707,18.309754",
                        "groupId": 1,
                        "name": "张平",
                        "no": 3471866364422668
                    }, {
                        "lngLatLine": "120.682502,28.011099",
                        "groupId": 1,
                        "name": "石芳",
                        "no": 4604158853872624
                    }, {
                        "lngLatLine": "120.68556,30.912366",
                        "groupId": 1,
                        "name": "熊秀兰",
                        "no": 7520263018780127
                    }, {
                        "lngLatLine": "126.687123,45.787618",
                        "groupId": 1,
                        "name": "丁丽",
                        "no": 7759634646441317
                    }, {
                        "lngLatLine": "120.48506,30.053066",
                        "groupId": 1,
                        "name": "陆秀兰",
                        "no": 1228400646772282
                    }, {
                        "lngLatLine": "103.970724,30.397931",
                        "groupId": 1,
                        "name": "彭涛",
                        "no": 1097631337627283
                    }, {
                        "lngLatLine": "117.270073,37.96162",
                        "groupId": 1,
                        "name": "范强",
                        "no": 4612227231239023
                    }, {
                        "lngLatLine": "117.212164,31.831641",
                        "groupId": 1,
                        "name": "方娟",
                        "no": 8525568925943567
                    }, {
                        "lngLatLine": "120.256218,31.882242",
                        "groupId": 1,
                        "name": "孙勇",
                        "no": 7073075268355033
                    }, {
                        "lngLatLine": "121.411101,31.059407",
                        "groupId": 1,
                        "name": "邹洋",
                        "no": 1623977550753727
                    }, {
                        "lngLatLine": "113.336586,33.729581",
                        "groupId": 1,
                        "name": "汤杰",
                        "no": 3472606818303177
                    }, {
                        "lngLatLine": "104.137953,30.784276",
                        "groupId": 1,
                        "name": "韩刚",
                        "no": 1328169144388300
                    }, {
                        "lngLatLine": "114.141516,23.159282",
                        "groupId": 1,
                        "name": "姚桂英",
                        "no": 2469538665071117
                    }, {
                        "lngLatLine": "120.499683,30.042305",
                        "groupId": 1,
                        "name": "孙超",
                        "no": 2788416854033714
                    }, {
                        "lngLatLine": "120.487242,32.180365",
                        "groupId": 1,
                        "name": "邓超",
                        "no": 8940979855840804
                    }, {
                        "lngLatLine": "108.94686,34.362975",
                        "groupId": 1,
                        "name": "龙超",
                        "no": 1869990297651712
                    }, {
                        "lngLatLine": "121.299895,31.105064",
                        "groupId": 1,
                        "name": "黎杰",
                        "no": 1340854811499983
                    }, {
                        "lngLatLine": "112.873295,22.920901",
                        "groupId": 1,
                        "name": "魏平",
                        "no": 4804318286417664
                    }, {
                        "lngLatLine": "114.164329,22.644532",
                        "groupId": 1,
                        "name": "姜涛",
                        "no": 4289371311610384
                    }, {
                        "lngLatLine": "113.373916,23.086728",
                        "groupId": 1,
                        "name": "汤洋",
                        "no": 7389445446625140
                    }, {
                        "lngLatLine": "120.282954,30.196059",
                        "groupId": 1,
                        "name": "史秀兰",
                        "no": 5802633692242642
                    }, {
                        "lngLatLine": "113.250159,23.075847",
                        "groupId": 1,
                        "name": "任平",
                        "no": 235857563960156
                    }, {
                        "lngLatLine": "121.145445,31.193621",
                        "groupId": 1,
                        "name": "曾超",
                        "no": 7723796745172979
                    }, {
                        "lngLatLine": "116.675933,39.986343",
                        "groupId": 1,
                        "name": "崔娜",
                        "no": 1416173713496990
                    }, {
                        "lngLatLine": "120.896422,31.472813",
                        "groupId": 1,
                        "name": "陆敏",
                        "no": 273861731592336
                    }, {
                        "lngLatLine": "120.75997,31.734934",
                        "groupId": 1,
                        "name": "尹涛",
                        "no": 3348315088763957
                    }, {
                        "lngLatLine": "118.782607,32.00381",
                        "groupId": 1,
                        "name": "邓强",
                        "no": 657297543717916
                    }, {
                        "lngLatLine": "118.314741,32.26999",
                        "groupId": 1,
                        "name": "萧静",
                        "no": 6124637159441846
                    }, {
                        "lngLatLine": "105.268729,23.732875",
                        "groupId": 1,
                        "name": "唐超",
                        "no": 2236490132369931
                    }, {
                        "lngLatLine": "111.723311,34.771838",
                        "groupId": 1,
                        "name": "徐静",
                        "no": 4079302296820065
                    }, {
                        "lngLatLine": "120.169746,33.357616",
                        "groupId": 1,
                        "name": "锺明",
                        "no": 3848497249533014
                    }, {
                        "lngLatLine": "119.537126,26.200017",
                        "groupId": 1,
                        "name": "邹磊",
                        "no": 5182610759330716
                    }, {
                        "lngLatLine": "119.953287,37.165859",
                        "groupId": 1,
                        "name": "秦芳",
                        "no": 8506754121857646
                    }, {
                        "lngLatLine": "113.830123,23.00734",
                        "groupId": 1,
                        "name": "吴伟",
                        "no": 6957755560865387
                    }, {
                        "lngLatLine": "100.70191,25.408898",
                        "groupId": 1,
                        "name": "田秀英",
                        "no": 386533877234187
                    }, {
                        "lngLatLine": "119.273795,26.060002",
                        "groupId": 1,
                        "name": "阎丽",
                        "no": 3968784166058136
                    }, {
                        "lngLatLine": "121.373427,31.188567",
                        "groupId": 1,
                        "name": "何芳",
                        "no": 5594672392106141
                    }, {
                        "lngLatLine": "116.466752,39.951042",
                        "groupId": 1,
                        "name": "林洋",
                        "no": 6558289381873949
                    }, {
                        "lngLatLine": "119.276396,33.761172",
                        "groupId": 1,
                        "name": "武桂英",
                        "no": 3431114542706991
                    }, {
                        "lngLatLine": "114.20716,22.777829",
                        "groupId": 1,
                        "name": "龚桂英",
                        "no": 2671020073302397
                    }, {
                        "lngLatLine": "115.690291,25.098436",
                        "groupId": 1,
                        "name": "梁刚",
                        "no": 442886091069456
                    }, {
                        "lngLatLine": "126.118338,45.11481",
                        "groupId": 1,
                        "name": "郝军",
                        "no": 8034256254062988
                    }, {
                        "lngLatLine": "117.668326,30.683932",
                        "groupId": 1,
                        "name": "叶秀英",
                        "no": 6168321388455928
                    }, {
                        "lngLatLine": "116.366324,39.781077",
                        "groupId": 1,
                        "name": "刘秀英",
                        "no": 6324084428707057
                    }, {
                        "lngLatLine": "106.563101,29.583974",
                        "groupId": 1,
                        "name": "毛娜",
                        "no": 2713026247116148
                    }, {
                        "lngLatLine": "120.377998,31.578216",
                        "groupId": 1,
                        "name": "张静",
                        "no": 2066083316321262
                    }, {
                        "lngLatLine": "112.50952,37.899569",
                        "groupId": 1,
                        "name": "文芳",
                        "no": 2245861071609209
                    }, {
                        "lngLatLine": "116.611935,23.66941",
                        "groupId": 1,
                        "name": "黎敏",
                        "no": 1108239909581186
                    }, {
                        "lngLatLine": "121.07145,31.10094",
                        "groupId": 1,
                        "name": "贺艳",
                        "no": 5152848315410317
                    }, {
                        "lngLatLine": "103.787344,30.940037",
                        "groupId": 1,
                        "name": "阎明",
                        "no": 1048615018243874
                    }, {
                        "lngLatLine": "116.161048,31.977315",
                        "groupId": 1,
                        "name": "夏艳",
                        "no": 552934102763822
                    }, {
                        "lngLatLine": "112.911223,23.164952",
                        "groupId": 1,
                        "name": "叶明",
                        "no": 7282389843648779
                    }, {
                        "lngLatLine": "113.90795,22.473978",
                        "groupId": 1,
                        "name": "叶桂英",
                        "no": 3739932869238616
                    }, {
                        "lngLatLine": "121.946335,39.403784",
                        "groupId": 1,
                        "name": "宋娟",
                        "no": 8464848400352850
                    }, {
                        "lngLatLine": "120.44004,31.561242",
                        "groupId": 1,
                        "name": "萧秀英",
                        "no": 1387261838335886
                    }, {
                        "lngLatLine": "120.172545,36.009391",
                        "groupId": 1,
                        "name": "赵涛",
                        "no": 6598474353965876
                    }, {
                        "lngLatLine": "117.3571,31.859773",
                        "groupId": 1,
                        "name": "张刚",
                        "no": 8092327293488450
                    }, {
                        "lngLatLine": "126.609854,45.722514",
                        "groupId": 1,
                        "name": "陆洋",
                        "no": 4611526001361696
                    }, {
                        "lngLatLine": "113.448233,22.652566",
                        "groupId": 1,
                        "name": "邹平",
                        "no": 6892750946784722
                    }, {
                        "lngLatLine": "120.531699,32.402873",
                        "groupId": 1,
                        "name": "朱霞",
                        "no": 1829297224266551
                    }, {
                        "lngLatLine": "102.911877,25.091979",
                        "groupId": 1,
                        "name": "方超",
                        "no": 7300899571434858
                    }, {
                        "lngLatLine": "118.914313,32.013572",
                        "groupId": 1,
                        "name": "武娜",
                        "no": 1761936066613978
                    }, {
                        "lngLatLine": "114.842647,28.133165",
                        "groupId": 1,
                        "name": "贾静",
                        "no": 8849718592227177
                    }, {
                        "lngLatLine": "126.597762,45.739299",
                        "groupId": 1,
                        "name": "顾桂英",
                        "no": 1673466463361382
                    }, {
                        "lngLatLine": "114.876072,33.773379",
                        "groupId": 1,
                        "name": "戴刚",
                        "no": 7585841759142984
                    }, {
                        "lngLatLine": "106.540999,29.520217",
                        "groupId": 1,
                        "name": "方磊",
                        "no": 244101211944303
                    }, {
                        "lngLatLine": "119.437188,32.440656",
                        "groupId": 1,
                        "name": "蔡霞",
                        "no": 1140502455800808
                    }, {
                        "lngLatLine": "114.033057,22.733424",
                        "groupId": 1,
                        "name": "胡芳",
                        "no": 4630866676764011
                    }, {
                        "lngLatLine": "119.342481,26.050688",
                        "groupId": 1,
                        "name": "苏超",
                        "no": 1410300337193758
                    }, {
                        "lngLatLine": "104.041129,30.598338",
                        "groupId": 1,
                        "name": "锺军",
                        "no": 3018251482891523
                    }, {
                        "lngLatLine": "113.931555,22.607629",
                        "groupId": 1,
                        "name": "李娟",
                        "no": 681501456546529
                    }, {
                        "lngLatLine": "119.917693,32.484184",
                        "groupId": 1,
                        "name": "龙强",
                        "no": 728958508331331
                    }, {
                        "lngLatLine": "113.072203,27.813351",
                        "groupId": 1,
                        "name": "胡霞",
                        "no": 2631404634880065
                    }, {
                        "lngLatLine": "118.371124,35.082682",
                        "groupId": 1,
                        "name": "高艳",
                        "no": 4580384113649061
                    }, {
                        "lngLatLine": "116.512489,39.822105",
                        "groupId": 1,
                        "name": "贺涛",
                        "no": 8561543469694637
                    }, {
                        "lngLatLine": "120.926368,31.320681",
                        "groupId": 1,
                        "name": "冯杰",
                        "no": 8678856674274873
                    }, {
                        "lngLatLine": "113.714414,27.200748",
                        "groupId": 1,
                        "name": "陈静",
                        "no": 4961177603765760
                    }, {
                        "lngLatLine": "120.355238,31.557524",
                        "groupId": 1,
                        "name": "戴军",
                        "no": 8989199176628778
                    }, {
                        "lngLatLine": "118.178065,39.817421",
                        "groupId": 1,
                        "name": "邹丽",
                        "no": 7329190146692825
                    }, {
                        "lngLatLine": "101.775209,36.614975",
                        "groupId": 1,
                        "name": "田强",
                        "no": 4512057878368555
                    }, {
                        "lngLatLine": "120.639151,31.637379",
                        "groupId": 1,
                        "name": "黎涛",
                        "no": 287191892314327
                    }, {
                        "lngLatLine": "114.499404,34.646022",
                        "groupId": 1,
                        "name": "周勇",
                        "no": 5009144236123143
                    }, {
                        "lngLatLine": "120.952625,32.001205",
                        "groupId": 1,
                        "name": "汤刚",
                        "no": 1514564521389803
                    }, {
                        "lngLatLine": "118.087516,24.474988",
                        "groupId": 1,
                        "name": "孔伟",
                        "no": 1744216845978822
                    }, {
                        "lngLatLine": "113.847968,22.595779",
                        "groupId": 1,
                        "name": "尹桂英",
                        "no": 5657890023067320
                    }, {
                        "lngLatLine": "104.638952,30.1253",
                        "groupId": 1,
                        "name": "胡敏",
                        "no": 6209035062598821
                    }, {
                        "lngLatLine": "119.632277,32.022715",
                        "groupId": 1,
                        "name": "卢霞",
                        "no": 4748744753234202
                    }, {
                        "lngLatLine": "116.492237,39.991802",
                        "groupId": 1,
                        "name": "郑磊",
                        "no": 7998406486287292
                    }, {
                        "lngLatLine": "114.30078,22.715682",
                        "groupId": 1,
                        "name": "傅勇",
                        "no": 6054545030956032
                    }, {
                        "lngLatLine": "112.898903,32.04371",
                        "groupId": 1,
                        "name": "锺秀英",
                        "no": 2103676264846201
                    }, {
                        "lngLatLine": "112.512107,23.065747",
                        "groupId": 1,
                        "name": "蔡平",
                        "no": 4239332415269258
                    }, {
                        "lngLatLine": "114.104018,22.626803",
                        "groupId": 1,
                        "name": "陈芳",
                        "no": 3072550169400637
                    }, {
                        "lngLatLine": "107.106742,25.849819",
                        "groupId": 1,
                        "name": "邱艳",
                        "no": 2242296625312453
                    }, {
                        "lngLatLine": "119.969664,30.26186",
                        "groupId": 1,
                        "name": "任桂英",
                        "no": 8742122008851756
                    }, {
                        "lngLatLine": "113.359857,22.519652",
                        "groupId": 1,
                        "name": "宋军",
                        "no": 1190899368209556
                    }, {
                        "lngLatLine": "119.530013,39.935889",
                        "groupId": 1,
                        "name": "宋明",
                        "no": 6555545189276352
                    }, {
                        "lngLatLine": "117.377447,38.403876",
                        "groupId": 1,
                        "name": "余刚",
                        "no": 3975673016011310
                    }, {
                        "lngLatLine": "77.254607,39.050215",
                        "groupId": 1,
                        "name": "郝洋",
                        "no": 5402019097778059
                    }, {
                        "lngLatLine": "126.660514,45.781893",
                        "groupId": 1,
                        "name": "锺娜",
                        "no": 6208953096819183
                    }, {
                        "lngLatLine": "117.085608,36.652113",
                        "groupId": 1,
                        "name": "姜静",
                        "no": 3243472325751555
                    }, {
                        "lngLatLine": "120.775986,31.520694",
                        "groupId": 1,
                        "name": "毛娟",
                        "no": 4343925758369278
                    }, {
                        "lngLatLine": "120.292808,30.299244",
                        "groupId": 1,
                        "name": "彭超",
                        "no": 7714474747217079
                    }, {
                        "lngLatLine": "120.040175,28.899236",
                        "groupId": 1,
                        "name": "徐勇",
                        "no": 2604193465677435
                    }, {
                        "lngLatLine": "114.397917,23.545706",
                        "groupId": 1,
                        "name": "贺涛",
                        "no": 3472429762080919
                    }, {
                        "lngLatLine": "113.83515,23.093211",
                        "groupId": 1,
                        "name": "武秀兰",
                        "no": 7901958952863295
                    }, {
                        "lngLatLine": "120.273933,30.236666",
                        "groupId": 1,
                        "name": "朱勇",
                        "no": 6505539835220641
                    }, {
                        "lngLatLine": "113.113074,22.753023",
                        "groupId": 1,
                        "name": "丁秀兰",
                        "no": 7551299250888006
                    }, {
                        "lngLatLine": "121.622443,31.152955",
                        "groupId": 1,
                        "name": "尹超",
                        "no": 1595179872439457
                    }, {
                        "lngLatLine": "118.16531,30.720869",
                        "groupId": 1,
                        "name": "金娜",
                        "no": 8766024233499320
                    }, {
                        "lngLatLine": "116.417093,39.96918",
                        "groupId": 1,
                        "name": "薛霞",
                        "no": 8766962801779887
                    }, {
                        "lngLatLine": "121.435805,31.216004",
                        "groupId": 1,
                        "name": "姜明",
                        "no": 1260519264526737
                    }, {
                        "lngLatLine": "113.799453,22.724031",
                        "groupId": 1,
                        "name": "冯敏",
                        "no": 1399307140825211
                    }, {
                        "lngLatLine": "120.683491,31.169335",
                        "groupId": 1,
                        "name": "郑秀兰",
                        "no": 6493780447000584
                    }, {
                        "lngLatLine": "123.264175,41.768478",
                        "groupId": 1,
                        "name": "锺磊",
                        "no": 3284132453529050
                    }, {
                        "lngLatLine": "119.881789,31.884114",
                        "groupId": 1,
                        "name": "袁娟",
                        "no": 5299802163914678
                    }, {
                        "lngLatLine": "120.626128,30.822477",
                        "groupId": 1,
                        "name": "姚敏",
                        "no": 2658325834565863
                    }, {
                        "lngLatLine": "115.326422,22.964796",
                        "groupId": 1,
                        "name": "谢强",
                        "no": 4581889293781783
                    }, {
                        "lngLatLine": "115.826361,33.812392",
                        "groupId": 1,
                        "name": "袁强",
                        "no": 968394896710509
                    }, {
                        "lngLatLine": "125.254523,43.829852",
                        "groupId": 1,
                        "name": "陆秀兰",
                        "no": 8684129173068285
                    }, {
                        "lngLatLine": "106.561797,26.579832",
                        "groupId": 1,
                        "name": "邹霞",
                        "no": 4229309119338007
                    }, {
                        "lngLatLine": "112.44152,34.662344",
                        "groupId": 1,
                        "name": "薛敏",
                        "no": 922675262205076
                    }, {
                        "lngLatLine": "117.285766,34.806079",
                        "groupId": 1,
                        "name": "毛伟",
                        "no": 23362220206334
                    }, {
                        "lngLatLine": "120.296738,31.525176",
                        "groupId": 1,
                        "name": "邓洋",
                        "no": 3821515130940278
                    }, {
                        "lngLatLine": "111.035766,21.535775",
                        "groupId": 1,
                        "name": "韩艳",
                        "no": 3087088151702995
                    }, {
                        "lngLatLine": "118.581412,37.642646",
                        "groupId": 1,
                        "name": "侯伟",
                        "no": 8588077178473703
                    }, {
                        "lngLatLine": "115.701728,24.066784",
                        "groupId": 1,
                        "name": "黎杰",
                        "no": 4621311791260433
                    }, {
                        "lngLatLine": "113.360297,22.962038",
                        "groupId": 1,
                        "name": "夏杰",
                        "no": 5867928959463601
                    }, {
                        "lngLatLine": "104.061447,30.67089",
                        "groupId": 1,
                        "name": "锺强",
                        "no": 8698730577677166
                    }, {
                        "lngLatLine": "121.208556,31.421659",
                        "groupId": 1,
                        "name": "邱霞",
                        "no": 7912185473434158
                    }, {
                        "lngLatLine": "121.123465,31.134162",
                        "groupId": 1,
                        "name": "夏杰",
                        "no": 2861297836825050
                    }, {
                        "lngLatLine": "121.460029,28.655284",
                        "groupId": 1,
                        "name": "侯平",
                        "no": 8938586929633558
                    }, {
                        "lngLatLine": "104.039519,30.719365",
                        "groupId": 1,
                        "name": "陆涛",
                        "no": 738449932422946
                    }, {
                        "lngLatLine": "121.444419,28.345353",
                        "groupId": 1,
                        "name": "方丽",
                        "no": 5004873156501383
                    }, {
                        "lngLatLine": "116.625662,39.619879",
                        "groupId": 1,
                        "name": "赖洋",
                        "no": 4282686845381462
                    }, {
                        "lngLatLine": "121.300635,31.140721",
                        "groupId": 1,
                        "name": "龚明",
                        "no": 5081211362426035
                    }, {
                        "lngLatLine": "108.20204,28.004321",
                        "groupId": 1,
                        "name": "叶刚",
                        "no": 3595070065158787
                    }, {
                        "lngLatLine": "116.084446,28.336149",
                        "groupId": 1,
                        "name": "贾磊",
                        "no": 6060078059036510
                    }, {
                        "lngLatLine": "113.606513,34.807402",
                        "groupId": 1,
                        "name": "王娟",
                        "no": 527113464787291
                    }, {
                        "lngLatLine": "113.012481,23.02401",
                        "groupId": 1,
                        "name": "薛杰",
                        "no": 5917419422357320
                    }, {
                        "lngLatLine": "120.213822,30.112851",
                        "groupId": 1,
                        "name": "谢超",
                        "no": 1342984580850487
                    }, {
                        "lngLatLine": "121.384539,28.411516",
                        "groupId": 1,
                        "name": "杨勇",
                        "no": 5417465657130791
                    }, {
                        "lngLatLine": "120.727637,27.798264",
                        "groupId": 1,
                        "name": "白敏",
                        "no": 5555258925453206
                    }, {
                        "lngLatLine": "114.556304,33.470221",
                        "groupId": 1,
                        "name": "郭军",
                        "no": 8796681134837904
                    }, {
                        "lngLatLine": "116.452761,39.951122",
                        "groupId": 1,
                        "name": "于秀兰",
                        "no": 115646904908596
                    }, {
                        "lngLatLine": "115.853758,28.661246",
                        "groupId": 1,
                        "name": "梁勇",
                        "no": 1525587836232064
                    }, {
                        "lngLatLine": "119.555363,39.932751",
                        "groupId": 1,
                        "name": "谢秀兰",
                        "no": 1787256964221474
                    }, {
                        "lngLatLine": "113.978576,22.526649",
                        "groupId": 1,
                        "name": "侯娟",
                        "no": 565892397003974
                    }, {
                        "lngLatLine": "120.227111,30.347169",
                        "groupId": 1,
                        "name": "许丽",
                        "no": 440531698524779
                    }, {
                        "lngLatLine": "107.380653,30.314754",
                        "groupId": 1,
                        "name": "常桂英",
                        "no": 3565858406069019
                    }, {
                        "lngLatLine": "113.377157,31.797137",
                        "groupId": 1,
                        "name": "杜桂英",
                        "no": 5529219454982905
                    }, {
                        "lngLatLine": "109.801429,39.601562",
                        "groupId": 1,
                        "name": "段芳",
                        "no": 6843167207328733
                    }, {
                        "lngLatLine": "113.334007,23.107744",
                        "groupId": 1,
                        "name": "薛娜",
                        "no": 6784672512800228
                    }, {
                        "lngLatLine": "103.984839,30.68303",
                        "groupId": 1,
                        "name": "姜静",
                        "no": 2696469504926183
                    }, {
                        "lngLatLine": "112.641848,22.362319",
                        "groupId": 1,
                        "name": "吕艳",
                        "no": 5819947677365623
                    }, {
                        "lngLatLine": "104.021757,30.559601",
                        "groupId": 1,
                        "name": "薛艳",
                        "no": 8945795279315310
                    }, {
                        "lngLatLine": "102.672195,24.974215",
                        "groupId": 1,
                        "name": "曹霞",
                        "no": 2654113444692410
                    }, {
                        "lngLatLine": "116.729346,23.366757",
                        "groupId": 1,
                        "name": "袁丽",
                        "no": 8881383474508874
                    }, {
                        "lngLatLine": "120.190691,30.305693",
                        "groupId": 1,
                        "name": "尹磊",
                        "no": 1252720244541505
                    }, {
                        "lngLatLine": "121.306044,37.479827",
                        "groupId": 1,
                        "name": "钱秀兰",
                        "no": 1089870694784168
                    }, {
                        "lngLatLine": "117.023543,36.679076",
                        "groupId": 1,
                        "name": "高平",
                        "no": 4930588419971134
                    }, {
                        "lngLatLine": "119.89984,32.866023",
                        "groupId": 1,
                        "name": "李秀兰",
                        "no": 6763940044081423
                    }, {
                        "lngLatLine": "118.868849,31.918515",
                        "groupId": 1,
                        "name": "唐涛",
                        "no": 5943970896901041
                    }, {
                        "lngLatLine": "125.227551,43.904597",
                        "groupId": 1,
                        "name": "胡霞",
                        "no": 8917691307174065
                    }, {
                        "lngLatLine": "121.473372,31.235574",
                        "groupId": 1,
                        "name": "段秀英",
                        "no": 4244410729100788
                    }, {
                        "lngLatLine": "121.659163,31.155906",
                        "groupId": 1,
                        "name": "廖军",
                        "no": 1541154419278931
                    }, {
                        "lngLatLine": "116.526635,37.131774",
                        "groupId": 1,
                        "name": "钱娟",
                        "no": 5234356015894337
                    }, {
                        "lngLatLine": "112.559441,34.628217",
                        "groupId": 1,
                        "name": "夏平",
                        "no": 8348448507282909
                    }, {
                        "lngLatLine": "113.294417,23.159512",
                        "groupId": 1,
                        "name": "蒋艳",
                        "no": 201138579918177
                    }, {
                        "lngLatLine": "106.749029,26.5651",
                        "groupId": 1,
                        "name": "范秀英",
                        "no": 1636751443624693
                    }, {
                        "lngLatLine": "120.163756,30.39902",
                        "groupId": 1,
                        "name": "徐洋",
                        "no": 4155869505442104
                    }, {
                        "lngLatLine": "116.151391,39.161228",
                        "groupId": 1,
                        "name": "杜勇",
                        "no": 1072939860301969
                    }, {
                        "lngLatLine": "121.640998,38.908202",
                        "groupId": 1,
                        "name": "张静",
                        "no": 7783557587441359
                    }, {
                        "lngLatLine": "123.390898,41.771258",
                        "groupId": 1,
                        "name": "潘刚",
                        "no": 2644172143640151
                    }, {
                        "lngLatLine": "112.767577,22.445482",
                        "groupId": 1,
                        "name": "邓明",
                        "no": 101002511768844
                    }, {
                        "lngLatLine": "113.617148,34.988813",
                        "groupId": 1,
                        "name": "蔡洋",
                        "no": 927188854351977
                    }, {
                        "lngLatLine": "117.287658,31.873351",
                        "groupId": 1,
                        "name": "侯敏",
                        "no": 2405404638738340
                    }, {
                        "lngLatLine": "109.132634,34.586277",
                        "groupId": 1,
                        "name": "姜静",
                        "no": 6377145003835108
                    }, {
                        "lngLatLine": "117.219603,39.211753",
                        "groupId": 1,
                        "name": "姜艳",
                        "no": 7726245435548580
                    }, {
                        "lngLatLine": "118.74152,37.460401",
                        "groupId": 1,
                        "name": "袁娟",
                        "no": 8821105878092363
                    }, {
                        "lngLatLine": "113.859931,22.971467",
                        "groupId": 1,
                        "name": "萧芳",
                        "no": 5635715316612353
                    }, {
                        "lngLatLine": "120.206068,30.208895",
                        "groupId": 1,
                        "name": "蒋洋",
                        "no": 8254338670522104
                    }, {
                        "lngLatLine": "112.438353,34.666416",
                        "groupId": 1,
                        "name": "万杰",
                        "no": 1583799717253086
                    }, {
                        "lngLatLine": "117.395952,36.673017",
                        "groupId": 1,
                        "name": "易芳",
                        "no": 5673378295360293
                    }, {
                        "lngLatLine": "120.415793,36.059608",
                        "groupId": 1,
                        "name": "金芳",
                        "no": 1838095265064187
                    }, {
                        "lngLatLine": "113.310853,23.349535",
                        "groupId": 1,
                        "name": "段霞",
                        "no": 3131218388757804
                    }, {
                        "lngLatLine": "120.704291,31.825364",
                        "groupId": 1,
                        "name": "罗桂英",
                        "no": 5553138572625673
                    }, {
                        "lngLatLine": "115.714215,37.811101",
                        "groupId": 1,
                        "name": "吴杰",
                        "no": 504822417351742
                    }, {
                        "lngLatLine": "118.143882,24.700477",
                        "groupId": 1,
                        "name": "马秀兰",
                        "no": 6733384796909044
                    }, {
                        "lngLatLine": "113.614631,23.163728",
                        "groupId": 1,
                        "name": "吕勇",
                        "no": 5368486324106608
                    }, {
                        "lngLatLine": "119.364493,32.328944",
                        "groupId": 1,
                        "name": "谢秀英",
                        "no": 8945689851774120
                    }, {
                        "lngLatLine": "119.959327,36.602313",
                        "groupId": 1,
                        "name": "龚娜",
                        "no": 116596436167329
                    }, {
                        "lngLatLine": "121.294195,31.888728",
                        "groupId": 1,
                        "name": "潘娜",
                        "no": 878905515607576
                    }, {
                        "lngLatLine": "121.622863,31.294265",
                        "groupId": 1,
                        "name": "黎涛",
                        "no": 8408898134783252
                    }, {
                        "lngLatLine": "113.365022,22.57829",
                        "groupId": 1,
                        "name": "金敏",
                        "no": 6862658058408881
                    }, {
                        "lngLatLine": "121.554824,29.826937",
                        "groupId": 1,
                        "name": "萧杰",
                        "no": 6661704115780128
                    }, {
                        "lngLatLine": "120.054198,30.664807",
                        "groupId": 1,
                        "name": "邱军",
                        "no": 4787124519399837
                    }, {
                        "lngLatLine": "113.995265,22.732452",
                        "groupId": 1,
                        "name": "朱杰",
                        "no": 4036732141234367
                    }, {
                        "lngLatLine": "87.658551,44.008315",
                        "groupId": 1,
                        "name": "侯超",
                        "no": 3628652994296314
                    }, {
                        "lngLatLine": "116.331976,39.737524",
                        "groupId": 1,
                        "name": "汪敏",
                        "no": 2521803987237938
                    }, {
                        "lngLatLine": "110.275537,19.88953",
                        "groupId": 1,
                        "name": "胡明",
                        "no": 7562232117216870
                    }, {
                        "lngLatLine": "110.235024,19.68617",
                        "groupId": 1,
                        "name": "陈娟",
                        "no": 573712624804191
                    }, {
                        "lngLatLine": "110.363427,19.8771",
                        "groupId": 1,
                        "name": "许磊",
                        "no": 4916951073813889
                    }, {
                        "lngLatLine": "110.353299,19.951504",
                        "groupId": 1,
                        "name": "徐芳",
                        "no": 256267910722978
                    }, {
                        "lngLatLine": "110.296823,19.964412",
                        "groupId": 1,
                        "name": "白秀兰",
                        "no": 7564438807809834
                    }, {
                        "lngLatLine": "110.323561,20.018969",
                        "groupId": 1,
                        "name": "白霞",
                        "no": 529202685304732
                    }, {"lngLatLine": "110.293561,20.007969", "groupId": 1, "name": "邓艳", "no": 4532496540377072},];
                this.pointSimplifierIns.setData(ddd);
            },
            convertPolygonsData(data, zoom, flag) {
                let bounds = data.boundaries;
                polygons = [];
                if (bounds) {
                    for (let i = 0, l = bounds.length; i < l; i++) {
                        let polygon = new AMap.Polygon({
                            map: this.map,
                            strokeWeight: 1,
                            strokeColor: '#589DB9',
                            fillColor: '#C8E8BF',
                            fillOpacity: 0.6,
                            path: bounds[i],
                            bubble: true
                        });
                        polygons.push(polygon);
                    }
                    this.map.setFitView(polygons);
                    // this.map.setFitView();// 地图自适应
                }
            },
            searchDist(adcode, zoom = this.map.getZoom(), flag = true) {
                this.map.remove(polygons);
                this.district.search(adcode, (status, result) => {
                    if (status === 'complete') {
                        this.convertPolygonsData(result.districtList[0], zoom, flag);
                    }
                });
                /*if (flag) {
                    this.removeMapStep();
                    this.initData();
                }*/
            },
            setMap(val) {
                this.currMenu = val;
                if (val === 1) {
                    this.map.clearMap();
                    this.map.setZoomAndCenter(4, this.center)
                } else {
                    this.searchDist('460105', 8);
                    this.searchDist('460106', 8);
                }
            }
        },
        mounted() {
            this.init();
        }
    };
</script>
