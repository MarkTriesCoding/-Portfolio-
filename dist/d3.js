!function(t){var e={};function a(r){if(e[r])return e[r].exports;var n=e[r]={i:r,l:!1,exports:{}};return t[r].call(n.exports,n,n.exports,a),n.l=!0,n.exports}a.m=t,a.c=e,a.d=function(t,e,r){a.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},a.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},a.t=function(t,e){if(1&e&&(t=a(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(a.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)a.d(r,n,function(e){return t[e]}.bind(null,n));return r},a.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return a.d(e,"a",e),e},a.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},a.p="/",a(a.s=43)}({19:function(t,e,a){"use strict";e.a=function(){var t=document.querySelector(".loader-container");t.style.transition="opacity 4s ease-in backgroundColor 3s ease-in",console.log(1),setTimeout((function(){t.style.opacity="0",setTimeout((function(){t.style.zIndex="0"}),1e3)}),2e3)}},43:function(t,e,a){t.exports=a(44)},44:function(t,e,a){"use strict";a.r(e);var r=a(19);a(45);window.addEventListener("load",Object(r.a)());var n=d3.select(".choro").append("div").attr("id","tooltipChoro").style("opacity",0).style("transition","opacity 200ms ease-out"),o=d3.select(".choro").append("svg").attr("preserveAspectRatio","xMinYMin meet").attr("viewBox","0 0 500 340").classed("svg-content",!0);o.append("text").attr("id","title").text("United States Educational Attainment").attr("color","blue").attr("x",40).attr("y",40).style("font-size","20px"),o.append("text").attr("id","description").text("Percentage of adults age 25 and older with a bachelor's degree or higher (2010-2014)").attr("x",40).attr("y",70).style("font-size","10px");var s=d3.geoPath();d3.queue().defer(d3.json,"https://raw.githubusercontent.com/no-stack-dub-sack/testable-projects-fcc/master/src/data/choropleth_map/counties.json").defer(d3.json,"https://raw.githubusercontent.com/no-stack-dub-sack/testable-projects-fcc/master/src/data/choropleth_map/for_user_education.json").await((function(t,e,a){if(t)throw t;var r=a.map((function(t){return t.bachelorsOrHigher})),i=d3.min(r),c=d3.max(r),l=d3.scaleLinear().domain([i,c]).rangeRound([414,736]),d=d3.scaleThreshold().domain(d3.range(i,c,(c-i)/10)).range(d3.schemeYlGn[9]);d.range().map((function(t){return null==(t=d.invertExtent(t))[0]&&(t[0]=l.domain()[0]),null==t[1]&&(t[1]=l.domain()[1]),t}));o.append("g").attr("class","legendQuant").attr("id","legend").attr("transform","translate(425,175) scale(0.6)");var u=d3.legendColor("#fff").labelFormat(d3.format("0.0f")).labels(d3.legendHelpers.thresholdLabels).scale(d).ascending(!0);o.select(".legendQuant").call(u);o.append("g").attr("transform","translate(40,80) scale(0.4)").attr("class","counties").selectAll("path").data(topojson.feature(e,e.objects.counties).features).enter().append("path").attr("class","county").attr("data-fips",(function(t){return t.id})).attr("data-education",(function(t){var e=a.filter((function(e){return e.fips==t.id}));return e[0]?e[0].bachelorsOrHigher:0})).attr("fill",(function(t){var e=a.filter((function(e){return e.fips==t.id}));return e[0]?d(e[0].bachelorsOrHigher):d[0]})).attr("d",s).on("mousemove",(function(t){var e=a.filter((function(e){return e.fips===t.id}));n.attr("data-education",e[0].bachelorsOrHigher).style("opacity",1).style("left",(function(){return event.offsetX<400?event.offsetX+20+"px":event.offsetX-225+"px"})).style("top",event.offsetY-50+"px").style("border","10px "+d(e[0].bachelorsOrHigher)+" solid").html(e[0].area_name+": "+e[0].bachelorsOrHigher+"%")})).on("mouseout",(function(){n.style("opacity",0)})),o.append("path").datum(topojson.mesh(e,e.objects.states,(function(t,e){return t!==e}))).attr("class","states").attr("d",s).attr("transform","translate(40,80) scale(0.4)")}));d3.json("https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/global-temperature.json",(function(t,e){if(t)throw t;e.monthlyVariance[0].year,e.monthlyVariance[e.monthlyVariance.length-1].year;var a=50,r=50,n=60,o=(["#67001f","#b2182b","#d6604d","#f4a582","#fddbc7","#f7f7f7","#d1e5f0","#92c5de","#4393c3","#2166ac","#053061"].reverse(),["#deebf7","#c6dbef","#9ecae1","#6baed6","#4292c6","#2171b5","#08519c","#08306b"].reverse().concat(["#fee0d2","#fcbba1","#fc9272","#fb6a4a","#ef3b2c","#cb181d","#a50f15","#67000d"])),s=e.monthlyVariance.map((function(t){return t.variance}));console.log("1");var i=d3.select(".heatMap").append("div").attr("id","tooltipHeatmap").style("opacity",0).style("transition","opacity 300ms ease-out");console.log("2");var c=d3.select(".heatMap").append("svg").attr("preserveAspectRatio","xMinYMin meet").attr("viewBox","0 0 500 340").classed("svg-content",!0),l=d3.scaleBand().domain([0,1,2,3,4,5,6,7,8,9,10,11]).range([0,340],0,0),d=d3.axisLeft(l).tickValues(l.domain()).tickFormat((function(t){var e=new Date(0);return e.setUTCMonth(t),d3.utcFormat("%B")(e)})).tickSize(10,1),u=d3.scaleBand().domain(e.monthlyVariance.map((function(t){return t.year}))).range([0,500],0,0),f=d3.axisBottom(u).tickValues(u.domain().filter((function(t){return t%10==0}))).tickFormat((function(t){var e=new Date(0);return e.setUTCFullYear(t),d3.utcFormat("%Y")(e)})).tickSize(12,1);c.append("g").attr("class","y-axis").attr("id","y-axis").attr("transform","translate("+(n-1)+", "+a+") scale(0.7)").call(d),c.append("g").attr("class","x-axis").attr("id","x-axis").attr("transform","translate("+(n-1)+","+(340-r-2)+") scale(0.7)").call(f).selectAll("text").attr("dy","1em").attr("x",-15).attr("y",2).attr("transform","rotate(300)").style("text-anchor","end");var p=e.baseTemperature,m=p+Math.min.apply(Math,s),y=p+Math.max.apply(Math,s),x=d3.scaleQuantize().domain([m-p,y-p]).range(o);c.append("g").selectAll("rect").data(e.monthlyVariance).enter().append("rect").attr("class","cell").attr("transform","translate("+n+","+a+") scale(0.7)").attr("data-month",(function(t){return t.month-1})).attr("data-year",(function(t){return t.year})).attr("data-temp",(function(t){return e.baseTemperature+t.variance})).attr("fill",(function(t){return x(t.variance)})).attr("x",(function(t,e){return u(t.year)})).attr("y",(function(t,e){return l(t.month-1)})).attr("width",(function(t,e){return 2})).attr("height",(function(t,e){return 28})).on("mousemove",(function(t){var e=new Date(t.year,t.month-1);i.attr("data-year",t.year).style("opacity",1).style("left",(function(){return event.offsetX<350?event.offsetX+10+"px":event.offsetX-150+"px"})).style("top",event.offsetY-50+"px").style("z-index",5).style("border","4px "+x(t.variance)+" solid").html("<span>"+d3.timeFormat("%B")(e)+" "+t.year+"</span></br><br> <span class='tipSmall'>Temp.: "+d3.format("+.1f")(p+t.variance)+"&#8451</span><br> <span class='tipSmall'>Δ: "+d3.format("+.1f")(t.variance)+"&#8451</span>")})).on("mouseout",(function(){i.style("opacity",0).style("z-index",0)})),c.append("text").attr("id","titleHeatMap").attr("x",30).attr("y",33).style("font-size","19px").text("Mean Global Land-Surface Temperature (1732-2015)");for(var h=[],g=y-m,v=o.length,b=1;b<v;b++)h.push(m+b*(g/v));var j=d3.scaleLinear().domain([m,y]).range([0,175]),w=d3.axisLeft(j).tickSize(5).tickValues(h).tickFormat(d3.format(".1f"));c.append("g").classed("legend",!0).attr("id","legend").attr("transform","translate(440,220) scale(0.7) rotate(180)").append("g").selectAll("rect").data(x.range().map((function(t){var e=x.invertExtent(t);return null==e[0]&&(e[0]=j.domain()[0]),null==e[1]&&(e[1]=j.domain()[1]),e}))).enter().append("rect").style("fill",(function(t,e){return x(t[0])})).style("opacity","0.9").attr("x",0).attr("y",(function(t,e){return 11*e})).attr("width",11).attr("height",11),d3.select(".legend").call(w)}));var i=d3.select(".scatterPlot").append("div").attr("id","tooltipScatter").style("opacity",0).style("transition","opacity 400ms ease"),c=d3.select(".scatterPlot").append("svg").attr("preserveAspectRatio","xMinYMin meet").attr("viewBox","0 0 500 340").classed("svg-content",!0),l=d3.scaleLinear().range([0,500]),d=d3.scaleTime().range([0,340]),u=d3.axisBottom().scale(l).tickFormat(d3.format("d")),f=d3.timeFormat("%M:%S"),p=d3.axisLeft().scale(d).tickFormat(f),m=d3.scaleOrdinal(d3.schemeCategory10);d3.json("https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json",(function(t,e){if(t)throw t;e.forEach((function(t){var e=t.Time.split(":");t.Time=new Date(Date.UTC(1970,0,1,0,e[0],e[1]))})),l.domain([d3.min(e,(function(t){return t.Year-1})),d3.max(e,(function(t){return t.Year+1}))]),d.domain(d3.extent(e,(function(t){return t.Time}))),c.append("g").attr("class","x-axis").attr("id","x-axis").attr("transform","translate( 50,306) scale(0.8)").call(u).append("text").attr("class","x-axis-title").attr("x",860).attr("y",-6).style("text-anchor","end").text("Year"),c.append("g").attr("class","y-axis").attr("id","y-axis").attr("transform","translate(50,34) scale(0.8)").call(p).append("text").attr("class","y-axis-title").attr("y",6).attr("dy","0.5em").style("text-anchor","end"),c.append("text").attr("transform","rotate(-90)").attr("x",-20).attr("y",-10).style("font-size",18).text("Time in Minutes"),c.append("text").attr("id","title").attr("x",216).attr("y",30).style("font-size","0.8em").text("Doping in Professional Bicycle Racing"),c.append("text").attr("id","title").attr("x",250).attr("y",55).style("font-size","0.57em").text("35 Fastest times up Alpe d'Huez"),c.selectAll(".dot").data(e).enter().append("circle").attr("class","dot").attr("cx",(function(t){return l(t.Year)+65})).attr("cy",(function(t){return d(t.Time)+40})).attr("r",7).attr("data-xvalue",(function(t){return t.Year})).attr("data-yvalue",(function(t){return t.Time.toISOString()})).attr("transform","scale(0.8)").style("fill",(function(t){return m(""!=t.Doping)})).on("mouseover",(function(t){console.log(t),i.style("opacity",.9).style("z-index",2e3).attr("data-year",t.Year).html(" "+t.Name+" ,"+t.Nationality+" <br/>Year: "+t.Year+" <br/>Ascent Time: "+Math.floor(t.Seconds/60)+":"+(t.Seconds%60<10?"0"+t.Seconds%60:t.Seconds%60)+"<br/>"+(t.Doping?"<br/>"+t.Doping:"")).style("border","5px "+m(""!=t.Doping)+" solid").style("left",event.offsetX-60+"px").style("top",(function(){return event.offsetY<150?event.offsetY+20+"px":event.offsetY-120+"px"}))})).on("mouseout",(function(t){i.style("opacity",0),i.style("z-index",-1)}));var a=c.selectAll("legend").data(m.domain()).enter().append("g").attr("id","legend").attr("class","legend").attr("transform",(function(t,e){return"translate(50,"+28*e+"), scale(0.8)"}));a.append("rect").attr("x",515).attr("y",100).attr("width",18).attr("height",18).style("fill",m),a.append("text").attr("x",495).attr("y",110).attr("dy","0.35em").style("font-size","12").style("text-anchor","end").text((function(t){return t?"With Doping Allegations":"No Doping Allegations"}))}))},45:function(t,e,a){}});