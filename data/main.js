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

function pressEnter() {
  var code = "(function(){"+
        "var nubs = document.querySelectorAll('.fbDockWrapper .fbNub');"+
        "for(var i=0; i<nubs.length; i++) {"+
        "if(nubs[i].querySelectorAll('.name').length === 0) {continue;}"+
        "var username = nubs[i].querySelector('a.titlebarText.fixemoji').href;"+
        "var fburl = 'facebook.com/';"+
        "username = username.substr(username.indexOf(fburl)+fburl.length);"+
        "if(true || username === 'RaisingHearts') {"+
        "console.log('got here');"+
        "var ta = nubs[i].querySelector('.fbNubFlyoutFooter div:first-child');"+
        "console.log(ta);"+
        "var e = new Event('keydown');"+
        "e.key = 'b';"+
        "e.which = 66;"+
        "e.keyCode = 66;"+
        "e.bubbles = true;"+
        "console.log(e);"+
        "var descendents = ta.getElementsByTagName('*');"+
        "ta.dispatchEvent(e);"+
        "for(var i=0; i<descendents.length; i++) {"+
        "console.log(descendents[i]);"+
        "descendents[i].dispatchEvent(e);"+
        "}"+
        "}"+
        "}"+
        "})();";
  chrome.runtime.sendMessage({option: "run_code_in_window", code: code});
}

var lastSent = "";

function setUpNub(nub) {
  console.log("run");
  var name = nub.find('.name').text();
  if(name.length === 0)
    return;
  var username = nub.find('a.titlebarText.fixemoji').attr('href');
  username = username.substr(username.indexOf(fburl)+fburl.length);
  var ta = nub.find('.fbNubFlyoutFooter > div:not(:last-child)');
  console.log(ta.get(0));
  if(ta.length === 1) {
    var newTa = ta.clone();
    //ta.hide();
    newTa.children('div').children('div').removeAttr('data-reactroot');
    newTa.find('div[role="textbox"]').attr('title', 'Type an encrypted message...');
    var ghostText = newTa.find('div:contains("Type a message..."):not(:has(*))');
    ghostText.text('Type an encrypted message...');
    var allElems = newTa.find('*');
    allElems.removeAttr('data-contents');
    allElems.removeAttr('data-block');
    allElems.removeAttr('data-offset-key');
    allElems.removeAttr('data-ft');
    allElems.removeAttr('data-ft');
    var spanText = newTa.find('div[role="textbox"]');
    spanText.keyup(function(e) {
      console.log("keyup!");
      console.log(e);
      var str = newTa.find('div[role="textbox"]').text().trim();
      if(str.length > 0) {
        ghostText.hide();
      } else {
        ghostText.show();
      }
      if(e.keyCode === 13) {
        spanText.html("");
        ghostText.show();
        console.log(str);
        if(str.length === 0) return;
        lastSent = str;
        chrome.runtime.sendMessage({option: "encrypt_message", data: str, username: username}, function(response) {
          console.log(response.data);
          console.log(ta.find('div[role="textbox"]').get(0));
          var outerspan = ta.find('div[role="textbox"] span:has(*)');
          if(outerspan.find('br[data-text="true"]').length > 0) {
            outerspan.find('br[data-text="true"]').replaceWith(function() {
              return $('<span data-text="true"></span>');
            });
          }
          outerspan.find('span[data-text="true"]').text(str);
          outerspan.find('span[data-text="true"]').focus();
          chrome.runtime.sendMessage({option: "press_enter"});
          pressEnter();
        });
        var code = "(function(){var nubs = document.querySelectorAll('.fbDockWrapper .fbNub');for(var i=0; i<nubs.length; i++) {if(nubs[i].querySelectorAll('.name').length === 0) {continue;}var username = nubs[i].querySelector('a.titlebarText.fixemoji').href;var fburl = 'facebook.com/';username = username.substr(username.indexOf(fburl)+fburl.length);if(true || username === 'RaisingHearts') {console.log('got here');var ta = nubs[i].querySelector('.fbNubFlyoutFooter div[role=\"textbox\"] *[data-text=\"true\"]');console.log(ta);var e = new Event('keydown');e.keyCode = 13;ta.dispatchEvent(e);}}})();";
        chrome.runtime.sendMessage({option: "run_code_in_window", code: code});
      }
    });
    ta.parent().append(newTa);

    var buttonslot = ta.parent().children('div:not(:last-child):not(:first-child)');
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
      var myProfileLink = $('#blueBarDOMInspector a[title="Profile"]');
      var myusername = myProfileLink.attr('href');
      myusername = myusername.substr(myusername.indexOf(fburl)+fburl.length);
      chrome.runtime.sendMessage({option: "name", username: myusername});
    }
  }, 50);
});
