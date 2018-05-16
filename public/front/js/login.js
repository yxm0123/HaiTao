/**
 * Created by yangxiaoman on 2018/5/16.
 */

$(function(){

  $('#loginBtn').click(function(){

    var username=$('[name="username"]').val().trim();
    var password=$('[name="password"]').val().trim();


    if(username === ""){
      mui.toast("请输入用户名");
      return;

    }

    if(password === ""){
      mui.toast("请输入密码");
      return;
    }

    //发送ajax请求
    $.ajax({
      type:'post',
      url:'/user/login',
      data:{
        username:username,
        password:password
      },
      success:function(info){
        //console.log(info);
        if(info.success){

          if(location.href.indexOf("retUrl")>-1){

            var url = location.search.replace("?retUrl=","");
            location.href = url;

          }else{
            location.href ="member.html";
          }

        };

        if(info.error === 403){
          mui.toast("用户名或密码错误");
        }
      }
    })
  })
  //----------------
})