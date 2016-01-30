var users = {};
var myInfo = {};

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
    var encryptedResult = cryptico.encrypt(string, key);
  }
  return encryptedResult.cipher;
}

function decryptString(string){
  var decryptedResult = cryptico.decrypt(string, myRSAkey);
  return decryptedResult.plaintext;
}

chrome.browserAction.onClicked.addListener(function(tab) {
  // Send a message to the active tab
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, {"message": "clicked_browser_action"});
    
  });
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
  switch (request.option){
    case "encrypt_message":
      sendResponse(encryptString(request.data, request.username));
      break;
    case "decrypt_message":
      sendResponse(decryptString(request.data));
      break;
  }
});
