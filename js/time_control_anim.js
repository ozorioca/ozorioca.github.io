var lastUpdateTime = 0;
var xv = 0.5,
    r = 0.6,
    Kp = 5,
    Ki = 1,
    I = 0,
    uv = 0.1,
    dt = 0.1,
    Inits = true,
    ymin = xv * 0.98,
    ymax = xv * 1.02,
    umin = uv * 0.98,
    umax = uv * 1.02;
var GenData = function (N, lastTime) {
    var output = [];
    for (var i = 0; i < N; i++) {

        if (Inits == false) {
            output.push([xv * 1, uv * 1, lastTime]);
            uv = Kp * (r - xv) + Ki * I;
            temp = r - xv;
            xv += dt * (-0.1 * xv + 0.1 * uv);
            I += (r - xv + temp) / 2 * dt;
        }
        else {
            output.push([xv * 1, uv * 1, lastTime]);
        }
        lastTime = lastTime + dt;
    }
    return output;
}

var dataIntervals = 1;
// plot the original data by retrieving everything from time 0
data = GenData(50, lastUpdateTime);
Inits = false;
lastUpdateTime = data[data.length - 1][2];
// var gett = function (d) { for (var i = 0, cell; cell = d.cells[i]; i++) {
//     //iterate through cells
//     //cells would be accessed using the "cell" variable assigned in the for loop
// } };
// var getx = function (d) { return d.value; };
// var getu = function (d) { return d.input; };
globalData=data;
var graphData = [{
    x: data.map(function (value, index) { return value[2]; }),
    y: data.map(function (value, index) { return value[0]; }),
    type: 'scatter'
}];


var layout = {
    title: 'Input',
    // autosize: true,
    width: 500,
    height: 500,
    // margin: {
    //     l: 0,
    //     r: 0,
    //     b: 0,
    //     t: 0,
    // },
    paper_bgcolor: 'rgba(0,0,0,0)',
    plot_bgcolor: 'rgba(0,0,0,0)',
    font: { size: 16 },
    yaxis: {range: [ymin,ymax]}
};

console.log(data.map(function (value, index) { return value[0]; }).slice(10));
var N = 10;
var globalOffset = 0;


TESTER = document.getElementById('tester');
Plotly.newPlot(TESTER, graphData, layout);


var inter = setInterval(function () {
    updateData();
}, 1000);


// //var dx = 0;
function updateData() {
    var newData = GenData(N, lastUpdateTime);
    lastUpdateTime = newData[newData.length - 1][2];
    for (var i = 0; i < newData.length; i++) {
        globalData.push(newData[i]);
    }
   
    globalOffset += newData.length;
    var offset = Math.max(0, globalOffset);
    var ydata = globalData.map(function (value, index) { return value[0]; }).slice(offset, offset + 100);
    yb = [Math.min(...ydata),Math.max(...ydata)];
    // console.log(Math.min(...[0,1]));
    if (yb[0] < ymin) {
        ymin = yb[0]
    }
    if (yb[1] > ymax) {
        ymax = yb[1]
    }
    // if (ub[0] < umin) {
    //     umin = ub[0]
    // }
    // if (ub[1] > umax) {
    //     umax = ub[1]
    // }
    var graphData =     [{
        x: globalData.map(function (value, index) { return value[2]; }).slice(offset, offset + 100),
        y: ydata,
    type: 'scatter'}];
    layout.yaxis.range=[ymin*0.95,ymax*1.05]
    // console.log(layout.yaxis.range);
    Plotly.newPlot(TESTER, graphData, layout);
}
// function refreshData() {
    
//     // x.domain(d3.extent(graphData, function (d) { return d.timestamp; }));
//     // yb = d3.extent(graphData, function (d) { return d.value; })
//     // ub = d3.extent(graphData, function (d) { return d.input; })
//     // if (yb[0] < ymin) {
//     //     ymin = yb[0]
//     // }
//     // if (yb[1] > ymax) {
//     //     ymax = yb[1]
//     // }
//     // if (ub[0] < umin) {
//     //     umin = ub[0]
//     // }
//     // if (ub[1] > umax) {
//     //     umax = ub[1]
//     // }
//     // y.domain([ymin * 0.95, ymax * 1.05]);
//     // u.domain([umin * 0.95, umax * 1.05]);
//     // svg.select(".x.axis").call(xAxis);
//     // svg.select(".y.axis").call(yAxis);
//     // svgt.select(".x.axis").call(xAxis);
//     // svgt.select(".y.axis").call(uAxis);
//     // x1 = graphData[0].timestamp;
//     // x2 = graphData[graphData.length - 1].timestamp;
//     // //dx = (x(x1) - x(x2)); // dx needs to be cummulative
//     // svg.select("path")
//     //     .attr("d", valueline(graphData));
//     // svgt.select("path")
//     //     .attr("d", valuelineu(graphData));


// }

// var margin = { top: 30, right: 20, bottom: 30, left: 50 },
//     width = 600 - margin.left - margin.right,
//     height = 300 - margin.top - margin.bottom;
// var x = d3.scale.linear()
//     .range([0, width]);
// var y = d3.scale.linear()
//     .range([height, 0]);
// var u = d3.scale.linear()
//     .range([height, 0]);
// x.domain(d3.extent(globalData, function (d) { return d.timestamp; }));
// y.domain([ymin, ymax]);
// u.domain([umin, umax]);
// var xAxis = d3.svg.axis().scale(x)
//     .orient("bottom")
//     .ticks(5)
//     .tickSize(1)
//     .tickPadding(8);
// var xAxisTop = d3.svg.axis().scale(x)
//     .orient("bottom").tickFormat("").tickSize(0);
// var yAxis = d3.svg.axis().scale(y)
//     .orient("left").ticks(5);
// var yAxisRight = d3.svg.axis().scale(y)
//     .orient("right").tickFormat("").tickSize(0);
// var uAxis = d3.svg.axis().scale(u)
//     .orient("left").ticks(5);
// var uAxisRight = d3.svg.axis().scale(u)
//     .orient("right").tickFormat("").tickSize(0);
// var valueline = d3.svg.line()
//     .x(function (d) { return x(d.timestamp); })
//     .y(function (d) { return y(d.value); });
// var valuelineu = d3.svg.line()
//     .x(function (d) { return x(d.timestamp); })
//     .y(function (d) { return u(d.input); });
// var zoom = d3.behavior.zoom()
//     .x(x)
//     .y(y)
//     .scaleExtent([1, 4])
//     .on("zoom", zoomed);
// var svg = d3.select("body")
//     .append("svg")
//     .attr("width", width + margin.left + margin.right)
//     .attr("height", height + margin.top + margin.bottom)
//     .append("g")
//     .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
//     .call(zoom);
// svg.append("rect")
//     .attr("width", width)
//     .attr("height", height)
//     .attr("class", "plot"); // ????
// var clip = svg.append("clipPath")
//     .attr("id", "clip")
//     .append("rect")
//     .attr("x", 0)
//     .attr("y", 0)
//     .attr("width", width)
//     .attr("height", height);
// var chartBody = svg.append("g")
//     .attr("clip-path", "url(#clip)");
// chartBody.append("path")        // Add the valueline path
//     .datum(globalData)
//     .attr("class", "line")
//     .attr("d", valueline);
// svg.append("g")         // Add the X Axis
//     .attr("class", "x axis")
//     .attr("transform", "translate(0," + height + ")")
//     .call(xAxis);
// svg.append("g")         // Add the Y Axis
//     .attr("class", "y axis")
//     .call(yAxis);
// svg.append("g")
//     .attr("class", "y axis")
//     .attr("transform", "translate(" + width + ",0)")
//     .call(yAxisRight);
// svg.append("g")
//     .attr("class", "x axis")
//     .attr("transform", "translate(0," + String(0) + ")")
//     .call(xAxisTop);
// svg.append("text")
//     .attr("y", -30)
//     .attr("x", width / 2)
//     .attr("dy", "1em")
//     .style("text-anchor", "middle")
//     .text("Output");

// var svgt = d3.select("body")
//     .append("svg")
//     .attr("width", width + margin.left + margin.right)
//     .attr("height", height + margin.top + margin.bottom)
//     .append("g")
//     .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
//     .call(zoom);
// svgt.append("rect")
//     .attr("width", width)
//     .attr("height", height)
//     .attr("class", "plot"); // ????
// var clipt = svgt.append("clipPath")
//     .attr("id", "clip")
//     .append("rect")
//     .attr("x", 0)
//     .attr("y", 0)
//     .attr("width", width)
//     .attr("height", height);
// var chartBodyt = svgt.append("g")
//     .attr("clip-path", "url(#clip)");
// chartBodyt.append("path")        // Add the valueline path
//     .datum(globalData)
//     .attr("class", "line")
//     .attr("d", valuelineu);
// svgt.append("g")         // Add the X Axis
//     .attr("class", "x axis")
//     .attr("transform", "translate(0," + height + ")")
//     .call(xAxis);
// svgt.append("g")         // Add the Y Axis
//     .attr("class", "y axis")
//     .call(uAxis);
// svgt.append("g")
//     .attr("class", "y axis")
//     .attr("transform", "translate(" + width + ",0)")
//     .call(uAxisRight);
// svgt.append("g")
//     .attr("class", "x axis")
//     .attr("transform", "translate(0," + String(0) + ")")
//     .call(xAxisTop);
// svgt.append("text")
//     // .attr("transform", "rotate(-90)")
//     // .attr("y", 0 - margin.left)
//     // .attr("x", (0 - (height / 2)))
//     .attr("y", -30)
//     .attr("x", width / 2)
//     .attr("dy", "1em")
//     .style("text-anchor", "middle")
//     .text("Input");

//var panMeasure = 0;
// var oldScale = 1;
// var globalOffset = 0;
// var panOffset = 0;
// function zoomed() {
//     var indexDelta = - d3.event.translate[0] / width * 100;
//     panOffset = indexDelta;
//     refreshData();
//     if (Math.abs(oldScale - d3.event.scale) > 1e-5) {
//         oldScale = d3.event.scale;
//         svg.select(".y.axis").call(yAxis);
//     }
//     //panMeasure = d3.event.translate[0];
//     //console.log(panMeasure);
// }
//////////////////////////////////////////////////////////////
