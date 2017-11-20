const messagesDiv=document.querySelector(".messages");
const startBTN=document.querySelector(".start");
const restartBTN=document.querySelector(".restart");
const mainDiv=document.querySelector("main");
const intro=document.querySelector(".intro");
const nameTXT=document.querySelector("#name");
const pointsP=document.querySelector(".points p");
const pointsDiv=document.querySelector(".points");
const timeSpan=document.querySelector(".points .time");
const leaderboard=document.querySelector(".leaderboard ol");

const cheatCode="keremcan";

const endgame=document.querySelector(".endgame");


const sendSelamButton=document.querySelector(".send-selam-button");
const takeSelamButton=document.querySelector(".take-selam-button");

const users=[];
let usersWhoCanAnswer=[];
let player={
    name:"Bilinmeyen",
    color:"theUser",
    points:0
}

let time=30;
let interval=null;
let gameTimeInterval=null;
let maxResponseTime=20;//2seconds
let lastMessageSa=true;
let lastMessage=null;
let alreadyTookSelam=false;

function startGame()
{
    mainDiv.style.display="initial";
    intro.style.display="none";

    if(nameTXT.value!="")
    {
        player.name=nameTXT.value;
    }

    if(player.name.indexOf("emre")>-1 ||player.name.indexOf("Emre")>-1){
        player.points=100000;
    pointsP.innerHTML=`Skor:${player.points}`;
    
    }
    fillUsers();
    window.scrollTo(0,document.body.scrollHeight);
    sendMessage("Sa");
    interval=setInterval(produceMessage,1000);
    gameTimeInterval=setInterval(gameTimer,1000);
}

function gameTimer(){
    time--;
    if(time<10)
    {
        timeSpan.innerHTML=`00:0${time}`;
    }
    else{
        timeSpan.innerHTML=`00:${time}`;
    }
    if(time==0){
        finishGame();
    }
}

function finishGame(){
    clearInterval(gameTimeInterval);
    clearInterval(interval);
    fillLeaderBoard()
}

function fillLeaderBoard(){
    users.push(player);//kendini ekle
    const orderedUsers=users.sort((a,b)=>{return a.points - b.points}).reverse();//sırala

    const orderedHtml=orderedUsers.map(user=>{
        if(user.color=="theUser"){
            return `<li style="background-color:#86ff87;">${user.name} | <span style="font-weight:bold">${user.points} puan</span></li>`;
        }
        else{
            return `<li>${user.name} | <span style="font-weight:bold">${user.points} puan</span></li>`;
        }
    }).join("");
    leaderboard.innerHTML=orderedHtml;
    showEndgame();
}

function showEndgame(){
    mainDiv.style.display="none";
    endgame.classList.add("finished");
}

function restartGame(){
    player.points=0;
    time=30;
    pointsP.innerHTML=`Skor:${player.points}`;
    endgame.classList.remove("finished");
    startGame();
}

function fillUsers(){
    const people=["Berk","Can","Fehmi","Gökhan","Gürkan","Hakan Mage","Hakan Polis","Kemal","Kutlay","Rıdvan","Onur","Devran","Kerem"];

    for(var i=0;i<people.length;i++)
    {
        if(people[i]!=player.name)
        {
            users.push({
                name:people[i],
                color:"color-"+(i+1),
                points:0
            });
        }
    }

    usersWhoCanAnswer=users.concat();
}

function produceMessage(){
    let randomResponseTime= (Math.floor(Math.random()*maxResponseTime)+1)*100;

    if(usersWhoCanAnswer.length==0)
    {
        lastMessageSa=true;
        usersWhoCanAnswer=users.concat();
        sendMessage("Sa");
    }
    else if(lastMessageSa)
    {
        lastMessageSa=false;
        sendMessage("As");
    }
    else{
        //%60 as deme şansı
        if((Math.floor(Math.random()*100)+1)<60)
        {
            sendMessage("As");
        }
        else{
            lastMessageSa=true;
            alreadyTookSelam=false;
            usersWhoCanAnswer=users.concat();
            sendMessage("Sa");
        }
    }

    clearInterval(interval)
    interval=setInterval(produceMessage,randomResponseTime);
}

function getRandomUser(){
    const nextIndex=(Math.floor(Math.random()*(usersWhoCanAnswer.length-1))+1);
    return usersWhoCanAnswer.splice(nextIndex,1)[0];
}

function sendMessage(messageContent){
    let user = getRandomUser();
    let message=
    `<div class="message-row">
        <div class="message-container received">
            <span class="tail-container"></span>
            <span class="message-owner ${user.color}">${user.name}</span>
            <div class="message">${messageContent}</div>
        </div>
    </div>`;

    messagesDiv.innerHTML=message+messagesDiv.innerHTML;
    user.points+=100;
    
    lastMessage={user:null,content:messageContent}
}

function sayHi(){
    if(lastMessageSa)
    {
        removePoints();
    }
    alreadyTookSelam=true;
    lastMessageSa=true;
    sendSelamButton.style.webkitAnimationName = "";
    setTimeout(function ()
    {
        sendSelamButton.style.webkitAnimationName = "click";
    }, 0);

    let message=
    `<div class="message-row">
        <div class="message-container sent">
            <span class="tail-container"></span>
            <span class="message-owner">${player.name}</span>
            <div class="message">Sa</div>
        </div>
    </div>`;
    messagesDiv.innerHTML=message+messagesDiv.innerHTML;
    window.scrollTo(0,document.body.scrollHeight);
}

function takeHi(){
    if(alreadyTookSelam)
    {
        removePoints();
    }
    else{
        addPoints();
    }
    alreadyTookSelam=true;
    takeSelamButton.style.webkitAnimationName = "";
    setTimeout(function ()
    {
        takeSelamButton.style.webkitAnimationName = "click";
    }, 0);

    let message=
    `<div class="message-row">
        <div class="message-container sent">
            <span class="tail-container"></span>
            <span class="message-owner">${player.name}</span>
            <div class="message">As</div>
        </div>
    </div>`;
    
    messagesDiv.innerHTML=message+messagesDiv.innerHTML;
    window.scrollTo(0,document.body.scrollHeight);
}

function addPoints(){
    player.points+=100;
    pointsDiv.classList.remove("mistake");
    pointsP.innerHTML=`Skor:${player.points}`;
}

function removePoints(){
    player.points-=1000;
    pointsDiv.classList.add("mistake");
    pointsP.innerHTML=`Skor:${player.points}`;
}


let enteredCheat="";
function checkCheat(event){
    if (event.keyCode >= 65 && event.keyCode <= 90){
        enteredCheat+=event.key;
        console.log(encodeURIComponent)
        if(enteredCheat.length>8){
            enteredCheat=enteredCheat.slice(1)
        }
    }

    if(enteredCheat=="keremcan")
    {
        intro.style.display="none";
        mainDiv.style.display="none";
        endgame.classList.add("finished");
        endgame.innerHTML=`<div style="width:100vw;height=100vh;position:fixed;"><img style="width: 100vw;height: auto;" src="./img/leg.jpg"/></div>`
    }
    console.log(enteredCheat)
}

sendSelamButton.addEventListener("click",sayHi);
takeSelamButton.addEventListener("click",takeHi);
startBTN.addEventListener("click",startGame);
restartBTN.addEventListener("click",restartGame);
window.addEventListener("keyup",checkCheat);
window.scrollTo(0,document.body.scrollHeight);