
var flag = false;
var amp;
var vidURL = "";
chrome.runtime.onMessage.addListener(function (req){

    if(req=="download"){
        let url1 = window.location.href;
        if(url1.includes("youtube")){
            alert("Youtube's Eula Policy does not allow extensions to download youtube videos.\nPlease download from BuX or 10-conv instead");
            return;
        }
    }
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
        if(req == "download"){
            alert('Forwarding to 10-convert due to Eula policies.');
            tmp = vidURL.split("embed/");
            vidURL = tmp[0] + "watch?v=" + tmp[1];
            tmp = vidURL.split("www.");
            vidURL = tmp[0] + "www.100"+tmp[1];
            window.open(vidURL);
            return;
        }else{
            var f = vid[0].contentWindow.document.getElementsByTagName('video');
            if(f.length > 0) vid = f;
            console.log(f);
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
        }
        else{
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
