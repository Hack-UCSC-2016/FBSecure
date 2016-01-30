
$(document).ready(function(){
  $("#password").click(function(){
    $("#message").html("<input type=\"password\" id=\"entry\">");
    $("#entry").keyup(function(e){
      if (e.keyCode == 13){
        chrome.runtime.sendMessage({option: "set_password", data: $("#entry").val()}, function(response){
          console.log("response: "+response);
        });
        $("#message").html("<input 
      }
    });

  });

});
