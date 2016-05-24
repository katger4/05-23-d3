var promise = $.get(url).then(function(data){
	//do whatever is in here once the data is dl'd
});

promise.then(function(data){
	//do a second thing
});

$.get(url).then(function(data){
	//do whatever is in here once the data is dl'd
}).then(function(data){
	//do a second thing
});

$.get(url).then(function(data){
	data.forEach(function(item){
		//do stuff to item
	});
	doSomething(data, "string");
});
//cant do $.get(url).then(doSomething) bc can only have 1 parameter
var promiseA = $.get(urlA);

var promiseB = $.get(urlB);

//rather than saying get urlA then get urlB,
$.when(promiseA, promiseB, function(dataA, dataB){
	
});

D3:
	A JavaScript library that makes interactive charts (visualizations)
	NOT a charting library (i.e., Plotly)
	
	Performs DOM manipulation (like jQuery!)
		Lets you put shapes on the screen
	
	Connects (binds) data to visual elements

Scalable Vector Graphics (SVG)
	An XML specification for vector graphics.
	In modern browsers, can be manipulated as part of the DOM
	<svg width=400 height=400> <!-- the "frame" to put shapes in -->


	   <rect x=20 y=130 width=50 height=80  <--x/y from top left
	         fill="purple" stroke="gold" />


	   <circle cx=150 cy=150 r=35 <--centerX centerY
	           stroke="blue" stroke-width="10" fill="white" />

	   
	   <circle cx=120 cy=140 r=35 
	           fill="red" style="opacity:0.5;" />


	   <path d="M 111.003,0 L 111.003,18.344 L 123.896,18.344 L 109.501,71.915 C 109.501,71.915 91.887,0.998 91.636,0 L 73.006,0 C 72.743,0.975 53.684,71.919 53.684,71.919 L 40.427,18.344 L 53.851,18.344 L 53.851,0 L 0,0 L 0,18.344 L 11.932,18.344 C 11.932,18.344 32.523,100.706 32.772,101.706 L 61.678,101.706 C 61.934,100.729 75.476,49.251 75.476,49.251 C 75.476,49.251 88.343,100.716 88.591,101.706 L 117.495,101.706 C 117.755,100.723 139.422,18.344 139.422,18.344 L 151.256,18.344 L 151.256,0 L 111.003,0 z" fill="#4b2e83"/> <!-- from wikicommons -->

	</svg>

D3 DOM Manipulation
We can select, append, and manipulate DOM elements with D3 in the same manner as jQuery.
	var svg = d3.select('svg'); //select the SVG tag
	var circle = svg.append('circle'); //add a circle
	circle.attr('cx', 150); //set the attributes
	circle.attr('cy', 150);
	circle.attr('r', 35);
	circle.attr('fill', 'green');

	var circle2 = svg.append('circle'); //add another
	circle.attr({cx:120, cy:140, r:35, fill:'red'});
	     //set key-value pairs of attributes

https://github.com/INFO-474/m7-d3-intro
Action								jQuery Syntax									D3 Syntax
Select an element from the DOM		$('selector')									d3.select("selector")
Get element attribute				$('selector').attr('attr-name')					d3.select('selector').attr('attr-name')
Set element attribute				$('selector').attr('attr-name', 'attr-value')	d3.select('selector').attr('attr-name', 'attr-value')
Set element style					$('selector').css('style-name', 'style-value')	d3.select('selector').style('style-name', 'style-value')
Append a DOM element				$('selector').append('<tag-name></tag-name>')	d3.select('selector').append('tag-name')

Method Chaining
	D3 methods return the element selected, modified, or appended. This variable can be anonymously used for the next function call
	 //named variables
	 var svg = d3.select('svg');
	 var rect = d3.append('rect');
	 rect = rect.attr({x:20, y:130, width:50, height:80});
	 rect = rect.attr('fill', 'blue');
	 rect = rect.style('opacity', 0.5);


	 //method chaining (anonymous variables)
	 d3.select('svg')
	   .append('rect')
	      .attr({x:20, y:130, width:50, height:80})
	      .attr('fill', 'blue')
	      .style('opacity', 0.5);

Data to DOM:
	var data = [
	   {id:1, name:'A', sleep:8},
	   {id:2, name:'B', sleep:3},
	   {id:3, name:'C', sleep:6},
	]; //id provides 'y' vertical position; sleep provides barWidth

Naive Approach:
	var calcY = function(dataItem){ 
	   return dataItem.id*50;
	}

	var calcWidth = function(dataItem){
	   return dataItem.sleep*20;
	}

	data.forEach(function(item){
	   svg.append('rect')
	      .attr({x:10, height:40})
	      .attr('y', calcY(item))
	      .attr('width', calcWidth(item));
	});

//////////using anonymous functions/////////
	data.forEach(function(item){
	   svg.append('rect')
	      .attr({x:10, height:40})
	      .attr('y', function(dataItem){
	          return dataItem.id*50;
	      })
	      .attr('width', function(dataItem){
	          return dataItem.sleep*20;
	      }); 
	});

selectAll: The .selectAll() method will select a collection (list) of elements. D3 methods called on a collection will be called on each item!
	///////below does not run actually
	data.forEach(function(item){
	   svg.append('rect')
	      .attr({x:10, height:40})
	      .attr('y', function(dataItem){ return dataItem.id*50; }) ////have taken 'calcY' from above, turned it into an anonymous function!
	      .attr('width', function(dataItem){ return dataItem.sleep*20; }); ////have taken 'calcX' from above, turned it into an anonymous function!
	});
	/////////below runs does not actually plot (bc would already need the 3 (#of data items) rects to have been appended to the svg)
	svg.selectAll('rect') //the for each loop is implied!!
	      .attr({x:10, height:40})
	      .attr('y', function(dataItem){ return dataItem.id*50; })
	      .attr('width', function(dataItem){ return dataItem.sleep*20; }); 

The Data-Join: The magic of D3 is that we can create a "link" between a list of data and a list of DOM elements. This binds the data to the DOM, so that any changes to the data can automatically be applied to the DOM.

	//get the list of data
	var dataList = [
	   {id:1, name:'A', sleep:8},
	   {id:2, name:'B', sleep:3},
	   {id:3, name:'C', sleep:6},
	]

	//get the list of DOM elements <--could be empty!
	var rectList = d3.select('svg')
	              .selectAll('rect');

	//bind them together!
	rectList.data(dataList, function(item){ return item.id; }); //item returns unique identifier

	//chained version:
	d3.select('svg')
		.selectAll('rect')
		.data(dataList, function(item){return item.id;});
	//.data() returns the items in the dataList and the DOM!

Adding Data Elements: We want to add (append) a new DOM element for each data item that doesn''t have one yet. The .enter() method gives the list of un-visualized items.

	enter() returns items in the data but not in the DOM!
	//all the data and dom
	var rects = svg.selectAll('rect').data(dataList);

	//stuff just in data
	var justData = rects.enter();

	//////////append rect for each
	justData.append('rect') //apply to whole collection
	      .attr({x:10, height:40}) //assign attr
	      .attr('y', function(d){ return d.id*50; });
	////////chained version
	rects.enter()
	     .append('rect')
	     .attr({x:10, height:40}) //assign attr
	     .attr('y', function(d){ return d.id*50; });

Removing Data Elements: We want to remove a DOM element for each DOM element that no longer has a data item. The .exit() method gives the list of un-data''d items. //supposing you removed one dict of key/value pairs
	exit() returns items in the DOM but not in the data!
