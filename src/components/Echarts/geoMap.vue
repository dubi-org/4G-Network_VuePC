<template>
  <div ref="chartDom" :style="{width: '100%',height: height}"></div>
</template>
<script>
import echarts from 'echarts'
export default {
  props: {
    echartData: {
      type: Object,
      default: function () {
        return null
      }
    },
    isResize: {
      type: Boolean,
      default: true
    },
    height: {
      type: String,
      default: '260px'
    }
  },
  data () {
    return {
      chart1: null,
      debounceTdentify: 0,
      geoCoordMap: {}
    }
  },
  watch: {
    echartData (newValue, oldValue) {
      if (newValue !== null) {
        this.drawChart()
      }
    },
    isResize (newValue, oldValue) {
      if (newValue !== oldValue) {
        this.resizeFu()
      }
    }
  },
  methods: {
    drawChart () {
      let chinaMap = require('./china.json')
      echarts.registerMap('china', chinaMap)
      this.chart1 = echarts.init(this.$refs.chartDom, 'roma')
      let seriesData = this.echartData.itemData ? this.echartData.itemData.map((item) => {
        return {
          name: item.name,
          type: 'scatter',
          coordinateSystem: 'geo',
          label: {
            normal: {
              show: true,
              position: 'right',
              formatter: '{b}'
            }
          },
          symbolSize: (val) => { return val[2] / 5 },
          data: item.data
        }
      }) : []
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
            trigger: 'item'
          },
          legend: {
          },
          geo: {
            map: 'china',
            label: {
              emphasis: {
                show: false
              }
            },
            itemStyle: {
              normal: {
                areaColor: '#323c48',
                borderColor: '#111'
              },
              emphasis: {
                areaColor: '#2a333d'
              }
            }
          },
          series: seriesData
        })
      }
    },
    resizeFu (el) {
      // 重绘，防抖500ms延迟
      this.debounceTdentify && clearTimeout(this.debounceTdentify)
      this.debounceTdentify = setTimeout(() => {
        this.chart1.resize()
      }, 500)
    }
  },
  computed: {
  }
}
</script>
