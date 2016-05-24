'use strict'; //strict mode: catch silly errors

//Use the jQuery selector function $() to access the '#face' img
//assign that element to a variable
var state = 0;
//var isSurprised = false;
var face = $('#face');

//Use the .click() function to assign a click listener to the #face
//remember to pass an anonymous function as a param to .click()
face.click(function(event){
	//var element = $(event.target);
	//if(!isSurprised){
		//isSurprised = true;	
	//}
	if(state == 0){
		face.attr('src', 'img/surprised.png');
		state = 1;
	}
	else{
		face.attr('src', 'img/happy.png');
		state = 0;
	}
});

//Inside your .click() callback function, use the '.attr()' method to
//change the 'src' attribute of the image. Assign it a new 
//value of 'img/surprised.png'
//The syntax for this function is:
//    element.attr('attr to change', 'new value')


//Create a _global_ variable to keep track of whether the face is
//surprised or not (what is the starting value?)
//You can do this at the start of your script


//Modify the .click() callback so that it changes the attr to
//'img/surprised.png' if the face IS NOT surprised, and changes it to
//'img/happy.png' if the face IS surprised.
//After you change the attr, you should also change the global variable!

/////////////// D3 work //////////////////

var svg = d3.select('svg'); 

//append adds new html elements within svg tag
// var circle = svg.append('circle') //add a circle
// 				.attr('cx', 150) //set the attributes
// 				.attr('cy', 150)
// 				.attr('r', 35)
// 				.attr('fill', 'lightblue');

// var circle2 = svg.append('circle') //add another
// 				 .attr({cx:120, cy:140, r:35, fill:'pink'}); //set key-value pairs of attributes

var data = [
	{id:1, name:'A', sleep:8},
	{id:2, name:'B', sleep:3},
	{id:3, name:'C', sleep:6},
];

	// var calcY = function(dataItem){
	//    return dataItem.id*50;
	// }

	// var calcWidth = function(dataItem){
	//    return dataItem.sleep*20;
	// }

	// data.forEach(function(item){
	//    svg.append('rect')
	//       .attr({x:10, height:40})
	//       .attr('y', calcY(item))
	//       .attr('width', calcWidth(item));
	// });
// svg.selectAll('rect') //the for each loop is implied!! (for each of the rects:)
// 		.attr({x:10, height:40})
// 		.attr('y', function(dataItem){ return dataItem.id*50; })
// 		.attr('width', function(dataItem){ return dataItem.sleep*20; }); 

	//get the list of data
	var dataList = [
	   {id:1, name:'A', sleep:8},
	   {id:2, name:'B', sleep:3},
	   {id:3, name:'C', sleep:6},
	]

	
	var rects = svg.selectAll('rect').data(dataList);
	rects.enter()
	     .append('rect')
	     .attr({x:10, height:40}) //assign attr
	     .attr('y', function(d){ return d.id*50; })
		 .attr('width', function(dataItem){ return dataItem.sleep*20; });