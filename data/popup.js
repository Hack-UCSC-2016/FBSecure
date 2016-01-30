$(document).ready(function(){
  $("#lock").hide();
  $("#unlock").hide();

  var password = null;

  $("#password").click(function(){
    $("#lock").hide();
    $("#mid").hide();

    $("#top").html("<p id=output>Set a new password</p>");
    $("#top").show();

    $("#bot").html("<input type=\"password\" id=\"entry\">");
    $("#entry").keyup(function(e){
      if (e.keyCode == 13){
        password = $("#entry").val();
        chrome.runtime.sendMessage({option: "set_password", data: $("#entry").val()}, function(response){
          console.log("response: "+response);
        });

        $("#output").hide();
        $("#entry").hide();
        $("#mid").show();
        $("#lock").show();
      }
    });
  });

  $("#lock").click(function() {
    $("#mid").hide();
    $("#lock").hide();
    $("#unlock").show();
  });

  $("#unlock").click(function() {
    $("#top").html("<p id=output>Enter your password to unlock</p><input type=\"password\" id=unlockpw>");
    $("#top").show();
    $("#output").show();

    $("#unlockpw").keyup(function(e){
      if (e.keyCode == 13){
        if ($("#unlockpw").val() == password){
          $("#top").hide();
          $("#mid").show();
          $("#lock").show();
          $("#unlock").hide();
        } else {
          $("#output").css("color", "red");
          $("#output").html("<p>PASSWORD INCORRECT</p>");
        }
      }
    });
  });

  $("#import").click(function(){
    $("#mid").hide();

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

    $("#top").css("color", "red");
    $("#top").html("<p id=output>Copy and paste this in a secure location.</p>");
    $("#top").show();
    $("#output").show();

    chrome.runtime.sendMessage({option: "get_keys"}, function(response){
      $("#bot").html("<p id=entry>"+response.data+"</p>");
      response.data;
    });
  });
});
