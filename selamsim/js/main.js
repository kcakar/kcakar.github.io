const messagesDiv=document.querySelector(".messages");
const users=[];
let usersWhoCanAnswer=[];

let interval=null;
let maxResponseTime=2;//seconds
let lastMessageSa=true;
let lastMessage=null;

function startGame()
{
    fillUsers();
    sendMessage("Sa");
    interval=setInterval(produceMessage,1000);
}

function fillUsers(){
    const people=["Berk","Can","Fehmi","Gökhan","Gürkan","Hakan Baydemir","Kemal","Kutlay","Rıdvan","Onur","Devran","Kerem"];

    for(var i=0;i<people.length;i++)
    {
        users.push({
            name:people[i],
            color:"color-"+(i+1)
        });
    }

    usersWhoCanAnswer=users.concat();
}

function produceMessage(){
    let randomResponseTime= (Math.floor(Math.random()*maxResponseTime)+1)*1000;

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

}

function takeHi(){
    
}

startGame();