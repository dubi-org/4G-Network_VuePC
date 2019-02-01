const path = require('path')
const fs = require('fs')

const resolve = dir => {
  return path.join(__dirname, dir)
}

const env = process.env.NODE_ENV || 'development'
fs.writeFileSync(path.join(__dirname, './config/env.js'), `export default '${env}'
`)

// 这里需要修改为你线上项目存放的路径
// 比如你打包的文件放到服务器的my-app文件夹，域名为a.com，则应改为
// http(s)://a.com/my-app/ (一定要是绝对路径才能正常显示字体文件的路径)
const BASE_URL = process.env.NODE_ENV === 'production'
  ? '/na'
  : '/'
// http://localhost/dist
module.exports = {
  // 项目部署的基础路径
  // 我们默认假设你的应用将会部署在域名的根部,
  // 例如 https://www.my-app.com/
  // 如果你的应用部署在一个子路径下，那么你需要在这里
  // 指定子路径。比如将你的应用部署在
  // https://www.foobar.com/my-app/
  // 那么将这个值改为 '/my-app/'
  baseUrl: BASE_URL,
  // 构建好的文件输出到哪里
  outputDir: 'dist',
  // where to put static assets (js/css/img/font/...)
  // 是否在保存时使用‘eslint-loader’进行检查
  // 有效值: true | false | 'error'
  // 当设置为‘error’时，检查出的错误会触发编译失败
  // lintOnSave: true,
  // babel-loader默认会跳过`node_modules`依赖.
  // 通过这个选项可以显示转译一个依赖
  transpileDependencies: [
    /* string or regex */
  ],
  // 是否为生产环境构建生成sourceMap?
  productionSourceMap: false,
  // 调整内部的webpack配置.
  // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src')) // key,value自行定义，比如.set('@@', resolve('src/components'))
      .set('@assets', resolve('src/assets'))
      .set('_c', resolve('src/components'))
      .set('_conf', resolve('config'))
  },
  // CSS 相关选项

  css: {
    extract: false
  },
  devServer: {
    proxy: {
      '/geo': {
        target: 'http://localhost/geoJson',
        changeOrigin: true,
        pathRewrite: {
          '^/geo': '/'
        }
      }
    }
  }
}
