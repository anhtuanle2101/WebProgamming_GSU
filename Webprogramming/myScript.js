const wage=15;
const maxhour=40;
var hourArray=[];
var count=0;

function PopupBox()
{
  alert("Welcome! enter integers for worked hours, negative to stop");
  var hour=prompt("Please enter number of hours worked for employee 1 in the week");
  var number=parseInt(hour);
  document.getElementById("test").innerHTML=number;
  while (hour===null||hour===""){
    alert("You canceled the prompt. Try again!");
    var hour=prompt("Please enter number of hours worked for employee 1 in the week");
    var number=parseInt(hour);
  }
  while (number<0)
  {
    alert("You have not given valid worked hours for any employee, try again!");
    hour=prompt("Please enter number of hours worked for employee 1 in the week");
    number=parseInt(hour);
  }
  count=1;
  do {
    hourArray.push(number);
    count+=1;
    hour=prompt("Please enter number of hours worked for employee "+count+" in the week");
    number=parseInt(hour);
  } while (number>=0);
  // document.getElementById("test").
  document.getElementById("test").innerHTML="Click print to print the report";
  var element2=document.getElementById("start");
  element2.parentNode.removeChild(element2);
  element2=document.createElement("BUTTON");
  element2.setAttribute("onclick","PrtReport()");
  element2.setAttribute("id","print");
  element2.innerHTML="Print";
  document.body.appendChild(element2);
}

function PrtReport()
{
  if(count==0)
  {
    document.getElementById("test").innerHTML="You have not entered any inputs! Click start button to start!";
  }
  var i=0;
  var sum=0;
  var payment=0;
  var x=document.createElement("TABLE");
  x.setAttribute("id","table");
  document.body.appendChild(x);
  var y=document.createElement("TR");
  y.setAttribute("id","tr");
  document.getElementById("table").appendChild(y);
  var z1=document.createElement("TD");
  var z2=document.createElement("TD");
  var z3=document.createElement("TD");
  var text=document.createTextNode("Index");
  z1.appendChild(text);
  document.getElementById("tr").appendChild(z1);
  text=document.createTextNode("Number of hours worked");
  z2.appendChild(text);
  document.getElementById("tr").appendChild(z2);
  text=document.createTextNode("Employee's pay for the week");
  z3.appendChild(text);
  document.getElementById("tr").appendChild(z3);
  for (i=0;i<count-1;i++)
  {
    if (hourArray[i]>maxhour)
    {
      payment=40*15+(hourArray[i]-maxhour)*22.5;//1.5 times for excessed hours
    }
    else{
      payment=hourArray[i]*15;
    }
    sum+=payment;
    y=document.createElement("TR");
    y.setAttribute("id","tr"+i.toString());
    document.getElementById("table").appendChild(y);
    z1=document.createElement("TD");
    z2=document.createElement("TD");
    z3=document.createElement("TD");
    text=document.createTextNode(i.toString());
    z1.appendChild(text);
    document.getElementById("tr"+i.toString()).appendChild(z1);
    text=document.createTextNode(hourArray[i]);
    z2.appendChild(text);
    document.getElementById("tr"+i.toString()).appendChild(z2);
    text=document.createTextNode(payment.toFixed(2).toString());
    z3.appendChild(text);
    document.getElementById("tr"+i.toString()).appendChild(z3);
  }
  var element=document.getElementById("print");
  element.parentNode.removeChild(element);
  document.getElementById("test").innerHTML="Total employee payment is "+sum.toString()+" <br/>";

}
