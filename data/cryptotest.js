function makeid() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for(var i = 0; i < 14; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

var myPassPhrase = makeid();
console.log("Your passphrase is " + myPassPhrase);

var Bits = 1024;

var myRSAkey = cryptico.generateRSAKey(myPassPhrase, Bits);

var myPublicKeyString = cryptico.publicKeyString(myRSAkey);
console.log("Your public key string is " + myPublicKeyString);
