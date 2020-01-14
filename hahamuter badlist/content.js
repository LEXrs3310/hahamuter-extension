var someone = "";
var readid = "";
var outid = "";
createE();
//清理跟測試ARRAY
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
var inputT = document.createElement("textarea");
inputT.id = "blistin";
inputT.cols="10";
inputT.rows="1";
var btn = document.createElement("button");
var btn2 = document.createElement("button");
btn.id = "c1";
btn2.id = "c2";
var inject = document.getElementById("im_inputbox");
var text1 = document.createTextNode("新增黑名單");
var text2 = document.createTextNode("清除黑名單");
inject.appendChild(btn);
inject.appendChild(inputT);
inject.appendChild(btn2);
btn2.appendChild(text2);
btn.appendChild(text1);
}
$("#c2").click(function(){
chrome.storage.local.clear();
});
//讀取現有清單加入新名單
$("#c1").click(function(){
	chrome.storage.local.get(['list'], function(result) {
		if($('#blistin').val() != ""){
		  someone = [{'id': $('#blistin').val()}];
		}
		else{
		  alert('框框內給我填帳號(非ID)哦');
		  return;
		}
		  if(result.list != undefined)
		  {
		  readid = result.list;
		  outid = readid.concat(someone);
		  console.log(outid);
		  chrome.storage.local.set({'list': outid}, function() {
        });
		  }
		  else
		  {
			  outid = someone;
			  console.log(outid);
			  chrome.storage.local.set({'list': outid}, function() {
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