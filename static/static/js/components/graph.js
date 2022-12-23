function showGraph(graphData) {
    $(`<li class='layui-this'>关系图</li>`).appendTo(".layui-tab-title");
    $(`<div id='viz' class='layui-tab-item layui-show' style="width:574px;height:539px;"><div>`).appendTo(".layui-tab-content");
    var viz = echarts.init(document.getElementById("viz"))
    var categories = [{ name: "Movie" }, { name: "Company" }, { name: "Star" }, { name: "Director" }, { name: "Writer" }];
    var categories = [{ name: "电影" }, { name: "公司" }, { name: "演员" }, { name: "导演" }, { name: "编剧" }];
    var option = {
        // 提示框的配置
        tooltip: {
            formatter: function (x) {
                return x.data.des;
            }
        },
        // 工具箱
        toolbox: {
            // 显示工具箱
            show: true,
            feature: {
                mark: {
                    show: true
                },
                // 还原
                restore: {
                    show: true
                },
                // 保存为图片
                saveAsImage: {
                    show: true
                }
            }
        },
        legend: [{
            // selectedMode: 'single',
            //设置可以根据类别显示or隐藏节点
            data: categories.map(function (a) {
                return a.name;
            })
        }],
        series: [{
            type: 'graph', // 类型:关系图
            layout: 'force', //图的布局，类型为力导图
            symbolSize: 40, // 调整节点的大小
            roam: true, // 是否开启鼠标缩放和平移漫游。默认不开启。如果只想要开启缩放或者平移,可以设置成 'scale' 或者 'move'。设置成 true 为都开启
            edgeSymbol: ['none', 'none'],
            // edgeSymbolSize: [2, 10],
            edgeLabel: {
                normal: {
                    textStyle: {
                        fontSize: 20
                    }
                }
            },
            force: {
                repulsion: 1800,
                edgeLength: [10, 50]
            },
            draggable: true,
            lineStyle: {
                normal: {
                    width: 2,
                    color: '#4b565b',
                }
            },
            edgeLabel: {
                normal: {
                    show: true,
                    formatter: function (x) {
                        return x.data.name;
                    }
                }
            },
            label: {
                normal: {
                    show: true,
                    textStyle: {}
                }
            },
            // categories: [{
            //     name: "Movie",
            //     itemStyle: {
            //         color: "brown",
            //         pointSize: 50
            //     }
            // },
            // {
            //     name: "Star",
            //     itemStyle: {
            //         color: "red",
            //         symbolSize: 30,
            //     }
            // },
            // {
            //     name: "Director",
            //     itemStyle: {
            //         color: "green"
            //     }
            // },
            // {
            //     name: "Writer",
            //     itemStyle: {
            //         color: "pink"
            //     }
            // },
            // {
            //     name: "Company",
            //     itemStyle: {
            //         color: "blue"
            //     }
            // }
            // ],
            categories: [{
                name: "电影",
                itemStyle: {
                    color: "brown",
                    pointSize: 50
                }
            },
            {
                name: "演员",
                itemStyle: {
                    color: "red",
                    symbolSize: 30,
                }
            },
            {
                name: "导演",
                itemStyle: {
                    color: "green"
                }
            },
            {
                name: "编剧",
                itemStyle: {
                    color: "pink"
                }
            },
            {
                name: "公司",
                itemStyle: {
                    color: "blue"
                }
            }
            ],
            data: graphData["data"],
            links: graphData["links"]
        }]
    }

    viz.setOption(option);

}

function showProfile(graphData) {
    $(`<li>相关实体信息</li>`).appendTo(".layui-tab-title");
    $(`<div class='layui-tab-item'><img id='picture' style='max-width:300px;max-height:300px;margin-top:20px;margin-left:auto;margin-right:auto'></img><div id='profile'><><div>`).appendTo(".layui-tab-content");
    $("#profile").html(graphData["profile"][1]);
    $("#picture").css("display", "block");
    $("#picture").attr("src", "data:image/jpg;base64," + graphData["profile"][0]);
}