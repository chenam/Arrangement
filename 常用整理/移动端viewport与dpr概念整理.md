## 移动端viewport与dpr
之前用flexible的时候遇到一个坑，是关于viewport和dpr的，现在整理一下它们的概念用法。  

### viewport  
>手机浏览器是把页面放在一个虚拟的“窗口”（viewport）中，通常这个虚拟的“窗口”（viewport）比屏幕宽，这样就不用把每个网页挤到很小的窗口中（这样会破坏没有针对手机浏览器优化的网页的布局），用户可以通过平移和缩放来看网页的不同部分。 
  
一个包含viewport的meta标签结构基本如下：  
```
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
```
width：控制 viewport 的大小，可以指定的一个值，如果 600，或者特殊的值，如 device-width 为设备的宽度（单位为缩放为 100% 时的 CSS 的像素），一般我们都习惯设置为设备的宽度，方便自适应，当然有需要的话也可以给每个设备设置同一个宽度值来完全显示你需要展示的宽度。   
height：和 width 相对应，指定高度。  
initial-scale：初始缩放比例，也即是当页面第一次 load 的时候缩放比例。  
maximum-scale：允许用户缩放到的最大比例。  
minimum-scale：允许用户缩放到的最小比例。  
user-scalable：用户是否可以手动缩放
