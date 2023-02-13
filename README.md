# tao-vue

## 配置环境
```js
// 安装 ts
npm install typescript --dev

// 生成 ts 配置
npx tsc --init

// 使 jest 支持 ts
npm install jest @types/jest --dev

// 使支持 esm 规范
npm install --save-dev babel-jest @babel/core @babel/preset-env

// 使 bable 支持 ts
npm install --save-dev @babel/preset-typescript

// tsconfig.json
"types": ["jest"]
"noImplicitAny": false,

// package.json
"scripts": {
    "test": "jest"
}

// babel.config.js
module.exports = {
  presets: [
    ['@babel/preset-env', {targets: {node: 'current'}}],
    '@babel/preset-typescript',
  ],
}
```
