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

   //Save query
   search.addEventListener('keydown', (e) => {
    if (e.keyCode === 13) {
      chrome.storage.sync.set({'default': search.value});
      defaultVal.innerHTML = "Default query: "+ search.value;

      //Search when press enter too
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
    }
   });

   defaultQuery.addEventListener('click', () => {
    chrome.storage.sync.set({'default': search.value});
    defaultVal.innerHTML = "Default query: "+ search.value
   });

   var substringMatcher = function(strs) {
  return function findMatches(q, cb) {
    var matches, substringRegex;

    // an array that will be populated with substring matches
    matches = [];

    // regex used to determine if a string contains the substring `q`
    substrRegex = new RegExp(q, 'i');

    // iterate through the pool of strings and for any string that
    // contains the substring `q`, add it to the `matches` array
    $.each(strs, function(i, str) {
      if (substrRegex.test(str)) {
        matches.push(str);
      }
    });

    cb(matches);
  };
};

var states = ['accept','accept-charset','accesskey','action','align','alt','async','autocomplete','autofocus','autoplay',
'bgcolor','border','buffered','challenge','charset','checked','cite','class','code','codebase','color','cols','colspan',
'content','contenteditable','contextmenu','controls','coords','crossorigin','data','data-*','datetime','default','defer',
'dir','dirname','disabled','download','draggable','dropzone','enctype','for','form','formaction','headers','height','hidden',
'high','href','hreflang','http-equiv','icon','id','integrity','ismap','itemprop','keytype','kind','label','lang','language','list',
'loop','low','manifest','max','maxlength','minlength','media','method','min','multiple','muted','name','novalidate','open','optimum',
'pattern','ping','placeholder','poster','preload','problemid','radiogroup','readonly','rel','required','reversed','rows','rowspan','sandbox',
'scope','scoped','seamless','selected','shape','size','sizes','slot','span','spellcheck','src','srcdoc','srclang','srcset','start','step',
'style','summary','tabindex','target','title','type','usemap','value','width','wrap'
];

$('#search').typeahead({
  hint: true,
  highlight: true,
  minLength: 1
},
{
  name: 'states',
  source: substringMatcher(states)
});



});