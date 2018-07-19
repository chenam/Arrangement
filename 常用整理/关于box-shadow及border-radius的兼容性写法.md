### CSS3的box-shadow及border-radius在ie中的兼容写法  
#### 方法一  
使用滤镜（box-shadow）
```
filter:progid:DXImageTransform.Microsoft.Shadow(color='#cfdbde',Direction=180,Strength=5);
-moz-box-shadow:0 0 10px #cfdbde; 
-webkit-box-shadow:0 0 10px #cfdbde; 
box-shadow:0 0 10px #cfdbde;
```  
#### 方法二  
引用PIE.htc  
下载地址：[http://css3pie.com/download/](http://css3pie.com/download/)  
提示：PIE.htc URL路径是相对于当前HTML文件，不是CSS文件,比如 当前文件在“/”下 ，CSS文件在“/CSS”下，`PIE.htc`在“/CSS”下，`behavior: url(/css/PIE.htc)` 而不是`behavior: url(PIE.htc)`
```
border-radius:20px;
-moz-box-shadow:0 0 10px #cfdbde; 
-webkit-box-shadow:0 0 10px #cfdbde; 
box-shadow:0 0 10px #cfdbde;
behavior: url(css/PIE.htc);
```  
`PIE.htc`文件可以让ie6/7/8支持的CSS3属性有border-radius、box-shadow、border-image、CSS3 Backgrounds (-pie-background)、Gradients、RGBA属性
