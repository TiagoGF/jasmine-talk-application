var StuffController = (function(window){
	var appName;
	var stuffCounter;

	function init(appNameParam){
		if(appNameParam){
			appName = appNameParam;	
		}else{
			appName = '????';
		}		
		stuffCounter = 0;
	}

	function doLocalStuff(){
		var returnMessage = appName + ' done executing local stuff.';
		$('body').append('<div class="status">' + returnMessage);
		return returnMessage;
	}

	function remoteStuffSucess(result){
		var returnMessage = appName + ' travelled for miles and miles and then returned to ' + result.city;
		$('body').append('<div class="status">' + returnMessage);
		return returnMessage;
	}

	function getAppName(){
		return appName;
	}

	function getStuffCounter(){
		return stuffCounter;
	}

	function remoteStuffFailure(result){
		return false;
	}

	function doRemoteStuff(callback){
		$.ajax({
			type: 'POST',
			url: 'http://ip-api.com/json',
			dataType: 'json',
			success: remoteStuffSucess,
			failure: remoteStuffFailure
		}).always(function(response){
			if(typeof callback =='function'){
				callback(response);
			}
		});
	}

	function doTimedAsyncStuff(){
		setTimeout(function(){
			$('body').append('<div class="status">' + appName +' done executing timed async stuff after 2000ms.');
			stuffCounter++;
		}, 2000);	
	}

	function doRandomAsyncStuff(callback){
		var timer = parseInt(Math.random()*2000)+1000;
		setTimeout(function(){
			$('body').append('<div class="status">' + appName +' done executing random async stuff after ' +timer +'ms.');	
			stuffCounter++;

			if(typeof callback == 'function'){
				callback(timer);
			}
		}, timer);
	}
	

	return {
		init: init,
		doLocalStuff: doLocalStuff,
		doRemoteStuff: doRemoteStuff,
		doTimedAsyncStuff: doTimedAsyncStuff,
		doRandomAsyncStuff: doRandomAsyncStuff,
	}
})(window);