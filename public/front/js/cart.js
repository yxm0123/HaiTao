/**
 * Created by yangxiaoman on 2018/5/16.
 */


$(function(){


  function render(){
    setTimeout(function(){
      $.ajax({
        type:"get",
        url:"/cart/queryCart",

        success:function(info){

          console.log(info);

          if(info.error === 400){

            location.href = "login.html?retUrl="+location.href;
            return;
          }

          var htmlStr = template( "cartTemp", { list: info } );
          $('#cartList').html(htmlStr);
          mui(".mui-scroll-wrapper").pullRefresh().endPulldownToRefresh();
        }

      })
    },500);

  }


  //2.设置下拉刷新
  mui.init({
    pullRefresh:{
      container:'.mui-scroll-wrapper',
      down:{
        auto:true,
        callback:function(){
          render();
        }
      }

    }
  });

//3.点击按钮实现删除
  $('.lt_main').on('tap','.btn_delete',function(){
    var that = this;
    mui.confirm("你是否要删除该商品","温馨提示",["确认","取消"],function(e){
      if(e.index === 0){
        var id =$(that).data("id");
        //发送ajax
        $.ajax({
          type:'get',
          url: "/cart/deleteCart",
          data:{
            id:[id]
          },

          success:function(info){
            console.log(info);

            if(info.success){

              mui(".mui-scroll-wrapper").pullRefresh().pulldownLoading();
            }
          }
        })
      }
    })
  });

  //4.修改功能
  $('.lt_main').on("tap",'.btn_edit',function(){
    var id = this.dataset.id;
    console.log(this.dataset);

    var htmlStr = template("editTemp",this.dataset);

    htmlStr=htmlStr.replace(/\n/g, "");

    mui.confirm(htmlStr,"编辑商品",["确认","取消"],function(e){
      if(e.index === 0){

        var size =$('.lt_size span.current').text();
        var num =$('.lt_num .mui-numbox-input').val();

        $.ajax({
          type:'post',
          url:"/cart/updateCart",
          data:{
            id:id,
            size:size,
            num:num
          },
          success:function(info){
            if(info.success){
              mui(".mui-scroll-wrapper").pullRefresh().pulldownLoading();
            }
          }
        })
      }
    })

    mui(".mui-numbox").numbox();
  })


  //5.添加选择尺码的功能
  $('body').on('click','.lt_size span',function(){

    $(this).addClass("current").siblings().removeClass("current");
  });

  //6.计算价格
  $('.lt_main').on('click','.ck',function(){

    var total =0;

    var $checkBoxes =$('.lt_main .ck:checked');

    $checkBoxes.each(function(){
      var price =$(this).data("price");
      var num =$(this).data('num');
      total+= price *  num;
    })
    console.log(total);
    $('#totalPrice').text(total);
  })
  //-------------
})