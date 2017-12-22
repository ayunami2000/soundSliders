try{
req=new XMLHttpRequest();
req.open('GET',"sounds/"+window.location.hash.slice(1).replace(/\W/g,'')+"/the.mp3",true);
req.responseType='arraybuffer';
req.onload=function(){window.sound=req.response;for(var i=0;i<document.querySelectorAll('input').length;i++){document.querySelectorAll('input')[i].removeAttribute('disabled');}}
req.send();
}catch(e){alert(e);}
window.onload=function(){
if(window.location.hash==''){
document.body.innerHTML='<h1>soundSliders</h1><h3>Choose a Slider:</h3><ul><li><a href="#custom">Custom audio</a></li><li><a href="#oof">Oof</a></li><li><a href="#woah">Woah</a></li><li><a href="#yee">Yee</a></li><li><a href="#bork">Bork</a></li><li><a href="#toad">Toad</a></li></ul>';
}else{
window.choosingPreset=0;
if(window.location.hash.slice(1)=='custom'){document.querySelector('span').style.display="initial";document.querySelector('title').innerHTML=document.querySelector('h1').innerHTML+=" - Custom Audio";}else{document.querySelector('title').innerHTML=document.querySelector('h1').innerHTML+=" - "+window.location.hash.slice(1).replace(/\W/g,'');}
document.body.innerHTML+="<img src='sounds/"+window.location.hash.slice(1).replace(/\W/g,'')+"/the.png' style='cursor:pointer;width:10em;height:10em;'/>";
document.querySelector('img').ontouchstart=function(){!window.choosingPreset&&window.getData()};
document.querySelector('img').onmousedown=function(){(!('ontouchstart' in window))&&(!window.choosingPreset&&window.getData())};
document.querySelector('img').onerror=function(){document.body.innerHTML="Error: Invalid sound.<br><a href='index.html'>Click to go to the directory...</a>";}
window.audioCtx;
window.objURL;
document.querySelector('input[type=file]').onchange=function(){
for(var i=0;i<document.querySelectorAll('input').length;i++){document.querySelectorAll('input')[i].disabled=true;}
req=new XMLHttpRequest();
window.objURL=window.URL.createObjectURL(this.files[0]);
req.open('GET',window.objURL,true);
req.responseType='arraybuffer';
req.onload=function(){window.URL.revokeObjectURL(window.objURL);document.querySelector('button').style.display="initial";document.querySelector('img').src="icon.png";window.sound=req.response;for(var i=0;i<document.querySelectorAll('input').length;i++){document.querySelectorAll('input')[i].removeAttribute('disabled');}}
req.send();
}
var source;
window.getData=function(){try{
if(!window.audioCtx){window.audioCtx=new (window.AudioContext||window.webkitAudioContext)();}
source=window.audioCtx.createBufferSource();
window.audioCtx.decodeAudioData(window.sound.slice(0),function(buffer){
source.buffer=buffer;
source.playbackRate.value=document.querySelector('input[type=range]').value/100;
source.connect(window.audioCtx.destination);
source.start(0);
},function(e){alert(e);});
}catch(exc){alert(exc);}}
document.querySelector('input[type=range]').oninput=function(){for(var i=0;i<document.querySelectorAll('input[name=preset]').length;i++){document.querySelectorAll('input[name=preset]')[i].checked=document.querySelectorAll('input[name=preset]')[i].value==this.value;}document.querySelector('input[type=number]').value=this.value;(document.querySelector('input[type=checkbox]').checked)&&window.getData();}
document.querySelector('input[type=range]').onchange=function(){for(var i=0;i<document.querySelectorAll('input[name=preset]').length;i++){document.querySelectorAll('input[name=preset]')[i].checked=document.querySelectorAll('input[name=preset]')[i].value==this.value;}document.querySelector('input[type=number]').value=this.value;(!document.querySelector('input[type=checkbox]').checked)&&window.getData();}
document.querySelector('input[type=number]').onchange=function(){for(var i=0;i<document.querySelectorAll('input[name=preset]').length;i++){document.querySelectorAll('input[name=preset]')[i].checked=document.querySelectorAll('input[name=preset]')[i].value==this.value;}document.querySelector('input[type=range]').value=this.value;window.getData();}
for(var i=0;i<document.querySelectorAll('input[name=preset]').length;i++){
document.querySelectorAll('input[name=preset]')[i].onchange=function(){if(window.choosingPreset){return;}if(this.checked){document.querySelector('input[type=range]').value=document.querySelector('input[type=number]').value=this.value;}}
document.querySelectorAll('input[name=preset]')[i].parentElement.ontouchstart=function(){
this.children[0].click();
if(window.choosingPreset){
this.children[2].value=this.value=document.querySelector('input[type=range]').value;
for(var i=0;i<document.querySelectorAll('input').length;i++){document.querySelectorAll('input')[i].removeAttribute('disabled');}
document.querySelectorAll('button')[1].innerHTML="Save to Preset...";
window.choosingPreset=0;
return;
}
window.getData();
}
window.clickingPreset=0;
document.querySelectorAll('input[name=preset]')[i].parentElement.onmouseenter=function(){if(window.clickingPreset){this.onmousedown();}}
window.onmouseup=function(){if(!('ontouchend' in window)){window.clickingPreset=0;}}
window.onmouseleave=function(){window.clickingPreset=0;}
document.querySelectorAll('input[name=preset]')[i].parentElement.onmousedown=function(){if(!('ontouchstart' in window)){
window.clickingPreset=1;
this.children[0].click();
if(window.choosingPreset){
this.children[2].value=this.value=document.querySelector('input[type=range]').value;
for(var i=0;i<document.querySelectorAll('input').length;i++){document.querySelectorAll('input')[i].removeAttribute('disabled');}
document.querySelectorAll('button')[1].innerHTML="Save to Preset...";
window.choosingPreset=0;
return;
}
window.getData();
}}
window.ondragstart=function(){return false;}
}
document.querySelectorAll('button')[1].onclick=function(){
if(window.choosingPreset){
for(var i=0;i<document.querySelectorAll('input:not([name=preset])').length;i++){document.querySelectorAll('input:not([name=preset])')[i].removeAttribute('disabled');}
for(var i=0;i<document.querySelectorAll('input[name=preset]').length;i++){document.querySelectorAll('input[name=preset]')[i].nextElementSibling.nextElementSibling.removeAttribute('readonly');}
this.innerHTML="Save to Preset...";
window.choosingPreset=0;
return;
}
window.choosingPreset=1;
for(var i=0;i<document.querySelectorAll('input:not([name=preset])').length;i++){document.querySelectorAll('input:not([name=preset])')[i].disabled=true;}
for(var i=0;i<document.querySelectorAll('input[name=preset]').length;i++){document.querySelectorAll('input[name=preset]')[i].nextElementSibling.nextElementSibling.removeAttribute('disabled');document.querySelectorAll('input[name=preset]')[i].nextElementSibling.nextElementSibling.readonly=true;}
this.innerHTML="Cancel...";
}
for(var i=0;i<document.querySelectorAll('input[name=preset]').length;i++){document.querySelectorAll('input[name=preset]')[i].nextElementSibling.nextElementSibling.oninput=function(){if(window.choosingPreset){return;}this.previousElementSibling.previousElementSibling.value=this.value;for(var i=0;i<document.querySelectorAll('input[name=preset]').length;i++){document.querySelectorAll('input[name=preset]')[i].checked=document.querySelectorAll('input[name=preset]')[i].nextElementSibling.nextElementSibling.value==document.querySelector('input[type=range]').value;}}}
}//end show directory else
}
window.onhashchange=function(){window.location.reload();}
