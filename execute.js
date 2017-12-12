chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
   console.log("Execution script received message: ", message);

   var scriptOptions = message.scriptOptions;
   console.log('searching for attribute ', scriptOptions.param1);

   if (!message || !scriptOptions.param1) {
      return "";
   }

   var attribute = scriptOptions.param1;
   var data = $("div[" + attribute + "]").attr(attribute);

   if (data) {
      sendResponse(data);
   } else {
      sendResponse("Could not find any attribute with id " + attribute)
   }

});