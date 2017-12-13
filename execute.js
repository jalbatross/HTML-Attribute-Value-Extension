chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {

   var scriptOptions = message.scriptOptions;

   if (!message || !scriptOptions.param1) {
      sendResponse("Invalid attribute");
      return;
   }

   var attribute = scriptOptions.param1;
   var data = $("div[" + attribute + "]").attr(attribute);

   if (data) {
      sendResponse(data);
   } else {
      sendResponse("Could not find any attribute with id " + attribute)
   }

});