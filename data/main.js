console.log("RUUUUN");
function run() {
  console.log("run");
  $('#u_0_1m > .fbNub').each(function() {
    console.log($(this).find('.name').text());
  });
}

setInterval(run, 10000);
