chrome.browserAction.onClicked.addListener(function(tab) {
   chrome.tabs.executeScript(null, {
      file: "jquery-3.2.1.min.js"
   }, function() {
      chrome.tabs.executeScript(null, {
         file: "execute.js"
      });
   });
});

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

