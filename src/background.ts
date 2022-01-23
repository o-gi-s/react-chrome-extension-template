
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){
	console.log(message);
	return true
})

console.log("message");