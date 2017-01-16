var suapendNav = {
    init:function(){
        var self = this;
        self.curState(0);
        self.bindEvent();
    },
    bindEvent:function(){
        var self = this;
        // 点击事件
        $(".suapendNavMain dd").unbind('click').bind('click',function(){
            var ind = $(this).index();
            self.curState(ind);
        });

        // 滚轮事件 // 当鼠标在导航区域时，外部不滚动
        var $suspendNav = document.getElementById("suspendNav");
        if(document.addEventListener){//Firefox使用addEventListener添加滚轮事件
            $suspendNav.addEventListener("DOMMouseScroll",self.enableScroll,false);
        }
        $suspendNav.onmousewheel = self.enableScroll;//IE/Opera/Chrome

        //onscroll 事件在元素滚动条在滚动时触发。
        //滚动条的滑动距离大于等于定位元素距离浏览器顶部的距离，就固定，反之就不固定
        var navHeight = $suspendNav.style.top;
        $(window).scroll(function(){
            self.navfix(navHeight);
            self.navScroll();
        });

    },
    navScroll:function(){
        var self = this;
        //当滚动到第五个的时候，滚动条导航业滚动
        var nodeScrollDis = $("#block5").offset().top-200;
        var $suspendNav = $("#suspendNav");
        //滚动高度
        var scrollDis = $(window).scrollTop();
        if(scrollDis > nodeScrollDis){
            $suspendNav.scrollTop(scrollDis - nodeScrollDis)
        }else if(scrollDis <nodeScrollDis){
            $suspendNav.scrollTop(scrollDis - nodeScrollDis)
        }

        // 设置节点跳动
        if(scrollDis >= ($("#block1").offset().top) && scrollDis < ($("#block2").offset().top-200)){
            self.curState(0);
        }else if(scrollDis >= ($("#block2").offset().top-200) && scrollDis < ($("#block3").offset().top-200)){
            self.curState(1);
        }else if(scrollDis >= ($("#block3").offset().top-200) && scrollDis < ($("#block4").offset().top-200)){
            self.curState(2);
        }else if(scrollDis >= ($("#block4").offset().top-200) && scrollDis < ($("#block5").offset().top-200)){
            self.curState(3);
        }else if(scrollDis >= ($("#block5").offset().top-200) && scrollDis < ($("#block6").offset().top-200)){
            self.curState(4);
        }else if(scrollDis >= ($("#block6").offset().top-200) && scrollDis < ($("#block7").offset().top-200)){
            self.curState(5);
        }else if(scrollDis >= ($("#block7").offset().top-200) && scrollDis < ($("#block8").offset().top-200)){
            self.curState(6);
        }else if(scrollDis >= ($("#block8").offset().top-200) && scrollDis < ($("#block9").offset().top-200)){
            self.curState(7);
        }else if(scrollDis >= ($("#block9").offset().top-200)){
            self.curState(8);
        }
    },
    navfix:function(navHeight){
        var self = this;
        var scrollDis = $(window).scrollTop();
        var $suspendNav = $("#suspendNav");
        if(scrollDis > navHeight){
            $suspendNav.css({
                "position":"fixed",
                "top":5+"px"
            });
        }else{
            $suspendNav.css({
                "position":"absolute",
                "top":navHeight
            });
        }

    },
    curState:function(index){
        var $child = $(".suapendNavMain").children();
        $child.removeClass("active");
        $child.eq(index).addClass("active");
    },
    enableScroll:function(e){
        var self = this;
//        判断滚轮向上或者向下，
//        1.firefox用detail，3为向下滚动，-3表示向上滚动。
//            其他用wheelDelta,120为向上滚动，-120表示向下滚动
//        2.console.log(e) == wheelEvent??;
//            $(this) == $suspendNav;
//        3.scrollTop():得到滚动距离;
        var delta;//滚动方向
        var scrollDis = $(this).scrollTop();//滚动距离
        var $suspendNav = $("#suspendNav");//导航对象

        if(e.wheelDelta){//chrome
            delta = e.wheelDelta/120;
        }else if(e.detail){//firefox
            delta = -e.detail/3;
        }
        
        if(delta > 0){// 向上滚动
            if(scrollDis == 0){
                return false;
            }
        }else if(delta < 0){//向下滚动
            var MaxScrollHeight = $(".suapendNavMain").outerHeight() - $suspendNav.height();//导航中滚动条能够滚动的最大的距离
            if(scrollDis == MaxScrollHeight){
                return false;
            }
        }
    }

};
suapendNav.init();