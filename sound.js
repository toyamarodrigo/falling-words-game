// DOM ELEMENTS
const menuSound = document.getElementById('MenuSound');
const buttons = document.querySelectorAll('button');

buttons.forEach((button) => {
  button.addEventListener('mouseover', () => {
    menuSound.play();
  });

  button.addEventListener('mouseout', () => {
    menuSound.pause();
    menuSound.currentTime = 0;
  });
});
