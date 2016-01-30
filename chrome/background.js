var users = {};

function saveUser(name, key){
  
}

function encryptString(string, username){
  var user = users[username];
  if (user){
    
  }
}

function decryptString(string, username){
  
}

chrome.browserAction.onClicked.addListener(function(tab) {
  // Send a message to the active tab
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, {"message": "clicked_browser_action"});
    
  });
});
