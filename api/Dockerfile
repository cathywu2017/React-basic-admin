# 使用 Node 的版本
FROM node:14-alpine

# 位置
WORKDIR /api

# 複製 package 設定
COPY package.json ./

# 安裝套件
RUN npm install

# 第一個 . 是本機位置，第二個是 docker 裡面專案的位置，就是將我們專案的程式碼全部複製進去
COPY . .

# port
EXPOSE 9988

# 執行專案
CMD npm start
