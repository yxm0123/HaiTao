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

    //2.获取本地储存历史 进行页面渲染

    function render(){

        var arr = getHistory();
        console.log(arr);
        $(".lt_history").html(template("historyTemp",{ arr:arr }));
    }

    //3.全部删除 点击删除
    $('.lt_history').on("click",".btn_empty",function(){
        console.log(1);
        mui.confirm("你确认要清空所有历史记录么","温馨提示",["取消", "确认"],function(e){
            console.log(e);
            if(e.index === 1){
                localStorage.removeItem("search_list");
                render();
            }
        })
    })

    //4.删除一条数据
    $('.lt_history').on("click",".btn_delete",function(){

        var that = this;
        mui.confirm("你确认要删除这条信息么?", "温馨提示", ["取消", "确认"],function(e){
            if(e.index === 1){
                //获取要删除的索引
                var index = $(that).data("index");

                //获取数组
                var arr = getHistory();

                //删除其内容
                arr.splice( index,1 );
                //将数组同步到localStorage 中
                localStorage.setItem("search_list",JSON.stringify(arr));

                render();
            }
        })
    });

    //5.添加内容
    //思路：给input注册点击事件
    // 获取input中的内容，
    // 获取数组，添加到数组的最前面，
    // 同步到数据库中 渲染页面

    $(".lt_search button").click(function(){
        //获取input内容
        var val = $(".lt_search input").val();

        //判断val
        if(val === ""){
            mui.toast('请输入关键字');
            return;
        }
        var arr = getHistory();

        //判断是否有重复的内容,如果有就删除
        var index = arr.indexOf(val);
        if(index > -1){
            arr.splice(index,1)
        }
        //判断数组的长度
        if(arr.length >= 10){
            arr.pop();
        }
        //添加到数组的最前面
        arr.unshift(val);

        //同步到本地
        localStorage.setItem("search_list",JSON.stringify(arr));

        render();
        //
        $(".lt_search input").val("");

        //跳转到搜索列表页，通过地址栏传入参数
        location.href="searchList.html?val=" + val;
    })
 //--------------------------------
})