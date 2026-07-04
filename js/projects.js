// ==========================
// STATE
// ==========================
let projectData = [];
let currentIndex = 0;
let images = [];

// Swipe
let startX = 0;
let endX = 0;
const threshold = 50;

// ==========================
// ELEMENTS
// ==========================
const gallery = document.getElementById('gallery');

const viewer = document.getElementById('project-viewer');
const viewerScroll = document.getElementById('viewer-scroll');
const viewerClose = document.getElementById('viewer-close');

const fullscreenViewer = document.getElementById('fullscreen-viewer');
const fullscreenImg = document.getElementById('fullscreen-img');


// ==========================
// LOAD PROJECTS
// ==========================
fetch('/projects.json')
  .then(res => res.json())
  .then(data => {
    projectData = data;

    data.forEach((project, index) => {
      const item = document.createElement('div');
      item.className = 'gallery-item';

      item.innerHTML = `
        <img src="${project.folder + project.images[0]}" data-index="${index}">
        <div class="overlay">
          <h3>${project.title}</h3>
          <p>${project.desc}</p>
        </div>
      `;

      gallery.appendChild(item);
    });

    initClicks();
  });


// ==========================
// OPEN PROJECT VIEWER
// ==========================
function initClicks() {
  document.querySelectorAll('.gallery img').forEach(img => {
    img.addEventListener('click', () => {
      openProject(img.dataset.index);
    });
  });
}

function openProject(index) {
  const project = projectData[index];

  viewerScroll.innerHTML = '';

  project.images.forEach((file, i) => {
    const img = document.createElement('img');
    img.src = project.folder + file;

    img.addEventListener('click', () => {
      openFullscreen(i);
    });

    viewerScroll.appendChild(img);
  });

  images = viewerScroll.querySelectorAll('img');
  currentIndex = 0;

  viewer.offsetHeight;
  viewer.classList.add('active');

  // center first image
  setTimeout(() => {
    images[0].scrollIntoView({ inline: 'center' });
  }, 50);
}


// ==========================
// FULLSCREEN VIEWER
// ==========================
function openFullscreen(index) {
  currentIndex = index;
  fullscreenImg.src = images[index].src;
  fullscreenViewer.classList.add('active');
}

function closeFullscreen() {
  fullscreenViewer.classList.remove('active');
}


// ==========================
// NAVIGATION
// ==========================
function nextImage() {
  currentIndex = (currentIndex + 1) % images.length;
  fullscreenImg.src = images[currentIndex].src;
}

function prevImage() {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  fullscreenImg.src = images[currentIndex].src;
}


// ==========================
// SWIPE (FULLSCREEN)
// ==========================
fullscreenViewer.addEventListener('touchstart', e => {
  startX = e.touches[0].clientX;
});

fullscreenViewer.addEventListener('touchmove', e => {
  endX = e.touches[0].clientX;
});

fullscreenViewer.addEventListener('touchend', () => {
  let diff = startX - endX;

  if (Math.abs(diff) > threshold) {
    diff > 0 ? nextImage() : prevImage();
  }
});


// ==========================
// CLICK ZONES
// ==========================
fullscreenViewer.addEventListener('click', (e) => {
  if (e.target !== fullscreenImg) {
    closeFullscreen();
    return;
  }

  const x = e.clientX;
  const width = window.innerWidth;

  if (x < width / 2) {
    prevImage();
  } else {
    nextImage();
  }
});


// ==========================
// EVENTS
// ==========================
viewerClose.onclick = () => viewer.classList.remove('active');

document.addEventListener('keydown', e => {
  if (fullscreenViewer.classList.contains('active')) {
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
    if (e.key === 'Escape') closeFullscreen();
  } else if (viewer.classList.contains('active')) {
    if (e.key === 'Escape') viewer.classList.remove('active');
  }
});