const express = require('express');

require('dotenv').config();

// 中间件：解析子域名并代理请求
const dynamicProxy = require('./middleware/dynamicProxy');

const app = express();
// 应用代理中间件
app.use('/', dynamicProxy);

// 启动 HTTP 服务器
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`🚀 HTTP 代理服务器运行在端口 ${port}`);
});
