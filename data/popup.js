$(document).ready(function(){
  $("#warning").hide();

  function copyToClipboard(text) {
    const input = document.createElement('input');
    input.style.position = 'fixed';
    input.style.opacity = 0;
    input.value = text;
    document.body.appendChild(input);
    input.select();
    document.execCommand('Copy');
    document.body.removeChild(input);
  };

  $("#reset").click(function() {
    $("#top").hide();
    $("#mid").hide();
    $("#warning").show();
    $("#bot").hide();

    $("#yes").click(function() {
      $("#top").css("color", "red");
      $("#top").html("<p id=output>Your settings have been changed.</p>");

      chrome.runtime.sendMessage({option: "reset"}, function(response){});

      $("#top").show();
      $("#mid").show();
      $("#warning").hide();
    });

    $("#no").click(function() {
      $("#top").hide();
      $("#mid").show()
      $("#warning").hide();
    });
  });

  $("#import").click(function(){
    $("#mid").hide();
    $("#bot").hide();

    $("#top").show();
    $("#top").css("color", "black");
    $("#top").html("<p id=output>Enter your exported settings to revert back to your old settings.</p><input type=\"password\" id=settings>");

    $("#settings").keyup(function(e){
      if (e.keyCode == 13){
        chrome.runtime.sendMessage({option: "set_keys", data: $("#settings").val()}, function(response){});

        $("#top").hide();
        $("#mid").show();
      }
    });
  });

  $("#export").click(function(){
    $("#mid").show();

    chrome.runtime.sendMessage({option: "get_keys"}, function(response){
      copyToClipboard(response.data);
    });

    $("#top").css("color", "red");
    $("#top").html("<p id=output>Your settings are now copied to your clipboard.  Paste it to a secure location.</p>");

    $("#bot").hide();
  });

  $("#add").click(function(){
    $("#mid").hide();
    $("#bot").hide();

    $("#top").show();
    $("#top").css("color", "black");
    $("#top").html("<p id=output>Enter an exported key code add the key's owner to your friends list.</p><input type=\"password\" id=userkeypair>");

    $("#userkeypair").keyup(function(e){
      if (e.keyCode == 13){
        chrome.runtime.sendMessage({option: "import_user", data: $("#userkeypair").val()}, function(response){});

        $("#top").hide();
        $("#mid").show();
      }
    });
  });

  $("#copy").click(function(){
    $("#mid").show();

    chrome.runtime.sendMessage({option: "get_keys"}, function(response){
      var data = JSON.parse(response.data);

      var myName = data.name;
      var publicKey = data.publicKey;

      var keyString = JSON.stringify({username: myName, data: publicKey});
      copyToClipboard(keyString);
    });

    $("#top").css("color", "red");
    $("#top").html("<p id=output>Your username and public key is now copied to your clipboard.  Share it with your friends.</p>");

    $("#top").show();
    $("#bot").hide();
  });

  $("#friends").click(function(){
    $("#top").hide();
    $("#mid").hide();

    chrome.runtime.sendMessage({option: "get_keys"}, function(response){
      var newData = JSON.parse(response.data);
      var pals = Object.keys(newData.buddies);

      $("#bot").show();
      $("#bot").css("color", "black");
      for (i=0;i<pals.length;i++) {
        $("#bot").append(pals[i] + "<br><br>");
      }
    });
  });
});
