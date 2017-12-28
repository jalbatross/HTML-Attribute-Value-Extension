chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {

   var scriptOptions = message.scriptOptions;

   if (!message || !scriptOptions.param1) {
      sendResponse("Invalid attribute");
      return;
   }

   var attribute = scriptOptions.param1;
   var data = $("[" + attribute + "]").attr(attribute);

   if (data) {

   	var count = (data.match(/ /g)||[]).length + 1;
   	var formatted = "<b>Found " + String(count) + " instance(s) of " + attribute + ":</b><br>" + data.replace( / /g, "<br>");
   	console.log(formatted);

   	sendResponse(formatted);
   } 
   else {
   	sendResponse("Could not find any attribute named " + attribute)
   }

});