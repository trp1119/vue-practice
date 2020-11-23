// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
  "plugins": {
    "postcss-import": {}, // 处理@import引用路径问题
    "postcss-url": {}, // 处理图片、字体等文件的引用路径问题
    // to edit target browsers: use "browserslist" field in package.json
    // "autoprefixer": {}, // 自动处理浏览器前缀  cssnano 具有 autoprefixer，故将 autoprefixer 删除
    "cssnano": { // 压缩和清理CSS代码
      // preset: "advanced",
      // autoprefixer: false,
      // "postcss-zindex": false, // 启用了这个，z-index 的值就会重置为1，勿启用！
      // 上面是旧配置，下面是新配置
      "cssnano-preset-advanced": {
        zindex: false,
        autoprefixer: false
      },
    },
    "postcss-aspect-ratio-mini": {}, // 处理元素容器宽高比
    "postcss-write-svg": { // 处理移动端 1px 的解决方案
      utf8: false,
    },
    "postcss-cssnext": {}, // 使用CSS未来的特性
    "postcss-px-to-viewport": { // 把px单位转换为 vw、vh、vmin、vmax 视窗单位
      viewportWidth: 750, // 视窗的宽度，对应的是我们设计稿的宽度，一般是750
      viewportHeight: 1334, // 视窗的高度，根据750设备的宽度来指定，一般指定1334，也可以不配置
      unitPrecision: 3, // 指定 px 转换为视窗单位值的小数位数（很多时候无法整除）
      viewportUnit: 'vw', // 指定需要转换成的视窗单位，建议使用vw
      selectorBlackList: ['.ignore', '.hairlines'],  // 指定不转换为视窗单位的类，可以自定义，可以无限添加，建议定义一至两个通用的类名
      minPixelValue: 1, // 小于或等于 1px 不转换为视窗单位，也可以设置为想要的值
      mediaQuery: false, // 允许在媒体查询中转换 px
    }, 
    "postcss-viewport-units": {}, // 给 CSS 的属性添加 content 属性，配合viewport-units-buggyfill 库给 vw、vh、vmin 和 vmax 做适配操作
  }
}
