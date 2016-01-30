var users = {};
var myInfo = {};

myInfo.passPhrase = myPassPhrase;
myInfo.RSAKey = myRSAkey;
myInfo.publicKey = myPublicKeyString;

chrome.storage.onChanged.addListener(function(changes, namespace){
  var i = 1;
});

function saveUser(name, key){
  
}

function encryptString(string, username){
  var key = users[username];
  if (key){
    
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
