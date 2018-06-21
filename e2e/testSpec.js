describe('Protractor Demo', function() {
it('to check the page title', function() {
browser.ignoreSynchronization = true;
browser.get('http://www.softwaretestinghelp.com/');
browser.driver.getTitle().then(function(pageTitle) {
expect(pageTitle).toEqual('Software Testing Help - A Must Visit Software Testing Portal');
});
});
});