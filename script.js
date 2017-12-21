try{
req=new XMLHttpRequest();
req.open('GET',"sounds/"+window.location.hash.slice(1).replace(/\W/g,'')+"/the.mp3",true);
req.responseType='arraybuffer';
req.onload=function(){window.sound=req.response;for(var i=0;i<document.querySelectorAll('input').length;i++){document.querySelectorAll('input')[i].removeAttribute('disabled');}}
req.send();
}catch(e){alert(e);}
window.onload=function(){
document.body.innerHTML+="<img id='btn' src='sounds/"+window.location.hash.slice(1).replace(/\W/g,'')+"/the.png' style='cursor:pointer;width:10em;height:10em;'/>";
document.getElementById('btn').ontouchstart=function(){window.getData()};
document.getElementById('btn').onmousedown=function(){(!('ontouchstart' in window))&&(window.getData())};
document.getElementById('btn').onerror=function(){document.body.innerHTML="Error: Invalid sound.<br><a href='index.html'>Click to go to the directory...</a>";}
window.audioCtx=0;
var source;
window.getData=function(){try{
if(!window.audioCtx){window.audioCtx=new (window.AudioContext||window.webkitAudioContext)();}
source=window.audioCtx.createBufferSource();
window.audioCtx.decodeAudioData(window.sound.slice(0),function(buffer){
source.buffer=buffer;
source.playbackRate.value=document.querySelector('.playback-rate-control').value/100;
source.connect(window.audioCtx.destination);
source.start(0);
},function(e){alert(e);});
}catch(exc){alert(exc);}}
document.querySelector('.playback-rate-control').oninput=function(){document.querySelector('.playback-rate-value').value=document.querySelector('.playback-rate-control').value;(document.querySelector('input[type=checkbox]').checked)&&window.getData();}
document.querySelector('.playback-rate-control').onchange=function(){document.querySelector('.playback-rate-value').value=document.querySelector('.playback-rate-control').value;(!document.querySelector('input[type=checkbox]').checked)&&window.getData();}
document.querySelector('.playback-rate-value').onchange=function(){document.querySelector('.playback-rate-control').value=document.querySelector('.playback-rate-value').value;window.getData();}
}
window.onhashchange=function(){window.location.reload();}
