var users = {};
var myInfo = {};

var keysStored = false;
if (!keysStored){
  generateKeys();
  myInfo.RSAKey = myRSAkey;
  myInfo.publicKey = myPublicKeyString;
  keysStored = true;
  console.log("Your public key is: "+myInfo.publicKey);
}

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

function currentTab(cb) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    cb(tabs[0]);
  });
}

chrome.browserAction.onClicked.addListener(function(tab) {
  // Send a message to the active tab
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, {"message": "clicked_browser_action"});
    
  });
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
  console.log("run in window");
  switch (request.option) {
    case "run_code_in_window":
    chrome.tabs.executeScript(sender.tab.id, {allFrames: true, code:
                                              'var s = document.createElement("script");' +
                                              's.textContent = '+JSON.stringify(code)+';'+
                                              '(document.head||document.documentElement).appendChild(s);'
                                             });
      break;
    case "encrypt_message":
      sendResponse(encryptString(request.data, request.username));
      break;
    case "decrypt_message":
      sendResponse(decryptString(request.data));
      break;
  }
});
