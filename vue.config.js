module.exports = {
  baseUrl: process.env.NODE_ENV === 'production' ? '/Simplex-Mixer/': '/'
  chainWebpack: config => {
    config.module
      .rule('raw-loader')
      .test(/\.txt$/)
      .use('raw-loader')
        .loader('raw-loader')
        .end()
  }
}
