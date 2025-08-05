module.exports = {
  // 域名校验
  checkHostName: (host, target) => {
    if (!host || !target) {
      return false;
    }
    const domainParts = host.split('.');
    if (domainParts.length < 3) {
      return false; // 不是二级域名
    }
    return host.endsWith(`.${target}`);
  },

  // 获取开头域名
  getSubdomain: (host) => {
    if (!host) {
      return null;
    }
    const domainParts = host.split('.');
    if (domainParts.length < 3) {
      return null; // 不是二级域名
    }
    return domainParts[0];
  }
}