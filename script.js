try{
req=new XMLHttpRequest();
req.open('GET',window.soundURL,true);
req.responseType='arraybuffer';
req.onload=function(){window.sound=req.response;for(var i=0;i<document.querySelectorAll('input').length;i++){document.querySelectorAll('input')[i].removeAttribute('disabled');}}
req.send();
}catch(e){alert(e);}
window.onload=function(){
if(window.location.hash=="#oof"||window.location.hash=="#woah"||window.location.hash=="#bork"||window.location.hash=="#yee"||window.location.hash=="#toad"){
document.body.innerHTML+="<img id='btn' src='"+window.location.hash.slice(1)+".png' style='cursor:pointer;width:10em;height:10em;'/>";
document.getElementById('btn').ontouchstart=function(){window.getData()};
document.getElementById('btn').onmousedown=function(){(!('ontouchstart' in window))&&(window.getData())};
}else{document.body.innerHTML="Error: Invalid sound. <a href='index.html'>Click here to see the sound directory...</a>";}
window.audioCtx=0;
var source;
window.getData=function(){try{
if(!window.audioCtx){window.audioCtx=new (window.AudioContext||window.webkitAudioContext)();}
source=window.audioCtx.createBufferSource();
window.audioCtx.decodeAudioData(window.sound.slice(0),function(buffer){
source.buffer=buffer;
source.playbackRate.value=document.querySelector('.playback-rate-control').value/50;
source.connect(window.audioCtx.destination);
source.start(0);
},function(e){alert(e);});
}catch(exc){alert(exc);}}
document.querySelector('.playback-rate-control').oninput=function(){document.querySelector('.playback-rate-value').innerHTML=document.querySelector('.playback-rate-control').value;(document.querySelector('input[type=checkbox]').checked)&&window.getData();}
}
window.onhashchange=function(){window.location.reload();}
