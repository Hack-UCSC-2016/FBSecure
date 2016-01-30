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

  var MattsRSAkey = cryptico.generateRSAKey(PassPhrase, Bits);
  
}

setInterval(run, 5000);
