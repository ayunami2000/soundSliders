try{
req=new XMLHttpRequest();
req.open('GET',window.soundURL,true);
req.responseType='arraybuffer';
req.onload=function(){window.sound=req.response;for(var i=0;i<document.querySelectorAll('input').length;i++){document.querySelectorAll('input')[i].removeAttribute('disabled');}}
req.send();
}catch(e){alert(e);}
window.onload=function(){
if(window.location.hash=="#oof"||window.location.hash=="#woah"||window.location.hash=="#bork"||window.location.hash=="#yee"||window.location.hash=="#toad")){
document.body.innerHTML+="<img id='btn' src='"+window.location.hash.slice(1)+".png' style='cursor:pointer;width:10em;height:10em;'/>";
document.getElementById('btn').ontouchend=function(){window.playSound()};
document.getElementById('btn').onmouseup=function(){(!('ontouchend' in window))&&(window.playSound())};
}
var audioCtx;
var source;
function getData(){try{
if(!audioCtx){audioCtx=new (window.AudioContext||window.webkitAudioContext)();}
source=audioCtx.createBufferSource();
audioCtx.decodeAudioData(window.sound.slice(0),function(buffer){
source.buffer=buffer;
source.playbackRate.value=document.querySelector('.playback-rate-control').value;
source.connect(audioCtx.destination);
},function(e){console.log(e);});
}catch(e){alert(e);}}
window.playSound=function(){
getData();
source.start(0);
source.playbackRate.value=document.querySelector('.playback-rate-control').value;
}
document.querySelector('.playback-rate-control').oninput=function(){document.querySelector('.playback-rate-value').innerHTML=document.querySelector('.playback-rate-control').value;(document.querySelector('input[type=checkbox]').checked)&&window.playSound();}
}
window.onhashchange=function(){window.location.reload();}
