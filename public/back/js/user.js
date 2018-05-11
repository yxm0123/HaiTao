/**
 * Created by yangxiaoman on 2018/5/11.
 */


$(function(){
    //使用ajax 进行页面渲染

    var currentPage = 1;
    var pageSize = 5;
    render()
    function render(){
        $.ajax({
            type:"get",
            url:"/user/queryUser",
            data:{
                page:currentPage,
                pageSize:pageSize,
            },
            dataType:"json",
            success: function (info) {

                console.log(info);

                var htmlStr = template('temp',info);

                $('.lt_content tbody').html(htmlStr);


                ////分页
                $("#pagintor").bootstrapPaginator({
                    bootstrapMajorVersion:3,
                    currentPage:info.page,
                    totalPages:Math.ceil(info.total/info.size),
                    //点击页码显示对应的页面page 表示当前渲染的页面
                    onPageClicked:function(a,b,c,page){
                        //位按钮添加点击事件
                        currentPage = page;
                        render()
                    }
                })

            },

        })
    }
    //点击按钮显示模态框使用事件委托
    $('.lt_content tbody').on('click','.btn',function(){
        console.log(1);
        $('#starModal').modal('show');

        //获取用户id
        var id= $(this).parent().data("id");
        //获取是否有禁用按钮
        var isDelete = $(this).hasClass('btn-success')? 1:0;

        //当点击确认时 模态框消失，页面重新渲染，禁用变成启用

        $("#starBtn").off().click(function(){

            $.ajax({
                type:'post',
                url:'/user/updateUser',
                dataType:'json',
                data:{
                    id:id,
                    isDelete:isDelete
                },
                success:function(info){
                    console.log(info);
                    $('#starModal').modal('hide');
                    render()
                }
            })
        })
    })




//-------------------------
})


