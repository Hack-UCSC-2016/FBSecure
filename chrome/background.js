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

function handleString(string, username){
  var header = string.split('\n')[0];
  var message = string.substr(string.indexOf(header)+header.length);
  switch (header){
    case "send_key": //send your key to me
      return "my_key\n"+myInfo.publicKey;
      break;
    case "encrypted_message": //here's a message from me
      return decryptString(message);
      break;
    case "my_key": //store my key with my username
      users[username] = message;
      break;
  }
  return "";
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
      chrome.tabs.executeScript(sender.tab.id, {code: request.data});
      break;
    case "encrypt_message":
      sendResponse({
        option: "encrypted_message",
        data: encryptString(request.data, request.username)
      });
      break;
    case "decrypt_message":
      sendResponse({
        option: "decrypted_message",
        data: decryptString(request.data)
      });
      break;
    case "add_user":
      users[request.username] = request.data;
      break;
    case "set_keys":
      myInfo.publicKey = request.data.publicKey;
      myInfo.privateKey = request.data.privateKey;
      myInfo.passPhrase = request.data.passPhrase;
      break;
    case "get_keys":
      sendResponse({
        option: "keys",
        data: JSON.stringify({
          publicKey: myInfo.publicKey,
          privateKey: myInfo.RSAKey,
          passPhrase: myInfo.PassPhrase,
        }),
      });
      break;
    case "handle_string":
      handleString(request.data, request.username);
      break;
  }
});
