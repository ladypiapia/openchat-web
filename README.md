# openchat-web

## 项目简介

openchat-web是一个基于react router v7、chakra-ui、tanstack query、ky、zod的前端AI Chatbot项目。

## 配套后端地址: https://github.com/akazwz/openchat-go

### 功能特色

- **自适应** 支持PC端、移动端。
- **AI绘画** 支持AI绘画。
- **AI聊天** 支持AI聊天。
- **用户认证系统** 支持登录、注册。
- **token刷新** 支持token过期自动刷新。

### 用到了什么
1. react router v7, prerender
2. chakra-ui
3. tanstack query
4. ky
5. zod

### 截图
 <img src="docs/home.png" alt="home">
 <img src="docs/images_mobile_dark.png" alt="images_mobile_dark">
 <img src="docs/images_light.png" alt="images_light">
 <img src="docs/chat.png" alt="chat">

### 部署说明

1. 克隆项目
```bash
git clone https://github.com/akazwz/openchat-web.git
cd openchat-web
```

2. 安装依赖
```bash
pnpm install
```

3. 配置环境变量
- 将 `.env.example` 文件复制并重命名为 `.env`
- 在 `.env` 文件中设置后端API地址：
```
VITE_API_URL=你的后端API地址
```

4. 运行项目
```bash
pnpm dev
```

5. 构建项目
```bash
pnpm build
```

### Docker 部署

项目提供了 Docker 和 Docker Compose 支持，可以轻松部署。默认打包为ssg 用 nginx 部署

### 使用 Docker Compose 部署（推荐）
```yaml
# docker-compose.yml 已包含在项目中
services:
  web:
    build: .
    ports:
      - "8080:80"
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:80"]
      interval: 30s
      timeout: 10s
      retries: 3
```

运行命令：
```bash
# 构建并启动服务
docker-compose up -d

# 查看日志
docker-compose logs -f
```

访问 `http://localhost:8080` 即可看到应用。

### 手动 Docker 构建（可选）
```bash
# 构建镜像
docker build -t openchat-web .

# 运行容器
docker run -d -p 8080:80 --name openchat-web openchat-web
```

### 注意事项

- 应用默认运行在 8080 端口
- 容器内使用 nginx 作为 web 服务器（80端口）
- 已配置健康检查确保服务稳定性
- 如需修改配置，可以通过挂载 nginx.conf 实现
