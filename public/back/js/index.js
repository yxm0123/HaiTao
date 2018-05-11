/**
 * Created by yangxiaoman on 2018/5/10.
 */

$(function(){
    var echarts1 = echarts.init(document.querySelector('.lt_echarts1'));

    var option = {
        title: {
            text: '2018年注册人数'
        },
        tooltip: {},
        legend: {
            data:['人数']
        },
        xAxis: {
            type: 'category',
            data: ['1月', '2月', '3月', '4月', '5月', '6月']
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            name:'人数',
            data: [1000, 1500, 1800, 1200, 1000, 500],
            type: 'bar'
        }]
    };
    echarts1.setOption(option);

    //饼图
    var echarts2 = echarts.init(document.querySelector('.lt_echarts2'));
    option1 = {
        title : {
            text: '热门品牌销售',
            subtext: '2018年3月',
            x:'center'
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: ['耐克','阿迪','新百伦','李宁','阿迪王']
        },
        series : [
            {
                name: '品牌',
                type: 'pie',
                radius : '50%',
                center: ['50%', '60%'],
                data:[
                    {value:335, name:'耐克'},
                    {value:310, name:'阿迪'},
                    {value:234, name:'新百伦'},
                    {value:135, name:'李宁'},
                    {value:1548, name:'阿迪王'}
                ],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 30,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 1)'
                    }
                }
            }
        ]
    };

    echarts2.setOption(option1);





})