//INTRO ANIMATION
const introImages = [];
const fruits = document.querySelector(".fruits");
const introVar = document.querySelector("#intro");
const main = document.querySelector("main");
const loader = document.querySelector(".loader");
let width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
let height= Math.max(document.documentElement.clientHeight, window.innerHeight || 0)/2;

function fillIntroImages() {
    introImages.push({
        name: "domates",
        url: "./img/domates.png"
    });

    introImages.push({
        name: "biber",
        url: "./img/biber.png"
    });

    introImages.push({
        name: "brokoli",
        url: "./img/brokoli.png"
    });

    introImages.push({
        name: "portakal",
        url: "./img/portakal.png"
    });

    introImages.push({
        name: "mantar",
        url: "./img/mantar.png"
    });
}

function fillFruits() {
    let html = "";
    for (let i = 0; i <= 50; i++) {
        let food = getRandomFood();
        html += `
        <div class="fruit" style="left:${getRandomWidth()}px;top:${getRandomHeight()}px">
            <img src="${food.url}">
        </div>
        `
    }

    fruits.innerHTML = html;
}

function getRandomFood() {
    return introImages[Math.floor(Math.random() * (introImages.length))];
}

function getRandomWidth() {
    return Math.floor(Math.random() * (width))
}

function getRandomHeight() {
    return Math.floor(Math.random() * (height * 2))
}

function playIntro(){
    console.log( 'All images loaded!' );
    introVar.classList.add("animate");
    main.classList.add("loaded");
    loader.classList.add("done");
    fillFruits();
}

fillIntroImages();

//wait until images load
var imgs = document.images,
len = imgs.length,
counter = 0;

[].forEach.call( imgs, function( img ) {
    if(img.complete)
    {
        incrementCounter()
    }
    else{
        img.addEventListener( 'load', incrementCounter, false );
    }
} );

function incrementCounter() {
    counter++;
    console.log(counter)
    console.log(len)
    
    if ( counter === len ) {
        setTimeout(function() {
            playIntro();
        }, 1500);
    }
}

// MENU JS
const nav = document.querySelector(".fixed-canvas nav");

const mainLink = document.querySelector(".fixed-canvas .main");
const mainLogo = document.querySelector(".fixed-canvas .logo");

const whoLink = document.querySelector(".fixed-canvas .who");
const whoImage = document.querySelector(".fixed-canvas .logo-apple");

const recipeLink = document.querySelector(".fixed-canvas .recipe");
const recipeImage = document.querySelector(".fixed-canvas .logo-recipe");

const articlesLink = document.querySelector(".fixed-canvas .articles");
const articlesImage = document.querySelector(".fixed-canvas .logo-articles");

const consultLink = document.querySelector(".fixed-canvas .consult");
const consultImage = document.querySelector(".fixed-canvas .logo-consult");

const contactLink = document.querySelector(".fixed-canvas .contact");
const contactImage = document.querySelector(".fixed-canvas .logo-contact");

function switchIn(element) {
    element.classList.add("switchIn");
    element.classList.remove("switchOut");
    switchOutAll(element);
}

function switchOut(element) {
    element.classList.add("switchOut")
    element.classList.remove("switchIn");
}

function switchOutAll(element) {
    if (element != whoImage) {
        switchOut(whoImage);
    }
    if (element != recipeImage) {
        switchOut(recipeImage);
    }
    if (element != mainLogo) {
        switchOut(mainLogo);
    }
    if (element != articlesImage) {
        switchOut(articlesImage);
    }
    if (element != consultImage) {
        switchOut(consultImage);
    }
    if (element != contactImage) {
        switchOut(contactImage);
    }
}

mainLink.addEventListener("mouseover", e => switchIn(mainLogo));
whoLink.addEventListener("mouseover", e => switchIn(whoImage));
recipeLink.addEventListener("mouseover", e => switchIn(recipeImage));
articlesLink.addEventListener("mouseover", e => switchIn(articlesImage));
consultLink.addEventListener("mouseover", e => switchIn(consultImage));
contactLink.addEventListener("mouseover", e => switchIn(contactImage));

nav.addEventListener("mouseleave", e => switchIn(mainLogo));



//CURTAIN SECTION JS
const panels = document.querySelectorAll(".panel");

panels.forEach(panel => {
    panel.addEventListener('click', handle);
});

function handle() {
    panels.forEach(panel=>{
        if(panel!=this)
        {
            panel.classList.remove("active");
        }
    })

    this.classList.toggle("active");
}



//float images when they move into view
let lastScrollTop = 0;
function isScrolledIntoView(elem) {
    let docViewTop = window.scrollY;
    let docViewBottom = docViewTop + window.innerHeight;

    let elemBottom = elem.offsetTop + elem.offsetHeight;

    return (elem.offsetTop <= docViewBottom && elemBottom>docViewTop);
    
}

function getTransformAmount(elem,totalAmount)
{
    let windowMiddlePoint=window.scrollY+window.innerHeight/2;
    let elementMiddlePoint=elem.offsetTop+(elem.offsetHeight) /2;
    let visiblePercentage=((windowMiddlePoint-elementMiddlePoint)*50)/elem.offsetHeight;
    let currentAmount = visiblePercentage*totalAmount/100;

    console.log("windowMiddlePoint:"+windowMiddlePoint)
    console.log("elementMiddlePoint:"+elementMiddlePoint)
    console.log("diffrence:"+(windowMiddlePoint-elementMiddlePoint))
    console.log("percentage:%"+((windowMiddlePoint-elementMiddlePoint)*50)/elem.offsetHeight)   
    console.log("currentAmount:"+currentAmount );  
    
    return currentAmount;
}

let animateItems = document.querySelectorAll(".animate-scroll");
let animateAmount=50;
animateItems.forEach(item=>{
        item.style.transform=`translate3d(0,${animateAmount}px,0) rotate(${animateAmount}deg)`;
    }
);

window.addEventListener("scroll", e =>{
    animateItems.forEach(item=>{
        if(isScrolledIntoView(item)){
            const amount=getTransformAmount(item,animateAmount);
            item.style.transform=`translate3d(${amount/2}px,${amount}px,0) rotate(${amount}deg)`;
        }
    })
},false);


//google maps
function initMap() {
    let buse = {lat: 40.983873,  lng: 29.024979};
    let map = new google.maps.Map(document.querySelector('.map'), {
      zoom: 16,
      center: buse,
      styles:[{elementType:"geometry",stylers:[{color:"#ebe3cd"}]},{elementType:"labels.text.fill",stylers:[{color:"#523735"}]},{elementType:"labels.text.stroke",stylers:[{color:"#f5f1e6"}]},{featureType:"administrative",elementType:"geometry.stroke",stylers:[{color:"#c9b2a6"}]},{featureType:"administrative.land_parcel",elementType:"geometry.stroke",stylers:[{color:"#dcd2be"}]},{featureType:"administrative.land_parcel",elementType:"labels.text.fill",stylers:[{color:"#ae9e90"}]},{featureType:"landscape.natural",elementType:"geometry",stylers:[{color:"#dfd2ae"}]},{featureType:"poi",elementType:"geometry",stylers:[{color:"#dfd2ae"}]},{featureType:"poi",elementType:"labels.text.fill",stylers:[{color:"#93817c"}]},{featureType:"poi.park",elementType:"geometry.fill",stylers:[{color:"#a5b076"}]},{featureType:"poi.park",elementType:"labels.text.fill",stylers:[{color:"#447530"}]},{featureType:"road",elementType:"geometry",stylers:[{color:"#f5f1e6"}]},{featureType:"road.arterial",elementType:"geometry",stylers:[{color:"#fdfcf8"}]},{featureType:"road.highway",elementType:"geometry",stylers:[{color:"#f8c967"}]},{featureType:"road.highway",elementType:"geometry.stroke",stylers:[{color:"#e9bc62"}]},{featureType:"road.highway.controlled_access",elementType:"geometry",stylers:[{color:"#e98d58"}]},{featureType:"road.highway.controlled_access",elementType:"geometry.stroke",stylers:[{color:"#db8555"}]},{featureType:"road.local",elementType:"labels.text.fill",stylers:[{color:"#806b63"}]},{featureType:"transit.line",elementType:"geometry",stylers:[{color:"#dfd2ae"}]},{featureType:"transit.line",elementType:"labels.text.fill",stylers:[{color:"#8f7d77"}]},{featureType:"transit.line",elementType:"labels.text.stroke",stylers:[{color:"#ebe3cd"}]},{featureType:"transit.station",elementType:"geometry",stylers:[{color:"#dfd2ae"}]},{featureType:"water",elementType:"geometry.fill",stylers:[{color:"#b9d3c2"}]},{featureType:"water",elementType:"labels.text.fill",stylers:[{color:"#92998d"}]}],
      mapTypeControl: false
    });
    let marker = new google.maps.Marker({
      position: buse,
      map: map,
    });
}