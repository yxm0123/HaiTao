/**
 * Created by yangxiaoman on 2018/5/16.
 */
$(function(){

  var productId = getSearch("productId");
  //1.渲染页面
  $.ajax({

    type:'get',
    url:"/product/queryProductDetail",
    data:{
      id:productId
    },
    success:function(info){
      console.log(info);
      var htmlStr = template("prodTemp",info);
      $('.mui-scroll').html(htmlStr);


      var gallery = mui('.mui-slider');
      gallery.slider({
        interval: 2000
      });

      mui(".mui-numbox").numbox();
    }


  });


  //2.选择尺码
  $('.lt_main').on('click','.lt_size span',function(){
    console.log(11);
    $(this).addClass("current").siblings().removeClass("current");
  });

  //3.加入购物车
  $('#addCart').click(function(){

    var size = $('.lt_size span.current').text();

    var num = $('mui-numbox-input').val();
    if(!size){
      mui.toast("请选择尺码");
      return;
    };

    //发送ajax请求
    $.ajax({
      type:'post',
      url:'/cart/addCart',
      data:{
        productId:productId,
        num:num,
        size:size
      },
      success:function(info){
        console.log(info);

        if(info.success){
            mui.confirm("添加成功","温馨提示",["去购物车","继续浏览"],function(e){
              if(e.index === 0){
                location.href ="cart.html";
              }
            })
        }

        if(info.error === 400){
          location.href = "login.html?retUrl=" + location.href;
        }
      }

    })
  })
//---------------------
})