const messagesDiv=document.querySelector(".messages");
const startBTN=document.querySelector(".start");
const mainDiv=document.querySelector("main");
const intro=document.querySelector(".intro");
const nameTXT=document.querySelector("#name");
const pointsDiv=document.querySelector(".points");
let points=0;


const sendSelamButton=document.querySelector(".send-selam-button");
const takeSelamButton=document.querySelector(".take-selam-button");

const users=[];
let usersWhoCanAnswer=[];
let userName="Bilinmeyen";

let interval=null;
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
        userName=nameTXT.value;
    }
    fillUsers();
    sendMessage("Sa");
    interval=setInterval(produceMessage,1000);
}

function fillUsers(){
    const people=["Berk","Can","Fehmi","Gökhan","Gürkan","Hakan Baydemir","Kemal","Kutlay","Rıdvan","Onur","Devran","Kerem"];

    for(var i=0;i<people.length;i++)
    {
        if(people[i]!=userName)
        {
            users.push({
                name:people[i],
                color:"color-"+(i+1)
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
    console.log(nextIndex)
    console.log(usersWhoCanAnswer)
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
    console.log(message)
    console.log(user);
    
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
            <span class="message-owner">${userName}</span>
            <div class="message">Sa</div>
        </div>
    </div>`;

    messagesDiv.innerHTML=message+messagesDiv.innerHTML;
}

function takeHi(){
    if(alreadyTookSelam)
    {
        removePoints()
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
            <span class="message-owner">${userName}</span>
            <div class="message">As</div>
        </div>
    </div>`;

    messagesDiv.innerHTML=message+messagesDiv.innerHTML;
}

function addPoints(){
    points+=100;
    pointsDiv.classList.remove("mistake");
    pointsDiv.innerHTML=points;
}

function removePoints(){
    points-=1000;
    pointsDiv.classList.add("mistake");
    pointsDiv.innerHTML=points;
}


sendSelamButton.addEventListener("click",sayHi);
takeSelamButton.addEventListener("click",takeHi);
startBTN.addEventListener("click",startGame);
window.scrollTo(0,document.body.scrollHeight);