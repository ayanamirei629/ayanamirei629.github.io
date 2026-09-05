# Yingge Hu / Craig — Portfolio

双语研究与个人作品主页，使用 React、Vite、Tailwind CSS、i18next 和 Framer Motion。

## 本地开发

```sh
npm install
npm run dev -- --host 127.0.0.1 --port 5173 --strictPort
```

打开 http://127.0.0.1:5173/。已有依赖时无需重复安装。

## 本地部署生产构建

```sh
npm run build
npm run preview -- --host 127.0.0.1 --port 5173 --strictPort
```

先停止占用同一端口的开发服务器。生产预览读取 `dist/`，修改源码后需重新构建；开发模式支持热更新。服务器仅绑定本机地址。

## 内容与视觉维护

- 双语内容：`src/i18n/en.json`、`src/i18n/zh.json`。项目使用相同稳定 `id`，保持双语项目集合一致。
- 页面顺序：`src/App.jsx`。各组件在 `src/components/`。
- 色彩、字体与响应式样式：`src/index.css`。公共章节样式由 `SectionWrapper` 提供。
- 黑洞背景：`BlackHoleBackground.jsx`。随首屏滚动淡出，离开首屏及页面隐藏时暂停动画，并尊重系统减少动画设置。
- 语言切换更新文档 `lang`，并将偏好保存到本机浏览器。
- 报告与 PDF：`public/research/`、`public/files/`。项目预览为已有公开报告的静态截图，最新日期及验证边界以报告为准。
- 报告品牌导航：`public/research/model-showcase-current.js` 和 `model-showcase.css`。独立纸面执行页面的入口在 `golden-finger.html`。

## 验证

```sh
npm run lint
npm run build
```

浏览器核对中英文、390px / 820px / 1440px 布局，菜单打开与 Escape 关闭、锚点导航、折叠动态与经历、报告返回、PDF 和作品存档入口。所有研究结果及历史报告数据保持独立维护。
