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

function keyDown() {
  console.log('Keydown');
}

function run() {
  console.log("run");
  $('.fbDockWrapper .fbNub').each(function() {
    var name = $(this).find('.name').text();
    if(name.length === 0)
      return;
    console.log(name);

    if($(this).find('textarea').length === 1) {
      var ta = $(this).find('textarea');
      ta.hide();
      var newTa = $('<textarea title="Type an encrypted message..." placeholder="Type an encrypted message..." style="height: 14px;"></textarea>').attr('class', ta.attr('class')).keyup(function(e) {
        if(e.keyCode === 13) {
          ta.val(newTa.val()+" aslkdfjasfdkljea");
          ta.trigger("keyup", {keyCode: 13});
          newTa.val("");
        }
      });;
      ta.parent().append(newTa);
    }
    
    var messages = $(this).find('div.conversation > div > div:last-child > div');
    messages.each(function() {
      console.log($(this).text());
    });
  });
}

setInterval(run, 5000);
