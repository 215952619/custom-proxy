# 使用官方Node.js运行时作为基础镜像
FROM node:18-alpine

# 设置工作目录
WORKDIR /app

# 创建环境变量到.env文件的脚本
RUN echo 'PORT=${PORT}' > .env && \
    echo 'TARGET=${TARGET}' >> .env && \
    echo '.env文件已生成'

# 复制源代码到工作目录
COPY ../src ./src

# 复制package.json和pnpm-lock.yaml（如果存在）
COPY ../package.json ./
COPY ../pnpm-lock.yaml ./

# 安装pnpm（如果项目使用pnpm）
RUN npm install -g pnpm

# 安装依赖
RUN pnpm install

# 创建证书目录
RUN mkdir -p /var/www/certbot

# 暴露端口
EXPOSE ${PORT}

# 启动脚本
CMD ["/bin/sh", "-c", "npm start"]
