
var  legendTransformByScreenSize = "translate(425,175) scale(0.6)"

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
