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
                  <p>您好，XBoot 欢迎您的使用</p>
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
              >{{city}}</Col>
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
              <Icon
                type="logo-github"
                size="20"
                style="margin-right:5px"
              />
              <a
                href="https://github.com/Exrick/x-boot"
                target="_blank"
              >XBoot开源版本地址</a>
            </p>
            <p slot="extra">
              <a
                target="_blank"
                href="http://exrick.cn"
              >作者：Exrick</a>
            </p>
            <div style="height: 268px;">
              <Timeline>
                <TimelineItem>
                  <Icon
                    type="logo-youtube"
                    color="#fb7299"
                    slot="dot"
                  ></Icon>
                  <a @click="showVideo=true">作者亲自制作XBoot文字快闪宣传片 点我观看</a>
                </TimelineItem>
                <TimelineItem>
                  <Icon
                    type="logo-youtube"
                    color="#fb7299"
                    slot="dot"
                  ></Icon>
                  <a
                    href="https://www.bilibili.com/video/av23121122/"
                    target="_blank"
                  >作者亲自制作各项目宣传视频 点我观看</a>
                </TimelineItem>
                <TimelineItem>
                  <Icon
                    type="md-barcode"
                    color="black"
                    slot="dot"
                  ></Icon>
                  <a
                    href="https://github.com/Exrick/Machine-Learning"
                    target="_blank"
                  >个人机器学习笔记</a>
                </TimelineItem>
                <TimelineItem>
                  <Icon
                    type="md-cart"
                    color="#f4364c"
                    slot="dot"
                  ></Icon>
                  <a
                    href="http://xmall.exrick.cn"
                    target="_blank"
                  >XMall开源分布式商城</a>
                </TimelineItem>
                <TimelineItem>
                  <Icon
                    type="md-cash"
                    color="#19be6b"
                    slot="dot"
                  ></Icon>
                  <a
                    href="http://xpay.exrick.cn"
                    target="_blank"
                  >XPay开源个人免签支付系统</a>
                </TimelineItem>
                <TimelineItem>
                  <Icon
                    type="md-people"
                    color="#57a3f3"
                    slot="dot"
                  ></Icon>QQ交流群 475743731(付费) 562962309(免费)
                </TimelineItem>
              </Timeline>
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
            intro-text="今日新增用户"
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
            intro-text="今日浏览量"
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
            iconType="md-cloud-upload"
            color="#ffd572"
            intro-text="今日数据采集量"
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
            iconType="md-shuffle"
            color="#f25e43"
            intro-text="今日服务调用量"
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
            <p
              slot="title"
              style="overflow:visible"
            >
              <a
                href="http://xpay.exrick.cn/pay?xboot"
                target="_blank"
              >
                <Icon
                  type="ios-star"
                  size="20"
                  style="margin-right:5px"
                ></Icon>
                <Badge dot></Badge>
              </a>
            </p>
            <div style="height:368px;overflow:auto">
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
                type="md-bookmark"
                style="margin-right:5px"
              ></Icon>ISSUE/评论/更新日志
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
        <visit-volume />
        </Col>
        <Col
          :lg="24"
          :xl="8"
          :style="{marginBottom: '10px'}"
        >
        <visit-separation />
        </Col>
      </Row>
    </div>
    <div>
      <show />
    </div>
    <div v-show="currNav=='app'">
      <dashboard2 />
    </div>
  </div>
</template>

<script>
import { ipInfo } from "@/api/index";
import visitVolume from "./components/visitVolume.vue";
import visitSeparation from "./components/visitSeparation.vue";
import infoCard from "./components/infoCard.vue";
import show from "./show.vue";
import dashboard2 from "../xboot-charts/dashboard2/dashboard2.vue";
import Cookies from "js-cookie";
import "gitalk/dist/gitalk.css";
import Gitalk from "gitalk";

export default {
  name: "home",
  components: {
    visitVolume,
    visitSeparation,
    infoCard,
    show,
    dashboard2
  },
  data () {
    return {
      showVideo: false,
      count: {
        createUser: 496,
        visit: 3264,
        collection: 24389305,
        transfer: 39503498
      },
      city: "",
      username: ""
    };
  },
  computed: {
    currNav () {
      return this.$store.state.app.currNav;
    },
    avatarPath () {
      return localStorage.avatorImgPath;
    }
  },
  methods: {
    init () {
      let userInfo = JSON.parse(Cookies.get("userInfo"));
      this.username = userInfo.nickname;
      ipInfo().then(res => {
        if (res.success) {
          this.city = res.result;
        }
      });
    },
    showNotice () {
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
  mounted () {
    this.init();
  }
};
</script>
