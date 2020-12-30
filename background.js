var url
chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.tabs.executeScript(null, {file: "/app.js"});
});

 chrome.extension.onConnect.addListener(function(port) 
 {
      port.onMessage.addListener(function(msg) {
          if (port.name == "download")
          {
              port.postMessage(url);
          }
          else
          {
            url = msg;
            setTimeout(getTab, 3000, port, msg); 
          }
      });
 });




function getTab(port, msg) {
    var tabID;

  chrome.tabs.query({}, function(tabs) 
  {
    for (var i = 0; i < tabs.length; i++)
    {
        if(tabs[i].url.includes('https://ytmp3.cc'))
        {
            tabID = tabs[i].id;
            chrome.tabs.update(tabs[i].id, {selected: true});
            break;
        }
    }
    chrome.tabs.executeScript(tabID, {file: "/download.js"});
  });
}


