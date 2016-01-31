var users = {};
var myInfo = {};

var saved = false;
//have we saved a list of buddies before?
chrome.storage.local.get(["saved"], function(items){
  if (items["saved"] == true){
    saved = true;
  }
  if (!saved){
    console.log("Generating keys cuz you haven't used this before:");
    //generate keys because we haven't saved things yet
    generateKeys();
    myInfo.PassPhrase = myPassPhrase;
    myInfo.RSAKey = myRSAkey;
    myInfo.publicKey = myPublicKeyString;
    saveState();
    console.log("Keys: "+saved);
    console.log("Your passphrase is: "+myInfo.PassPhrase);
    console.log("Your public key is: "+myInfo.publicKey);
    console.log("Your private key is: "+JSON.stringify(myInfo.RSAKey));
  } else {
    //load it
    loadState();
  }
});

function loadState(){
  chrome.storage.local.get(["data"], function(items){
    var data = items["data"];
    data = JSON.parse(data);
    users = data.users;
    myInfo = data.info;
    console.log("Loaded data");
    console.log("Your passphrase is: "+myInfo.PassPhrase);
    console.log("Your public key is: "+myInfo.publicKey);
    console.log("Your private key is: "+JSON.stringify(myInfo.RSAKey));
  });
}

function saveState(){
  chrome.storage.local.set({"data": JSON.stringify({
    users: users,
    info: myInfo
  })}, function(){
    console.log("Userdata stored.");
  });
  chrome.storage.local.set({"saved": true}, function(){
    saved = true;
    console.log("Data stored");
  });
}

function encryptString(string, username){
  var key = users[username];
  if (key){
    var encryptedResult = cryptico.encrypt(string, key);
    return encryptedResult.cipher;
  }
  return "Couldn't find recipiant key";
}

function decryptString(string){
  var decryptedResult = cryptico.decrypt(string, myInfo.RSAKey);
  return decryptedResult.plaintext;
}

function handleString(string, username){
  var header = string.split('\n')[0];
  var message = string.substr(string.indexOf(header)+header.length);
  switch (header){
    case "send_key": //send your key to me
      //return {option: "send", data: "my_key\n"+myInfo.publicKey};
      break;
    case "encrypted_message": //here's a message from me
      return decryptString(message);
      break;
    case "my_key": //store my key with my username
      users[username] = message.trim();
      saveState();
      return "[key received]";
      break;
    default:
      return string;
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
    chrome.tabs.executeScript(sender.tab.id, {allFrames: true, code:
                                              'var s = document.createElement("script");' +
                                              's.textContent = '+JSON.stringify(code)+';'+
                                              '(document.head||document.documentElement).appendChild(s);'
                                             });
      break;
    case "encrypt_message":
      sendResponse({
        option: "encrypted_message",
        data: "encrypted_message\n"+encryptString(request.data, request.username)
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
      saveState();
      break;
    case "set_keys":
      var data = JSON.parse(request.data);
      myInfo.publicKey = data.publicKey;
      myInfo.privateKey = data.privateKey;
      myInfo.passPhrase = data.passPhrase;
      users = data.buddies;
      saveState();
      break;
    case "get_keys":
      sendResponse({
        option: "keys",
        data: JSON.stringify({
          publicKey: myInfo.publicKey,
          privateKey: myInfo.RSAKey,
          passPhrase: myInfo.PassPhrase,
          buddies: users,
        }),
      });
      break;
    case "handle_string":
      sendResponse({
        option: "handle_result",
        data: handleString(request.data, request.username),
      });
      break;
  }
});
