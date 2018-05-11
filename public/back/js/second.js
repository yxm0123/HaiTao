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
                console.log(info);
                var htmStr = template('secTemp',info);
                $('.lt_content tbody').html(htmStr);

                //使用分页插件
                $('#pagintor').bootstrapPaginator({
                    bootstrapMajorVersion:3,
                    currentPage:info.page,
                    totalPages:Math.ceil(info.total/info.size),
                    onPageClicked:function(a,b,c,page){
                        currentPage = page;
                }
                })
            }
        })
    }

})