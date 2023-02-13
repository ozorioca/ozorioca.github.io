var lastUpdateTime = 0;
var R=0.1,
    tau = 0.5,
    v=0.5,
    dt = 0.0001,
    alpha = 0.5,
    Nz =100;

var x0 = [];
var step = (1 - 0) / (Nz - 1);
var zax=[];
for (var i = 0; i < Nz-1; i++) {
    x0.push(1);
    zax.push((i+1)*step);
}
for (var i = 0; i < Nz-1; i++) {
    x0.push(0);
}
// console.log(x0);
// temp=x0;
// Ps =[R*temp[2*(Nz-1)-1]].concat(temp.slice(0,(Nz-1)));
// Pd =[].concat(temp.slice(Nz-1,2*(Nz-1)),temp[(Nz-1)-1]);
// console.log([].concat(Ps,Pd));
var GenData = function (N, lastTime) {
    var output = [x0];
    temp=x0;
    for (var j = 0; j < N; j++) {
        temp1=deriv(temp).map(function(x) { return x * dt; });
        temp2=deriv(sumArrays(temp,temp1)).map(function(x) { return x * dt; });
        temp=sumArrays(temp,temp1.map(function(x) { return x /2; }),temp2.map(function(x) { return x /2; }));
        output.push(temp);
    }
    return output;
}
var deriv = function (X) {
    Ps =[R*X[2*(Nz-1)-1]].concat(X.slice(0,(Nz-1)));
    Pd =[].concat(X[(Nz-1)-1],X.slice(Nz-1,2*(Nz-1)));
    Xs=[];
    Xd=[];
    for (var i = 0; i < Nz-1; i++) {
        Xs.push(-v*(Ps[i+1]-Ps[i])/step+alpha*Ps[i+1]);
        Xd.push(-(1/tau)*(Pd[i+1]-Pd[i])/step);
    }
    
    return [].concat(Xs,Xd);
    // console.log(temp);
}


function sumArrays(...arrays) {
    const n = arrays.reduce((max, xs) => Math.max(max, xs.length), 0);
    const result = Array.from({ length: n });
    return result.map((_, i) => arrays.map(xs => xs[i] || 0).reduce((sum, x) => sum + x, 0));
  }

var N=80000;
// plot the original data by retrieving everything from time 0
data = GenData(N, lastUpdateTime);
console.log(data);

var getdata=[];
var simTime=[];

var Nd=100, dStep=Math.ceil(N/Nd);
for (var i = 0; i < Nd; i++) {
    getdata.push(data[i*dStep].slice(0,(Nz-1)));
    simTime.push(i*dStep*dt);
}
console.log(getdata);


var plotData = [{
    z:getdata,
    y:simTime,
    x:zax,
    type: 'surface',
    showscale: false
 }];

var layout = {
    title: '',
    // autosize: true,
    // extendtreemapcolors :false,
    width: 750,
    height: 750,
    scene: {
        xaxis: {
            title: 'Space'
        },
        yaxis:{
            title: 'Time'
        },
        zaxis:{
            title: 'State'
        }
    },
    margin: {
        // l: 65,
        t: 0,
    },
    paper_bgcolor: 'rgba(0,0,0,0)',
    plot_bgcolor: 'rgba(0,0,0,0)',
    font: { size: 20 }
};

TESTER = document.getElementById('tester');
Plotly.newPlot(TESTER, plotData, layout);


var slider = document.querySelector("#slider");
slider.value = alpha*100;
document.getElementById("sliderValue").innerHTML = alpha.toPrecision(2);

var slider2 = document.querySelector("#slider2");
slider2.value = tau*100;
document.getElementById("slider2Value").innerHTML = tau.toPrecision(2);

var slider3 = document.querySelector("#slider3");
slider3.value = R*100;
document.getElementById("slider3Value").innerHTML = R.toPrecision(2);

var alpbut = document.querySelector("#changalp");
var rebut = document.querySelector("#rerunsim");

slider.addEventListener("input",
        function () {
            alpha = slider.value / 100;
            document.getElementById("sliderValue").innerHTML = alpha.toPrecision(2)
        }, false);
slider2.addEventListener("input",
        function () {
            tau= slider2.value / 100;
            document.getElementById("slider2Value").innerHTML = tau.toPrecision(2)
        }, false);
slider3.addEventListener("input",
        function () {
            R = slider3.value / 100;
            document.getElementById("slider3Value").innerHTML = R.toPrecision(2)
        }, false);

alpbut.addEventListener('click',
        function () {
            alpha = -v*Math.log(R);
            slider.value = alpha*100;            
            document.getElementById("sliderValue").innerHTML = alpha.toPrecision(2);
            alpha = alpha*1.02;
        }, false);

rebut.addEventListener('click',
        function () {
            updateData() 
        }, false);

// var gett = function (d) { for (var i = 0, cell; cell = d.cells[i]; i++) {
//     //iterate through cells
//     //cells would be accessed using the "cell" variable assigned in the for loop
// } };
// var getx = function (d) { return d.value; };
// var getu = function (d) { return d.input; };
// globalData=data;
// var graphData = [{
//     x: data.map(function (value, index) { return value[2]; }),
//     y: data.map(function (value, index) { return value[0]; }),
//     type: 'scatter'
// }];


// var layout = {
//     title: 'Input',
//     // autosize: true,
//     width: 500,
//     height: 500,
//     // margin: {
//     //     l: 0,
//     //     r: 0,
//     //     b: 0,
//     //     t: 0,
//     // },
//     paper_bgcolor: 'rgba(0,0,0,0)',
//     plot_bgcolor: 'rgba(0,0,0,0)',
//     font: { size: 16 },
//     yaxis: {range: [ymin,ymax]}
// };

// console.log(data.map(function (value, index) { return value[0]; }).slice(10));
// var N = 10;
// var globalOffset = 0;


// TESTER = document.getElementById('tester');
// Plotly.newPlot(TESTER, graphData, layout);


// var inter = setInterval(function () {
//     updateData();
// }, 1000);


// //var dx = 0;



function updateData() {
    data = GenData(N, lastUpdateTime);

    var getdata=[];

    var Nd=100, dStep=Math.ceil(N/Nd);
    for (var i = 0; i < Nd; i++) {
        getdata.push(data[i*dStep].slice(0,(Nz-1)));
    }


    var plotData = [{
        z:getdata,
        y:simTime,
        x:zax,
        type: 'surface',
        showscale: false
    }];
    // console.log(layout.yaxis.range);
    Plotly.newPlot(TESTER, plotData, layout);
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
