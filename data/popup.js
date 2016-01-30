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
    
  });
  $("#export").click(function(){
    $("#mid").hide();
    $("#message").html("<p id=output>Copy and paste this in a secure location.</p>");
  });
});
