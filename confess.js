
var button = null;
const openBtn = document.querySelector(".heart");
const innerContent = document.querySelector(".inner-container");

const mainContent = `
  <h1 class="question-text">
    Do you love me?
    <span class="line"></span>
  </h1>
  <span class="clicked"></span>
  <div class="btn-container">
    <button class="pushable" id="positive" onClick="sayYes()">
      Yes
   </button>
    <button class="pushable" id="negative" onClick="sayNo()">
      No
    </button>
  </div>
` 
function displayCountdown() {
  const countdownElement = document.querySelector('.countdown');
  countdownElement.innerText = 'Note: This message will automatically disappear in 10s'; // Initial countdown text
  countdownElement.style.display = 'block'; // Show the countdown text

  let countdown = 10; // Countdown duration in seconds
  const countdownInterval = setInterval(() => {
    countdown--; // Decrement countdown
    countdownElement.innerText = `Note: This message will automatically disappear in ${countdown}s`; // Update countdown text
    if (countdown === -1) {
      clearInterval(countdownInterval); // Stop the countdown when it reaches 0
      countdownElement.style.display = 'none'; // Hide the countdown text
      // Show the video
      const videoElement = document.getElementById('explo');
      const errorElement = document.querySelector('#error');
      videoElement.style.display = 'block';
      videoElement.play();
      videoElement.addEventListener('ended',function(){
        videoElement.style.display = 'none';
        errorElement.style.display = 'block';
        errorElement.play()
      })
      errorElement.addEventListener('ended', ()=>{
        window.close();
      })
    }
  }, 1000); // Update countdown text every second
}

const sayYesContent = (name) => {
  let content = `
    <div class="loveyou-text">
      <span class="one"></span>
      <span class="two"></span>
      <span class="three"></span>
      <div class="loader"></div>
      <span class="heart2" data-open="false">&heartsuit;</span>
    </div>
  `;
  setTimeout(()=>{
    displayCountdown();
  },3500)
  // Display the first line immediately
  setTimeout(() => {
    document.querySelector('.loveyou-text .one').innerHTML = "Submittion Completed!";
  }, 0);

  
  setTimeout(() => {
    document.querySelector('.loveyou-text .one').style.display = "none";
    document.querySelector('.loveyou-text .two').innerHTML = "Connecting to server...";
    document.querySelector(".loader").style.display = "block";
  }, 1000); // Adjust the delay here (in milliseconds)
  setTimeout(() => {
    document.querySelector('.loveyou-text .two').style.display = "none";
    let texts = `Dear ${name},<br>All humans continue their live with hope. Same to me, even though there is a chance of 0.01%, at least it's not totally 0 and NAH I don't wanna give up at all. Anyway, you just admitted that you love me. Yea ilysm too♡ You are my special and I rlly appreciate your love:3. Let's spend the remaining time of our life together<br>And the date is now saved: ${new Date().toLocaleDateString()}`;
    document.querySelector(".loveyou-text .three").innerHTML = texts;
    document.querySelector(".loader").style.display = "none";
    document.querySelector('.bg').style.opacity = '1';
    document.querySelector('.heart2').style.display = "block";
    setTimeout(() =>{
      document.querySelector(".cringe").style.display = "block";
    },4000);
    setTimeout(()=>{
      innerContent.style.height = '0vh';
      innerContent.style.padding = '2px';
      document.querySelector('.heart2').style.display = 'none';
      document.querySelector('.three').style.display = 'none';
      document.querySelector('.cringe').style.display = 'none';
      innerContent.style.backgroundColor = '#fffff';
    },10000);
  }, 3500);

  return content;
}



const noWords = [
  "What do you mean?",
  "Are you sure??",
  "Access denied! Rejection declined",
]

var noWordIndex = 0;
let count = 0;
const sayNo = () => {
  document.querySelector("#myAudio").play();
  document.querySelector(".gif-container").style.display = "block";
  
  setTimeout(()=>{
    document.querySelector(".gif-container").style.display = "none";
  },1000)
  document.querySelector('.clicked').innerHTML = noWords[noWordIndex];
  if (count>1){
    document.querySelector('#negative').style.display = "none";
    document.querySelector('#positive').style.backgroundColor = "green";
    document.querySelector('#positive').style.transform = "scale(1.2)";
    }
  count++;
  noWordIndex++;
}

//Change name here
const sayYes = () => {
  let url = document.location.href.split('?');
  let name = "ThanThar";
  if(url.length>1){
    name = url[url.length - 1];
    name = decodeURI(name);
  }
  innerContent.innerHTML = sayYesContent(name);
  
}


openBtn.addEventListener('click', () => {
  let dataOpen = openBtn.getAttribute('data-open');
  if(dataOpen == 'false'){
    openBtn.style.backgroundColor = '#ffc5e6';
    openBtn.style.color = '#ff2644';
    openBtn.style.borderColor = "#ffc5e6";
    openBtn.style.top = '0%';
    innerContent.style.height = '50vh';
    innerContent.style.padding ='50px';
    innerContent.style.boxShadow = '0 0 5px 4px rgba(84, 69, 69, 0.3)';
    innerContent.style.backgroundColor = "ffc5e6";
    setTimeout(() => {
      innerContent.innerHTML += mainContent;
      button = document.querySelector("#negative");
    }, 450)
    openBtn.setAttribute('data-open', 'true')
  }
})

// Add an event listener to the document or any specific element
document.addEventListener('mousemove', mouse_position);

// Define the mouse_position function
function mouse_position(event) {
  const mouseX = event.clientX;
  const mouseY = event.clientY;

  const buttonOffset = getOffset(button);
  const buttonX = buttonOffset.left + (button.offsetWidth /2);
  const buttonY = buttonOffset.top ;

  
  const distance = calculateDistance(mouseX, mouseY, buttonX, buttonY);

  if (distance < 100) {
    const displacementFactor = (100 - distance) * 0.1;
    
    const perspectiveFactor = calculatePerspectiveFactor(buttonX, buttonY);
    button.style.transform = `translate(${-(mouseX - buttonX) * displacementFactor * perspectiveFactor}px, ${-(mouseY - buttonY) * displacementFactor * perspectiveFactor}px)`;
    button.style.perspective = `${9 - (10 - 4) * perspectiveFactor + 0.3}cm`;
    button.style.transformStyle = 'preserve-3d';
    button.style.transform += ` rotateX(${-25 * perspectiveFactor}deg) rotateY(${10 * perspectiveFactor}deg) rotateZ(${-5 * perspectiveFactor}deg)`;
  } else {
    button.style.transform = 'none';
    button.style.perspective = 'none';
    button.style.transformStyle = 'flat';
  }
}


function getOffset(el) {
  const rect = el.getBoundingClientRect();
  return {
    left: rect.left + window.scrollX,
    top: rect.top + window.scrollY
  };
}

function calculateDistance(X, Y, x, y) {
  const dist = Math.sqrt((X - x) ** 2 + (Y - y) ** 2);
  return Math.ceil(dist);
}

function calculatePerspectiveFactor(x, y) {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    
    // Calculate the distance of the button from the center of the screen
    const distanceFromCenter = Math.sqrt((x - screenWidth / 2) ** 2 + (y - screenHeight / 2) ** 2);
    
    // Calculate the perspective factor based on the distance from the center
    const perspectiveFactor = 1 - distanceFromCenter / (Math.sqrt(screenWidth ** 2 + screenHeight ** 2) / 2);
    
    return perspectiveFactor;
  }
