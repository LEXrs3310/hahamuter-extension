var arr = "";
var ttt = "";
chrome.storage.local.get(['list'], function(result) {
	if (result.list == undefined)
	{
		return;
	}
	else
	{
	   arr = result.list;
	   console.log(arr);
	   for(i=0;i<arr.length;i++)
	   {
       var a = document.getElementById("tt");
       var t = document.createElement("option");
       t.text = arr[i].id + '  ID:' + arr[i].name;
       a.add(t);
	   }
	}
       });
document.getElementById('save').addEventListener('click',function(){
remove();
});
function remove()
{
	var y = document.getElementById('tt');
	if (y == undefined)
	{
		return;
	}
	arr.splice(y.selectedIndex,1);
	chrome.storage.local.set({'list': arr}, function() {
	location.reload();
    });
}
/*
if(arr.length != 0)
{
for(i=0;i<arr.length;i++)
{
ttt = arr[i].id;
var para = document.createElement("P");
text = document.createTextNode(ttt);
document.body.appendChild(para);
para.appendChild(text);

var text = "text" + i.toString;
text = document.createTextNode("移除");
var btn = "btn" + i.toString;
btn = document.createElement("button");
btn.id = i.toString();
document.body.appendChild(btn);
btn.appendChild(text);
}
}
document.addEventListener("click", function(e)
{
if(e.target.id != undefined)
{
arr.splice(e.target.id,1);
location.reload();
}
});
*/