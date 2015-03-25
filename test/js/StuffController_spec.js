	/*
		Describe is used to start the jasmine scope and to group similar
		tests together.
	*/
describe('StuffController', function(){

	var appName = 'MyAppTest';

	/*
		beforeEach and afterEach statements will tell jasmine what 
		needs to be done before and after all 'it' statements inside this describe.
		These are often used for initialization and cleanup respectively.
	*/
	beforeEach(function(){
		StuffController.init(appName);
	});

	afterEach(function(){
		$('div.status').remove();
	});

	describe('LocalStuff tests', function(){
		it('should execute the local method and return something', function(){
			expect(StuffController.doLocalStuff()).toBeDefined();
		});

		it('should execute the local method and return the proper message', function(){
			expect(StuffController.doLocalStuff()).toBe(appName + ' done executing local stuff.');
		})
	});


 	/*
		Spies can (and should) be used to mock methods whose availability and
		results should not impact the funcionality of what is being tested. It is
		often used to test service calls or code that depends on external libraries.
		Some useful operations that can be applied to spies:
		toHaveBeenCalled, toHaveBeenCalledWith, callThrough, returnValue, callFake, throwError,
		stub, calls.count,calls.mostRecent, etc. For descriptions and more information don't forget
		to check the official jasmine website: http://jasmine.github.io/2.0/introduction.html
 	*/
	describe('RemoteStuff tests', function(){
		it('should properly show our current city after execution', function(){
			spyOn($, 'ajax').and.callFake(function(params){
				params.success({city:'TestCity'});
				return {always:function(){}};
			});
			StuffController.doRemoteStuff();
			expect($('.status').html().indexOf('TestCity')).not.toBe(-1);
		});
	});


	/*
		Jasmine clock can be used to control the javascript internal clock, so functions that depend on
		timeouts and internvals can be tested in a reliable way.
	*/
	describe('AsyncStuff tests', function(){		
		it('should do the async stuff in the proper time', function(){
			jasmine.clock().install();
			StuffController.doTimedAsyncStuff();
			expect($('.status').length).toBe(0);
			jasmine.clock().tick(1999);
			expect($('.status').length).toBe(0);
			jasmine.clock().tick(1);
			expect($('.status').html().indexOf('async stuff')).not.toBe(-1);
			jasmine.clock().uninstall();
		});

		it('should execute and call the callback after the random time', function(done){
			var spy = jasmine.createSpy();
			spy.and.callFake(function(param){
				expect(spy.calls.count()).toBe(1);
				expect(typeof param).toBe("number");
				done();
			});
			expect(spy.calls.count()).toBe(0);
			StuffController.doRandomAsyncStuff(spy);
		});
	});
	
});