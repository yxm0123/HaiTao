/**
 * Created by yangxiaoman on 2018/5/11.
 */

$(function(){
    //ajax 请求
    var currentPage = 1;
    var pageSize = 5;
    render()
    function render(){
        $.ajax({
            type:'get',
            url:'/category/querySecondCategoryPaging',
            dataType:'json',
            data:{
                page:currentPage,
                pageSize:pageSize
            },
            success:function(info){
                //console.log(info);
                var htmStr = template('secTemp',info);
                $('.lt_content tbody').html(htmStr);

                //使用分页插件
                $('#pagintor').bootstrapPaginator({
                    bootstrapMajorVersion:3,
                    currentPage:info.page,
                    totalPages:Math.ceil(info.total/info.size),
                    onPageClicked:function(a,b,c,page){
                        currentPage = page;
                        render()
                }
                })
            }
        })
    }

    //显示模态框，注册点击事件
    $("#btnAdd").click(function(){
        $('#addModal').modal('show');
        //发送请求 获得一级菜单的内容
        $.ajax({
            type:'get',
            url:"/category/queryTopCategoryPaging",
            data:{
                page:1,
                pageSize:100
            },
            success:function(info){

                var htmlStr = template('cataTemp',info);
                $('.dropdown-menu').html(htmlStr);

            }
        })

    })



    //把选择的内容添加到span中

    $('.dropdown-menu').on('click',"a", function () {

        var txt = $(this).text();
        //设置给按钮在
        $('#dropdownText').text(txt);

        //获取当前的id 设置到input框中
        var id= $(this).data('id');

        console.log(id);

        $('[name ="categoryId"]').val(id);

        $("#form").data("bootstrapValidator").updateStatus("categoryId", "VALID");
    });

    //文件上传

    $('#fileupload').fileupload({
        // 指定返回回来的数据格式
        dataType: "json",
        // 上传完成的回调函数
        done: function( e, data ) {
            // 拿到上传完成得到的图片地址
            var picUrl = data.result.picAddr;

            // 设置到图片 src 中
            $('#imgBox img').attr("src", picUrl);

            // 还要设置到 input 中去
            $('[name="brandLogo"]').val( picUrl );

            // 设置隐藏域的校验状态为 VALID
            $('#form').data("bootstrapValidator").updateStatus("brandLogo", "VALID");
        }
    });

    //5.表单验证
    $('#form').bootstrapValidator({

        excluded: [],

        feedbackIcons: {
            // 校验成功的
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields:{
            //categoryId 非空校验
            categoryId:{
                validators:{
                    notEmpty:{
                        message:"请输入一级分类"
                    }
                }
            },
            //brandName
            brandName:{
                validators:{
                    notEmpty:{
                        message:"请输入二级分类"
                    }
                }
            },
            //brandLogo 图片
            brandLogo:{
                validators:{
                    notEmpty:{
                        message:"上传图片"
                    }
                }
            }
        }

    })

    //注册校验成功
    $('#form').on("success.form.bv",function(e){
        //阻止默认事件传播
        e.preventDefault();
        console.log($('#form').serialize());
        $.ajax({
            type:'POST',
            url:"/category/addSecondCategory",
            data:$("#form").serialize(),
            success:function(info){
                console.log(info);
                if(info.success){
                    $("#addModal").modal("hide");
                    currentPage =1;
                    render();

                    //重置表单内容

                    $('#form').data("bootstrapValidator").resetForm(true);

                    //内容重置
                    $('#dropdownText').text("请输入一级分类")

                    //图片重置
                    $('#imgBox img').attr("src","./images/none.png");
                }
            }

        })
    })
    //
})