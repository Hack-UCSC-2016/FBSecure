$(document).ready(function(){
  $("#password").click(function(){
    $("#message").html("<input type=\"password\" id=\"entry\">");
    var password = null;
    $("#entry").keyup(function(e){
      if (e.keyCode == 13){
        password = $("#entry").val();
        chrome.runtime.sendMessage({option: "set_password", data: $("#entry").val()}, function(response){
          console.log("response: "+response);
        });
        $("#message").append("<button type=button id=lock>Lock</button>");
        $("#lock").click(function(){
          $("#everything").hide();
          $("#above").html("<button type=button id=unlock>Unlock</button>");
          $("#unlock").click(function(){
            $("#above").html("<p id=output>Enter your password to unlock</p><input type=\"password\" id=unlockpw>");
            $("#unlockpw").keyup(function(e){
              if (e.keyCode == 13){
                if ($("#unlockpw").val() == password){
                  $("#everything").show();
                  $("#above").html("");
                } else {
                  $("#output").css("color", "red");
                  $("#output").html("<p>PASSWORD INCORRECT</p>");
                }
              }
            });
          });
        });
      }
    });
  });
  $("#import").click(function(){
    
  });
  $("#export").click(function(){
    
  });
});
