try{
req=new XMLHttpRequest();
req.open('GET',window.soundURL,true);
req.responseType='arraybuffer';
req.onload=function(){window.sound=req.response;for(var i=0;i<document.querySelectorAll('input').length;i++){document.querySelectorAll('input')[i].removeAttribute('disabled');}}
req.send();
}catch(e){alert(e);}
window.onload=function(){}
