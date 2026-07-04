<<<<<<< HEAD
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
=======
let projectData = [];
let images = [];
let viewerIndex = 0;
let currentIndex = 0;

>>>>>>> bdb88da6776b982d869fa2729375241dbed49d38
const gallery = document.getElementById('gallery');

const viewer = document.getElementById('project-viewer');
const viewerScroll = document.getElementById('viewer-scroll');
<<<<<<< HEAD
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
=======
const viewerCounter = document.getElementById('viewer-counter');

const viewerLeft = document.getElementById('viewer-left');
const viewerRight = document.getElementById('viewer-right');
const viewerExit = document.getElementById('viewer-exit');

const fullscreen = document.getElementById('fullscreen-viewer');
const fsImg = document.getElementById('fullscreen-img');

// ==========================
// LOAD DATA (PRELOAD SUPPORT)
// ==========================
if (window.projectsCache) {
  projectData = window.projectsCache;
  initGallery(projectData);
} else {
  fetch('/projects.json')
    .then(res => res.json())
    .then(data => {
      projectData = data;
      initGallery(data);
    });
}

// ==========================
// BUILD GALLERY
// ==========================
function initGallery(data) {
  data.forEach((p, i) => {
    const item = document.createElement('div');
    item.className = 'gallery-item';

    item.innerHTML = `
      <img src="${p.folder + p.images[0]}" data-index="${i}">
      <div class="overlay">
        <div class="title">${p.title}</div>
        <div class="subtitle">${p.desc}</div>
      </div>
    `;

    gallery.appendChild(item);
  });

  document.querySelectorAll('.gallery img').forEach(img => {
    img.onclick = () => openProject(img.dataset.index);
  });
}

// ==========================
// OPEN PROJECT (WITH PRELOAD)
// ==========================
function openProject(i) {
  const p = projectData[i];
  viewerScroll.innerHTML = '';

  const preloadImages = [];

  p.images.forEach((file, idx) => {
    const src = p.folder + file;

    // 🔥 PRELOAD
    const preload = new Image();
    preload.src = src;
    preloadImages.push(preload);

    // DISPLAY
    const img = document.createElement('img');
    img.src = src;

    img.onclick = (e) => {
      const rect = img.getBoundingClientRect();
      const x = e.clientX - rect.left;

      if (x < rect.width * 0.3) prevViewer();
      else if (x > rect.width * 0.7) nextViewer();
      else openFullscreen(idx);
    };
>>>>>>> bdb88da6776b982d869fa2729375241dbed49d38

    viewerScroll.appendChild(img);
  });

  images = viewerScroll.querySelectorAll('img');
<<<<<<< HEAD
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

=======
  viewerIndex = 0;
  updateCounter();

  viewer.classList.add('active');
}

// ==========================
// VIEWER NAV
// ==========================
function nextViewer() {
  viewerIndex = (viewerIndex + 1) % images.length;
  images[viewerIndex].scrollIntoView({ behavior: "smooth", inline: "center" });
  updateCounter();
}

function prevViewer() {
  viewerIndex = (viewerIndex - 1 + images.length) % images.length;
  images[viewerIndex].scrollIntoView({ behavior: "smooth", inline: "center" });
  updateCounter();
}

function updateCounter() {
  viewerCounter.textContent = `${viewerIndex + 1} / ${images.length}`;
}

// ==========================
// FULLSCREEN
// ==========================
function openFullscreen(i) {
  currentIndex = i;
  fsImg.src = images[i].src;
  fullscreen.classList.add('active');
}

function next() {
  currentIndex = (currentIndex + 1) % images.length;
  fsImg.src = images[currentIndex].src;
}

function prev() {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  fsImg.src = images[currentIndex].src;
}

// ==========================
// MOUSE WHEEL NAV
// ==========================
viewer.addEventListener('wheel', (e) => {
  if (Math.abs(e.deltaY) > 10) {
    e.deltaY > 0 ? nextViewer() : prevViewer();
  }
});

fullscreen.addEventListener('wheel', (e) => {
  if (Math.abs(e.deltaY) > 10) {
    e.deltaY > 0 ? next() : prev();
  }
});
>>>>>>> bdb88da6776b982d869fa2729375241dbed49d38

// ==========================
// CLICK ZONES
// ==========================
<<<<<<< HEAD
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
=======
viewerLeft.onclick = prevViewer;
viewerRight.onclick = nextViewer;
viewerExit.onclick = () => viewer.classList.remove('active');

// ==========================
// CLOSE HANDLERS
// ==========================
fullscreen.onclick = (e) => {
  if (e.target === fullscreen) fullscreen.classList.remove('active');
};

document.getElementById('fs-close').onclick = () => {
  fullscreen.classList.remove('active');
};

document.getElementById('viewer-close').onclick = () => {
  viewer.classList.remove('active');
};
>>>>>>> bdb88da6776b982d869fa2729375241dbed49d38
