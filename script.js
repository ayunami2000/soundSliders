try{
req=new XMLHttpRequest();
req.open('GET',"sounds/"+decodeURIComponent(window.location.hash.slice(1)).replace(/(?![\w\s/])./g,'')+"/the.mp3",true);//\W
req.responseType='arraybuffer';
req.onload=function(){window.sound=req.response;for(var i=0;i<document.querySelectorAll('input').length;i++){document.querySelectorAll('input')[i].removeAttribute('disabled');}}
req.send();
}catch(e){alert(e);}
window.sources=[];
window.onload=function(){
if(window.location.hash==''){
document.body.innerHTML='<h1>soundSliders</h1><h3>Choose a Slider:</h3><ul><li><a href="#custom">Custom audio</a></li><li>Noteblock<ul><li><a href="#noteblock/bass">Bass</a></li><li><a href="#noteblock/bassattack">Bass attack (guitar)</a></li><li><a href="#noteblock/bassdrum">Bass drum</a></li><li><a href="#noteblock/snare">Snare drum</a></li><li><a href="#noteblock/harp">Harp (piano)</a></li><li><a href="#noteblock/pling">Pling (piano 2)</a></li><li><a href="#noteblock/hat">Hat (click)</a></li></ul></li><li><a href="#deadly lazer">The Sun is a Deadly Lazer</a></li><li><a href="#noot">Noot</a></li><li><a href="#ting">Da Ting Go Skrra</a></li><li><a href="#spaghet">Spaghet</a></li><li><a href="#da wae">Da wae</a></li><li><a href="#oof">Oof</a></li><li><a href="#woah">Woah</a></li><li><a href="#yee">Yee</a></li><li><a href="#bork">Bork</a></li><li><a href="#toad">Toad</a></li><li><a href="#bruh">Bruh</a></li></ul>';
}else{
if((/iPad|iPhone|iPod/.test(navigator.userAgent)&&!window.MSStream)||window.chrome){document.body.innerHTML+='<div style="background-color:black;color:white;text-align:center;line-height:calc(200vh / 3);position:fixed;top:0;left:0;right:0;bottom:0;width:100%;height:100%;margin:0;padding:0;border:0;" onclick="window.getData();this.outerHTML=\'\';">Tap the screen to enable audio...</div>';}
window.choosingPreset=0;
if(decodeURIComponent(window.location.hash.slice(1))=='custom'){document.querySelector('input[type=file]').style.display="initial";document.querySelector('title').innerHTML=document.querySelector('h1').innerHTML+=" - Custom Audio";}else{document.querySelector('title').innerHTML=document.querySelector('h1').innerHTML+=" - "+decodeURIComponent(window.location.hash.slice(1)).replace(/(?![\w\s/])./g,'').replace(/\//g,' - ');}
document.body.innerHTML+='<img src="sounds/'+decodeURIComponent(window.location.hash.slice(1)).replace(/(?![\w\s/])./g,"")+'/the.png"/>';
document.querySelector('img').ontouchstart=function(){!window.choosingPreset&&window.getData()};
document.querySelector('img').onmousedown=function(){(!('ontouchstart' in window))&&(!window.choosingPreset&&window.getData())};
document.querySelector('img').onerror=function(){document.body.innerHTML="Error: Invalid sound.<br><a href='index.html'>Click to go to the directory...</a>";}
window.audioCtx;
window.objURL;
document.querySelector('input[type=file]').onchange=function(){
for(var i=0;i<document.querySelectorAll('input').length;i++){document.querySelectorAll('input')[i].disabled=1;}
req=new XMLHttpRequest();
window.objURL=window.URL.createObjectURL(this.files[0]);
req.open('GET',window.objURL,true);
req.responseType='arraybuffer';
req.onload=function(){window.URL.revokeObjectURL(window.objURL);window.sound=req.response;for(var i=0;i<document.querySelectorAll('input').length;i++){document.querySelectorAll('input')[i].removeAttribute('disabled');}if(document.querySelectorAll("input[type=checkbox]")[1].checked){for(var i=0;i<document.querySelectorAll("input[name=preset]").length;i++){document.querySelectorAll("input[name=preset]")[i].nextElementSibling.nextElementSibling.disabled=1;}}}
req.send();
}
var source;
window.getData=function(){try{
if(!window.audioCtx){window.audioCtx=new (window.AudioContext||window.webkitAudioContext)();}
source=window.audioCtx.createBufferSource();
window.sources.push(source);
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
this.children[2].value=this.children[0].value=document.querySelector('input[type=range]').value;
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
this.children[2].value=this.children[0].value=document.querySelector('input[type=range]').value;
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
if(document.querySelectorAll('input[type=checkbox]')[1].checked){for(var i=0;i<document.querySelectorAll('input[name=preset]').length;i++){document.querySelectorAll('input[name=preset]')[i].nextElementSibling.nextElementSibling.disabled=1;}}
this.innerHTML="Save to Preset...";
window.choosingPreset=0;
return;
}
window.choosingPreset=1;
for(var i=0;i<document.querySelectorAll('input:not([name=preset])').length;i++){document.querySelectorAll('input:not([name=preset])')[i].disabled=true;}
for(var i=0;i<document.querySelectorAll('input[name=preset]').length;i++){!document.querySelectorAll('input[type=checkbox]')[1].checked&&document.querySelectorAll('input[name=preset]')[i].nextElementSibling.nextElementSibling.removeAttribute('disabled');document.querySelectorAll('input[name=preset]')[i].nextElementSibling.nextElementSibling.readonly=true;}
this.innerHTML="Cancel...";
}
for(var i=0;i<document.querySelectorAll('input[name=preset]').length;i++){document.querySelectorAll('input[name=preset]')[i].nextElementSibling.nextElementSibling.oninput=function(){if(window.choosingPreset){return;}this.previousElementSibling.previousElementSibling.value=this.value;for(var i=0;i<document.querySelectorAll('input[name=preset]').length;i++){document.querySelectorAll('input[name=preset]')[i].checked=document.querySelectorAll('input[name=preset]')[i].nextElementSibling.nextElementSibling.value==document.querySelector('input[type=range]').value;}}}
document.querySelectorAll('input[type=checkbox]')[1].onchange=function(){for(var i=0;i<document.querySelectorAll('input[name=preset]').length;i++){document.querySelectorAll('input[name=preset]')[i].nextElementSibling.nextElementSibling.disabled=this.checked;}}
document.onkeypress=function(e){var charCode=(typeof e.which=="number")?e.which:e.keyCode;(charCode==(97||65))&&document.querySelectorAll('input[name=preset]')[0].parentElement.onmousedown();(charCode==(115||83))&&document.querySelectorAll('input[name=preset]')[1].parentElement.onmousedown();(charCode==(100||68))&&document.querySelectorAll('input[name=preset]')[2].parentElement.onmousedown();(charCode==(106||74))&&document.querySelectorAll('input[name=preset]')[3].parentElement.onmousedown();(charCode==(107||75))&&document.querySelectorAll('input[name=preset]')[4].parentElement.onmousedown();(charCode==(108||76))&&document.querySelectorAll('input[name=preset]')[5].parentElement.onmousedown();(charCode==32)&&document.querySelector('img').onmousedown();window.clickingPreset=0;}
}//end show directory else
}
window.onhashchange=function(){window.location.reload();}
