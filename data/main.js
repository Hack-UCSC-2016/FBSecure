console.log("RUUUUN");
function run() {
  console.log("run");
  $('.fbDockWrapper .fbNub').each(function() {
    var name = $(this).find('.name').text();
    if(name.length === 0)
      return;
    console.log(name);
  });

  var MattsRSAkey = cryptico.generateRSAKey(PassPhrase, Bits);
  
}

setInterval(run, 5000);
