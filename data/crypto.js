function makePassPhrase() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for(var i = 0; i < 15; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

function makeRSAKey(passPhrase) {
	return cryptico.generateRSAKey(myPassPhrase, Bits);
}

function makePublicKeyString(RSAKey) {
	return cryptico.publicKeyString(RSAKey);
}

var Bits = 1024;

var myPassPhrase = makePassPhrase();

var myRSAkey = makeRSAKey(myPassPhrase);

var myPublicKeyString = makePublicKeyString(myRSAkey);

console.log("Your passphrase is " + myPassPhrase);
console.log("Your public key string is " + myPublicKeyString);
