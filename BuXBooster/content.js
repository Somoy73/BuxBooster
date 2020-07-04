
var flag = false;
var amp;
var vidURL = "";
chrome.runtime.onMessage.addListener(function (req){
    console.log('gese');
    let vid = document.getElementsByTagName('video');
    console.log(vid);
    if(vid.length == 0){
        vidURL = "";
        vid = document.getElementsByTagName('iframe');
        let tmp = vid[0].src + "";
        tmp = tmp.split("");
        for(ch of tmp){
            vidURL+=ch;
            if(ch=='?') break;
        }
        alert('New tab needs to be opened because of BuX Restrictions! Please reapply boost in the new tab');
        if(req == "download"){
            tmp = vidURL.split("embed/");
            vidURL = tmp[0] + "watch?v=" + tmp[1];
            tmp = vidURL.split("www.");
            vidURL = tmp[0] + "www.100"+tmp[1];
            window.open(vidURL);
            return;
        }else{
            window.open(vidURL);
        }
        /*
        if(vid.length > 0){
            vid = getFrame();
        }
        */
    }
    function getFrame(){
        var iframe = vid;
        var innerDoc = iframe.contentDocument || iframe.contentWindow.document;
        vid = innerDoc.getElementsByTagName('video');
    }
    console.log(vid);
    let x = req/100.0;
    function amplifyMedia(mediaElem, multiplier) {
        if(flag){
            amp.gain.gain.value = multiplier;
            result = amp;
        }else{
            var context = new (window.AudioContext || window.webkitAudioContext),
            result = {
              context: context,
              source: context.createMediaElementSource(mediaElem),
              gain: context.createGain(),
              media: mediaElem,
              amplify: function(multiplier) { result.gain.gain.value = multiplier; },
              getAmpLevel: function() { return result.gain.gain.value; }
            };
            result.source.connect(result.gain);
            result.gain.connect(context.destination);
            result.amplify(multiplier);
            flag = true;
            
        }
        return result;
    }
    amp = amplifyMedia(vid[0],x);
    console.log(amp);  
});
