var someone = "";
var readid = "";
var outid = "";
var inject = document.getElementsByClassName("msg-box");
readlist();

//讀取資料確認資料內容
function readlist(){
chrome.storage.local.get(['list'], function(result) {
	   outid = result.list;
        });
	}
//創建元素區
function createE(e){
var btn = document.createElement("button");
btn.style = "width:100px;height:30px;border-radius:8px";
btn.style.color= 'gray';
btn.style.border = "2px blue";
btn.style.background = "paleturquoise";
var text1 = document.createTextNode("新增進黑名單");
e.appendChild(btn);
btn.appendChild(text1);

//$("#c1").attr("style","width:100px;height:30px;border:2px blue;background-color:paleturquoise;")
//$("#c2").attr("style","width:100px;height:30px;border:2px blue;background-color:paleturquoise;")
}
document.getElementById("im_msgbox").addEventListener('click', function(a){
var tar = a.target.closest('.msg-box');
//tar=每一個人發言的框框
if(a.target.tagName == "BUTTON" && tar.children[0].children[0].dataset.gamercardUserid != undefined){
	var aid = tar.children[0].children[0].dataset.gamercardUserid;
	var nameid = tar.children[1].children[0].children[0].textContent;
addlist(aid,nameid);
}
});
//讀取現有清單加入新名單

function addlist(aid,nameid){
	var re = /[^A-Z|0-9]/gi
	chrome.storage.local.get(['list'], function(result) {
		  someone = [{'id': aid,'name': nameid}];
		  if(result.list != undefined)
		  {
		  readid = result.list;
		  outid = readid.concat(someone);
		  console.log(outid);
		  chrome.storage.local.set({'list': outid}, function() {
			  autoclear();
        });
		  }
		  else
		  {
			  outid = someone;
			  console.log(outid);
			  chrome.storage.local.set({'list': outid}, function() {
				  autoclear();
        });
		  }
        })
}

//自動讀取頁面DOMchange清除黑名單中帳戶的發言
document.getElementById("im_msgbox").addEventListener('DOMNodeInserted', function(f){
	if(f.target.className == "msg-box")
{
	createE(f.target.children[1].children[0]);
		   if (isEmptyObject(outid))
	   {
		   return;
	   }
	   else
	   {
    readlist();
	autoclear();
	   }
}
});

function autoclear(){
	for(i=0;i<outid.length;i++)
	{
	var blist = document.querySelectorAll("a[href='https://home.gamer.com.tw/"+ outid[i].id +"']");
	if (blist.length != 0)
	{
		for (i=0;i<blist.length;i++)
		{
	blist[i].closest('div').remove();
		}
	}
	}
}

function isEmptyObject(obj) {
for (var key in obj) {
return false;
}
return true;
}