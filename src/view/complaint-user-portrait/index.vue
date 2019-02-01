<template>
  <div>
    <Card>
      <div class="search-form">
        <select-area :province.sync="chartsParam.province" :city.sync="chartsParam.city" :district.sync="chartsParam.district"></select-area>
        <div class="form-item">
          <span class="name">日期</span>
          <DatePicker :type="chartsParam.type" v-model="chartsParam.date" placeholder="日期" @on-change="formatValue" style="width: 150px"></DatePicker>
        </div>
        <div class="form-item">
          <RadioGroup v-model="chartsParam.type" style="height: 32px;padding: 4px 7px">
            <Radio label="date">日报</Radio>
            <Radio label="month">月报</Radio>
          </RadioGroup>
        </div>
        <Button @click="handleSearch" class="search-btn" type="primary">查询</Button>
      </div>
      <div class="flex">
        <div class="areaBg">
          <div class="title">流量投诉区域分布</div>
          <geo-area slot="body" ref="geoArea" :echartData="cellData.mapdata"></geo-area>
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
          <div class="title">网络小类TOP10流量</div>
          <div style="height: 250px;">
            <tvi-pie slot="body" :echartData="cellData.data3"></tvi-pie>
          </div>
        </div>
        <div class="flex-item flex-item2">
          <Button @click="preLevel" class="pre-btn" icon="md-undo" type="primary">返回上层</Button>
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
import selectArea from '_c/selectArea'
import geoArea from '_c/Echarts/geoArea'
import TviPie from '_c/Echarts/pie'
export default {
  name: 'errorAnalyze',
  components: {
    autoCompletePhone, selectArea, TviPie, geoArea
  },
  data () {
    return {
      chartsParam: {
        date: '',
        province: '',
        city: '',
        type: 'month',
        district: ''
      },
      chart1: {},
      cellData: {},
      echartData: {}
    }
  },
  created () {
  },
  mounted () {
    this.drawChart()
  },
  methods: {
    formatValue (val) {
      this.chartsParam.date = val
    },
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
      console.log(this.chartsParam)
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
          },
          mapdata: {
            itemData: [
              { name: '正佳', value: [113.40, 23.1597, 100] },
              { name: '棠下', value: [113.33, 23.1581, 100] },
              { name: '猎德', value: [113.33, 23.15, 10] },
              { name: 'igc', value: [113.43, 23.15, 50] }
            ]
          }
        }
      })
    },
    setChartsOption (echartData) {},
    preLevel () {
      this.$refs.geoArea.goPreLevel()
    }
  }
}
</script>
<style lang="less">
  .areaBg{
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 1;
  }
  .pre-btn{
    position: absolute;
    bottom: 100px;
    right: 10px;
    z-index: 10;
  }
  .title{
    text-align: center;
    font-weight: bold;
    font-size: 16px;
  }
  .flex{
    display: flex;
    position: relative;
    width: 100%;
    .flex-item1{
      flex: 1;
    }
    .flex-item2{
      flex: 2;
      position: relative;
    }
  }
</style>
