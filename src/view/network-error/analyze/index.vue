<template>
  <div>
    <Card>
      <div class="search-form">
        <div class="form-item">
          <span class="name">号码</span>
          <auto-complete-phone :phone.sync="chartsParam.phone"></auto-complete-phone>
        </div>
        <div class="form-item">
          <span class="name">开始时间</span>
          <DatePicker type="datetime" v-model="chartsParam.beginTime" placeholder="开始时间" style="width: 200px"></DatePicker>
        </div>
        <div class="form-item">
          <span class="name">结束时间（可不选）</span>
          <DatePicker type="datetime"  v-model="chartsParam.endTime" placeholder="结束时间" style="width: 200px"></DatePicker>
        </div>
        <Button @click="handleSearch" class="search-btn" type="primary">查询</Button>
      </div>
      <div class="flex">
        <div class="flex-item flex-item2">
          <div class="title">用户历史网络流量图</div>
          <div ref="chart1Dom" style="height: 550px;width: 100%;margin-top: 10px"></div>
        </div>
        <div class="flex-item flex-item1">
          <div class="title">网络大类TOP10流量</div>
          <div style="height: 250px;">
            <tvi-pie slot="body" :echartData="cellData.data2"></tvi-pie>
          </div>
          <div class="title">网络小类TOP10流量</div>
          <div style="height: 250px;">
            <tvi-pie slot="body" :echartData="cellData.data3"></tvi-pie>
          </div>
        </div>
      </div>
    </Card>
  </div>
</template>
<script>
import autoCompletePhone from '_c/autoCompletePhone'
import echarts from 'echarts'
import 'echarts/theme/macarons'
import TviPie from '_c/Echarts/pie'
export default {
  name: 'errorAnalyze',
  components: {
    autoCompletePhone, TviPie
  },
  data () {
    return {
      chartsParam: {
        beginTime: '',
        endTime: '',
        phone: '1'
      },
      chart1: {},
      cellData: {
      },
      echartData: {}
    }
  },
  created () {
  },
  mounted () {
    this.drawChart()
  },
  methods: {
    handleSearch () {
      this.chartData = {
        axis: {
          data: [1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016]
        },
        itemData: [
          {
            data: [7.38, 7.73, 7.46, 7.85, 7.68, 7.45, 6.94, 6.7, 5.98, 6.25, 6.28, 5.74, 5.51, 5.35, 5.25, 5.03, 4.83, 4.57, 4.58, 4.33, 4.6, 4.42, 4.38, 3.95, 3.82, 3.7, 3.75, 3.71],
            name: '历史'
          }
        ]
      }
      this.drawChart()
    },
    drawChart () {
      this.$nextTick(() => {
        this.setChartsOption(this.chartData)
        this.cellData = {
          data2: {
            itemData: [{ name: '不办理本行ETC', value: 3830 }, { name: '办理本行ETC', value: 3526 }]
          },
          data3: {
            itemData: [{ name: '本行ETC', value: 830 }, { name: 'ETC', value: 126 }]
          }
        }
        // 重绘
        var _this = this
        window.onresize = function () {
          _this.chart1.resize()
        }
      })
    },
    setChartsOption (echartData) {
      if (Object.keys(this.chart1).length > 0) {
        this.chart1.clear()
      } else {
        this.chart1 = echarts.init(this.$refs.chart1Dom, 'macarons')
      }
      let axisData = !echartData ? [] : echartData.axis.data
      let showDataZoom = false
      let seriesData = !echartData ? [] : (echartData.itemData ? echartData.itemData.map(function (item) {
        return {
          type: 'line',
          label: {
            normal: {
              position: 'top'
            }
          },
          name: item.name,
          data: item.data
        }
      }) : [])
      let legendData = seriesData.map(function (item) {
        return item.name
      })
      let showLegend = legendData.length !== 1
      let gridData = showLegend ? {
        bottom: showDataZoom ? 50 : 40,
        right: 30,
        left: 40,
        top: 20
      } : {
        top: 20,
        right: 30,
        left: 40,
        bottom: showDataZoom ? 50 : 40
      }
      if (seriesData.length === 0) {
        this.chart1.setOption({
          backgroundColor: 'rgba(232, 232, 232, 0.34)',
          title: {
            text: '暂无数据',
            left: 'center',
            top: 'middle'
          }
        })
      } else {
        this.chart1.setOption({
          tooltip: {
            trigger: 'axis'
          },
          grid: gridData,
          legend: {
            show: showLegend,
            data: legendData,
            itemWidth: 15,
            itemHeight: 15,
            borderRadius: 15
          },
          toolbox: {
            show: false
          },
          xAxis: { type: 'category', boundaryGap: false, data: axisData },
          yAxis: { type: 'value', axisLabel: { formatter: '{value}' } },
          series: seriesData
        })
      }
    }
  }
}
</script>
<style lang="less">
  .flex{
    display: flex;
    width: 100%;
    .flex-item{
      .title{
        text-align: center;
        font-weight: bold;
        font-size: 16px;
      }
    }
    .flex-item1{
      flex: 1;
    }
    .flex-item2{
      flex: 2;
    }
  }
</style>
