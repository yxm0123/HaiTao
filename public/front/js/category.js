/**
 * Created by yangxiaoman on 2018/5/13.
 */

$(function(){
    $.ajax({
        type:'get',
        url:'/category/queryTopCategory',
        success:function(info){
            console.log(info);

            var htmlStr = template('leftTemp',info);
            $('.lt_category_left ul').html(htmlStr);

        }
    })
})