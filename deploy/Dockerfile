# 使用官方Node.js运行时作为基础镜像
FROM node:22-alpine

# 设置工作目录
WORKDIR /app

# 设置构建参数和默认值
ARG PORT=3000
ARG TARGET=localhost
ENV PORT=${PORT}
ENV TARGET=${TARGET}

# 创建环境变量到.env文件的脚本
RUN echo PORT=${PORT} > .env && \
    echo TARGET=${TARGET} >> .env && \
    echo '.env文件已生成'

# 复制源代码到工作目录（修正路径）
COPY src ./src

# 复制package.json和pnpm-lock.yaml
COPY package.json ./
COPY pnpm-lock.yaml ./

# 安装pnpm
RUN npm install -g pnpm

# 安装依赖
RUN pnpm install

# 暴露端口（使用固定端口，运行时通过环境变量覆盖）
EXPOSE ${PORT}

# 启动脚本
CMD ["/bin/sh", "-c", "pnpm start"]
