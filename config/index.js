
'use strict'

const path = require('path')

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsPublicPath: './',
    assetsSubDirectory: 'static',
    productionSourceMap: false,
    devtool: '#source-map',
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    port: process.env.PORT || 8080,
    assetsSubDirectory: 'static',
    assetsPublicPath: './',
    productionSourceMap: false,
    devtool: '#source-map',
    proxyTable: {},
    cssSourceMap: false
  }
}
