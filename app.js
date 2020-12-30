
 var url; 


 var port = chrome.extension.connect({name: "youtube"});
url = window.location.href;
window.open('https://ytmp3.cc/');
port.postMessage(url);

port.onMessage.addListener(function(msg) {
  alert(msg);
});
