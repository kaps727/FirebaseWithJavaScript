module.exports = {
    mode:'development',
    entry:[__dirname+'/app/index.js'],
    output:{
        path: __dirname+'/build',
        filename: 'bundle.js'
    },
    module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['babel-preset-es2015']
              }
            }
          }
        ]
      },
    devServer:{
        port:3000,
        contentBase:__dirname +'/build',
        inline:true
    }
}