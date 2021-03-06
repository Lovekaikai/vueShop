var path = require('path')
var htmlWebpackPlugin=require("html-webpack-plugin");
module.exports = {
    // 入口文件
    entry: './src/main.js',

    // 输出文件配置
    output: {
        // 输出的路径，webpack2起就规定必须是绝对路径
        path: path.join(__dirname, 'dist'),
        // 静态资源在服务器上运行时的访问路径，可以直接http://localhost:8080/dist/bundle.js访问到服务器中的bundle.js文件
        // publicPath: '/dist',
        // 输出文件名字
        filename: 'bundle.js'
    },
    module: {
        rules: [
            // 配置的是用来解析.css文件的loader(style-loader和css-loader)
            {
                // 1.0 用正则匹配当前访问的文件的后缀名是  .css
                test: /\.css$/,
                use: ['style-loader', 'css-loader'] //webpack底层调用这些包的顺序是从右到左
            },
            {
                test: /\.less$/,
                use: [{
                    loader: 'style-loader'
                }, {
                    loader: 'css-loader'
                }, {
                    loader: 'less-loader'
                }]
            },
            {
                test: /\.(png|jpg|gif|eot|svg|ttf|woff)/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        // limit参数表示，如果图片大于50b的时候，就是路径形式，如果小于50b，就把图片变成base64格式
                        limit: 50000
                    }
                }]
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                  test: /\.js$/, 
                  use: 'babel-loader',
                  exclude: /node_modules/
            }
        ]
    },
    plugins:[
        new htmlWebpackPlugin({
            template:'./src/index.html',
            filename:'index.html'
        })
    ]
}