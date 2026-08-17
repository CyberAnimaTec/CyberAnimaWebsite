const root = document.documentElement;

function toggleLightTheme() {
  root.classList.toggle('light');
  const button = document.getElementById('light-theme-toggle');
  if (button) {
    button.textContent = root.classList.contains('light') ? '☀️' : '🌙';
  }
}

let frames = [];
let currentFrame = 0;
const heartElement = document.getElementById('heart');

function startAnimation() {
  if (frames.length === 0) return;
  setInterval(() => {
    if (heartElement) {
      heartElement.textContent = frames[currentFrame];
      currentFrame = (currentFrame + 1) % frames.length;
    }
  }, 250);
}

function loadFrames() {
  fetch('assets/frames/Heart Anim v4.json')
    .then(response => {
      if (!response.ok) throw new Error('Frames not found');
      return response.json();
    })
    .then(data => {
      frames = data;
      startAnimation();
    })
    .catch(err => console.error('Failed to load frames:', err));
}

function loadContent(targetId) {
  const section = document.getElementById(targetId);
  if (!section) return;

  const pre = section.querySelector('pre');
  if (!pre || pre.getAttribute('data-loaded') === 'true') return;

  const fileName = pre.getAttribute('data-source');
  const url = `assets/articles/${fileName}.txt`;

  fetch(url)
    .then(response => {
      if (!response.ok) throw new Error('File not found');
      return response.text();
    })
    .then(text => {
      pre.textContent = text;
      pre.setAttribute('data-loaded', 'true');
    })
    .catch(err => console.error(`Failed to load ${url}:`, err));
}

document.querySelectorAll('nav button, #light-theme-toggle').forEach(button => {
  button.addEventListener('click', () => {
    if (button.id === 'light-theme-toggle') {
      toggleLightTheme();
      return;
    }

    const targetId = button.getAttribute('data-target');
    const targetSection = document.getElementById(targetId);
    const artContainer = document.querySelector('.center-container-art');

    if (!targetSection) return;

    const isCurrentlyVisible = targetSection.classList.contains('visible');

    // Reset all buttons and hide all sections
    document.querySelectorAll('nav button').forEach(btn => {
      if (btn.id === 'light-theme-toggle') return;
      const text = btn.textContent.replace(/^[v>] /, '');
      btn.textContent = `> ${text}`;
    });
    document.querySelectorAll('section').forEach(section => {
      section.classList.remove('visible');
    });

    if (isCurrentlyVisible) {
      // If it was visible, show the heart art again
      if (artContainer) {
        artContainer.classList.remove('hidden');
      }
      // Button already reset to '>'
    } else {
      // If it was hidden, show it and hide the heart art
      if (artContainer) {
        artContainer.classList.add('hidden');
      }
      targetSection.classList.add('visible');
      button.textContent = `v ${button.textContent.substring(2)}`;
      loadContent(targetId);
    }
  });
});

// Load frames and start animation on load
document.addEventListener('DOMContentLoaded', loadFrames);
