var self = require('sdk/self');
var buttons = require('sdk/ui/button/action');
var tabs = require("sdk/tabs");
var pageMod = require("sdk/page-mod");

var button = buttons.ActionButton({
   id: "mozilla-link",
   label: "FBSecure",
   icon: "./icon-16.png",
   onClick: handleClick,
});

function handleClick(state){
   
}
