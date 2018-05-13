/**
 * Created by yangxiaoman on 2018/5/12.
 */
$(function () {

    var currentPage = 1;
    var pageSzie = 3;

    //用于存放图片
    var  picArr = [];
    //1.发送ajax 请求 进行页面渲染
    render();
    function render(){
        $.ajax({
            type:'get',
            url:"/product/queryProductDetailList",
            dataType:'json',
            data:{
                page:currentPage,
                pageSize:pageSzie
            },
            success:function(info){
                console.log(info);

                var htmlStr = template('prodTemp',info);
                $(".lt_content tbody").html(htmlStr);

                //分页
                $("#pagintor").bootstrapPaginator({

                    bootstrapMajorVersion: 3,

                    currentPage:info.page,

                    totalPages:Math.ceil(info.total /info.size),

                    //点击页面跳转内容
                    onPageClicked:function(a, b, c,page){

                        //为按钮绑定点击事件 page:当前点击的按钮值
                        currentPage = page;

                        render();

                    },
                    //设置页码的文本
                    itemTexts:function(type,page,current){
                        switch (type){
                            case "first":
                                return "首页";
                            case 'prev':
                                return "上一页";
                            case "next":
                                return "下一页";
                            case "last":
                                return "尾页";
                            case "page":
                                return page;
                        }
                    },

                    //设置每个页面的提示信息tooltipTitles
                    tooltipTitles:function(type,page,current){
                        switch (type){
                            case "first":
                                return "首页";
                            case 'prev':
                                return "上一页";
                            case "next":
                                return "下一页";
                            case "last":
                                return "尾页";
                            case "page":
                                return "前往"+ page + "页";
                        }
                    }


                })
            }
        });
    }
    //2.点击模态框弹出
    $("#btnAdd").click(function(){
        $("#addModal").modal("show");

        //通过ajax请求渲染二级分类
        $.ajax({
            type:'get',
            url:"/category/querySecondCategoryPaging",
            dataType:"json",
            data:{
                page:1,
                pageSize:100
            },
            success:function(info){
                console.log(info);

                var Str = template('secTemp',info);
                $(".dropdown-menu").html(Str);

            }
        })
    })

    //3.把选中二级分类里的内容 设置到dropdownText中 使用时间委托
    $(".dropdown-menu").on("click","a",function(){

        var txt = $(this).text();

        $("#dropdownText").text(txt);

        var id = $(this).data("id");

        $("[name = 'brandId']").val(id);

        //更新隐藏域的状态
        //$('#form').data("bootstrapValidator").updateStatus("brandId", "VALID");
        //$("#form").data("bootstrapValidator").updateStatus("brandId","VALID");
    });

    //4.多文件上传
    $('#fileupload').fileupload({

        dataType:'json',

        done:function(e,data){
            var picUrl = data.result.picAddr;

            //图片对象
            var picObj = data.result;
            //添加到图片最后面
            $('#imgBox').prepend('<img src="'+ picUrl +'" width="100" alt="">');


            //存放到数组中
            picArr.unshift( picObj );
            //判断图片的张数
            if( picArr.length > 3 ){
                picArr.pop();
                $('#imgBox img:last-of-type').remove();
            }
            console.log(picArr);

            if(picArr.length === 3){
                $('#form').data("bootstrapValidator").updateStatus("picStatus", "VALID");
            }
        }
    });


    //5.进行变单校验
    $('#form').bootstrapValidator({

        //制定变单比较验的类型
        excluded: [],
        //校验时出现的图标
        feedbackIcons: {
            // 校验成功的
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },

        //字段校验
        fields:{

            //1.二级分类校验
            brandId:{
                validators:{
                    notEmpty:{
                        message:"二级分类不能为空"
                    }
                }
            },

            //2.商品名称校验
            proName:{
                validators:{
                    notEmpty:{
                        message:"请输入商品名称"
                    }
                }
            },

            //3.商品描述校验
            proDesc:{
                validators:{
                    notEmpty:{
                        message:"请对商品进行描述"
                    }
                }
            },

            //4.商品库存校验 需要用到正则校验
            num:{
                validators:{
                    notEmpty:{
                        message:"请输入商品库存",
                    },
                    regexp:{
                        regexp: /^[1-9]\d*$/,
                        message:'商品库存要求，必须是非零开头的数字'
                    }
                }
            },

            //5.尺码校验size，需要正则校验
            size:{
                validators:{
                    notEmpty:{
                        message:"尺码不能为空"
                    },
                    //正则校验
                    regexp:{
                        regexp:/^\d{2}-\d{2}$/,
                        message:'尺码要求，两位数字 - 两位数字，例如：32-40'
                    }
                }


            },

            //6.原价校验oldPrice
            oldPrice:{
                validators:{
                    notEmpty:{
                        message:'请输入商品原价'
                    }
                }
            },

            //7.现价校验 price
            price:{
                validators:{
                    notEmpty:{
                        message:'请输入商品现价'
                    }
                }
            },

            //8.上传图片校验"picStatus
            picStatus: {
                validators: {
                    notEmpty: {
                        message: "请上传3张图片"
                    }
                }
            }

        }
    }),

        //6.校验成功 阻止默认提交，使用ajax 发送请求
    $('#form').on('success.form.bv',function(e){
        //阻止默认恩提交
        e.preventDefault();
        console.log($('#form').serialize());
        var params = $('#form').serialize();
        params +="&picName1=" + picArr[0].picName +"&picAddr1" + picArr[0].picAddr;
        params +="&picName2=" + picArr[1].picName +"&picAddr2" + picArr[1].picAddr;
        params +="&picName2=" + picArr[2].picName +"&picAddr3" + picArr[2].picAddr;

        console.log(params);

        //发送ajax请求
        $.ajax({
            type:'post',
            url:'/product/addProduct',
            data:params,
            success:function(info){
                console.log(info);

                if(info.success){
                    //隐藏模态框
                    $('#addModal').modal('hide');

                    //表单内容重置
                    $('#form').data('bootstrapValidator').resetForm(true);
                    currentPage = 1;

                    render();

                    //重置文本内容
                    $('#dropdownText').text('请选择二级分类');

                    //删除所有图片
                    $('#imgBox img').remove();

                    //清空数组
                    picArr = [];
                }
            }

        })
    })

    //--------------------
})