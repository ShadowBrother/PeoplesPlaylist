//Javascript for People's Playlist app
//Jesse Hoyt - jesselhoyt@gmail.com
//v0.0.1 - 3/10/14

require(['$api/models'], function(models){

	//alert("top") ;
	console.log("top") ;
	//When application loads, run tabs function
	models.application.load('arguments').done(tabs);
	
	//When arguments change, run tabs function
	models.application.addEventListener('arguments', tabs);
	
	function tabs(){
	
		//alert("tabs") ;
		console.log("tabs") ;
		var args = models.application.arguments;
		var current = document.getElementById(args[0]);
		var sections = document.getElementsByClassName('section');
		for(var i = 0, l = sections.length; i < l ; ++i){
			sections[i].style.display = 'none';
		}
		current.style.display = 'block';
	}
});