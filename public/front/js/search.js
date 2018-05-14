/**
 * Created by yangxiaoman on 2018/5/14.
 */


$(function(){

    // var arr = ["耐克", "阿迪", "阿迪王", "耐克王"];
    // localStorage.setItem( "search_list", JSON.stringify( arr ) );

    //1.实现本地存储历史记录


    //1,方法 获取本地存储历史

    render()

    function getHistory(){
        var history = localStorage.getItem("search_list") || "[]";
        //转换成数组
        var arr = JSON.parse(history);
        return arr;
    }

    //获取本地储存历史 进行页面渲染

    function render(){

        var arr = getHistory();
        console.log(arr);
        $(".lt_history").html(template("historyTemp",{ arr:arr }));
    }
 //--------------------------------
})