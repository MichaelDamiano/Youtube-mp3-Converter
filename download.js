 var port = chrome.extension.connect({name: "download"});
 var interval;
 port.postMessage("");
 
 port.onMessage.addListener(function(msg) {
   document.getElementById('input').value = msg;
   document.getElementById('submit').click();
   interval = setInterval(download, 1000);
});

function download(){
    try{
        if (document.getElementById('title').innerHTML.trim() != 'Please insert a valid video URL')
        {
            clearInterval(interval);
            document.getElementById('buttons').children[0].click();
        }
    }
   catch(err) {
       clearInterval(interval);
       alert("An error has occured, download failed. Please try again.");
   }
   finally{setTimeout(function(){ close(); }, 1000);}
}
