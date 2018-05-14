/**
 * Created by yangxiaoman on 2018/5/13.
 */

$(function(){
    //获取左边的内容
    $.ajax({
        type:'get',
        url:'/category/queryTopCategory',
        success:function(info){
            //console.log(info);

            var htmlStr = template('leftTemp',info);
            $('.lt_category_left ul').html(htmlStr);
            renderSecond(info.rows[0].id);
        }
    });

    //给左侧列表注册点击事件，
    $('.lt_category_left ul').on('click','a',function(){


        var id= $(this).data('id');

        renderSecond(id)
            //排他 让自己高亮其他的不高亮
        $(this).addClass("current").parent().siblings().find('a').removeClass("current");
    })

    //获取右边的内容

    function renderSecond(id){

        $.ajax({
            type:'get',
            url:'/category/querySecondCategory',
            data:{
                id:id
            },
            success:function(info){
                console.log(info);
                var htmlStr = template('rightTemp',info);
                $('.lt_category_right ul').html(htmlStr)
            }
            //})
        })

    }
});
