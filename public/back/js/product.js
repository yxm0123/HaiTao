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
    })

    //4.多文件上传
    $("#fileupload").fileupload({

        dataType:"json",
        //e：事件对象
        //data：图片上传后的对象，通过e.result.picAddr可以获取上传后的图片地址
        done:function (e, data) {
            console.log(data);
            var picUrl = data.result.picAddr;

            //图片对象
            var picObj = data.result;

            //存放在数组中
            $('#imgBox').prepend('<img src="'+ picUrl +'" width="100" alt="">');
        }
    });

    //--------------------
})