const noBtn = document.getElementById("no-btn");
const yesBtn= document.getElementById("yes-btn");
const letterImg= document.getElementById("letter-img");
const flowersBtn= document.getElementById("btn-flowers");
const letterContainer= document.querySelector(".container");
//chocolate section
const chocolateScreen = document.getElementById("chocolate-screen");
const chocolates= document.querySelectorAll(".chocolate");
const basket= document.getElementById("basket");
let draggedChocolate=null;
let chocolateCount = 0;

//music
const bgMusic = document.getElementById("bg-music");

//flowers
const flowers= document.getElementById("flower-screen");
const popup= document.getElementById("popup");
const popupBtn= document.getElementById("popup-btn");
const bouquet= document.querySelectorAll(".flower");

//hidden
const hiddenCards= document.querySelectorAll(".hidden-card");
const hiddenScreen = document.getElementById("hidden-screen");
let foundCount=0;

//final
const finalScreen = document.getElementById("final-msg");

const noImages=[
  "cat-praying.jpg",
  "cat-crying-1.jpg",
  "cat-crying-2.jpg",
  "sad-emoji.jpg",
  "crying-dude.jpg",
];

const yesImages=[
  "happy-1.jpg",
  "yes-1.jpg",
  "yes-2.jpg",
  "yes-3.jpg",
]

let currentIndex=-1;
let yesIndex=-1;

function playMusicFromTwoSeconds() {
  bgMusic.currentTime = 1.96; // start at 2s
  bgMusic.volume = 0.085;    // optional: comfy volume
  bgMusic.play();
}

noBtn.addEventListener("mouseover", () => {
  const min = 80;
  const max = 120;

  const distance = Math.random() * (max - min) + min;
  const angle = Math.random() * Math.PI * 2;

  const moveX = Math.cos(angle) * distance;
  const moveY = Math.sin(angle) * distance;

  noBtn.style.transition = "transform 0.25s ease-out";
  noBtn.style.transform = `translate(${moveX}px, ${moveY}px)`;

  //change image
  currentIndex= (currentIndex+1) % noImages.length;
  letterImg.style.backgroundImage = `url("${noImages[currentIndex]}")`;
});

yesBtn.addEventListener("mouseover", ()=> {
  yesIndex= (yesIndex+1)% yesImages.length;
  letterImg.style.backgroundImage = `url("${yesImages[yesIndex]}")`;
  
});

yesBtn.addEventListener("click", ()=>{
  letterContainer.style.display="none";
  chocolateScreen.style.display="flex";
 
});

chocolates.forEach(choco => {
  choco.addEventListener("dragstart", (e)=> {
    draggedChocolate= choco;
    e.dataTransfer.setData("text/plain","");
  });
});

//allow drop
basket.addEventListener("dragover", (e)=> {
  e.preventDefault();
  
});


//drop choco
basket.addEventListener("drop", (e)=> {
  e.preventDefault();
  if(draggedChocolate){
    draggedChocolate.remove();
    chocolateCount++;
    document.getElementById("basket-counter").textContent= chocolateCount;
    draggedChocolate=null;
   flowersBtn.style.display="flex";
  }
  
});

flowersBtn.addEventListener("click", ()=> {
  chocolateScreen.style.display="none";
  flowers.style.display="flex";
});

bouquet.forEach(bouq=> {
  bouq.addEventListener("click", ()=>{
  popup.style.display="flex";
   playMusicFromTwoSeconds();
  });
});

popupBtn.addEventListener("click", ()=> {
  popup.style.display="none";
  flowers.style.display="none";
  hiddenScreen.style.display="flex";
});

//hidden
hiddenCards.forEach(card=> {
  card.addEventListener("click", ()=>{
    if(card.classList.contains("revealed")) return;

    card.classList.add("revealed");
    foundCount++;

    if(foundCount == hiddenCards.length){
      setTimeout(()=>{
        document.getElementById("hidden-screen").style.display="none";
        document.getElementById("final-msg").style.display="flex";
      },1300);
    }
  });
});


