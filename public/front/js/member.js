/**
 * Created by yangxiaoman on 2018/5/16.
 */

$(function(){

  $.ajax({
      type:'get',
      url:'/user/queryUserMessage',
      success:function(info){
        console.log(info);

        if(info.error===400){
          location.href ="login.html";
          return;
        }

        var htmlStr = template('userTemp',info);
        $('#userInfo').html( htmlStr );

      }
  })

  //2.点击退出
  $('#logoutBtn').click(function(){
    console.log(1);
    $.ajax({
      type:'get',
      url:'/user/logout',
      success:function(info){
        console.log(info);
        location.href = "login.html";
      }
    })
  })
  //-----------------
})