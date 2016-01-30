function makePassPhrase() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for(var i = 0; i < 15; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

var myRSAkey = null;
var myPublicKeyString = null;
var myPassPhrase = null;
var Bits = 1024;

function makeRSAKey(passPhrase) {
	return cryptico.generateRSAKey(passPhrase, 1024);
}

function makePublicKeyString(RSAKey) {
	return cryptico.publicKeyString(RSAKey);
}

function generateKeys(){ 
  myPassPhrase = makePassPhrase();
  myRSAkey = makeRSAKey(myPassPhrase);
  myPublicKeyString = makePublicKeyString(myRSAkey);
}
