/**
 * Created by yangxiaoman on 2018/5/11.
 */


$(function(){

    var currentPage = 1;
    var pageSize = 5;
    render()
    function render(){
        $.ajax({
            type:'get',
            url:'/category/queryTopCategoryPaging',
            dataType:'json',
            data:{
                page:currentPage,
                pageSize:pageSize
            },
            success:function(info){
                console.log(info);
                var htmlStr =template('firstTemp' ,info);
                $('.lt_content tbody').html(htmlStr);


                //分页
                $('#pagintor').bootstrapPaginator({
                    bootstrapMajorVersion:3,
                    currentPage:info.page,
                    totalPages:Math.ceil(info.total/info.size),
                    onPageClicked:function(a, b, c,page){
                        //为按钮绑定点击事件 page:当前点击的按钮值
                        currentPage = page;
                        render()
                    }

                })
            }
        })
    }

    //添加分类
    //点击按钮弹出模态框
    $('#btnAdd').click(function(){
        console.log(1);
        $('#addModal').modal('show')
    });

    //进行表单验证
    $("#form").bootstrapValidator({

        feedbackIcons: {
            // 校验成功的
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },

        fields: {
            categoryName: {
                validators: {
                    // 非空校验
                    notEmpty: {
                        message: "请输入一级分类"
                    }
                }
            }
        }
    });

    //注册表单验证成功事件，阻止默认事件传播，使用ajax进行请求
    $("#form").on('success.form.bv',function(e){
        console.log(5);
        //阻止默认事件传播
        e.preventDefault();

        //使用ajax发送请求
        $.ajax({
            type:'post',
            url:'/category/addTopCategory',
            dataType:'json',
            data:$('#form').serialize(),
            success:function(info){

                console.log(info);
                if(info.success){
                    $('#addModal').modal('hide');
                    currentPage = 1;
                    render();
                    //表单重置
                    $('#form').data('bootstrapValidator').resetForm(true)
                }

            }
        })
    })

})