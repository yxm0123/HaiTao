/**
 * Created by yangxiaoman on 2018/5/15.
 */
$(function () {
  //思路：1.进入页面 解析地址栏 ，把地址栏里的值存到搜索框中
  // 2.然后进行搜索关键字

  var value = getSearch("val");//取出关键字

  $(".lt_search input").val(value) //存放到搜索框中

  var currentPge = 1;
  var pageSize = 2;

  render();

  //功能1 将搜索中心的 或者地址栏里的数据传递到input框中 进行页面渲染
  function render(callback) {
    //让loading显示出来


    var params = {};
    params.proName = $(".lt_search input").val();
    params.page = currentPge;
    params.pageSize = pageSize;
    //如果选择了价格或者库存，高亮，排序 按照价格 库存排序
    // price 价格
    // num  库存

    //1.获取lt_sort 下面的current
    var $current = $('.lt_sort a.current');

    //判断是否有current类 如果有就需要排序
    if ($current.length > 0) {
      //price 使用价格排序（1升序，2降序）
      var sortName = $current.data("type");
      var sortValue = $current.find("i").hasClass("fa-angle-down") ? 2 : 1;

      params[sortName] = sortValue;
    }
    ;

    //模拟网路环境
    setTimeout(function () {
      $.ajax({
        type: 'get',
        url: '/product/queryProduct',
        data: params,
        success: function (info) {

          console.log(info);

          //var htmlStr = template('listTemp',info);
          //
          //$(".lt_product").html(htmlStr);


          callback && callback(info);

        }
      })
    }, 1000);

  }

  //配置下拉选项
  mui.init({
    pullRefresh: {
      container: ".mui-scroll-wrapper",

      //下拉刷新
      down: {
        auto: true,
        callback: function () {
          currentPge = 1;

          render(function (info) {
            console.log(info);
            $(".lt_product").html(template('listTemp', info));

            //关闭刷新
            mui(".mui-scroll-wrapper").pullRefresh().endPulldownToRefresh();
            mui(".mui-scroll-wrapper").pullRefresh().enablePullupToRefresh();
          })
        }
      },

      up: {

        auto: true,
        callback: function () {
          currentPge++;

          render(function (info) {


            //关闭刷新

            if (info.data.length > 0) {
              $(".lt_product").append(template('listTemp', info));
              mui(".mui-scroll-wrapper").pullRefresh().endPullupToRefresh();
            } else {
              mui(".mui-scroll-wrapper").pullRefresh().endPullupToRefresh(true);
            }

          })
        }
      }
    }
  });


  //功能3 点击搜索按钮进 行页面渲染

  $('.lt_search button').click(function () {

    render();
    //1.获取搜索框的内容
    // 2.获取本地存储的数组
    // 3.添加到数组的最前面
    // 4.判断有没有重复的内容 如果有则删除
    //
    var txt = $('.lt_sort input').val();

    var history = localStorage.getItem("search_list") || '[]';

    var arr = JSON.parse(history);

    //判断是否有重复元素
    var index = arr.indexOf(txt);

    if (index > -1) {
      arr.splice(index, 1);
    }
    ;

    if (arr.length > 10) {
      arr.pop()
    }
    ;
    arr.unshift(txt);
    //5.同步到数据持久化中
    localStorage.setItem("search_list", JSON.stringify(arr));
  })

  //功能3 切换current类

  $('.lt_sort a[data-type]').click(function () {

    if ($(this).hasClass("current")) {
      $(this).find("i").toggleClass("fa-angle-down").toggleClass("fa-angle-up");
    }
    else {
      $(this).addClass("current").siblings().removeClass("current");
      $(this).find("i").removeClass("fa-angle-up").addClass("fa-angle-down");
    }
  })
  //---------------------------------
})