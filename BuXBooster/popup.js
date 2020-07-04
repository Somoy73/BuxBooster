document.addEventListener('DOMContentLoaded', function (){
    var val = document.getElementById('slider1');
    function showValue(){
        document.getElementById('slval').innerHTML = `${val.value}%`;
    }
    setInterval(showValue,300);
    document.getElementById('b1').addEventListener('click',onclick1,false);
    document.getElementById('b2').addEventListener('click',onclick2,false);
    function onclick1(){
        chrome.tabs.query({currentWindow: true,active:true},
            function(tabs){
                chrome.tabs.sendMessage(tabs[0].id, val.value );
            }
        );
    }
    function onclick2(){
        chrome.tabs.query({currentWindow: true,active:true},
            function(tabs){
                chrome.tabs.sendMessage(tabs[0].id, "download");
            }
        );
    }
});