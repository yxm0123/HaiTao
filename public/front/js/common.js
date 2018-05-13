/**
 * Created by yangxiaoman on 2018/5/13.
 */


$(function(){

    mui('.mui-scroll-wrapper').scroll({
        indicators:false
    })

    var gallery = mui('.mui-slider');
    gallery.slider({
        interval:5000//自动轮播周期，若为0则不自动播放，默认为0；
    });
});

