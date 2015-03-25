describe('StuffController', function(){

	var appName = 'MyAppTest';

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