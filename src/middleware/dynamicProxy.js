const { createProxyMiddleware } = require('http-proxy-middleware');
const { checkHostName, getSubdomain } = require('../utils/index');

const targetDomain = process.env.TARGET; // 目标域名
const proxyConfig = require('../../config/apps'); // 配置文件 - 定义二级域名到目标地址的映射

module.exports = (req, res, next) => {
  const host = req.headers.host;
  console.log(`收到请求: ${req.method} ${host}${req.url}`);
  
  if (!host) {
    return res.status(400).send('Bad Request: Missing Host header');
  }

  // 验证是否指定域名
  if (!checkHostName(host, targetDomain)) {
    return res.status(400).send('Bad Request: Expected a subdomain');
  }

  // 提取子域名
  const subdomain = getSubdomain(host);
  const targetUrl = proxyConfig[subdomain];
  if (!targetUrl) {
    return res.status(502).send('Bad Gateway: No target configured for this subdomain');
  }
  
  console.log(`子域名: ${subdomain} -> 目标地址: ${targetUrl}`);
  
  // 创建代理中间件
  const proxy = createProxyMiddleware({
    target: targetUrl,
    changeOrigin: true,
    ws: true, // 支持 WebSocket
    onError: (err, req, res) => {
      console.error('代理错误:', err.message);
      res.status(500).send('代理服务器错误');
    },
    onProxyReq: (proxyReq, req, res) => {
      console.log(`代理请求: ${req.method} ${req.url} -> ${targetUrl}`);
    },
    onProxyRes: (proxyRes, req, res) => {
      console.log(`代理响应: ${proxyRes.statusCode} ${req.url}`);
    }
  });
  
  proxy(req, res, next);
};