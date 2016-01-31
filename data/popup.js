$(document).ready(function(){
  $("#warning").hide();

  $("#reset").click(function() {
    $("#top").hide();
    $("#bot").hide();

    $("#mid").hide();
    $("#warning").show();

    $("#yes").click(function() {
      $("#top").css("color", "red");
      $("#top").html("<p id=output>Your credentials have been changed</p>");

      chrome.runtime.sendMessage({option: "reset"}, function(response){});

      $("#mid").show();
      $("#warning").hide();
    });

    $("#no").click(function() {
      $("#mid").show()
      $("#warning").hide();
    });

    $("#top").show();
  });

  $("#import").click(function(){
    $("#mid").hide();
    $("#bot").hide();

    $("#top").show();
    $("#top").css("color", "black");
    $("#top").html("<p id=output>Enter your credentials to load keys</p><input type=\"password\" id=credentials>");

    $("#credentials").keyup(function(e){
      if (e.keyCode == 13){
        chrome.runtime.sendMessage({option: "set_keys", data: $("#credentials").val()}, function(response){});

        $("#top").hide();
        $("#mid").show();
      }
    });
  });

  $("#export").click(function(){
    $("#mid").hide();

    $("#top").show();
    $("#top").css("color", "red");
    $("#top").html("<p id=output>Copy and paste this in a secure location.</p>");

    chrome.runtime.sendMessage({option: "get_keys"}, function(response){
      $("#bot").show();
      $("#bot").css("color", "black");
      $("#bot").html("<p id=entry>"+response.data+"</p>");
      response.data;
    });

    $("#top").hide();
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
