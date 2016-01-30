console.log("RUUUUN");

var fburl = "facebook.com/";

/*
      var code =
            "debugger;"+
            "var username = '"+username+"';"+
            "var nubs = document.querySelectorAll('.fbDockWrapper .fbNub');"+
            "for(var i=0; i<nubs.length; i++) {"+
            "if(nubs[i].querySelectorAll('.name').length === 0) {console.log(nubs[i]); continue;}"+
            "var testusername = nubs[i].querySelector('a.titlebarText.fixemoji').href;"+
            "var fburl = 'facebook.com/';"+
            "testusername = testusername.substr(testusername.indexOf(fburl)+fburl.length);"+
            "console.log(testusername);"+
            "if(testusername === username) {"+
            "var ta = nubs[i].querySelector('textarea:first-child');"+
            "ta.addEventListener('customcole', function(e) {"+
            "var f = new Event('keydown');"+
            "f.charCode = 13;"+
            "f.keyCode = 13;"+
            "f.which = 13;"+
            "this.dispatchEvent(f);"+
            "console.log('CUSTOMCOLE #####################');"+
            "console.log(e);"+
            "}, false);"+
            "console.log(ta);"+
            "var e = new Event('keydown');"+
            "e.charCode = 13;"+
            "e.keyCode = 13;"+
            "e.which = 13;"+
            "ta.dispatchEvent(e);"+
            //"window.run_with(ta, ['legacy:control-textarea'], function() {TextAreaControl.getInstance(this)});"+
            "var f = new Event('customcole');"+
            "f.keyCode = 13;"+
            "ta.dispatchEvent(f);"+
            "break;"+
            "}"+
 "}";
*/

function setUpNub(nub) {
  console.log("run");
  var name = nub.find('.name').text();
  if(name.length === 0)
    return;
  var username = nub.find('a.titlebarText.fixemoji').attr('href');
  username = username.substr(username.indexOf(fburl)+fburl.length);
  var ta = nub.find('textarea');
  if(nub.find('textarea').length === 1) {
    ta.hide();

    var newTa = $('<textarea title="Type an encrypted message..." placeholder="Type an encrypted message..." style="height: 14px;"></textarea>').attr('class', ta.attr('class')).keyup(function(e) {
      if(e.keyCode === 13) {
        var str = newTa.val()+" asldkfjasdflk\r\n"+String.fromCharCode(13);
        chrome.runtime.sendMessage({option: "encrypt_message", data: {data: str, username: username}}, function(crypt) {
          ta.val(str);
        });
        //$('body').append('<script type="text/javascript">'+code+'</script>');
        newTa.val("");
      }
    });
    ta.parent().append(newTa);

    var buttonslot = ta.parent().parent().children('div:last-child');
    var keybutton = $('<a class="_6gb _6gf" role="button" title="Send your public key" tabindex="0"></a>');
    keybutton.click(function() {
      console.log('click');
      chrome.runtime.sendMessage({option: "get_keys", data: {}}, function(input) {
        console.log(input.data);
        var msg = "my_key\n"+JSON.parse(input.data).publicKey;
        console.log(msg);
        ta.val(msg);
      });
    });
    var buttonspan = $('<span class="_6gd"></span>');
    buttonspan.append(keybutton);
    buttonslot.append(buttonspan);
    console.log(buttonslot.length);
    console.log(ta.parent().parent().get(0));
  }
  
  
  
  var messages = nub.find('div.conversation > div > div:last-child > div');
  messages.each(function() {
    //console.log($(this).text());
  });
}

var observer = new MutationObserver(function(mutations) {
  console.log(mutations);
  mutations.forEach(function(mutation) {
    for (var i = 0; i < mutation.addedNodes.length; i++)
      var nub = $(mutation.addedNodes[i]);
      if(nub && nub.hasClass('fbNub')) {
        setUpNub(nub);
      }
  });
});

setTimeout(function() {
  console.log($('#ChatTabsPagelet > div > div > div.fbNubGroup').get(0));
  observer.observe($('#ChatTabsPagelet > div > div > div.fbNubGroup').get(0), { childList: true });
}, 5000);
