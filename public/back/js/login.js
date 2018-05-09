/**
 * Created by yangxiaoman on 2018/5/9.
 */

$(function(){
    //1.表单验证 1.用户名不能为空 2.密码不能为空
    $("#form").bootstrapValidator({
        //指定验证字段
        fields:{
            //1.用户名验证
            username:{
               validators:{
                   //1.不能为空校验
                   notEmpty:{
                       message:"用户名不能为空"
                   },

                   //长度校验
                   stringLength:{
                       min:2,
                       max:6,
                       message:"用户名的长度必须在2-6位之间"
                   },
                   callBack:{
                       message:"用户名不存在"
                   }
               }
            },
            password:{
                validators:{
                    notEmpty:{
                        message:"密码不能为空"
                    },
                    stringLength:{
                        min:6,
                        max:12,
                        message:"密码必须在6-12位之间"
                    },
                    callBack:{
                        message:"密码错误"
                    }
                }
            }

        }
    });

    //2.基本登录功能
    //1.使用ajax 进行登录请求
    //2.使用插件进行提交
    $("#form").on("success.form.bv",function(e){

        //阻止默认提交功能
        e.preventDefault();
        console.log(1);
        console.log($('#form').serialize());

        //使用ajax进行提交
        $.ajax({
            type:"post",
            url:"/employee/employeeLogin",
            dataType:"json",
            data:$("#form").serialize(),
            success:function(info){
                console.log(info);
                if(info.success){
                    location.href="index.html";
                }

                if(info.error===1000){
                    $("#form").data('bootstrapValidator').updateStatus('username','INVALID','callBack');
                }

                if(info.error ===1001){
                    $('#form').data('bootstrapValidator').updateStatus('username','INVALD','callBack');
                }

            }
        })
    });


    //3.实现重置
    // 不仅内容要重置, 校验状态也要重置
    // resetForm 不传 true, 只重置校验状态
    // 传 true, 不仅重置校验状态, 而且重置 内容

    $("[type ='reset']").click(function(){
        $('#form').data('bootstrapValidator').resetForm('true');
    })
    //-----
})

