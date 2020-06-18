// module.exports = {
//   module: {
//     rules: [
//         { test: /\.css$/, use: ['style-loader', 'file-loader', 'css-loader'] },   //test是正则匹配标识符,表示匹配什么文件
//         { test: /\.(jpg|jpeg|png|gif|bmp|ttf|svg)$/ , use :'url-loader'}
//       ]
//       } 
// }

let rules =  [
  {
      test: /\.(png|jpe?g)/,
      use:[
          { loader: 'url-loader' ,options: {
                  limit: config.inlineImageLimit,
                  fallback: 'file-loader',
                  publicPath: `${config.assetPrefix || '/_next/static/images/'}`,
                  outputPath: `${options.isServer ? "../" : ""}static/images/`,
                  name: "[name]-[hash].[ext]",
                  esModule: false
              }}
      ]
  },
  {
      test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
      use: [
          {
              loader: 'babel-loader',
          },
          {
              loader: '@svgr/webpack',
              options: {
                  babel: false,
                  icon: true,
              },
          },
      ],
  }
];

config.module.rules = _.concat(config.module.rules,rules);

module.exports = config