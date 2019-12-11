

$(function () {
    openingAnimation();
    musicControl();
    //window页面加载完启动index2彩虹球，防止切换index时执行造成的卡顿丢帧
    window.onload=function(){
        getRealtime();
        toLinkPage();
        earthPosition();
        doRainbowBall();
    };
    //窗口变化进行index2地球位置及手机端样式微调
    $(window).resize(function(){
        earthPosition();
    });


});

/**
 *
 * 手机端样式微调调整
 */
function adjustPhone(){

            var sUserAgent = navigator.userAgent.toLowerCase();
            var bIsIpad = sUserAgent.match(/ipad/i) == 'ipad';
            var bIsIphone = sUserAgent.match(/iphone os/i) == 'iphone os';
            var bIsMidp = sUserAgent.match(/midp/i) == 'midp';
            var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == 'rv:1.2.3.4';
            var bIsUc = sUserAgent.match(/ucweb/i) == 'web';
            var bIsCE = sUserAgent.match(/windows ce/i) == 'windows ce';
            var bIsWM = sUserAgent.match(/windows mobile/i) == 'windows mobile';
            var bIsAndroid = sUserAgent.match(/android/i) == 'android';

            if(bIsIpad || bIsIphone || bIsMidp || bIsUc7 || bIsUc || bIsCE || bIsWM || bIsAndroid ){
                $(".index1 img").css({"width":"82%","bottom":"43%"});
                $(".love-tree").css({"bottom":"-3%","right":"-3%"});
                $(".moon").css({"left":"20%","width":"60%","height":"20%","top":"24%"});
                $(".earth").css("bottom","18%");

            }


}
/**
 *
 * 音乐播放控制
 */
function musicControl() {
    var deg=0;
    var imgTimer;
    var audio = document.getElementById('music');
     audio.currentTime = 0;//音乐从头播放
    audio.play();
    var rotateImg=function(){
        $(".musicicon").css("transform","rotate("+deg+"deg)");
        deg=deg<360?deg+2:0;
        imgTimer=requestAnimationFrame(function(){
            rotateImg();
        });
    };
    rotateImg();

    $(".musicicon").on("click",function(){
        if (audio.paused) {
            audio.play();
            rotateImg();
        }else{
            audio.pause();
            // audio.currentTime = 0;//音乐从头播放
            cancelAnimationFrame(imgTimer);
        }
    })

}
/**
 *
 * index1首页
 */
function  openingAnimation(){
    var per=100;
    var deg=0;
    var frametimer;
    $(".index1").on("click",function(){
        //开始进入index2页面，提前开始执行index2动画
        heartAnimate();
        animate();
    });
    var animate=function(){
        if(per>=0){
        	deg+=10;
            $(".index1").css({"width":per+'%',"height":per+'%',"left":"50%","bottom":"50%"});
            $(".index1").css({"margin-left":0-$(".index1").width()/2,"margin-bottom":0-$(".index1").height()/2});
            $(".index1").css({"transform":"rotate("+deg+"deg)"});
            per=per-1.5;
            frametimer=requestAnimationFrame(animate);
        }else{
            //index1首页消失停止帧循环
            $(".index1").css({"width":0,"height":0});
            cancelAnimationFrame(frametimer);
        }
    }

};

/**
 *
 * index2地球位置自适应页面及手机端样式微调
 */
function earthPosition(){
    var height=$(".earth").height();
    $(".earth").css("bottom",(0-height*3/5));
    //调整手机端样式
    adjustPhone();
}
/**
 *
 * index2底部地球旋转动画
 */
function earthAnimation(){

    //地球旋转动作
    var rotateDeg=0;
    var headDeg=25;
    var earthRotate=function(deg){
        $(".earthImg").css("transform","rotate("+deg+"deg)");

    };
    var headRotate=function(){
        $(".myhead").css("transform","rotate("+headDeg+"deg)");
        $(".pighead").css("transform","rotate("+headDeg+"deg)");
        headDeg=0-headDeg;
    };
    earthRotate(rotateDeg);
    var timeTwo=0;
    var time=setInterval(function(){
        earthRotate(rotateDeg);
        rotateDeg++;
        timeTwo++;
        if(timeTwo==5){
            headRotate();
            timeTwo=0;
        }
    },100)
}
/**
 *
 * 心形落叶特效插件
 */
(function(){
    var pluginName = "heartFlow",
        defaults={
            // 释放周期
            periods:700,
            // 释放元素数量
            amounts:2,
            // 动画间隔
            interval:100,
            // 波动范围
            range:4,
            // 起始位置(以right,bottom为基准)
            x:"15%",
            y:"50%",
            //移动端起始位置(以right,bottom为基准)
            appx:"10%",
            appy:"6%",
            // 步长
            xStep:2,
            yStepRange:4,
            degStep:2,
            // 旋转角度
            deg:2,
            // 基础大小
            width:30,
            height:30,
            // 浮动大小
            widthheightrange:20,


        };
    function Heartflow(element,options){
        this.element=element,
            this.settings=$.extend({},defaults,options);
        this.eles=[];
        this.init();
    };
    Heartflow.prototype.init=function(){
        var _this=this;
        var times=0;//生成元素的唯一序列id
        _this.createEles(times);
        _this.moveEles();
        _this.hoverEles();
        var time=setInterval(function(){
            times++;
            _this.createEles(times);
        },_this.settings.periods);

        // this.flow();


    };
    Heartflow.prototype.createEles=function(times){
        var WrapperWidth=$(this.element).width();
        var WrapperHeight=$(this.element).height();
        for(var i=0;i<this.settings.amounts;i++){
            var ele={
                id:"heartEle"+(times*this.settings.amounts+i),
                x:this.settings.x,
                y:this.settings.y,
                appx:this.settings.appx,
                appy:this.settings.appy,
                width:this.settings.width,
                height:this.settings.height,
                curX:WrapperWidth>500?this.settings.x:this.settings.appx,
                curY:WrapperWidth>500?this.settings.y:this.settings.appy,
                deg:this.settings.deg,
                // range:Math.random()*this.settings.range,
                xStep:this.settings.xStep+Math.random()*this.settings.range,
                yStep:Math.random()>=0.5?Math.random()*this.settings.yStepRange:(0-Math.random()*this.settings.yStepRange),
                sizeRange:Math.random()*this.settings.widthheightrange,
                degStep:Math.random()>=0.5?Math.random()*this.settings.degStep:(0-Math.random()*this.settings.degStep),
                rotateDeg:Math.random()*360,
            };
            ele.width+=ele.sizeRange;
            ele.height+=ele.sizeRange;
            ele.curY=ele.curY.indexOf("%")>-1?ele.curY.substr(0,ele.curY.length-1)*WrapperHeight/100:ele.curY;
            ele.curX=ele.curX.indexOf("%")>-1?ele.curX.substr(0,ele.curX.length-1)*WrapperWidth/100:ele.curX;
            ele.xStep=WrapperWidth<500?ele.xStep*WrapperWidth/900:ele.xStep;//移动端减缓x方向移动速度
            // var colorClass="";
            // var colorRandom=Math.random()*100;
            // if(colorRandom<=14.2){colorClass="heartColor1"}
            // else if(colorRandom>14.2&&colorRandom<=28.4){colorClass="heartColor2"}
            // else if(colorRandom>28.4&&colorRandom<=42.6){colorClass="heartColor3"}
            // else if(colorRandom>42.6&&colorRandom<=56.8){colorClass="heartColor4"}
            // else if(colorRandom>56.8&&colorRandom<=71){colorClass="heartColor5"}
            // else if(colorRandom>71&&colorRandom<=85.2){colorClass="heartColor6"}
            // else{colorClass="heartColor7"}
            $(this.element).append("<div class='heartEles' id='"+ele.id+"'></div>");
            $("#"+ele.id).css({"right":ele.curX,"bottom":ele.curY,"transform":"rotate("+ele.deg+"deg)","width":ele.width,"height":ele.height});
            this.eles.push(ele);
        }
    };
    Heartflow.prototype.moveEles=function(){
        var _this=this;
        // var WrapperWidth=$(".heartFlowWrapper").width();
        // var WrapperHeight=$(".heartFlowWrapper").height();
        var WrapperWidth=$(this.element).width();
        var WrapperHeight=$(this.element).height();
        $.each(this.eles,function(index,info){
            info.curX=info.curX+info.xStep;
            info.curY=info.curY+info.yStep;
            info.deg=info.deg+info.degStep;
            if(info.curX>WrapperWidth){
                $("#"+info.id).remove();
            }else if(info.curY<0){
                $("#"+info.id).css({"right":info.curX,"bottom":info.curY,"transform":"rotate("+info.deg+"deg)"});
                info.yStep=0-info.yStep;
            }else if(info.curY>=WrapperHeight-info.height){
                $("#"+info.id).css({"right":info.curX,"bottom":info.curY,"transform":"rotate("+info.deg+"deg)"});
                info.yStep=0-info.yStep;
            }else{
                $("#"+info.id).css({"right":info.curX,"bottom":info.curY,"transform":"rotate("+info.deg+"deg)"});
            }
        });
        window.requestAnimationFrame(function(){
            _this.moveEles();
        });
        // var time=setInterval(function(){
        //     _this.moveEles();
        // },100)
    };

    Heartflow.prototype.hoverEles=function(){
        var _this=this;
        var pauseEles={};
        var photosNumber=0;
        $(this.element).on("mouseenter",".heartEles",function () {
            var target=this;
            $.each(_this.eles,function(index,info){
                if(target.id==info.id){
                    $("#"+info.id).animate({
                        width:info.width+10,
                        height:info.height+10,
                    },400);
                    pauseEles=info;
                    _this.eles.splice(index,1);
                    return false;
                }
            })

            photosNumber++;
            var totaljpg=106;//照片总数
            var jpgnumber=Math.ceil(Math.random()*totaljpg);
            var borderColorClass="borderColor"+Math.ceil(Math.random()*7);//相框颜色
            var photowidth=pauseEles.width*8;
            $(_this.element).append('<div class="heartphotos '+borderColorClass+'" id="heartphoto'+photosNumber+'"><img class="heartphotosImg"  style="width:'+photowidth+'px" src="photos/'+jpgnumber+'.jpg"/></div>');




        });
        $(this.element).on("mouseleave",".heartEles",function () {
            var target=this;
            $("#"+pauseEles.id).animate({
                width:pauseEles.width,
                height:pauseEles.height,
            },400);
            _this.eles.push(pauseEles);
            pauseEles={};
            // $.each(pauseEles,function(index,info){
            //     if(target.id==info.id){
            //         $("#"+info.id).animate({
            //             width:info.width,
            //             height:info.height,
            //         },400);
            //         _this.eles.push(info);
            //         pauseEles.splice(index,1);
            //         return false;
            //     }
            // })

            if($("#heartphoto"+photosNumber).css("visibility")!="visible"){
                $("#heartphoto"+photosNumber).remove();
            };

        });
        $(this.element).on("click",".heartEles",function () {
            var target=this;

            var photoright=pauseEles.curX-$("#heartphoto"+photosNumber).width()/2;
            var photobottom=pauseEles.curY-$("#heartphoto"+photosNumber).height()/2;
            var photorotatedeg=Math.random()*60-30;
            $("#heartphoto"+photosNumber).css({"right":photoright,"bottom":photobottom,"transform":"rotate("+photorotatedeg+"deg)"});
            // setTimeout(function(){
            //     $("#heartphoto"+photosNumber).css("visibility","visible");
            // },100)
            $("#heartphoto"+photosNumber).css("visibility","visible");
        });
        $(this.element).on("click",".heartphotos",function(){
            $(this).remove();
        })

    };

    $.fn[pluginName] = function(options){
        return new Heartflow(this, options);
        // this.each(function() {
        //     if (!$.data(this, "plugin_" + pluginName)) {
        //         $.data(this, "plugin_" + pluginName, new Heartflow(this, options));
        //     }
        // });
        // return this;
    }

})();

/**
 *
 * index2启动心形落叶动画及旋转球
 */
function heartAnimate(){
    $(".heartFlowWrapper").heartFlow({});
    earthAnimation();


}

/**
 *
 * index2时间实时更新
 */
function getRealtime() {
    var refresh=function () {
        var lovedate=new Date("2018/06/09 22:00:00");
        var today=new Date();
        var days=parseInt((today-lovedate)/1000/3600/24);
        var hours=parseInt((today-lovedate)/1000/3600%24);
        var minutes=parseInt((today-lovedate)/1000/60%60);
        var seconds=parseInt((today-lovedate)/1000%60);
        $(".realtime_days").html(days);
        $(".realtime_hours").html(hours);
        $(".realtime_minutes").html(minutes);
        $(".realtime_seconds").html(seconds>=10?seconds:"0"+seconds);
    };
    var datetimer=setInterval(function(){
        refresh();
    },1000)
};

/**
 *
 * 跳转至照片展示页面
 */
function toLinkPage(){
    $(".bikeImg").on("click",function(){
        var url="photosIndex/photoIndex.html";
        // window.location.href=encodeURIComponent(url);
        window.open(encodeURIComponent(url),"_self");
    })
}