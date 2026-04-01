
const CONFIG = {

  correctPasscode: "080424",


  anniversaryDate: new Date("2024-08-04"),


  photos: [
    {
      src: "images/664cdf18-3da8-48fd-8939-4ae4f3dd45a0.jpg",
      caption: "The Day I Courted You",
    },
    {
      src: "images/0c4905b8-a175-4435-939f-159dfb593306.jpg",
      caption: "The Day You Said Yes",
    },
    {
      src: "images/822a4a0f-9e15-4e9b-81ea-d2be03e47cbb.jpg",
      caption: "Perya Together",
    },
    {
      src: "images/244122f8-5db8-4905-8d49-c086125c43f2.jpg",
      caption: "My Favorite Photo of Us",
    },
    {
      src: "images/bd3bfcec-1f41-4eba-9e21-9a603cfd33f5.jpg",
      caption: "Your Birthday",
    },
  ],

  song: {
    title: "love.",
    artist: "wave to earth",
    albumArt: "images/love.jpg",
    dedication:
      "Whenever I listen to this, It always reminds me of how I fell so hard for you the first time I saw you.",
  },

  yourName: "Christian",
}


let currentPasscode = ""
let currentPhotoIndex = 0
let isPlaying = false


document.addEventListener("DOMContentLoaded", () => {
  console.log("Website loaded!")
  createFloatingHearts()
  updateTimeElapsed()
  setInterval(updateTimeElapsed, 60000) 
})


function createFloatingHearts() {
  const heartsContainer = document.querySelector(".floating-hearts")
  if (!heartsContainer) return

  const hearts = ["💖", "💕", "💗", "💝", "💘"]

  for (let i = 0; i < 15; i++) {
    const heart = document.createElement("div")
    heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)]
    heart.style.position = "absolute"
    heart.style.left = Math.random() * 100 + "%"
    heart.style.top = Math.random() * 100 + "%"
    heart.style.fontSize = Math.random() * 20 + 15 + "px"
    heart.style.animation = `float ${2 + Math.random() * 3}s ease-in-out infinite`
    heart.style.animationDelay = Math.random() * 3 + "s"
    heart.style.pointerEvents = "none"
    heartsContainer.appendChild(heart)
  }
}


function addDigit(digit) {
  console.log("Adding digit:", digit)
  if (currentPasscode.length < 6) {
    currentPasscode += digit
    updatePasscodeDisplay()
    console.log("Current passcode:", currentPasscode)
  }
}

function clearPasscode() {
  console.log("Clearing passcode")
  currentPasscode = ""
  updatePasscodeDisplay()
  const hint = document.getElementById("hint")
  if (hint) {
    hint.classList.add("hidden")
  }
}

function updatePasscodeDisplay() {
  for (let i = 1; i <= 6; i++) {
    const dot = document.getElementById(`dot${i}`)
    if (dot) {
      if (i <= currentPasscode.length) {
        dot.classList.add("filled")
      } else {
        dot.classList.remove("filled")
      }
    }
  }
}

function checkPasscode() {
  console.log("Checking passcode:", currentPasscode, "vs", CONFIG.correctPasscode)

  if (currentPasscode.length === 6) {
    if (currentPasscode === CONFIG.correctPasscode) {
      console.log("Passcode correct! Unlocking...")
      unlockScrapbook()
    } else {
      console.log("Wrong passcode")
      // Wrong passcode
      const container = document.querySelector(".passcode-container")
      if (container) {
        container.style.animation = "shake 0.5s ease-in-out"
      }

      const hint = document.getElementById("hint")
      if (hint) {
        hint.classList.remove("hidden")
      }

      setTimeout(() => {
        if (container) {
          container.style.animation = ""
        }
        clearPasscode()
      }, 1000)
    }
  }
}

function unlockScrapbook() {
  console.log("Unlocking scrapbook...")

  const passcodeScreen = document.getElementById("passcode-screen")
  const scrapbookScreen = document.getElementById("scrapbook-screen")

  if (passcodeScreen && scrapbookScreen) {
    passcodeScreen.classList.remove("active")
    scrapbookScreen.classList.add("active")
    createFloatingElements()
    console.log("Scrapbook unlocked!")
  } else {
    console.error("Could not find screens")
  }
}


function createFloatingElements() {
  const elementsContainer = document.querySelector(".floating-elements")
  if (!elementsContainer) return

  const elements = ["🌸", "🌺", "🌼", "🌻", "🌷"]

  for (let i = 0; i < 10; i++) {
    const element = document.createElement("div")
    element.innerHTML = elements[Math.floor(Math.random() * elements.length)]
    element.style.position = "absolute"
    element.style.left = Math.random() * 100 + "%"
    element.style.top = Math.random() * 100 + "%"
    element.style.fontSize = Math.random() * 15 + 20 + "px"
    element.style.animation = `bounce ${3 + Math.random() * 2}s ease-in-out infinite`
    element.style.animationDelay = Math.random() * 2 + "s"
    element.style.pointerEvents = "none"
    elementsContainer.appendChild(element)
  }
}


function updateTimeElapsed() {
  const now = new Date()
  const diff = now.getTime() - CONFIG.anniversaryDate.getTime()

  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const years = Math.floor(days / 365)
  const remainingDays = days % 365
  const months = Math.floor(remainingDays / 30.44)
  const finalDays = Math.floor(remainingDays % 30.44)

  const timeString = `${years} year${years !== 1 ? "s" : ""}, ${months} month${months !== 1 ? "s" : ""}, ${finalDays} day${finalDays !== 1 ? "s" : ""}`

  const timeElement = document.getElementById("time-elapsed")
  if (timeElement) {
    timeElement.textContent = timeString
  }
}


function openSection(section) {
  console.log("Opening section:", section)

  const modal = document.getElementById("modal")
  const modalBody = document.getElementById("modal-body")

  if (modal && modalBody) {
    modalBody.innerHTML = getSectionContent(section)
    modal.style.display = "block"


    if (section === "photos") {
      initPhotoGallery()
    } else if (section === "music") {
      initMusicPlayer()
    }
  }
}

function closeModal() {
  const modal = document.getElementById("modal")
  if (modal) {
    modal.style.display = "none"
  }

  isPlaying = false
}


function getSectionContent(section) {
  switch (section) {
    case "photos":
      return getPhotoGalleryContent()
    case "timeline":
      return getTimelineContent()
    case "letter":
      return getLoveLetterContent()
    case "music":
      return getMusicPlayerContent()
    default:
      return "<p>Content not found</p>"
  }
}


function getPhotoGalleryContent() {
  const photo = CONFIG.photos[currentPhotoIndex]
  return `
        <div class="section">
            <div class="section-icon">📸</div>
            <h2>Our Beautiful Memories</h2>
            <p style="color: #6b7280; margin-bottom: 30px;">Every picture tells our story</p>
            
            <div class="photo-gallery">
                <div class="photo-container">
                    <img src="${photo.src}" alt="${photo.caption}" id="current-photo">
                    <button class="photo-nav prev" onclick="previousPhoto()">‹</button>
                    <button class="photo-nav next" onclick="nextPhoto()">›</button>
                </div>
                
                <div class="photo-info">
                    <h3 id="photo-caption">${photo.caption}</h3>
                    <p id="photo-date">${photo.date}</p>
                    
                    <div class="photo-dots">
                        ${CONFIG.photos
                          .map(
                            (_, index) =>
                              `<div class="dot-nav ${index === currentPhotoIndex ? "active" : ""}" onclick="goToPhoto(${index})"></div>`,
                          )
                          .join("")}
                    </div>
                </div>
            </div>
        </div>
    `
}

function initPhotoGallery() {
  updatePhotoDisplay()
}

function updatePhotoDisplay() {
  const photo = CONFIG.photos[currentPhotoIndex]
  const currentPhoto = document.getElementById("current-photo")
  const photoCaption = document.getElementById("photo-caption")
  const photoDate = document.getElementById("photo-date")

  if (currentPhoto) currentPhoto.src = photo.src
  if (photoCaption) photoCaption.textContent = photo.caption
  if (photoDate) photoDate.textContent = photo.date

  // Update dots
  document.querySelectorAll(".dot-nav").forEach((dot, index) => {
    dot.classList.toggle("active", index === currentPhotoIndex)
  })
}

function nextPhoto() {
  currentPhotoIndex = (currentPhotoIndex + 1) % CONFIG.photos.length
  updatePhotoDisplay()
}

function previousPhoto() {
  currentPhotoIndex = (currentPhotoIndex - 1 + CONFIG.photos.length) % CONFIG.photos.length
  updatePhotoDisplay()
}

function goToPhoto(index) {
  currentPhotoIndex = index
  updatePhotoDisplay()
}


function getTimelineContent() {
  const now = new Date()
  const diff = now.getTime() - CONFIG.anniversaryDate.getTime()
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))

  return `
        <div class="section">
            <div class="section-icon">⏰</div>
            <h2>Our Time Together</h2>
            <p style="color: #6b7280; margin-bottom: 30px;">Every moment has been precious</p>
            
            <div style="text-align: center; margin-bottom: 40px;">
                <div style="font-size: 48px; font-weight: bold; background: linear-gradient(135deg, #a855f7, #ec4899); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin-bottom: 20px;">
                    ${Math.floor(days / 365)} Years, ${Math.floor((days % 365) / 30.44)} Months, ${Math.floor(days % 30.44)} Days
                </div>
                <p style="font-size: 20px; color: #374151; margin-bottom: 30px;">of pure happiness together</p>
            </div>
            
            <div class="timeline-stats">
                <div class="stat-card">
                    <div class="stat-number" style="color: #a855f7;">∞</div>
                    <div class="stat-label">Reasons I love you</div>
                </div>
                <div class="stat-card">
                    <div class="stat-number" style="color: #f43f5e;">24/7</div>
                    <div class="stat-label">Thinking of you</div>
                </div>
                <div class="stat-card">
                    <div class="stat-number" style="color: #ef4444;">Forever</div>
                    <div class="stat-label">To go</div>
                </div>
            </div>
            
            <div style="text-align: center; margin-top: 30px; color: #6b7280;">
                💖 And counting... 💖
            </div>
        </div>
    `
}


function getLoveLetterContent() {
  return `
        <div class="section">
            <div class="section-icon">💌</div>
            <h2>A Letter From My Heart</h2>
            
            <div class="love-letter">
                <p><strong>My Dearest Palangga,</strong></p>
                
                <p> You’ve filled my life with so much love, joy, and light — I cannot imagine a world without you in it.</p>
                
                <p>Your love is the greatest gift I've ever received. You make me want to be the best version of myself, and you love me even when I'm not.</p>
                
                <p>Thank you for being my partner through all of life’s ups and downs. For holding my hand when things get rough, and for celebrating with me when things go my way.</p>
                
                <p>I promise to love you more each day, to support your dreams, to make you laugh when you're sad, and to be your safe place. Change is constant but one thing is for sure, you are my constant.</p>
                
                <p>Happy Anniversary, palangga. Here's to many more years of creating memories together.</p>
                
                <div class="signature">
                    <p>Forever and always yours,</p>
                    <p>${CONFIG.yourName} ❤️</p>
                </div>
                
                <div style="text-align: center; margin-top: 30px;">
                    💖
                </div>
            </div>
        </div>
    `
}


function getMusicPlayerContent() {
  return `
        <div class="section">
            <div class="section-icon">🎵</div>
            <h2>Our Special Song</h2>
            <p style="color: #6b7280; margin-bottom: 30px;">The soundtrack to our love story</p>
            
            <div class="music-player">
                <div class="album-container">
                    <img src="${CONFIG.song.albumArt}" alt="Album Art" class="album-art">
                    <button class="play-button" onclick="toggleMusic()">
                        <span id="play-icon">▶️</span>
                    </button>
                </div>
                
                <div class="song-info">
                    <div class="song-title">${CONFIG.song.title}</div>
                    <div class="song-artist">by ${CONFIG.song.artist}</div>
                    
                    <div class="visualizer" id="visualizer">
                        <div class="bar"></div>
                        <div class="bar"></div>
                        <div class="bar"></div>
                        <div class="bar"></div>
                        <div class="bar"></div>
                    </div>
                    
                    <div id="now-playing" style="display: none; color: #6b7280; font-size: 14px; margin-top: 10px;">
                        Now Playing
                    </div>
                </div>
                
                <div class="song-dedication">
                    <h4>💖 Why This Song:</h4>
                    <p>${CONFIG.song.dedication}</p>
                </div>
            </div>
        </div>
    `
}

function initMusicPlayer() {
  // Reset playing state when modal opens
  isPlaying = false
  updateMusicDisplay()
}

function toggleMusic() {
  isPlaying = !isPlaying
  updateMusicDisplay()
}

function updateMusicDisplay() {
  const playIcon = document.getElementById("play-icon")
  const visualizer = document.getElementById("visualizer")
  const nowPlaying = document.getElementById("now-playing")

  if (playIcon && visualizer && nowPlaying) {
    if (isPlaying) {
      playIcon.textContent = "⏸️"
      visualizer.classList.add("playing")
      nowPlaying.style.display = "block"
    } else {
      playIcon.textContent = "▶️"
      visualizer.classList.remove("playing")
      nowPlaying.style.display = "none"
    }
  }
}


const style = document.createElement("style")
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-10px); }
        75% { transform: translateX(10px); }
    }
`
document.head.appendChild(style)


window.onclick = (event) => {
  const modal = document.getElementById("modal")
  if (event.target === modal) {
    closeModal()
  }
}


function debugPasscode() {
  console.log("Current passcode:", currentPasscode)
  console.log("Correct passcode:", CONFIG.correctPasscode)
  console.log("Match:", currentPasscode === CONFIG.correctPasscode)
}
