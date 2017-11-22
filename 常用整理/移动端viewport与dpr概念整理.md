## 移动端viewport与dpr
> 之前用flexible的时候遇到一个坑，是关于viewport和dpr的，现在整理一下它们的概念用法。  

### viewport  
viewport的解释是：手机浏览器是把页面放在一个虚拟的“窗口”（viewport）中，通常这个虚拟的“窗口”（viewport）比屏幕宽，这样就不用把每个网页挤到很小的窗口中（这样会破坏没有针对手机浏览器优化的网页的布局），用户可以通过平移和缩放来看网页的不同部分。  
一个包含viewport的meta标签结构基本如下：  
<meta name=”viewport” content=”width=device-width, initial-scale=1, maximum-scale=1″>
