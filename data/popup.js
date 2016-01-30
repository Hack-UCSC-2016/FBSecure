$(document).ready(function(){
  $("#top").hide();
  $("#lock").hide();
  $("#unlock").hide();

  $("#lock").click(function() {
    $("#mid").hide();
    $("#unlock").show();
  });

  $("#unlock").click(function() {
    $("#top").html("<p id=output>Enter your password to unlock</p><input type=\"password\" id=unlockpw>");
    $("#unlockpw").keyup(function(e){
      if (e.keyCode == 13){
        if ($("#unlockpw").val() == password){
          $("#mid").show();
          $("#lock").hide();
        } else {
          $("#output").css("color", "red");
          $("#output").html("<p>PASSWORD INCORRECT</p>");
        }
      }
    });
  });

  $("#password").click(function(){
    $("#bot").html("<input type=\"password\" id=\"entry\">");
    var password = null;
    $("#entry").keyup(function(e){
      if (e.keyCode == 13){
        password = $("#entry").val();
        chrome.runtime.sendMessage({option: "set_password", data: $("#entry").val()}, function(response){
          console.log("response: "+response);
        });
        $("#entry").hide();
        $("#lock").show();
        });
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
