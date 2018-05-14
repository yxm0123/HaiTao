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

//获取本地存储的neir
//    1.获取数据
function getSearch(key){


    var search = location.search;
    //2.解码
    search = decodeURI(search);
    //删除问号
    search = search.slice(1);
    //将字符串转换成数组
    var arr = search.splice('&');

    var obj ={};
    arr.forEach(function (ele,index) {

        var k =ele.split("=")[0];
        var v =ele.split("=")[1];
        obj[ k ] = v ;
    });
    return obj[key]
//---------------
}