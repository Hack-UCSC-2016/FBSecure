var PassPhrase = "This is a testing passphrase.";
var Bits = 1024;

console.log(PassPhrase);

var myRSAKey = cryptico.generateRSAKey(PassPhrase, Bits);
var myPublicKeyString = cryptico.publicKeyString(myRSAKey);

console.log(myPublicKeyString);

var messageString = "This is an example message.";

console.log(messageString);

var encryptedMessage = cryptico.encrypt(messageString, myPublicKeyString);
var cipherMessage = encryptedMessage.cipher;

console.log(cipherMessage);

var decryptedMessage = cryptico.decrypt(cipherMessage, myRSAKey);
var decryptedMessageString = decryptedMessage.plaintext;

console.log(decryptedMessageString);

console.log("RUUUUN");
function run() {
  console.log("run");
  $('.fbDockWrapper .fbNub').each(function() {
    var name = $(this).find('.name').text();
    if(name.length === 0)
      return;
    console.log(name);
  });
}

setInterval(run, 5000);
