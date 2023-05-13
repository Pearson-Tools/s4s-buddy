let scrape = document.getElementById('scrape');
let results = document.getElementById('results');


chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	console.log(request);
	results.innerHTML = "";
	
	var ta = document.createElement("TEXTAREA");
	
	var text = 
		request.views + ", " +
		request.likes + " likes, and " + 
		request.subs;
	
	
	ta.value = text ;
	
	results.appendChild(ta);
})

scrape.addEventListener("click", async () => {
	let [tab] = await chrome.tabs.query({
		active: true, currentWindow: true
	});
	
	chrome.scripting.executeScript({
		target: {tabId: tab.id},
		func: scrapeData
	});
})

function scrapeData() {
	let likes = document.getElementById('segmented-like-button');
	let subs = document.getElementById('owner-sub-count');
	let info = document.getElementById('info-container');
	let views = info.getElementsByClassName('style-scope yt-formatted-string bold')[0]
	
	
	chrome.runtime.sendMessage(
		{
			"likes": likes.innerText,
			"subs": subs.innerText,
			"views": views.innerText
	});
}