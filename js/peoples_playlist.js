//Javascript for People's Playlist app
//Jesse Hoyt - jesselhoyt@gmail.com
//v0.0.1 - 3/10/14

//requires jQuery

require(['$api/models'], function(models){

	console.log("top") ;
	//When application loads, run tabs function
	models.application.load('arguments').done(tabs);
	
	//When arguments change, run tabs function
	models.application.addEventListener('arguments', tabs);
	
	function tabs(){
	/*
		console.log("tabs") ;
		var args = models.application.arguments;
		var current = document.getElementById(args[0]);
		var sections = document.getElementsByClassName('section');
		for(var i = 0, l = sections.length; i < l ; ++i){
			sections[i].style.display = 'none';
		}
		current.style.display = 'block';
	*/
		console.log("tabs");
		var args = models.application.arguments;//arguments being in this case which tab
		
		if(args){
			var lastArg = args[args.length -1];
			if(lastArg !== 'index' && lastArg !== 'about'){
				return
			}
		}
	
		//compose file
		console.log("composing file");
		var file = (args.length == 1)?(args[0] + '.html'):args.slice(0, args.length-1).join('/') + '.html';
		var xhr = new XMLHttpRequest() ;
		xhr.open('GET', file);
		xhr.onreadystatechange = function(){
		
			if(xhr.readyState != 4 || xhr.status != 200) return ;
			
			var $wrapper = $('#wrapper');
			//if not main page, add link to go back to main page
			//html.innerHTML = args[0] === 'index'?'':'<ul class="breadcrumb"><li><a href="spotify:app:peoples-playlist:index">&laquo; Back to main page</a></li></ul>';
			
			//make response a jQuery element and find div with id of wrapper
			var $response = $(xhr.responseText);//does NOT preserve full DOM structure; html, head, body tags missing...
			var $responseWrapper = $response.siblings('#wrapper');//...making #wrapper div a sibling of everything
			
			console.log("$response.length: " + $response.length) ;
			console.log("$responseWrapper.length: " + $responseWrapper.length);
			//replace wrapper with response wrapper
			$wrapper.replaceWith($responseWrapper);
			console.log("xhr.responseText: " + xhr.responseText) ;
			console.log("$wrapper.html(): " + $wrapper.html()) ;
			//if not main page, add link to go back to main page
			if(args[0] !== 'index'){
				var $back = $('<ul class="breadcrumb"><li><a href="spotify:app:peoples-playlist:index">&laquo; Back to main page</a></li></ul>');
				$('#wrapper').prepend($back) ;
			}
	
		};
		xhr.send(null);
	}
});