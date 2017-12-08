chrome.browserAction.onClicked.addListener(function(tab) {
	var execution = 'console.log($("id=[problemId]"));'
	
   chrome.tabs.executeScript(null, execution);
});