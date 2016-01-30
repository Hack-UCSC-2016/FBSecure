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

    var ta = $(this).find('textarea');
    if($(this).find('textarea').length === 1) {
      ta.hide();
      var code = "var nubs = document.querySelectorAll('.fbDockWrapper .fbNub');"+
            "for(var i=0; i<nubs.length; i++) {"+
            "var name = nubs[i].querySelector('div.name > span > span').textContent;"+
            "if(name === '"+name+"') {"+
            "var ta = nubs[i].querySelector('textarea:first-child');"+
            "var e = new Event('keydown');"+
            "e.keyCode = 13;"+
            "ta.dispatchEvent(e);"+
            "break;"+
            "}"+
            "}";

      var newTa = $('<textarea title="Type an encrypted message..." placeholder="Type an encrypted message..." style="height: 14px;"></textarea>').attr('class', ta.attr('class')).keyup(function(e) {
        if(e.keyCode === 13) {
          var str = newTa.val()+" asldkfjasdflk\n";
          ta.val(str);
          chrome.runtime.sendMessage({option: "run_code_in_window", data: code});
          newTa.val("");
        }
      });
      ta.parent().append(newTa);
    }
    
    
    var messages = $(this).find('div.conversation > div > div:last-child > div');
    messages.each(function() {
      console.log($(this).text());
    });
  });
}

setInterval(run, 5000);
