<template>
  <div>
    <Drawer :title="dialogTitle" :closable="false" :value="showCharts" :mask="true" :width="640" :scrollable="true" @on-close="close">
      <Alert show-icon>
        用户号码188****9282
        <Icon type="ios-contact-outline" size="36" slot="icon"/>
        <template slot="desc">
          用户在【<span class="highlight">2018年09月01日 至 2018年09月03日</span>】期间总流量：<span class="highlight">2132MB</span>
          <br/>
          其中上行流量：<span class="highlight" style="color:#ed4014;">113MB</span><Icon type="md-arrow-round-up" color="#ed4014"/>，
          下行流量：<span class="highlight" style="color:#2db7f5;">1232MB</span><Icon type="md-arrow-round-down" color="#2db7f5"/>
          <br/>
          本次查询耗时<span class="highlight">213</span>毫秒，强烈建议使用谷歌chrome浏览器！
        </template>
      </Alert>
      <chart-box title="业务小类Top10占比统计（点击查看更多信息）" class="chartBox">
        <tvi-pie slot="body" :echartData="cellData.data1" @setPieMsg="showChartsMsg"></tvi-pie>
      </chart-box>
      <chart-box title="用户流量分析（点击柱图可查看更多信息）" class="chartBox">
        <tvi-more-bar slot="body" :echartData="cellData.data2"></tvi-more-bar>
      </chart-box>
    </Drawer>
    <Drawer :title="titleName" :closable="false" :width="270" :value="chartsMsgShow" @on-close="chartsMsgShow=false">
      <Tabs type="card">
        <TabPane label="日统计">
          <Timeline>
            <TimelineItem>
              <p class="time">2018/09/03</p>
              <p class="content">期间总流量12M</p>
            </TimelineItem>
            <TimelineItem color="green">
              <Icon type="ios-trophy" slot="dot"></Icon>
              <p class="time" style="color:#19be6b">2018/09/02</p>
              <p class="content" style="color:#19be6b">期间总流量50M</p>
            </TimelineItem>
            <TimelineItem>
              <p class="time">2018/09/01</p>
              <p class="content">期间总流量23M</p>
            </TimelineItem>
          </Timeline>
        </TabPane>
        <TabPane label="小时统计">
          <Timeline pending>
            <TimelineItem>
              <p class="time">2018/09/03 23:00</p>
              <p class="content">期间总流量1M</p>
            </TimelineItem>
            <TimelineItem>
              <p class="time">2018/09/03 22:00</p>
              <p class="content">期间总流量3M</p>
            </TimelineItem>
            <TimelineItem>
              <p class="time">2018/09/03 21:00</p>
              <p class="content">期间总流量3M</p>
            </TimelineItem>
            <TimelineItem>
              <p class="time">2018/09/03 20:00</p>
              <p class="content">期间总流量3M</p>
            </TimelineItem>
            <TimelineItem>
              <p class="time">2018/09/03 19:00</p>
              <p class="content">期间总流量3M</p>
            </TimelineItem>
            <TimelineItem>
              <p class="time">2018/09/03 18:00</p>
              <p class="content">期间总流量3M</p>
            </TimelineItem>
            <TimelineItem><a>查看更多</a></TimelineItem>
          </Timeline>
        </TabPane>
    </Tabs>
    </Drawer>
  </div>
</template>

<script>
import ChartBox from '_c/ChartBox'
import TviBar from '_c/Echarts/bar'
import TviPie from '_c/Echarts/pie'
import TviMoreBar from '_c/Echarts/TviMoreBar'
export default {
  components: {
    ChartBox, TviBar, TviPie, TviMoreBar
  },
  props: {
    showCharts: {
      type: Boolean,
      default: false
    },
    dialogTitle: {
      type: String,
      default: '报表分析'
    },
    chartsParam: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  data: () => ({
    titleName: '微信',
    chartsMsgShow: false,
    cellData: {
      data1: {},
      data2: {}
    }
  }),
  watch: {
    showCharts (newV, oldV) {
      if (newV) {
        this.drawChart()
      }
    }
  },
  methods: {
    drawChart () {
      this.cellData = {
        data1: {
          itemData: [
            { name: '微信', value: 8830 },
            { name: '知乎', value: 3526 },
            { name: '百度地图', value: 3130 },
            { name: '天猫商城', value: 2126 },
            { name: '网易云音乐', value: 2030 },
            { name: '微博', value: 1526 },
            { name: '王者荣耀', value: 1230 },
            { name: 'QQ', value: 1126 },
            { name: '钉钉', value: 1030 },
            { name: '抖音', value: 726 },
            { name: '美图', value: 630 },
            { name: '京东商城', value: 326 }
          ]
        },
        data2: {
          axis: { data: ['20180801', '20180802', '20180803', '20180804', '20180805', '20180813', '20180814', '20180815'] },
          itemData: [{ data: [20, 45, 100, 20, 40, 70, 40, 70], name: '' }]
        }
      }
    },
    showChartsMsg (e) {
      this.titleName = e.name
      this.chartsMsgShow = true
    },
    close () {
      this.$emit('close', false)
    }
  }
}
</script>
<style>
  .btn-close{
    font-size: 24px;
  }
</style>
