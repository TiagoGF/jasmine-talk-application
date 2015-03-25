describe('Application Base Test', function(){
	it("Should properly load the configurations", function(){
		expect(App.getAppParams()).toBeDefined();
	});
});
