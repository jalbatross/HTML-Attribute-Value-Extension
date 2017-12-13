/** 
 * Search the current page for an HTML element that has an attribute.
 * 
 * @param  {string} attribute An HTML element attribute.
 * @return Empty array if no element or multiple elements were found with the 
 *         attribute, otherwise an array with the first element as the attribute
 *         value
 */
function findHtmlAttribute(attribute) {

	var script = $("div[" + attribute + "]").attr(attribute);

	chrome.tabs.executeScript(null, {file: "jquery-3.2.1.min.js"}, function() {
		 return chrome.tabs.executeScript({code: script});
	});
}

document.addEventListener('DOMContentLoaded', () => {
  chrome.storage.sync.get('default', function(obj) {
    search.value = "problemid";
    defaultVal.innerHTML = "Default query: problemid";
    if (obj.default) {
      search.value = obj.default;
      defaultVal.innerHTML = "Default query: " + obj.default;
    }
  });


   chrome.tabs.executeScript(null, {file: "/lib/jquery-3.2.1.min.js"}, function() {
       chrome.tabs.executeScript({file: "execute.js"} , function () {
         chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            var tabId = tabs[0].id;
            chrome.tabs.sendMessage(tabId, {scriptOptions: {param1: search.value}}, function(response) {
               result.innerHTML = response;
            });
         });
      });
   });

   search.addEventListener('input', () => {
      chrome.tabs.executeScript(null, {file: "/lib/jquery-3.2.1.min.js"}, function() {
        chrome.tabs.executeScript({file: "execute.js"} , function () {
          chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            var tabId = tabs[0].id;
            chrome.tabs.sendMessage(tabId, {scriptOptions: {param1: search.value}}, function(response) {
              result.innerHTML = response;
            });
          });
        });
      });
   });

   defaultQuery.addEventListener('click', () => {
    chrome.storage.sync.set({'default': search.value});
    defaultVal.innerHTML = "Default query: "+ search.value
   });



});