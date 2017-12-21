try{
if(window.location.hash==''){document.documentElement.innerHTML='<head>\n<title>soundSliders</title>\n<meta name="viewport" content="width=device-width,initial-scale=1">\n<link rel="icon" type="image/png" href="icon.png" />\n</head>\n<body>\n<h1>soundSliders</h1>\n<h3>Choose a Slider:</h3>\n<ul>\n<li><a href="player.html#custom">Custom audio</a></li>\n<li><a href="player.html#oof">Oof</a></li>\n<li><a href="player.html#woah">Woah</a></li>\n<li><a href="player.html#yee">Yee</a></li>\n<li><a href="player.html#bork">Bork</a></li>\n<li><a href="player.html#toad">Toad</a></li>\n</ul>\n</body>';}
req=new XMLHttpRequest();
req.open('GET',"sounds/"+window.location.hash.slice(1).replace(/\W/g,'')+"/the.mp3",true);
req.responseType='arraybuffer';
req.onload=function(){window.sound=req.response;for(var i=0;i<document.querySelectorAll('input').length;i++){document.querySelectorAll('input')[i].removeAttribute('disabled');}}
req.send();
}catch(e){alert(e);}
window.onload=function(){
if(window.location.hash.slice(1)=='custom'){document.querySelector('span').style.display="initial";document.querySelector('title').innerHTML=document.querySelector('h1').innerHTML+=" - Custom Audio";}else{document.querySelector('title').innerHTML=document.querySelector('h1').innerHTML+=" - "+window.location.hash.slice(1).replace(/\W/g,'');}
document.body.innerHTML+="<img src='sounds/"+window.location.hash.slice(1).replace(/\W/g,'')+"/the.png' style='cursor:pointer;width:10em;height:10em;'/>";
document.querySelector('img').ontouchstart=function(){window.getData()};
document.querySelector('img').onmousedown=function(){(!('ontouchstart' in window))&&(window.getData())};
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
document.querySelector('input[type=range]').oninput=function(){document.querySelector('input[type=number]').value=this.value;(document.querySelector('input[type=checkbox]').checked)&&window.getData();}
document.querySelector('input[type=range]').onchange=function(){document.querySelector('input[type=number]').value=this.value;(!document.querySelector('input[type=checkbox]').checked)&&window.getData();}
document.querySelector('input[type=number]').onchange=function(){document.querySelector('input[type=range]').value=this.value;window.getData();}
}
window.onhashchange=function(){window.location.reload();}
