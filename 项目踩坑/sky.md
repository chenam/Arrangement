- 因为javascript的限制，Vue不能检测的变动数组(列表数据，改变单个状态,值改变了，但是视图没有更新)     
1. 直接利用索引直接改变一个项:      
```
vm.items[index] = newValue;   
```
2. 修改数组长度  
这时候如果一定要更新，可以用下面的方法，或者split也可以
```
this.$set(items,index,newValue);
```

    
- 父子组件通信(不用vuex的简单通信)&nbsp; [小demo][1]    

[1]: https://jsfiddle.net/0y7bsth4/7/

子组件也可以通过`this.$parent.xxFun();`调用父组件的方法

3.computed