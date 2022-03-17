var pics=0;
var diff=0;
var timeframe=0;
var picsArray=[];
var memory=[];
var memory_id=[];
var openedcount=0;

// function chooseLevel()
// {
//   var x=document.getElementById("id1");
//   x.style.display="block";
//   var element=document.createElement("BUTTON");
//   element.innerHTML="Play";
//   element.setAttribute("onclick","Game()");
//   document.body.appendChild(element);
// }

function Game()
{
  var ele=document.getElementById("start");
  //alert("ok");
  ele.innerHTML="Restart";
  ele.setAttribute("onclick","window.location.assign('PartB.html')");
  document.getElementById("id1").style.display="none";
  document.getElementById("test").style.display="none";
  pics=parseInt(document.getElementById("options").value);
  diff=parseInt(document.getElementById("options2").value);
  if (pics===8) timeframe=120;
  else if(pics===10) timeframe=150;
  else if(pics===12) timeframe=180;
  for (i=0;i<pics;i++)
  {
    picsArray.push("B"+i.toString()+".jpeg");
  }
  picsArray=picsArray.concat(picsArray);
  shuffle(picsArray);
  //document.getElementById("text").innerHTML=(pics/2).toString();
  var output="";
  count=1;
  output+="<table>";
  for(var i=0;i<picsArray.length;i++)
  {
    if (i==count*pics-pics/2){
      output+="<tr>";

    }
    output+="<td>";
    output+= '<div id="b'+i.toString()+'" onclick="check(this,\''+picsArray[i]+'\')">';
    output+= '<img src="'+picsArray[i]+'"></img>'
    output+='</div>';
    output+="</td>";
    if (i==count*pics-1){
      output+="</tr>";
      count++;
    }
  }
  output+="</table>";
  document.getElementById("table").innerHTML=output;
  document.getElementById("text3").innerHTML="You have "+diff+" seconds to look at the images";
  var myVar=setTimeout(Game2,diff*1000);
  // var img=null;
  // var x=document.createElement("TABLE");
  // x.setAttribute("id","table");
  // document.body.appendChild(x);
  // var count=0;
  //
  // for (i=0;i<4;i++)
  // {
  //   var y=document.createElement("TR");
  //   y.setAttribute("id","tr"+i.toString());
  //   document.getElementById("table").appendChild(y);
  //   for(j=0;j<pics/2;j++)
  //   {
  //     img=new Image();
  //     img.src=picsArray[count];
  //     document.body.appendChild(img);
  //     z=document.createElement("TD");
  //     var div=document.createElement("div");
  //     div.setAttribute("id","b"+count.toString())
  //     // z.setAttribute("id","b"+count.toString());
  //     div.appendChild(img);
  //     z.appendChild(div);
  //     document.getElementById("tr"+i.toString()).appendChild(z);
  //     // z.onclick=check(z.getAttribute("id"),picsArray[count]);
  //     count+=1;
  //   }
  //}


}

function Game2(){
  for(var i=0;i<picsArray.length;i++)
  {
    var ele=document.getElementById("b"+i.toString());
    ele.style.opacity="0";
  }

  var timer=setInterval(function(){
    document.getElementById("text3").innerHTML=timeframe+" seconds left";
    timeframe-=1;
    if(timeframe<=0){
      clearInterval(timer);
      document.getElementById("text3").innerHTML="You are out of time";
      alert("You lost, replay");
      //document.getElementById("id1").style.display="none";

      window.location.assign("PartB.html");
    }
  },1000);
}

function check(a,b)
{
    if(memory.length<2){
      var ele=document.getElementById(a.id);
      ele.style.opacity="1";
      if(memory.length==0){
        memory.push(b);
        memory_id.push(a.id);
      }
      else if(memory.length===1){
        memory.push(b);
        memory_id.push(a.id);
        if(memory[0]===memory[1]){
          openedcount+=2;
          //document.getElementById("text2").innerHTML=openedcount;
          document.getElementById(memory_id[0]).setAttribute("onclick","false");
          document.getElementById(memory_id[1]).setAttribute("onclick","false")
          memory=[];
          memory_id=[];
          if (openedcount===picsArray.length){
            alert("You won");
            window.location.assign("PartB.html");
            clearInterval(timer);
          }
        }
        else{
          setTimeout(function(){
            if(document.getElementById(memory_id[0]).getAttribute("onclick")!="false") document.getElementById(memory_id[0]).style.opacity="0";
            if(document.getElementById(memory_id[1]).getAttribute("onclick")!="false") document.getElementById(memory_id[1]).style.opacity="0";
            memory=[];
            memory_id=[];
          },700);
        }
      }
    }


    //alert(memory_id+" "+memory.length);
}

function shuffle(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}
