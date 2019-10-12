
const path =require('path') //路径
const UglifyJsPlugin = require('uglifyjs-webpack-plugin'); //npm install uglifyjs-webpack-plugin --save-dev  开发环境依赖 插件用来缩小（压缩优化）js文件

// 判断是否是生产环境

const isProduction=process.env.NODE_ENV==='production'

// 引入文件

function reslove(dir){
	return path.reslove(__dirname,dir)
}

module.exports={
   // 基本路劲
	publicPath:'./',
	// 输出文件目录
	outputDir:'dist',
	 // eslint-loader 是否在保存的时候检查
    lintOnSave: true,
    // 服务配置
	devServer:{
      compress:false,
      open:true,
      // 跨域请求
      proxy:{
      	// 匹配到请求中的api字段时
      	'/api':{
      		target:'localhost:4000',//需要代理的服务器
      		ws:true, //websocket 览器和服务器只需要完成一次握手，两者之间就直接可以创建持久性的连接，并进行双向数据传输。
      		changOrigin:true,//允许跨域
      		pathRewrite:{
      			// 重写api
      			'/api':'/'
      		}
      	}
      },

      // 配置后端路由
      before:app=>{
      
	      app.get('/api/seller',(req,res)=>{
	         
	         res.json({
	         	code:0,
	         	data:xxx
	         })

	      }),

	      app.get('/api/goods',(req,res)=>{
	      	res.json({
	      		code:0,
	      		data:xxx
	      	})
	      }),

	      app.get('/api/ratings',(req,res)=>{
	      	res.json({
	      		code:0,
	      		data:xxx
	      	})
	      })

      }


	},
  
  // 处理css相关的配置

  css:{
  	 // 是否使用css分离插件 ExtractTextPlugin
  	extract:true,
    // 是否开启CSS source maps
    sourceMap: false,

    loaderOptions:{
    	sass:{
    		data:`@import"@assets/common/index.scss"`
    	},
    	stylus: {
    		
	        'resolve url': true,
	        'import': [
	          './src/theme'
	        ]
      }
    },
    // 是否启用css
    modules:false

  },

  // webpack的配置

  chainWebpack:config=>{
     // 配置别名
  	 config.resolve.alias
  	 .set('@',reslove('src'))
  	 .set('common',reslove('src/common'))
  	 .set('views',reslove('src/views'))
  	 .set('components',reslove('src/components'))

  	 // 生产环境配置

  	 if(isProduction){
  	 	// 删除预加载
  	 	config.plugin.delete('preload')
  	 	// 开启压缩代码
  	 	config.optimization.minimize(true)
  	 	// 分割代码
  	 	config.optimization.splitChunks({
  	 		chunks:'all'
  	 	})
  	 	// cdn 配置
  	 }else{
  	 	// 开发环境测试
  	 }
  },
  
  // 生产环境的
  productionSoureMap:false,
  // os.cpus().length 默认是0
  // 启用并行化 多进程
  parallel:require('os').cpus().length > 1,


}
