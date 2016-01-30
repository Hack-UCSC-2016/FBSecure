var self = require('sdk/self');
var buttons = require('sdk/ui/button/action');
var tabs = require("sdk/tabs");
var pageMod = require("sdk/page-mod");
var ss = require("sdk/simple-storage");

var button = buttons.ActionButton({
  id: "mozilla-link",
  label: "FBSecure",
  icon: "./icon-16.png",
  onClick: handleClick,
});

function handleClick(state){
  console.log("You clicked me.");
}

//Program starts at startup here:
pageMod.PageMod({
  include: "*.facebook.com",
  contentScriptFile: [self.data.url("jquery.js"), self.data.url("sjcl.js"), self.data.url("main.js")],
});
