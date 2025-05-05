const menuToggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('.menu');

menuToggle.addEventListener('click', function(event) {
  menuToggle.classList.toggle('active');
  menu.classList.toggle('open');
  event.stopPropagation();
});

document.addEventListener('click', function(event) {
  if (!menu.contains(event.target) && !menuToggle.contains(event.target)) {
    menuToggle.classList.remove('active');
    menu.classList.remove('open');
  }
});