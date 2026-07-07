let images = [];
let currentIndex = 0;

const gallery = document.getElementById('gallery');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const titleEl = document.getElementById('lightbox-title');
const descEl = document.getElementById('lightbox-desc');

// Load JSON
fetch('/projects.json')
  .then(res => res.json())
  .then(data => {
    data.forEach((project, index) => {
      const item = document.createElement('div');
      item.className = 'gallery-item ' + (project.size || '');

      item.innerHTML = `
        <img src="${project.image}" 
             data-title="${project.title}" 
             data-desc="${project.desc}">
        <div class="overlay">
          <h3>${project.title}</h3>
          <p>${project.desc}</p>
        </div>
      `;

      gallery.appendChild(item);
    });

    images = document.querySelectorAll('.gallery img');
    initLightbox();
  });

// Lightbox
function showImage(index) {
  const img = images[index];

  lightboxImg.src = img.src;
  titleEl.textContent = img.dataset.title;
  descEl.textContent = img.dataset.desc;

  currentIndex = index;
  lightbox.classList.add('active');
}

function initLightbox() {
  images.forEach((img, index) => {
    img.addEventListener('click', () => showImage(index));
  });
}

// Controls
document.getElementById('close').onclick = () => {
  lightbox.classList.remove('active');
};

document.getElementById('next').onclick = () => {
  currentIndex = (currentIndex + 1) % images.length;
  showImage(currentIndex);
};

document.getElementById('prev').onclick = () => {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  showImage(currentIndex);
};

// Keyboard
document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('active')) return;

  if (e.key === 'ArrowRight') document.getElementById('next').click();
  if (e.key === 'ArrowLeft') document.getElementById('prev').click();
  if (e.key === 'Escape') lightbox.classList.remove('active');
});