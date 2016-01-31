console.log("RUUUUN");

var fburl = "facebook.com/";


/*
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


var lastSent = "";

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
        var str = newTa.val().trim();
        newTa.val("");
        if(str.length === 0) return;
        lastSent = str;
        chrome.runtime.sendMessage({option: "encrypt_message", data: str, username: username}, function(response) {
          ta.val(response.data);
        });
        var code = "(function(){var nubs = document.querySelectorAll('.fbDockWrapper .fbNub');for(var i=0; i<nubs.length; i++) {if(nubs[i].querySelectorAll('.name').length === 0) {continue;}var username = nubs[i].querySelector('a.titlebarText.fixemoji').href;var fburl = 'facebook.com/';username = username.substr(username.indexOf(fburl)+fburl.length);if(true || username === 'RaisingHearts') {console.log('got here');var ta = nubs[i].querySelector('textarea:first-child');console.log(ta);var e = new Event('keydown');e.keyCode = 13;ta.dispatchEvent(e);}}})();";
        chrome.runtime.sendMessage({option: "run_code_in_window", code: code});
      }
    });
    ta.parent().append(newTa);

    var buttonslot = ta.parent().parent().children('div:last-child');
    var keybutton = $('<a class="_6gb _6gf" role="button" title="Send your public key" tabindex="0"></a>');
    keybutton.click(function() {
      chrome.runtime.sendMessage({option: "get_keys"}, function(input) {
        var msg = "my_key\n"+JSON.parse(input.data).publicKey;
        ta.val(msg);
        var code = "(function(){var nubs = document.querySelectorAll('.fbDockWrapper .fbNub');for(var i=0; i<nubs.length; i++) {if(nubs[i].querySelectorAll('.name').length === 0) {continue;}var username = nubs[i].querySelector('a.titlebarText.fixemoji').href;var fburl = 'facebook.com/';username = username.substr(username.indexOf(fburl)+fburl.length);if(true || username === 'RaisingHearts') {console.log('got here');var ta = nubs[i].querySelector('textarea:first-child');console.log(ta);var e = new Event('keydown');e.keyCode = 13;ta.dispatchEvent(e);}}})();";
        chrome.runtime.sendMessage({option: "run_code_in_window", code: code});
      });
    });
    var buttonspan = $('<span class="_6gd"></span>');
    buttonspan.append(keybutton);
    buttonslot.append(buttonspan);
    keybutton.attr('style', 'background-position: -153px -421px;');
  }
  
  
  
  var messages = nub.find('div.conversation > div > div:last-child');
  var msgObs = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      for(var i=0; i<mutation.addedNodes.length; i++) {
        $(mutation.addedNodes[i]).find('span').each(function() {
          if(!$(this).attr('class')) {
            var elem = $(this);
            var me = elem.parent().parent().parent().parent().parent().parent().data('tooltip-position') === 'right';
            if(me) {
              var header = elem.text().split('\n')[0];
              if(header === "my_key"){
                elem.text('[Key sent]');
              } else if (header === "encrypted_message" && lastSent.length > 0) {
                elem.text(lastSent);
                lastSent = "";
              }
              return;
            }
            if(elem.text().split('\n')[0] === 'my_key') {
              var button = $('<button>Click here to accept key</button>');
              var key = elem.text().split('\n')[1];
              button.click(function() {
                chrome.runtime.sendMessage({option: "add_user", data: key, username: username});
                elem.empty().text('[Added Key]');
              });
              elem.empty().append(button);
            } else {
              chrome.runtime.sendMessage({option: "handle_string", data: elem.text(), username: username},
                                         function(result) {
                elem.text(result.data);
              });
            }
          }
        });
      }
    });
  });
  msgObs.observe(messages.get(0), {childList: true, subtree:true});
}

var observer = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
    for (var i = 0; i < mutation.addedNodes.length; i++) {
      var nub = $(mutation.addedNodes[i]);
      if(nub && nub.hasClass('fbNub')) {
        setUpNub(nub);
      }
    }
  });
});

$(document).ready(function() {
  var elem = undefined;
  var interval = setInterval(function() {
    elem = $('#ChatTabsPagelet > div > div > div.fbNubGroup').get(0);
    if(elem) {
      clearInterval(interval);
      observer.observe($('#ChatTabsPagelet > div > div > div.fbNubGroup').get(0), { childList: true });
      var myProfileLink = $('#blueBarDOMInspector ul li:first-child a');
      var myusername = myProfileLink.attr('href');
      myusername = myusername.substr(myusername.indexOf(fburl)+fburl.length);
      chrome.runtime.sendMessage({option: "name", username: myusername});
    }
  }, 50);
});
