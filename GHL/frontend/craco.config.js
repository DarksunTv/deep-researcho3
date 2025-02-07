module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.resolve.fallback = {
        ...(webpackConfig.resolve.fallback || {}),
        zlib: false,
        path: false,
        os: false,
        crypto: false,
        stream: false,
        process: require.resolve('process/browser'),
        buffer: require.resolve('buffer/'),
        querystring: false,
        url: false,
        util: false,
        fs: false,
        net: false,
      };
      return webpackConfig;
    }
  }
}; 