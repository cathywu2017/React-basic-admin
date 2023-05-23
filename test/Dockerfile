# Stage 1
# 使用 Node 的版本
FROM node:alpine as run-build

# 位置
WORKDIR /test

# 複製 package 設定
COPY package.json ./

# 安裝套件
RUN npm install

# 第一個 . 是本機位置，第二個是 docker 裡面專案的位置，就是將我們專案的程式碼全部複製進去
COPY . .

# 打包專案
RUN npm run build

# Stage 2
# 使用 nginx 的版本
FROM nginx:latest

# 指定複製對象
COPY --from=run-build /test/build /usr/share/nginx/html

# 複製格式
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]