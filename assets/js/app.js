// @TODO: YOUR CODE HERE!
var healthData;
var svgWidth;
var svgHeight;
var margin;
var width;
var height;
var svg;
var chartGroup;


function TempFunction(data) {
    console.log(data);
    console.log(data[0]["poverty"])
    console.log(typeof(data[0]["poverty"]))
    data.forEach(function(zdata) {
        zdata.id = zdata.id;
        zdata.poverty = +zdata.poverty;
    });
    console.log(data[5]["poverty"])
    console.log(typeof(data[5]["poverty"]))
};

function PlaceSVG() {
    svgWidth = 960;
    svgHeight = 500;

    margin = {
    top: 20,
    right: 40,
    bottom: 60,
    left: 100
    };

    width = svgWidth - margin.left - margin.right;
    height = svgHeight - margin.top - margin.bottom;

    // Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
    // svg = d3.select(".chart")
    svg = d3.select("body")
    .select(".container")
    .selectAll("div")
    .append("div")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

    chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);
};

// console.log("Start Data Import")
// var ReadInData = d3.csv("assets/data/Data.csv")
//     .then(data => TempFunction(data))
//     .catch(function(error) {
//         console.log(error);
//     }); 

// Import Data
function ImportData() {
    console.log("Start Data Import")
    d3.csv("assets/data/Data.csv")
        .then(data => CreatePlot(data))
        .catch(function(error) {
            console.log(error);
        });
};


function CreatePlot(inputData) {
    // Step 1: Parse Data/Cast as numbers
    // ==============================
    inputData.forEach(function(data) {
      data.id = data.id;
      data.state = data.state;
      data.poverty = data.poverty;
    //   data.povertyMoe = data.povertyMoe;
      data.age = data.age;
    //   data.ageMoe = data.ageMoe;
      data.income = data.income;
    //   data.incomeMoe = data.incomeMoe;
      data.healthcare = data.healthcare;
      data.healthcareLow = data.healthcareLow;
      data.healthcareHigh = data.healthcareHigh;
      data.obesity = data.obesity;
      data.obesityLow = data.obesityLow;
      data.obesityHigh = data.obesityHigh;
      data.smokes = data.smokes;
      data.smokesLow = data.smokesLow;
      data.smokesHigh = data.smokesHigh;
    });


    // Step 2: Create scale functions
    // ==============================
  
  var xLinearScale = d3.scaleTime()
    .domain(d3.extent(inputData, d => d.income))
    .range([0, width]);

  var yLinearScale = d3.scaleLinear()
    .domain([0, d3.max(inputData, d => d.obesity)])
    .range([height, 0]);

    // Step 3: Create axis functions
    // ==============================
    var xAxis = d3.axisBottom(xLinearScale).ticks(10);
    var yAxis = d3.axisLeft(yLinearScale).ticks(10);

    // Step 4: Append Axes to the chart
    // ==============================
    chartGroup.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(xAxis);

    chartGroup.append("g")
      .call(yAxis);


    // Step 5: Create Circles
    // ==============================
    // var circlesGroup = chartGroup.selectAll("circle")
    // .data(inputData)
    // .enter()
    // .append("circle")
    // // .attr("cx", d => xLinearScale(d.hair_length))
    // // .attr("cy", d => yLinearScale(d.num_hits))
    // .attr("cx", 0)
    // .attr("cy", svgHeight)
    // .attr("r", d => (d.income * d.obesity / 50) )
    // .attr("fill", "gold")
    // .attr("stroke-width", "1")
    // .attr("stroke", "black");


    // // Step 6: Initialize tool tip
    // // ==============================
    // chartGroup.selectAll("circle")
    //   .transition()
    //   .duration(5000)
    //   .attr("cx", d => xLinearScale(d.income))
    //   .attr("cy", d => yLinearScale(d.obesity))
    //   // .attr("cx", (d,i) => xLinearScale(i))
    //   // .attr("cy", (d,i) => yLinearScale(d))
    // // Step 7: Create tooltip in the chart
    // // ==============================

    // // Step 8: Create event listeners to display and hide the tooltip
    // // ==============================

    // // Create axes labels
    // chartGroup.append("text")
    //   .attr("transform", "rotate(-90)")
    //   .attr("y", 0 - margin.left + 40)
    //   .attr("x", 0 - (height / 2))
    //   .attr("dy", "1em")
    //   .attr("class", "axisText")
    //   .text("Number of Billboard 100 Hits");

    // chartGroup.append("text")
    //   .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
    //   .attr("class", "axisText")
    //   .text("Hair Metal Band Hair Length (inches)");
};

PlaceSVG();
ImportData();