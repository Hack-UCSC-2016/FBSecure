//chrome.runtime.sendMessage({hello: "bar"}, function(response){
//  console.log(response);
//});

$(document).ready(function(){
  $("#passphrase").click(function(){
    $("#message").html("<input type=\"password\" id=\"entry\">");
    $("#entry").keyup(function(e){
      if (e.keyCode == 13){
        
      }
    });
  });
});
