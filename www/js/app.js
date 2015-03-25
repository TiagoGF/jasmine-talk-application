var App = (function(window){
	var appParams;

	function init(){
		appParams = {
			name: 'MyApp',
			version: '1'
		}
		window.appParams = appParams;
	}

	function getAppParams(){
		return appParams;
	}

	return {
		init: init,
		getAppParams: getAppParams
	}
})(window);
App.init();