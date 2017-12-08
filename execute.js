var attribute = "problemid";

var stuff = $("div[" + attribute + "]").attr(attribute);

if (stuff) { 
	console.log(stuff);
}
else {
	console.log("could not find element with attribute " + attribute);
}