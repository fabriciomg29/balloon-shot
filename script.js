const background = document.querySelector('.background');
let speedBolloon = 30;
let scorePoints  = 0;
let blgameover   = false;

function createBolloon() {

  const bolloon          = document.createElement('div');
  let randomLeftPosition = Math.random() * background.offsetWidth-50;
  let moveBolloon        = 0;

  randomLeftPosition = (randomLeftPosition < 0) ? 0 : randomLeftPosition;

  bolloon.classList.add('bolloon');
  bolloon.style.left = randomLeftPosition + 'px';
  background.appendChild(bolloon);

  let moveUp = setInterval(() => {
    if( moveBolloon < background.offsetHeight - 70 ) {
      moveBolloon += 5;
      bolloon.style.bottom = moveBolloon + 'px';
    }
    else {
      clearInterval(moveUp);
      background.removeChild(bolloon);
      blgameover = true;
    }
  }, speedBolloon);

  bolloon.addEventListener('click', () => {
    actionsBolloon(bolloon, moveUp);
    scorePoints += 2;
  });

  if( blgameover ) {
    gameOver();
  } else {
    setTimeout(() => {
      createBolloon();
    }, 1000);
  }
}

function gameOver() {

  const listBolloon = document.querySelectorAll('.bolloon');
  const gameover = document.querySelector('.gameover');
  const score = document.querySelector('#score');

  gameover.classList.remove('hide');

  for(bolloon of listBolloon) {
    bolloon.classList.add('hide');
  }

  score.innerHTML = 'score: ' + scorePoints;
}

function actionsBolloon(bolloon, moveUp) {
  speedBolloon -= 1;
  bolloon.classList.add('bolloon-shoted');
  clearInterval(moveUp);
  setTimeout(() => {
    background.removeChild(bolloon);
  }, 2000);
}

function start() {

  const start = document.querySelector('.btnstart');

  start.addEventListener('click', () => {
    start.classList.add('hide');
    createBolloon();
  });

}

start();