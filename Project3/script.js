var count=0;//number of moves
var N=0;
var BoardArr=[];
var Board;
var holder=0;
var img="";

function ShowImage(number){

  document.getElementById("imgsel").innerHTML="Your select: <img src=\"img"+number+".jpeg\" alt=\"chosen image\"/>";
  img="img"+number+".jpeg";

}

function NewGame()
{
  var element=document.getElementById("game");
  element.style.display="block";
  element=document.getElementById("select");
  element.style.display="block";
  var vic=document.getElementById("victory");
  vic.style.display="none";
  if (img==""){
    return;
  }
  count=0;
  var row=0;
  var col=0;
  N=document.getElementById("difficult").value;
  if (N==4){
    holder=80;
  }else if (N==5){
    holder=70;
  }else if (N==6){
    holder=60;
  }else if (N==8){
    holder=40;
  }
  BoardArr=[];
  Board=new Array(N);//rows
  for (var i=0;i<N;i++)
  {
    Board[i]=new Array(N);//columns
  }
  for (var i=0;i<N*N;i++){
    BoardArr.push(i);
  }
  shuffle(BoardArr);
  for (var i=0;i<N*N;i++){
    Board[row][col]=BoardArr[i];
    col++;
    if ((i+1)%N===0)
    {
      row++;
      col=0;
    }
  }
  var counter=1;
  row=0;col=0;
  // for (var i=0;i<N*N;i++){
  //   Board[row][col]=counter;
  //   col++;
  //   counter++;
  //   if ((i+1)%N===0)
  //   {
  //     row++;
  //     col=0;
  //   }
  // }
  // Board[N-1][N-1]=0;
  // loadTable();
  while (!isSolvable()){
    shuffle(BoardArr);
    row=0;
    col=0;
    for (var i=0;i<N*N;i++){
      Board[row][col]=BoardArr[i];
      col++;
      if ((i+1)%N===0)
      {
        row++;
        col=0;
      }
    }
  }
  loadTable();
}

function loadTable()
{
  output="";
  for (var i=0;i<N;i++)
  {
    output+="<tr>";
    for(var j=0;j<N;j++)
    {
      if (Board[i][j]==0)
      {
        output+="<td id=\"blank\"></td>";
      }
      else {
        output+="<td id=\"tile"+i+"_"+j+"\" onmouseover=\"check("+i+","+j+")\" onmouseout=\"mouseout("+i+","+j+")\" onclick=\"Move("+i+","+j+")\">";
        output+="<img style=\"width:"+(holder)+"px;height:"+(holder)+"px;object-fit:none;object-position:"+(parseFloat((400/N)*((Board[i][j]-1)%N))/400*100)+"% "+(parseFloat((400/N)*Math.floor((Board[i][j]-1)/N))/400*100)+"%;\" src=\""+img+"\"/>";
        output+="</td>";


      }
    }
    output+="</tr>";
  }
  table.innerHTML=output;
}

// If N is odd, then puzzle instance is solvable if number of inversions is even in the input state.
// If N is even, puzzle instance is solvable if
// the blank is on an even row counting from the bottom (second-last, fourth-last, etc.) and number of inversions is odd.
// the blank is on an odd row counting from the bottom (last, third-last, fifth-last, etc.) and number of inversions is even.
// For all other cases, the puzzle instance is not solvable
function isSolvable()
{

  var invcount=0;
  for (var i=0;i<N*N-1;i++)
  {
    for(var j=i+1;j<N*N;j++)
    {
      if(BoardArr[i]!=0 && BoardArr[j]!=0 && BoardArr[i]>BoardArr[j])
        invcount++;
    }
  }
  var position=0;
  for(var i=N-1;i>=0;i--)
    for(var j=N-1;j>=0;j--)
      if(Board[i][j]==0)
        {
          position=N-i;
          break;
        }
  if (N%2!=0)
    return (invcount%2===0);
  else {
    if (position%2!=0)
      return (invcount%2===0);
    else {
      return (invcount%2!=0);
    }
  }
}

function shuffle(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

function Move(i,j){
  if (checkIfMove(i, j, "up") ||
      checkIfMove(i, j, "down") ||
      checkIfMove(i, j, "left") ||
      checkIfMove(i, j, "right") )
  {

  }
  if (winCheck()){
    var vic=document.getElementById("victory");
    vic.style.display="block";
    vic.innerHTML="<img src=\"gif.gif\"/>";
    var element=document.getElementById("game");
    element.style.display="none";
    element=document.getElementById("select");
    element.style.display="none";
  }
}

function winCheck(){
  var  count=1;
  row=0;col=0;
  for (var i=0;i<N*N;i++){
    if (Board[row][col]!=count){
      if (!(count===N*N && Board[row][col]===0)){
        return false;
      }
    }
    col++;
    count++;
    if ((i+1)%N===0)
    {
      row++;
      col=0;
    }
  }
  return true;
}

function checkIfMove(row, column, direction)
{
  rowOffset = 0;
  columnOffset = 0;
  if (direction == "up")
  {
    rowOffset = -1;
  }
  else if (direction == "down")
  {
    rowOffset = 1;
  }
  else if (direction == "left")
  {
    columnOffset = -1;
  }
  else if (direction == "right")
  {

    columnOffset = 1;
  }
  if (row + rowOffset >= 0 && column + columnOffset >= 0 &&
    row + rowOffset < N && column + columnOffset < N
  )
  {
    if ( Board[row + rowOffset][column + columnOffset] == 0)
    {

      var tile=document.getElementById("tile"+row+"_"+column);
      tile.style.position="absolute";
      var posX=row*holder;
      var posY=column*holder;
      tile.style.top=posX+"px";
      tile.style.left=posY+"px";
      Swap(row,column,rowOffset,columnOffset);
      var  timer2=setInterval(function(){
        if (posX==row*holder+holder||posY==column*holder+holder||posX==row*holder-holder||posY==column*holder-holder){
          clearInterval(timer2);

          tile.style.position="static";
          tile.style.top=null;
          tile.style.left=null;
          loadTable();
          count++;
          document.getElementById("moves").innerHTML="Number of Moves: "+count;
          return true;
        }
        else {
          if (direction=="up"){
            posX--;
            tile.style.top=posX+"px";
            tile.style.left=posY+"px";
            // blank.style.top=
          }
          else
          if(direction=="down")
          {
            posX++;
            tile.style.top=posX+"px";
            tile.style.left=posY+"px";
          }
          else
          if(direction=="left")
          {
            posY--;
            tile.style.left=posY+"px";
            tile.style.top=posX+"px";
          }
          else
          if(direction=="right")
          {
            posY++;
            tile.style.left=posY+"px";
            tile.style.top=posX+"px";
          }
        }
      },2);
    }
  }
  return false;
}
function check(i,j){
  Movable(i,j,"up");
  Movable(i,j,"down");
  Movable(i,j,"left");
  Movable(i,j,"right");
}
function Movable(row,column,direction){
  rowOffset = 0;
  columnOffset = 0;
  if (direction == "up")
  {
    rowOffset = -1;
  }
  else if (direction == "down")
  {
    rowOffset = 1;
  }
  else if (direction == "left")
  {
    columnOffset = -1;
  }
  else if (direction == "right")
  {

    columnOffset = 1;
  }
  if (row + rowOffset >= 0 && column + columnOffset >= 0 &&
    row + rowOffset < N && column + columnOffset < N
  )
  {
    if ( Board[row + rowOffset][column + columnOffset] == 0)
    {

      var ele=document.getElementById("tile"+row+"_"+column);
      ele.style.border="2px solid red";
    }
  }
}
function mouseout(row,column){
  var ele=document.getElementById("tile"+row+"_"+column);
  ele.style.border="";
}
function Swap(i,j,x,y)
{
  Board[i + x][j + y] = Board[i][j];
  Board[i][j] = 0;
}

// function movement()
// {
//   var box=document.getElementById("box");
//   var pos=0;
//   var  timer=setInterval(function(){
//     if (pos==100){
//       clearInterval(timer);
//     }
//     else {
//       pos++;
//       box.style.left=pos+"px";
//     }
//   },10)
// }
