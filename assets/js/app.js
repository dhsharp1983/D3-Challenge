// @TODO: YOUR CODE HERE!
var healthData;
var svgWidth;
var svgHeight;
var margin;
var width;
var height;
var svg;
var chartGroup;

var foobar;

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
    svg = d3.select("#scatter")

    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

    chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);
};


// Import Data
function ImportData() {
    console.log("Start Data Import")
    d3.csv("assets/data/data.csv")
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
      data.age = data.age;
      data.income = data.income;
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
  
  var xLinearScale = d3.scaleLinear()
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
      .attr("class", "axisText")
      .attr("transform", `translate(0, ${height})`)
      .call(xAxis);

    chartGroup.append("g")
      .attr("class", "axisText")
      .call(yAxis);


    // Step 5: Create Circles
    // ==============================
    var circlesGroup = chartGroup.selectAll("circle")
    .data(inputData)
    .enter()
    .append("g");
    
    // append Circles 
    circlesGroup.append("circle")
    .classed("circles", true)
    .attr("cx", 0)
    .attr("cy", svgHeight)
    .attr("r", 10)
    .attr("fill", "gold")
    .attr("stroke-width", "1")
    .attr("stroke", "black");

    // append text 
    circlesGroup.append("text")
      .attr("font-family",  "sans-serif")
      .attr("fill", "black")
      .attr("font-size", "10")
      .attr("x", 0)
      .attr("y", svgHeight)
      .text(d => d.abbr);
    
    // Transition Animation
    chartGroup.selectAll("circle")
    .transition()
    .duration(1000)
    .attr("cx", d => xLinearScale(d.income))
    .attr("cy", d => yLinearScale(d.obesity))
    
    circlesGroup.selectAll("text")
    .transition()
    .duration(1000)
    .attr("x", d => xLinearScale(d.income) - 5 )
    .attr("y", d => yLinearScale(d.obesity) + 5)


    // // Step 7: Create tooltip in the chart
    // // ==============================
    var toolTip = d3.select("body").append("div")
    .attr("class", "tooltip");


    circlesGroup.on("mouseover", function(d, i) {
      toolTip.style("display", "block");
      toolTip.html("<h6>foo<h6>")
      toolTip.html(`${d.abbr}: <br> Income: $${d.income} <br> Obesity: % ${d.obesity}`)
        .style("left", d3.event.pageX + "px")
        .style("top", d3.event.pageY + "px");
    })
    .on("mouseout", function() {
      toolTip.style("display", "none");
    });

    // Create axes labels
    chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", 0 - margin.left - 180)
      .attr("y", -45)
      .attr("dy", "1em")
      .attr("class", "axisText")
      .text("% of Population Obesity");

    chartGroup.append("text")
      .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
      .attr("class", "axisText")
      .text("Average Income of Population");
};

PlaceSVG();
ImportData();
