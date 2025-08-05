const express = require('express');

// 中间件：解析子域名并代理请求
const dynamicProxy = require('./middleware/dynamicProxy');

const app = express();

// 应用代理中间件
app.use('/', dynamicProxy);

// 启动 HTTP 服务器
require('dotenv').config();
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`🚀 HTTP 代理服务器运行在端口 ${port}`);
});

// 优雅关闭
process.on('SIGTERM', () => {
  console.log('收到 SIGTERM 信号，正在关闭服务器...');
  server.close(() => {
    console.log('服务器已关闭');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('收到 SIGINT 信号，正在关闭服务器...');
  server.close(() => {
    console.log('服务器已关闭');
    process.exit(0);
  });
});
