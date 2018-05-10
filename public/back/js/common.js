/**
 * Created by yangxiaoman on 2018/5/10.
 */



//1.登录验证。判断用户有没有登录,如果没有就直接拦截
// 如果登陆了就让用户继续访问
if(location.href.indexOf('login.html')===-1){
    $.ajax({
        type:"get",
        url:"/employee/checkRootLogin",
        dataType:"json",
        success:function(info){
            console.log(info);
            if(info.error === 400){
                location.href ="login.html";
            }
        }
    })
}

//2.禁用进度条
NProgress.configure({showSpinner:false});

//3.用ajax提交，产生进度条
//第一个请求开始发送时调用
$(document).ajaxStart(function(){
    //进度条开始
    NProgress.start();
});

//请求完成时调用
$(document).ajaxStop(function(){
    setTimeout(function(){
        //进度条结束
        NProgress.done()
    },1000);

})


//页面中的js功能
$(function(){


    //1.二级菜单切换
    $('.category').click(function(){
        $('.as_nav .child').stop().slideToggle();
    });


    //2.菜单的隐藏
    $('.icon-menu').click(function(){
        console.log(1);
        $('.lt_aside').toggleClass('hidemenu');
        $('.lt_topbar').toggleClass('hidemenu');
        $('.lt_main').toggleClass('hidemenu');

    })

    //3.登录模态框
    $('.icon_modul').click(function(){
        console.log(1);
        $('#myModal').modal('show');
    })


    //4.实现退出功能
    $('#logoutBtn').click(function(){
       //点击退出，退出到login.html页面
        $.ajax({
            type:"get",
            url:"/employee/employeeLogout",

            dataType:'json',

            success:function(info){

                if(info.success){

                    location.href ='login.html';
                }

            }

        })
    })
    //-------------------
})

