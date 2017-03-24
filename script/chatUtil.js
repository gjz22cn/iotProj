function showChart() {
var UILineChart = api.require('UILineChart');
UILineChart.open({
    rect: {
        x: 0,
        y: 164,
        w: 320,
        h: 300
    },
    xAxis: {
        indexs: ['', '', '', '', '', '1:00', '', '', '', '', '', '2:00', '', '', '', '', '', '3:00','', '', '', '', '', '4:00'],
        screenXcount: 24
    },
    yAxis: {
        max: 5000,
        min: 0,
        step: 500,
        base: 0
    },
    datas: [
        [200, 500, 100, 0, 50, 1000, 200, 400, 2000, 2000, 100, 100, 60, 900, 800, 3000, 4000, 5000, 100]
    ],
    styles: {
        xAxis: {
            bg: '#b2dfee',
            markColor: '#888',
            markSize: 12
        },
        yAxis: {
            bg: '#b2dfee',
            markColor: '#888',
            markSize: 12
        },
        coordinate: {
            bg: '#fcfcfc',
            color: '#cacaca',
            baseColor: 'bbb',
        },
        colors: ['#800080', '#7FFFAA']
    },
    fixedOn: api.frameName,
    fixed: false
}, function(ret, err) {
    if (ret) {
        alert(JSON.stringify(ret));
    } else {
        alert(JSON.stringify(err));
    }
});
}