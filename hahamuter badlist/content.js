var someone = "";
var readid = "";
var outid = "";
createE();
const url = chrome.runtime.getURL('background.html');
//讀取資料確認資料內容
chrome.storage.local.get(['list'], function(result) {
	   outid = result.list;
	   console.log(outid);
	   if (outid == undefined)
	   {
		  outid = [{'id': 'ddddddddd'}];
	   }
        });
//創建元素區
function createE(){
var inputT = document.createElement("input");
inputT.id = "blistin";
inputT.cols="16";
inputT.type = "text";
var btn = document.createElement("button");
btn.id = "c1";
var inject = document.getElementById("im_inputbox");
var text1 = document.createTextNode("新增黑名單");
inject.appendChild(btn);
inject.appendChild(inputT);
btn.appendChild(text1);

$("#c1").attr("style","width:100px;height:30px;border:2px blue;background-color:paleturquoise;")
}
//讀取現有清單加入新名單
$("#c1").click(function(){
	var re = /[^A-Z|0-9]/gi
	chrome.storage.local.get(['list'], function(result) {
		if($('#blistin').val() != "" && $('#blistin').val().match(re) == null){
		  someone = [{'id': $('#blistin').val()}];
		}
		else{
		  alert('框框內給我填英數帳號(非ID)哦');
		  return;
		}
		  if(result.list != undefined)
		  {
		  readid = result.list;
		  outid = readid.concat(someone);
		  console.log(outid);
		  chrome.storage.local.set({'list': outid}, function() {
			  $('#blistin').val("");
        });
		  }
		  else
		  {
			  outid = someone;
			  console.log(outid);
			  chrome.storage.local.set({'list': outid}, function() {
				  $('#blistin').val("");
        });
		  }
        });
});

/* 舊 讀取TXT方案 (無法寫入 放棄)
const url = chrome.runtime.getURL('BLACK.json');

$.ajax({
  dataType: "json",
  url: url,
  success: function(data){
  someone = data;
  }
});
*/


document.addEventListener('DOMNodeInserted', function(e)
{
	for(i=0;i<outid.length;i++)
	{
	var blist = document.querySelectorAll("a[href='https://home.gamer.com.tw/"+ outid[i].id +"']");
	if (blist.length != 0)
	{
		for (i=0;i<blist.length;i++)
		{
	blist[i].closest('div').innerHTML="";
		}
	}
	}
});