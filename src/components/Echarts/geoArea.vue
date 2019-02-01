<template>
  <div ref="chartDom" style="width: 100%;height: 100%"></div>
</template>
<script>
import echarts from 'echarts'
import 'echarts-gl'
import { getGeoJson } from '@/api/geoJson'
const cityList = {
  广州: '440100',
  韶关: '440200',
  深圳: '440300',
  珠海: '440400',
  汕头: '440500',
  佛山: '440600',
  江门: '440700',
  湛江: '440800',
  茂名: '440900',
  肇庆: '441200',
  惠州: '441300',
  梅州: '441400',
  汕尾: '441500',
  河源: '441600',
  阳江: '441700',
  清远: '441800',
  东莞: '441900',
  中山: '442000',
  潮州: '445100',
  揭阳: '445200',
  云浮: '445300'
}
const regionList = {
  荔湾区: '440103',
  越秀区: '440104',
  海珠区: '440105',
  天河区: '440106',
  白云区: '440111',
  黄埔区: '440112',
  番禺区: '440113',
  花都区: '440114',
  南沙区: '440115',
  增城区: '440183',
  从化区: '440184',
  武江区: '440203',
  浈江区: '440204',
  曲江区: '440205',
  始兴县: '440222',
  仁化县: '440224',
  翁源县: '440229',
  乳源瑶族自治县: '440232',
  新丰县: '440233',
  乐昌市: '440281',
  南雄市: '440282',
  罗湖区: '440303',
  福田区: '440304',
  南山区: '440305',
  宝安区: '440306',
  龙岗区: '440307',
  盐田区: '440308',
  香洲区: '440402',
  斗门区: '440403',
  金湾区: '440404',
  龙湖区: '440507',
  金平区: '440511',
  达濠区: '440512',
  潮阳区: '440513',
  潮南区: '440514',
  澄海区: '440515',
  南澳县: '440523',
  禅城区: '440604',
  南海区: '440605',
  顺德区: '440606',
  三水区: '440607',
  高明区: '440608',
  蓬江区: '440703',
  江海区: '440704',
  新会区: '440705',
  台山市: '440781',
  开平市: '440783',
  鹤山市: '440784',
  恩平市: '440785',
  赤坎区: '440802',
  霞山区: '440803',
  坡头区: '440804',
  麻章区: '440811',
  遂溪县: '440823',
  徐闻县: '440825',
  廉江市: '440881',
  雷州市: '440882',
  吴川市: '440883',
  茂南区: '440902',
  电白区: '440923',
  高州市: '440981',
  化州市: '440982',
  信宜市: '440983',
  端州区: '441202',
  鼎湖区: '441203',
  广宁县: '441223',
  怀集县: '441224',
  封开县: '441225',
  德庆县: '441226',
  高要市: '441283',
  四会市: '441284',
  惠城区: '441302',
  惠阳区: '441303',
  博罗县: '441322',
  惠东县: '441323',
  龙门县: '441324',
  梅江区: '441402',
  梅县: '441421',
  大埔县: '441422',
  丰顺县: '441423',
  五华县: '441424',
  平远县: '441426',
  蕉岭县: '441427',
  兴宁市: '441481',
  城区: '441502',
  海丰县: '441521',
  陆河县: '441523',
  陆丰市: '441581',
  源城区: '441602',
  紫金县: '441621',
  龙川县: '441622',
  连平县: '441623',
  和平县: '441624',
  东源县: '441625',
  江城区: '441702',
  阳西县: '441721',
  阳东县: '441723',
  阳春市: '441781',
  清城区: '441802',
  佛冈县: '441821',
  阳山县: '441823',
  连山壮族瑶族自治县: '441825',
  连南瑶族自治县: '441826',
  清新县: '441827',
  英德市: '441881',
  连州市: '441882',
  湘桥区: '445102',
  潮安县: '445121',
  饶平县: '445122',
  榕城区: '445202',
  揭东县: '445221',
  揭西县: '445222',
  惠来县: '445224',
  普宁市: '445281',
  云城区: '445302',
  新兴县: '445321',
  郁南县: '445322',
  云安县: '445323',
  罗定市: '445381'
}
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
      level: 0,
      provinceCode: 'gd',
      cityCode: '',
      regionsCode: ''
    }
  },
  created () {
  },
  mounted () {
  },
  watch: {
    echartData (newValue, oldValue) {
      if (newValue !== null) {
        this.drawChart()
      }
    }
  },
  methods: {
    drawChart () {
      /* let mapList = {
        '清远': [112.9175, 24.3292],
        '韶关': [113.7964, 24.7028],
        '湛江': [110.3577, 20.9894],
        '梅州': [116.1255, 24.1534],
        '河源': [114.917, 23.9722],
        '肇庆': [112.1265, 23.5822],
        '惠州': [114.6204, 23.1647],
        '茂名': [111.0059, 22.0221],
        '江门': [112.6318, 22.1484],
        '阳江': [111.8298, 22.0715],
        '云浮': [111.7859, 22.8516],
        '广州': [113.5107, 23.2196],
        '汕尾': [115.5762, 23.0438],
        '揭阳': [116.1255, 23.313],
        '珠海': [113.7305, 22.1155],
        '佛山': [112.8955, 23.1097],
        '潮州': [116.7847, 23.8293],
        '汕头': [117.1692, 23.3405],
        '深圳': [114.5435, 22.5439],
        '东莞': [113.8953, 22.901],
        '中山': [113.4229, 22.478]
      } */
      this.chart1 = echarts.init(this.$refs.chartDom)
      let barData = this.echartData.itemData ? this.echartData.itemData : []
      if (barData.length === 0) {
        /* this.chart1.setOption({
          backgroundColor: 'rgba(232, 232, 232, 0.34)',
          title: {
            text: '暂无数据',
            left: 'center',
            top: 'middle'
          }
        }) */
      } else {
        this.renderMap(this.chart1, this.provinceCode, barData)
      }
      var _this = this
      _this.chart1.on('click', function (params) {
        if (_this.level < 2) {
          ++_this.level
          var area = ''
          switch (_this.level) {
            case 0:
              _this.cityCode = _this.provinceCode
              area = _this.cityCode
              break
            case 1:
              _this.cityCode = cityList[params.name]
              area = _this.cityCode
              break
            case 2:
              _this.regionsCode = regionList[params.name]
              area = _this.regionsCode ? _this.cityCode + '/' + _this.regionsCode : ''
              break
          }
          if (!area) {
            --_this.level
            return false
          } else {
            _this.renderMap(_this.chart1, area, barData)
          }
        } else {
          alert('已是行政区')
        }
      })
    },
    async renderMap (chartObject, AreaName, bar3dData) {
      chartObject.showLoading()
      await getGeoJson(AreaName).then(geoJson => {
        echarts.registerMap(AreaName, geoJson)
        chartObject.hideLoading()
        var option = {
          tooltip: {
            show: true,
            formatter: (params) => {
              if (params.componentSubType === 'bar3D') {
                let data = params.name + '<br/>' + '值:' + params.value[2]
                return data
              } else {
                return ''
              }
            }
          },
          geo3D: {
            map: AreaName,
            show: false,
            shading: 'lambert',
            light: {
              main: {
                color: '#fff',
                intensity: 1.2,
                shadow: true,
                alpha: 55,
                beta: 10
              },
              ambient: {
                color: '#fff',
                intensity: 0.5
              }
            },
            top: -40,
            viewControl: {
              projection: 'perspective',
              autoRotate: false,
              autoRotateDirection: 'cw',
              autoRotateSpeed: 10,
              autoRotateAfterStill: 3,
              damping: 0,
              rotateSensitivity: 1,
              zoomSensitivity: 1,
              panSensitivity: 1,
              panMouseButton: 'left',
              rotateMouseButton: 'left',
              distance: 120,
              minDistance: 40,
              maxDistance: 400,
              alpha: 30,
              beta: -35,
              minAlpha: -360,
              maxAlpha: 360,
              minBeta: -360,
              maxBeta: 360,
              center: [0, 0, 0],
              animation: true,
              animationDurationUpdate: 1000,
              animationEasingUpdate: 'cubicInOut'
            }
          },
          series: [{
            type: 'map3D',
            id: AreaName,
            name: AreaName,
            map: AreaName,
            regionHeight: 2,
            label: {
              show: true,
              textStyle: {
                color: '#000',
                fontSize: 8,
                opacity: 1,
                backgroundColor: 'rgba(0,23,11,0)'
              }
            },
            itemStyle: {
              color: 'rgba(46, 148, 255, 0.75)',
              opacity: 1,
              borderWidth: 1,
              borderColor: '#787e81'
            },
            emphasis: {
              label: {
                show: true,
                textStyle: {
                  fontSize: 15
                }
              },
              itemStyle: {
                areaColor: '#0b5cf5'
              }
            },
            shading: 'lambert',
            light: {
              main: {
                color: '#fff',
                intensity: 1.2,
                shadow: true,
                alpha: 55,
                beta: 10
              },
              ambient: {
                color: '#fff',
                intensity: 0.5
              }
            },
            top: -40,
            viewControl: {
              projection: 'perspective',
              autoRotate: false,
              autoRotateDirection: 'cw',
              autoRotateSpeed: 10,
              autoRotateAfterStill: 3,
              damping: 0,
              rotateSensitivity: 1,
              zoomSensitivity: 1,
              panSensitivity: 1,
              panMouseButton: 'left',
              rotateMouseButton: 'left',
              distance: 120,
              minDistance: 40,
              maxDistance: 400,
              alpha: 30,
              beta: -35,
              minAlpha: -360,
              maxAlpha: 360,
              minBeta: -360,
              maxBeta: 360,
              center: [0, 0, 0],
              animation: true,
              animationDurationUpdate: 1000,
              animationEasingUpdate: 'cubicInOut'
            }
          }, {
            type: 'bar3D',
            name: '地区',
            shading: 'lambert',
            coordinateSystem: 'geo3D',
            minHeight: 3,
            data: bar3dData,
            symbolSize: function (val) {
              return 10
            },
            itemStyle: {
              normal: {
                color: '#BBA02C'
              }
            },
            emphasis: {
              label: {
                show: false
              }
            },
            zlevel: 2
          }]
        }
        chartObject.setOption(option, true)
      })
    },
    goPreLevel () {
      if (this.level > 0) {
        --this.level
        var area = ''
        switch (this.level) {
          case 0:
            this.cityCode = this.provinceCode
            area = this.cityCode
            break
          case 1:
            area = this.cityCode
            break
          case 2:
            area = this.cityCode + '/' + this.regionsCode
            break
        }
        var barData = this.echartData.itemData ? this.echartData.itemData : []
        this.renderMap(this.chart1, area, barData)
      } else {
        alert('已是省级')
      }
    }
  },
  computed: {}
}
</script>
