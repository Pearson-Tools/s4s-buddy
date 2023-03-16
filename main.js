let scrape = document.getElementById('scrape');
let results = document.getElementById('results');

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	var ta = document.createElement("TEXTAREA");
	
	var pretty = JSON.stringify(request, undefined, 4);
	
	ta.value = pretty;
	
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
	
	let times = document.getElementsByTagName('time');
	let about = document.getElementsByClassName('break-words');
	let names = document.getElementsByTagName('h1');
	
	//console.log(about[0].innerText);
	
	chrome.runtime.sendMessage(
		{
			"name": names[0].innerText,
			"time": times[0].innerText,
			"about": about[0].innerText,
			"type": "Meeting or Networking Event",
			"topics": ["Networking"],
			"tagline": "An event on Meetup.com",
			
	});
}