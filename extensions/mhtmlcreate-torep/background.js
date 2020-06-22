// 2020 ASGdev

const regex = /[\\/:*?\"<>|]/gi;

// Listen for a click on the extension icon. On that click, generate and upload MHTML file.
chrome.browserAction.onClicked.addListener(function() {
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {

		var activeTab = tabs[0]
		var activeTabId = activeTab.id
		var url = activeTab.url

		var filenamified = url.replace(regex, '!')
		filenamified += "-" + Date.now() + ".mhtml"
		
		var title = activeTab.title
		 
		chrome.pageCapture.saveAsMHTML({ tabId: activeTab.id }, function (mhtmlData){
			console.log(mhtmlData)
			var data = new FormData()
			data.append('file', mhtmlData, filenamified)
			data.append('seed', url)
			data.append('type', 'mhtml')
			data.append('name', title)

			fetch('http://localhost:8080/repository/archive', {
			  method: 'POST',
			  body: data
			}).then(function() {
				console.log("ok");
				chrome.browserAction.setBadgeText({text: 'OK'});
			}).catch(function() {
				console.log("error");
				chrome.browserAction.setBadgeText({text: 'ERROR'});
			});
		})

	});

});
