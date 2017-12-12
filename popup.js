/*
chrome.browserAction.onClicked.addListener(function(tab) {
   chrome.tabs.executeScript(null, {
      file: "jquery-3.2.1.min.js"
   }, function() {
      chrome.tabs.executeScript(null, {
         file: "execute.js"
      });
   });
});*/



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

   search.value = "problemid";

   chrome.tabs.executeScript(null, {file: "jquery-3.2.1.min.js"}, function() {
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
   chrome.tabs.executeScript(null, {file: "jquery-3.2.1.min.js"}, function() {
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




   /*
  getCurrentTabUrl((url) => {
    var dropdown = document.getElementById('dropdown');

    // Load the saved background color for this page and modify the dropdown
    // value, if needed.
    getSavedBackgroundColor(url, (savedColor) => {
      if (savedColor) {
        changeBackgroundColor(savedColor);
        dropdown.value = savedColor;
      }
    });

    // Ensure the background color is changed and saved when the dropdown
    // selection changes.
    dropdown.addEventListener('change', () => {
      changeBackgroundColor(dropdown.value);
      saveBackgroundColor(url, dropdown.value);
    });
  });*/
});