var url
//begins execution of app.js
chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.tabs.executeScript(null, {file: "/app.js"});
});

//A listener for two different ports. 
chrome.extension.onConnect.addListener(function(port) 
{
    port.onMessage.addListener(function(msg) {
    if (port.name == "download")
    {
        //send the url of the youtube video to download.js
        port.postMessage(url);
    }
    else
    {
        //we must save msg into a variable because we will use this to send the url to the other port in the if statement above
        url = msg;
        setTimeout(getTab, 3000, port, url); 
    }
    });
 });

//switch the active tab from youtube to ytmp3
function getTab(port, msg) 
{
    chrome.tabs.query({}, function(tabs) 
    {
        //iterate through all the tabs. stop when we reach the ytmp3 tab
        for (var i = 0; i < tabs.length; i++)
        {
            if(tabs[i].url.includes('https://ytmp3.cc'))
            {
                chrome.tabs.update(tabs[i].id, {selected: true});
                break;
            }
        }
        //start the download
        chrome.tabs.executeScript(tabID, {file: "/download.js"});
  });
}


