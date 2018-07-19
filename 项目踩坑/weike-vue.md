### 微课社团项目使用vue开发问题小结  
此次项目开发主要分五个模块：通知、作业、考勤、课堂表现、精彩课堂
#### 组件化开发
- 概览页面效果图，提取需要开发的组件  
![组件图片](images/weike-vue/img01.png)  此项目中的组件目录  

组件里再细分大的组件和小的组件，例如社团列表页主要由一个大的列表组件WListBox组成，列表组件中又包含了其他小的组件WPhotos,WComment,WPerformance,WCheckAttendance,BAudio  

- 组件开发细节问题  
1. 开发组件的过程中注意单纯开发组件的样式，组件之外的布局结构不要考虑  
2. 注意其需要与父组件通信的地方，子组件在`props`中定义需要用到的参数，确保父组件可以通过`props`传递数据给子组件；子组件通过`this.$emit`触发一个方法传值给父组件。例如在子组件中点击删除按钮删除父页面中的数据

子组件
```
<template>
    <span @click.stop="deleteItem" >删除</span>
</template>

props: {
    data: null,
    index: null,
},
methods: {
    deleteItem() {
        this.$emit('delete', this.index)
    }
}
```  
父组件
```
<div>
    <w-list-box @delete="deleteItem" :data="data" :index="index" v-for="(data, index) in msgList" :key="index" />
</div>

methods: {
    deleteItem(index) {
        this.msgList.splice(index,1);
    }
}
```
3. 父组件传值给子组件的时候只需传子组件需要用到的值，不要把所有的数据都传过去。如下代码只给WPhotos组件传了一个图片地址参数

父组件
```  
<div class="photos" v-if="data.picUrls">
    <w-photos :data="data.picUrls" />
</div>
```       
子组件  
``` 
props: {
    data: null,
}
``` 

4. 引用组件的时候记得先在`components`里定义组件  
```  
components:{
    WPhotos,
    ...
}
```  
#### 页面整合  
- 筛选页面的共同属性，同种属性的页面整合在一起  
此次项目的开发中会有教师和学生账号登陆的区别，不同的账号登录显示的界面不同，权限和功能也不同，按照往常的思维是会给不同权限的人做不同的页面，这样页面就会很多，并且有很多的重复，为了避免这种情况我们可以把同种属性的页面整合在一起。例如教师端的列表页和学生端的列表页就可以整合在一起，然后通过判断登陆的账号让其显示不同的页面和功能 

- 页面整合细节问题  
1. 在编写组件的时候就筛选出一些可以整合的组件，如下图中教师端和学生端列表中的考勤信息，这两个组件就可以整合在一个WCheckAttendance组件中  
![组件图片](images/weike-vue/img02.png)![组件图片](images/weike-vue/img03.png)  
2. 页面整合过程中注意捋顺逻辑，定义好控制显示的变量，如登陆的账号参数  
3. 组件开发及页面整合的过程中`v-if`及`v-else`的使用极为重要，大多使用`v-if`指令定义显示的条件  
#### 其他细节总结  
- vue中获取DOM方法  
首先给元素注册一个`ref`特性，如下  
``` 
<audio :src="data" id="audioTag" ref="audio"></audio>
``` 
引用该DOM的时候用`$refs`，例如给`audio`绑定一个播放事件
``` 
this.$refs.audio.play();
``` 
- vue中方法及参数调用  
vue中在一个方法中调用另一个方法以及在调用定义过的参数时，记得在前面加`this`  
``` 
data () {
    return {            
        submit:'1',
        ...
    }
},
methods: {
    saveWork(){
        this.submit = '0',
        this.release()
    },
    release() {
        ...
    }
}
```
- vue中路径解析  
vue中定义一个图片路径的时候需要用`require`对它进行解析，直接传图片路径地址，页面上`img`里的图片路径`src`中看似是一个正确的图片路径，但是点击打开其实是一个链接地址，而不是一个图片地址，解析过后的`src`是一个带有base编码的文件，解析之后图片才能正常显示  

解析之前
``` 
<img src="../assets/logo.png" alt="">
``` 
解析之后
``` 
<img src="data:image/png;base64,iVBOR...FTKSuQmCC" alt="">
``` 
所以在传图片路径参数和定义图片地址参数的时候需要加一个`require`  
``` 
<w-photos :imgUrl="require('../assets/logo.png')" />

data () {
    return {            
        imgUrl: require('../assets/logo.png')
    }
}
``` 
