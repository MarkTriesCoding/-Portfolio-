// import ' /choro.js'
// import './heatmap.js'
// import './scatter.js'

import Loading from '../shared/loading.js';
window.addEventListener("load",Loading());
import '../../scss/d3/d3.scss';

// TO DO
// 1. fix tooltip location
//const w = window.innerHeight*0.8;

//sizing/scaling

// const h = window.innerWidth*0.8;
// var   orientation ;
// var screenH ;
// var screenW ;
// var legendTransformByScreenSize;
//
//
// function windowSize(){
//   screenH = window.screen.height
//   screenW = window.screen.width;
//   orientation = (screenW>screenH ?"portrait":"landscape")
//   // var legendTranslateX = (orientation =="landscape")?550:100;
//   // var legendTranslateY = (orientation =="landscape")?150:100;
//   legendTransformByScreenSize = "translate(425,175) scale(0.6)"
//     // ( orientation == "portrait" ?
//     // "translate(450,150) scale(0.6)" :
//     // "translate(400,200) scale(0.6)" )
//   console.log("width: ",screenW)
//   console.log("width: ",orientation)
//
// }
//
// windowSize();
// window.addEventListener("resize",windowSize());
var  legendTransformByScreenSize = "translate(425,175) scale(0.6)"
//
//
// var windowH = screen.height;
// var windowW = screen.width;
// var madeWithDiv = document.querySelector("made-with");
// var aspectRatio = windowW/windowH;
// if(aspectRatio<2 && windowH < 800){
//   madeWithDiv.style.visibility = "hidden"
// }
// else{
//   madeWithDiv.style.visibility = "visible"
// }
const EDUCATION_DATA = 'https://raw.githubusercontent.com/no-stack-dub-sack/testable-projects-fcc/master/src/data/choropleth_map/for_user_education.json';
const COUNTY_DATA = 'https://raw.githubusercontent.com/no-stack-dub-sack/testable-projects-fcc/master/src/data/choropleth_map/counties.json';

var tooltipChoro=d3.select(".choro")
  .append("div")
  .attr("id","tooltipChoro")
  .style("opacity",0)
  .style("transition","opacity 200ms ease-out")


var svgBoxChoro = d3.select(".choro")
  .append("svg")
  .attr("preserveAspectRatio", "xMinYMin meet")
   .attr("viewBox", "0 0 "+500+" "+340+"")
   .classed("svg-content", true);



svgBoxChoro.append("text")
  .attr("id","title")
  .text("United States Educational Attainment")
  .attr("color","blue")
  .attr("x",40)
  .attr("y",40)
  .style("font-size","20px");

svgBoxChoro.append("text")
  .attr("id","description")
  .text("Percentage of adults age 25 and older with a bachelor's degree or higher (2010-2014)")
  .attr("x",40)
  .attr("y",70)
  .style("font-size", "10px")

var path = d3.geoPath();

//use queue function to allow async calls to data
//ready function when 'ready'
d3.queue()
  .defer(d3.json, COUNTY_DATA)
  .defer(d3.json, EDUCATION_DATA)
  .await(ready);
//function that runs when all data loaded us,education based on data from json objects deferred in that order
function ready(e,us,education){
  if(e) throw e;

  // discover min/max ranges for % with bach or higher.
  var bachelors = education.map((o)=>{
    return o.bachelorsOrHigher;
  });
  var minBach = d3.min(bachelors);
  var maxBach = d3.max(bachelors);

  var x_scale = d3.scaleLinear()
  .domain([minBach,maxBach])
  .rangeRound([414,736])

  var color_scale = d3.scaleThreshold()
  .domain(d3.range(minBach,maxBach,(maxBach-minBach)/10))
  .range(d3.schemeYlGn[9])

var colorFunc =
      color_scale.range().map((d)=>{
        //invertExtent of color scale range
        d = color_scale.invertExtent(d);
        //set d[0] and d[1] as domain limits of xscale
        if (d[0] == null) d[0] = x_scale.domain()[0];
        if (d[1] == null) d[1] = x_scale.domain()[1];

        return d;
      })

  var fillSelector = (d)=>{
    var exists = education.filter((obj)=>{
      return obj.fips == d.id;
    });
    if(exists[0]){
      return color_scale(exists[0].bachelorsOrHigher);
    }
    else{
      return color_scale[0]
    }
  }


  svgBoxChoro.append('g')
    .attr("class","legendQuant")
    .attr("id","legend")
    .attr("transform",legendTransformByScreenSize)


  var legend = d3.legendColor("#fff")
    .labelFormat(d3.format("0.0f"))
    .labels(d3.legendHelpers.thresholdLabels)
    .scale(color_scale)
    .ascending(true)

    svgBoxChoro.select(".legendQuant")
    .call(legend);

let mapTransformByScreenSize =   "translate(40,80) scale(0.4)"

  //draw map
  svgBoxChoro.append('g')
    .attr("transform",mapTransformByScreenSize)

    .attr('class','counties')
    .selectAll("path")
    .data(topojson.feature(us,us.objects.counties).features)
    .enter().append("path")
    .attr("class","county")
    .attr("data-fips",(d)=>{
    return d.id;
   })
    .attr("data-education",function(d){
    var exists = education.filter((obj)=>{
      return obj.fips == d.id;
    });
    if(exists[0]){
      return exists[0].bachelorsOrHigher;
    }
    else{
    return 0;}})
    .attr("fill",fillSelector)
    .attr('d',path)
    .on("mousemove",(d)=>{
      var exists = education.filter((obj)=>{
        return obj.fips === d.id;
      });
      tooltipChoro
        .attr("data-education",exists[0].bachelorsOrHigher)
        .style("opacity",1)
        .style("left",()=>{    if(event.offsetX<400){
            return event.offsetX+20+"px"}
          else{
            return event.offsetX-225+"px"}}
          )
        .style("top",event.offsetY-50+"px" )
        .style("border", "10px "+ color_scale(exists[0].bachelorsOrHigher)+ " solid")
        .html(exists[0].area_name+": "+exists[0].bachelorsOrHigher+"%")
      })
     .on("mouseout",()=>{
 tooltipChoro
  .style("opacity",0)});


  //state borders
  svgBoxChoro.append("path")
    .datum(topojson.mesh(us, us.objects.states, function(border1, border2) { return border1 !== border2; }))
    .attr("class", "states")
    .attr("d", path)
    .attr("transform",mapTransformByScreenSize)


}
//DATA
var url =  "https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/global-temperature.json";

//D3 FUNCTION
d3.json(url, function(error, data) {
  //HANDLE ERRORS
  if (error) throw error;
  //INIT VARIABLES

  const months = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  var year;
  const firstYear = data.monthlyVariance[0].year;
  const lastYear = data.monthlyVariance[data.monthlyVariance.length - 1].year;

  var width = 500
  var height = 340
  var len = (width>height?width:height)
  var margin = {
    top: 50,
    bottom: 50,
    left: 60,
    right: 55
  };
  var fontSize = "1em";

  //COLOR PALLETES
  const col = [
    "#67001f",
    "#b2182b",
    "#d6604d",
    "#f4a582",
    "#fddbc7",
    "#f7f7f7",
    "#d1e5f0",
    "#92c5de",
    "#4393c3",
    "#2166ac",
    "#053061"
  ].reverse();


  const blue = [
    "#deebf7",
    "#c6dbef",
    "#9ecae1",
    "#6baed6",
    "#4292c6",
    "#2171b5",
    "#08519c",
    "#08306b"
  ].reverse();
  const red = [
    "#fee0d2",
    "#fcbba1",
    "#fc9272",
    "#fb6a4a",
    "#ef3b2c",
    "#cb181d",
    "#a50f15",
    "#67000d"
  ];
  const col2 = blue.concat(red);
  const variance = data.monthlyVariance.map(d => d.variance);

  //TOOLTIP using d3-tip
  // var tooltipHeatmap = d3.tip()
  //   .attr("id", "tooltipHeatmap")
  //   .style("opacity",0)
  //   .style("transition", "opacity 300ms ease-out")
  //   .html(d => d)
  //   .direction("n")
  //   .offset([-12, 1]);
  console.log("1")
    var tooltipHeatmap = d3.select(".heatMap")
      .append("div")
      .attr("id", "tooltipHeatmap")
      .style("opacity",0)
      .style("transition", "opacity 300ms ease-out")
      // .html(d => d)
      // .direction("n")
      // .offset([-12, 1]);
  //
  ////SVGs
  //
console.log("2")
  //DRAW MAIN GRAPH AREA
  const svgBoxHeatMap = d3
    .select(".heatMap")
    .append("svg")
     // .attr("width",500)
     // .attr("height",340)
    .attr("preserveAspectRatio", "xMinYMin meet")
    .attr("viewBox", "0 0 "+500+" "+340+"")
  //  .attr("transform","translate(50,0)")
    .classed("svg-content", true)
    // .call(tooltipHeatmap);


  //Y-AXIS SCALE
  const y_scale = d3.scaleBand()
    .domain(months)
    .range([0, height], 0, 0);
  //Y-AXIS TICKS
  const y_axis = d3.axisLeft(y_scale)
    //value of band equal to months
    .tickValues(y_scale.domain())
    // ticks named as months through applying month value to its utc formatted pair
    .tickFormat(month => {
      let d = new Date(0);
      d.setUTCMonth(month);
      return d3.utcFormat("%B")(d);
    })
    .tickSize(10, 1);

    //X-AXIS SCALE
  var x_scale = d3.scaleBand()
    .domain(
      data.monthlyVariance.map(d => {
        return d.year;
      })
    )
    .range([0, width], 0, 0);

  // X-AXIS TICKS
  var x_axis = d3.axisBottom(x_scale)
    .tickValues(
      x_scale.domain().filter(yr => {
        return yr % 10 === 0;
      })
    )
    .tickFormat(yr => {
      let d = new Date(0);
      d.setUTCFullYear(yr);
      return d3.utcFormat("%Y")(d);
    })

    .tickSize(12, 1);


  //DRAW Y-AXIS
  //
  svgBoxHeatMap
    .append("g")
    .attr("class", "y-axis")
    .attr("id", "y-axis")
    .attr(
      "transform",
      "translate(" + (margin.left-1) + ", " + (margin.top ) + ") scale(0.7)"
    )
    .call(y_axis);


  //DRAW X-AXIS
  svgBoxHeatMap
    .append("g")
    .attr("class", "x-axis")
    .attr("id", "x-axis")
    .attr(
      "transform",
      "translate(" +(margin.left-1) + "," + (height - margin.bottom -2) + ") scale(0.7)"
    )
    .call(x_axis)
  .selectAll("text")
  .attr("dy","1em")
  .attr("x",-15)
  .attr("y",2)
    .attr("transform","rotate(300)")
  .style("text-anchor","end");

  const baseTemp = data.baseTemperature;
  const minTemp = baseTemp + Math.min.apply(Math, variance);
  const maxTemp = baseTemp + Math.max.apply(Math, variance);
  const quantColors = d3.scaleQuantize()
    .domain([minTemp - baseTemp, maxTemp - baseTemp])
    .range(col2);

  //DRAW GRAPH
  svgBoxHeatMap
    .append("g")
    .selectAll("rect")
    .data(data.monthlyVariance)
    .enter()
    .append("rect")
    .attr("class", "cell")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ") scale(0.7)")
    .attr("data-month", d => d.month - 1)
    .attr("data-year", d => d.year)
    .attr("data-temp", d => data.baseTemperature + d.variance)
    .attr("fill", d => {
      return quantColors(d.variance);
    })
    .attr("x", (d, i) => x_scale(d.year))
    .attr("y", (d, i) => y_scale(d.month - 1))
    .attr("width", (d, i) => 2||x_scale.range(d.year))
    .attr("height", (d, i) =>28|| y_scale.range(d.month - 1))
    .on("mousemove", d => {
      // create date object so Month can be displayed as word instead of index
      var date = new Date(d.year, d.month - 1);

      //TOOLTIP TEXTTITLE
      // var htmlString =
      //   "<span>" +
      //   d3.timeFormat("%B")(date) +
      //   " - " +
      //   d.year +
      //   "</span>" +
      //   "<br> <span>" +
      //   d3.format("+.1f")(baseTemp + d.variance) +
      //   "&#8451" +
      //   "</span>" +
      //   "<br> <span>" +
      //   d3.format("+.1f")(d.variance) +
      //   "&#8451" +
      //   "</span>";
// if(event.offsetX>250){}
//console.log(tooltipX);
      tooltipHeatmap
        .attr("data-year", d.year)
        .style("opacity",1)
        .style("left", ()=>{
          if(event.offsetX<350){
          return event.offsetX+10+"px"}
        else{
          return event.offsetX-150+"px"
        }})
        .style("top",event.offsetY-50+"px" )
        .style("z-index",5)
        .style("border", "4px " + quantColors(d.variance) + " solid")
        .html("<span>" +
        d3.timeFormat("%B")(date) +
        " " +
        d.year +
        "</span>" + "</br>"+
        "<br> <span class='tipSmall'>" + "Temp.: " +
        d3.format("+.1f")(baseTemp + d.variance) +
        "&#8451" +
        "</span>" +
        "<br> <span class='tipSmall'>" + "Δ: " +
        d3.format("+.1f")(d.variance) +
        "&#8451" +
        "</span>");
    })
    .on("mouseout", ()=>{
      tooltipHeatmap
        .style("opacity",0)
        .style("z-index",0)
    });

  //TITLE
  svgBoxHeatMap
    .append("text")
    .attr("id", "titleHeatMap")
    .attr("x", 30)
    .attr("y", 33)
    .style("font-size", "19px")
    .text("Mean Global Land-Surface Temperature (1732-2015)");

  //DESCRIPTION
  // svgBoxHeatMap
  //   .append("text")
  //   .attr("id", "description")
  //   .attr("x", 50)
  //   .attr("y", 35)
  //   .style("font-size", "12px")
  //   .html(
  //       "Base Temperature: " +
  //       d3.format("+.2f")(baseTemp) +
  //       "&#8451"
  //   );

  //LEGEND
  //Follow example from https://bl.ocks.org/mbostock/4573883

  var legendDomain = [];
  var tempRange = maxTemp - minTemp;
  var legendLength = col2.length;

  //loop to establish cutoffs for array
  for (let i = 1; i < legendLength; i++) {
    legendDomain.push(minTemp + i * (tempRange / legendLength));
  }


  //SCALE LEGEND
  var legendScale = d3.scaleLinear()
    .domain([minTemp, maxTemp])
    .range([0, 175]);

  //LEGEND AXIS ATTRIBUTES
  var legendAxis = d3.axisLeft(legendScale)
    .tickSize(5)
    .tickValues(legendDomain)
    .tickFormat(d3.format(".1f"));
  //PLACE LEGEND
  var legend = svgBoxHeatMap
    .append("g")
    .classed("legend", true)
    .attr("id", "legend")
    .attr("transform", "translate(440,220) scale(0.7) rotate(180)");

  //DRAW LEGEND
  legend
    .append("g")
    .selectAll("rect")
    .data(
      quantColors.range().map(function(color) {

        //use invertExtent to find min and max for each color range.
        var d = quantColors.invertExtent(color);
        //if color at min range, will eual null, set domain min as this number.
        if (d[0] == null) d[0] = legendScale.domain()[0];
        /// if color at max range, will equal null for max, set domain max as this max.
        if (d[1] == null) d[1] = legendScale.domain()[1];

        return d;
      })
    )
    .enter()
    .append("rect")
    .style("fill", function(d, i) {

      return quantColors(d[0]);
    })
    .style("opacity", "0.9")
    .attr("x", 0)
    .attr("y", function(d, i) {  return i * 11;  })
    .attr("width", 11)
    .attr("height", 11);



     d3.select(".legend")
       .call(legendAxis)

});
const width = 860;
const height = 500;

// const tooltip = d3.select("#barGraph").append("div")
//   .attr("id","tooltip")
//   .style(opacity,0);

const tooltipScatter = d3
  .select(".scatterPlot")
  .append("div")
  .attr("id", "tooltipScatter")
  .style("opacity", 0)
  .style("transition", "opacity 400ms ease");

const svgBoxScatter = d3
  .select(".scatterPlot")
  .append("svg")
  // .attr("width", width + 200)
  // .attr("height", height + 250)
  .attr("preserveAspectRatio", "xMinYMin meet")
  .attr("viewBox", "0 0 "+500+" "+340+"")
//  .attr("transform","translate(50,0)")
  .classed("svg-content", true)
  // .append("g")
  // .attr("transform", "translate(80,60)");
//
// const tooltipScatter = d3
//   .select(".scatterPlot")
//   .append("div")
//   .attr("id", "tooltipScatter")
//   .style("opacity", 0)
//   .style("transition", "opacity 400ms ease");
//
//Create Scales
const x_scale = d3.scaleLinear().range([0, 500]);
const y_scale = d3.scaleTime().range([0, 340]);
//console.log("x_scale:         ",x_scale)
const x_axis = d3
  .axisBottom()
  .scale(x_scale)
  .tickFormat(d3.format("d"))

const y_format = d3.timeFormat("%M:%S");
const y_axis = d3
  .axisLeft()
  .scale(y_scale)
  .tickFormat(y_format);

//      var xAxisGroup = svgBoxScatter.append('g')
//      .call(x_axis)
//      .attr('id', 'x-axis')
//      .attr('transform', 'translate(80, 430)');

//      var yAxisGroup = svgBoxScatter.append('g')
//      .call(y_axis)
//      .attr('id', 'y-axis')
//      .attr('transform', 'translate(80, 30)');
//Append rects to SVG

var color = d3.scaleOrdinal(d3.schemeCategory10);

d3.json(
  "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json",
  function(error, data) {
    if (error) throw error;
    data.forEach(d => {
      //parse time
      var parsedTime = d.Time.split(":");
      d.Time = new Date(Date.UTC(1970, 0, 1, 0, parsedTime[0], parsedTime[1]));
    });
    //set x_axis domain based on Years +- 1 for margin scaled to width range
    x_scale.domain([
      d3.min(data, d => d.Year - 1),
      d3.max(data, d => d.Year + 1)
    ]);
    //set y_axis domain based on range of Time in d scaled to height range
    y_scale.domain(d3.extent(data, d => d.Time));

    //append groups to svgBoxScatter element

    //x-axis-group
    svgBoxScatter
      .append("g")
      .attr("class", "x-axis")
      .attr("id", "x-axis")
      .attr("transform", "translate( 50,306) scale(0.8)")
      .call(x_axis)
      .append("text")
      .attr("class", "x-axis-title")
      .attr("x", width)
      .attr("y", -6)
      .style("text-anchor", "end")
      .text("Year");

    //y-axis-group
    svgBoxScatter
      .append("g")
      .attr("class", "y-axis")
      .attr("id", "y-axis")
      .attr("transform", "translate(50,34) scale(0.8)")
      .call(y_axis)
      .append("text")
      .attr("class", "y-axis-title")
      .attr("y", 6)
      .attr("dy", "0.5em")
      .style("text-anchor", "end");

    //y-axis-label
    svgBoxScatter
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -20)
      .attr("y", -10)
      .style("font-size", 18)
      .text("Time in Minutes");

    //main-title
    svgBoxScatter
      .append("text")
      .attr("id", "title")
      .attr("x", 216)
      .attr("y", 30)
      .style("font-size", "0.8em")
      .text("Doping in Professional Bicycle Racing");

    svgBoxScatter
      .append("text")
      .attr("id", "title")
      .attr("x", 250)
      .attr("y", 55)
      .style("font-size", "0.57em")
      .text("35 Fastest times up Alpe d'Huez");

    svgBoxScatter
      .selectAll(".dot")
      .data(data)
      .enter()
      .append("circle")
      .attr("class", "dot")
      .attr("cx", d => x_scale(d.Year)+65)
      .attr("cy", d => y_scale(d.Time)+40)
      .attr("r", 7)
      .attr("data-xvalue", d => d.Year)
      .attr("data-yvalue", d => d.Time.toISOString())
      .attr("transform","scale(0.8)")
      .style("fill", d => {
        return color(d.Doping != "");
      })
      .on("mouseover", d => {
        // svgBoxScatter.select(d.event).style("fill", (d)=>{
        //   return "red";
console.log(d)
// var dTimeparse = d3.utcParse("%M:%S");
// var timeFormat = d3.timeFormat("%M:%S")
// var dTime = timeFormat(d.Time)
        tooltipScatter
          .style("opacity", 0.9)
              .style("z-index", 2000)
          .attr("data-year", d.Year)
          .html(" "+d.Name +" "+  "," +  d.Nationality + " " + "<br/>" +
              "Year: " + d.Year + " " + "<br/>"+
              "Ascent Time: "+Math.floor(d.Seconds/60)+":"+(d.Seconds%60<10? "0"+d.Seconds%60:d.Seconds%60)
              +"<br/>"+
              (d.Doping ? "<br/>" + d.Doping : "")

          )
          .style("border", "5px " + color(d.Doping != "") + " solid")

          .style("left", event.offsetX-60 + "px" )
          .style("top", ()=>{return (event.offsetY<150 ? event.offsetY+20+"px" : event.offsetY -120+"px" )});
      })
      .on("mouseout", d => {
        tooltipScatter.style("opacity", 0);
        tooltipScatter.style("z-index", -1);
      });

    const legend = svgBoxScatter
      .selectAll("legend")
      .data(color.domain())
      .enter()
      .append("g")
      .attr("id", "legend")
      .attr("class", "legend")
      .attr("transform", (d, i) => {
        return "translate(50," + i * 28 + "), scale(0.8)";
      });

    legend
      .append("rect")
      .attr("x", 515)
      .attr("y", 100)
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", color);

    legend
      .append("text")
      .attr("x",495)
      .attr("y", 110)
      .attr("dy", "0.35em")
      .style("font-size", "12")
      .style("text-anchor", "end")
      .text(d => {
        if (d) {
          return "With Doping Allegations";
        } else {
          return "No Doping Allegations";
        }
      });
  }
);
