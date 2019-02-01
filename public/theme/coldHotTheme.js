(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['exports', 'echarts'], factory)
  } else if (typeof exports === 'object' && typeof exports.nodeName !== 'string') {
    // CommonJS
    factory(exports, require('echarts'))
  } else {
    // Browser globals
    factory({}, root.echarts)
  }
}(this, function (exports, echarts) {
  var log = function (msg) {
    if (typeof console !== 'undefined') {
      console && console.error && console.error(msg)
    }
  }
  if (!echarts) {
    log('ECharts is not Loaded')
    return
  }
  echarts.registerTheme('coldHotTheme', {
    'color': [
      '#76f8fa',
      '#2fc4fc',
      '#1ddffa',
      '#2ea1fc',
      '#0db5e6',
      '#2985c7'
    ],
    'backgroundColor': 'rgba(36,104,177,0)',
    'textStyle': {},
    'title': {
      'textStyle': {
        'color': '#36dbec',
        'fontSize': '16'
      },
      'subtextStyle': {
        'color': '#3fbddb'
      }
    },
    'line': {
      'itemStyle': {
        'normal': {
          'borderWidth': '2'
        }
      },
      'lineStyle': {
        'normal': {
          'width': '1'
        }
      },
      'symbolSize': '5',
      'symbol': 'circle',
      'smooth': true
    },
    'radar': {
      'itemStyle': {
        'normal': {
          'borderWidth': '2'
        }
      },
      'lineStyle': {
        'normal': {
          'width': '1'
        }
      },
      'symbolSize': '5',
      'symbol': 'circle',
      'smooth': true
    },
    'bar': {
      'itemStyle': {
        'normal': {
          'barBorderWidth': 0,
          'barBorderColor': '#ccc'
        },
        'emphasis': {
          'barBorderWidth': 0,
          'barBorderColor': '#ccc'
        }
      }
    },
    'pie': {
      'itemStyle': {
        'normal': {
          'borderWidth': 0,
          'borderColor': '#ccc'
        },
        'emphasis': {
          'borderWidth': 0,
          'borderColor': '#ccc'
        }
      }
    },
    'scatter': {
      'itemStyle': {
        'normal': {
          'borderWidth': 0,
          'borderColor': '#ccc'
        },
        'emphasis': {
          'borderWidth': 0,
          'borderColor': '#ccc'
        }
      }
    },
    'boxplot': {
      'itemStyle': {
        'normal': {
          'borderWidth': 0,
          'borderColor': '#ccc'
        },
        'emphasis': {
          'borderWidth': 0,
          'borderColor': '#ccc'
        }
      }
    },
    'parallel': {
      'itemStyle': {
        'normal': {
          'borderWidth': 0,
          'borderColor': '#ccc'
        },
        'emphasis': {
          'borderWidth': 0,
          'borderColor': '#ccc'
        }
      }
    },
    'sankey': {
      'itemStyle': {
        'normal': {
          'borderWidth': 0,
          'borderColor': '#ccc'
        },
        'emphasis': {
          'borderWidth': 0,
          'borderColor': '#ccc'
        }
      }
    },
    'funnel': {
      'itemStyle': {
        'normal': {
          'borderWidth': 0,
          'borderColor': '#ccc'
        },
        'emphasis': {
          'borderWidth': 0,
          'borderColor': '#ccc'
        }
      }
    },
    'gauge': {
      'itemStyle': {
        'normal': {
          'borderWidth': 0,
          'borderColor': '#ccc'
        },
        'emphasis': {
          'borderWidth': 0,
          'borderColor': '#ccc'
        }
      }
    },
    'candlestick': {
      'itemStyle': {
        'normal': {
          'color': '#e6a0d2',
          'color0': 'transparent',
          'borderColor': '#e6a0d2',
          'borderColor0': '#3fb1e3',
          'borderWidth': '2'
        }
      }
    },
    'graph': {
      'itemStyle': {
        'normal': {
          'borderWidth': 0,
          'borderColor': '#ccc'
        }
      },
      'lineStyle': {
        'normal': {
          'width': '1',
          'color': '#cccccc'
        }
      },
      'symbolSize': '5',
      'symbol': 'circle',
      'smooth': true,
      'color': [
        '#76f8fa',
        '#2fc4fc',
        '#1ddffa',
        '#2ea1fc',
        '#0db5e6',
        '#2985c7'
      ],
      'label': {
        'normal': {
          'textStyle': {
            'color': '#ffffff'
          }
        }
      }
    },
    'map': {
      'itemStyle': {
        'normal': {
          'areaColor': '#eeeeee',
          'borderColor': '#aaaaaa',
          'borderWidth': 0.5
        },
        'emphasis': {
          'areaColor': 'rgba(63,177,227,0.25)',
          'borderColor': '#3fb1e3',
          'borderWidth': 1
        }
      },
      'label': {
        'normal': {
          'textStyle': {
            'color': '#0a6c82'
          }
        },
        'emphasis': {
          'textStyle': {
            'color': 'rgb(63,177,227)'
          }
        }
      }
    },
    'geo': {
      'itemStyle': {
        'normal': {
          'areaColor': '#eeeeee',
          'borderColor': '#aaaaaa',
          'borderWidth': 0.5
        },
        'emphasis': {
          'areaColor': 'rgba(63,177,227,0.25)',
          'borderColor': '#3fb1e3',
          'borderWidth': 1
        }
      },
      'label': {
        'normal': {
          'textStyle': {
            'color': '#0a6c82'
          }
        },
        'emphasis': {
          'textStyle': {
            'color': 'rgb(63,177,227)'
          }
        }
      }
    },
    'categoryAxis': {
      'axisLine': {
        'show': false,
        'lineStyle': {
          'color': '#3974D2'
        }
      },
      'axisTick': {
        'show': false,
        'lineStyle': {
          'color': '#333'
        }
      },
      'axisLabel': {
        'show': true,
        'textStyle': {
          'color': '#ffffff'
        }
      },
      'splitLine': {
        'show': false,
        'lineStyle': {
          'color': [
            'rgba(26,74,169,0.65)'
          ]
        }
      },
      'splitArea': {
        'show': false,
        'areaStyle': {
          'color': [
            'rgba(250,250,250,0.05)',
            'rgba(200,200,200,0.02)'
          ]
        }
      }
    },
    'valueAxis': {
      'axisLine': {
        'show': false,
        'lineStyle': {
          'color': '#3974D2'
        }
      },
      'axisTick': {
        'show': false,
        'lineStyle': {
          'color': '#333'
        }
      },
      'axisLabel': {
        'show': true,
        'textStyle': {
          'color': '#ffffff'
        }
      },
      'splitLine': {
        'show': true,
        'lineStyle': {
          'color': [
            'rgba(26,74,169,0.65)'
          ]
        }
      },
      'splitArea': {
        'show': false,
        'areaStyle': {
          'color': [
            'rgba(250,250,250,0.05)',
            'rgba(200,200,200,0.02)'
          ]
        }
      }
    },
    'logAxis': {
      'axisLine': {
        'show': false,
        'lineStyle': {
          'color': '#cccccc'
        }
      },
      'axisTick': {
        'show': false,
        'lineStyle': {
          'color': '#333'
        }
      },
      'axisLabel': {
        'show': true,
        'textStyle': {
          'color': '#ffffff'
        }
      },
      'splitLine': {
        'show': true,
        'lineStyle': {
          'color': [
            'rgba(26,74,169,0.65)'
          ]
        }
      },
      'splitArea': {
        'show': false,
        'areaStyle': {
          'color': [
            'rgba(250,250,250,0.05)',
            'rgba(200,200,200,0.02)'
          ]
        }
      }
    },
    'timeAxis': {
      'axisLine': {
        'show': false,
        'lineStyle': {
          'color': '#cccccc'
        }
      },
      'axisTick': {
        'show': false,
        'lineStyle': {
          'color': '#333'
        }
      },
      'axisLabel': {
        'show': true,
        'textStyle': {
          'color': '#ffffff'
        }
      },
      'splitLine': {
        'show': true,
        'lineStyle': {
          'color': [
            'rgba(26,74,169,0.65)'
          ]
        }
      },
      'splitArea': {
        'show': false,
        'areaStyle': {
          'color': [
            'rgba(250,250,250,0.05)',
            'rgba(200,200,200,0.02)'
          ]
        }
      }
    },
    'toolbox': {
      'iconStyle': {
        'normal': {
          'borderColor': '#999999'
        },
        'emphasis': {
          'borderColor': '#666666'
        }
      }
    },
    'legend': {
      'textStyle': {
        'color': '#ffffff'
      }
    },
    'tooltip': {
      'axisPointer': {
        'lineStyle': {
          'color': 'rgba(215,222,237,0.57)',
          'width': 1
        },
        'crossStyle': {
          'color': 'rgba(215,222,237,0.57)',
          'width': 1
        }
      }
    },
    'timeline': {
      'lineStyle': {
        'color': '#e5e8f7',
        'width': 1
      },
      'itemStyle': {
        'normal': {
          'color': '#626c91',
          'borderWidth': '1'
        },
        'emphasis': {
          'color': '#3fb1e3'
        }
      },
      'controlStyle': {
        'normal': {
          'color': '#e5e8f7',
          'borderColor': '#e5e8f7',
          'borderWidth': 0.5
        },
        'emphasis': {
          'color': '#e5e8f7',
          'borderColor': '#e5e8f7',
          'borderWidth': 0.5
        }
      },
      'checkpointStyle': {
        'color': '#3fb1e3',
        'borderColor': 'rgba(63,177,227,0.15)'
      },
      'label': {
        'normal': {
          'textStyle': {
            'color': '#e5e8f7'
          }
        },
        'emphasis': {
          'textStyle': {
            'color': '#e5e8f7'
          }
        }
      }
    },
    'visualMap': {
      'color': [
        '#2a99c9',
        '#afe8ff'
      ]
    },
    'dataZoom': {
      'backgroundColor': 'rgba(255,255,255,0)',
      'dataBackgroundColor': 'rgba(160,214,252,1)',
      'fillerColor': 'rgba(160,209,245,0.42)',
      'handleColor': '#dce8ff',
      'handleSize': '100%',
      'textStyle': {
        'color': '#dce8ff'
      }
    },
    'markPoint': {
      'label': {
        'normal': {
          'textStyle': {
            'color': '#ffffff'
          }
        },
        'emphasis': {
          'textStyle': {
            'color': '#ffffff'
          }
        }
      }
    }
  })
}))
