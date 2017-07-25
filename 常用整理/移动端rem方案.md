## 移动端rem方案
![图片]http://via.placeholder.com/350x150

> 写过几次移动端的小项目，每次在布局上都会遇到或多或少的坑，总结一下rem的移动端方案。

移动端的适配解决：
- meta
- 尽量不要写width／height，改用`max-width`和`min-width`
- flex布局
- media

### rem

rem（font size of the root element）是指相对于根元素（即html元素）的字体大小的单位。
### low版
因为一般浏览器默认的html是16px，已此为基准进行开发。(设计稿宽度是750px)

```
(function (doc, win){
    var docE1 = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function (){
            var clientWidth = docE1.clientWidth;
            if(!clientWidth) return;
            docE1.style.fontSize = 16 * (clientWidth / 375) + 'px';            
        };

    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt,recalc,false);
    doc.addEventListener('DOMContentLoaded',recalc,false);
})(document,window);

```

### 普通版

- 禁止浏览器缩放
```
<meta content="width=device-width,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no" name="viewport"/>
```
- 设置html的font-size是 页面宽度／10

```
(function() {
    var newRem = function() {
        var html = document.documentElement;
        html.style.fontSize = html.getBoundingClientRect().width / 10 + 'px';
        //为什么／10，因为太大有小数点，太小谷歌浏览器会有font-size最小限制
    };
    window.addEventListener('resize', newRem, false);
    newRem();
})();

```
- 10rem = 页面宽度，所有单位都用rem=所有长度都以页面宽度为准

### 高级版

##### 设备像素比（device pixel ratio）

简称为dpr，对应关系为：

> 设备像素比 ＝ 物理像素 / 设备独立像素

在JavaScript中，可以通过window.devicePixelRatio 来获得。

为啥有这货呢？因为在ios中 1px !== 1设备像素
