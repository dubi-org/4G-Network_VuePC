<template>
  <div ref="chartDom" style="width: 100%;height: 260px;"></div>
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
    }
  },
  data () {
    return {
      chart1: null,
      debounceTdentify: 0
    }
  },
  watch: {
    echartData (newValue, oldValue) {
      if (newValue !== null) {
        this.drawChart()
      }
    }
  },
  // mounted () {
  //   window.addEventListener('resize', this.resizeFu, false)
  // },
  // beforeRouteLeave (to, from, next) {
  //   window.removeEventListener('resize', this.resizeFu, false)
  //   next()
  // },
  methods: {
    drawChart () {
      let {chart1} = this
      chart1 = echarts.init(this.$refs.chartDom, 'roma')
      var length = this.echartData.itemData.length
      var space = parseInt(100 / length) - 10
      let seriesData = this.echartData.itemData ? this.echartData.itemData.map(function (item, index) {
        return {
          name: item.name,
          type: 'pie',
          hoverAnimation: false,
          radius: [space + (index * space) + '%', space + (index * space) + '%'],
          center: ['50%', '55%'],
          itemStyle: {
            normal: {
              label: {
                show: true,
                position: 'inner',
                formatter: '{d}%'
              },
              labelLine: {
                show: true,
                length: 50,
                smooth: 0.5
              },
              borderWidth: space,
              borderColor: chart1._theme.color[index],
              shadowColor: 'rgba(0, 0, 0, 0)'
            }
          },
          data: [{
            value: item.value,
            name: item.name
          }, {
            value: 1 - item.value,
            name: '',
            itemStyle: {
              normal: {
                color: 'rgba(0,0,0,0)',
                borderWidth: 0
              }
            }
          }]
        }
      }) : []
      let legendData = seriesData.map(function (item) {
        return item.name
      })
      if (seriesData.length === 0) {
        chart1.setOption({
          backgroundColor: 'rgba(232, 232, 232, 0.34)',
          title: {
            text: '暂无数据',
            left: 'center',
            top: 'middle'
          }
        })
      } else {
        chart1.setOption({
          tooltip: {
            trigger: 'item',
            formatter: ' {b} : {c} ({d}%)'
          },
          legend: {
            data: legendData,
            itemWidth: 15,
            itemHeight: 15,
            borderRadius: 15
          },
          series: seriesData
        })
      }
      this.chart1 = chart1
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
