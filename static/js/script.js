window.addEventListener('load', function() {
    let score;
    const grid = document.querySelector('.grid');
    const sDisplay = document.getElementById('score');
    let curMole = null;
    let gameInterval;

    function createGrid(){
        for (let i = 0; i < 9; i++) {
            const hole = document.createElement('div');
            hole.classList.add('hole');
            const mole = document.createElement('div');
            mole.classList.add('mole');
            mole.addEventListener('click', hitMole);
            hole.appendChild(mole);
            grid.appendChild(hole);
        }
    }
    function hitMole() {
        if(curMole && curMole.style.display === 'block') {
            score++;
            sDisplay.textContent = score;
            curMole.style.display = 'none';
        } else if (curMole && curMole.style.display === 'flex') {
            score--;
            sDisplay.textContent = score;
            curMole.style.display = 'none';
        }
    }
    function randomMole(){
        
        if (curMole) curMole.style.display = 'none';
        const holes = document.querySelectorAll('.hole');
        const randomHole = holes[Math.floor(Math.random() * holes.length)];
        curMole = randomHole.querySelector('.mole');
        const path = Math.random();
        if (path < 0.5) {
            curMole.style.display = 'block';
            curMole.style.backgroundColor = '#FFD700';
        } else {
            curMole.style.display = 'flex';
            curMole.style.backgroundColor = '#00FF00';
        }
        setTimeout(() => clearInterval(gameInterval), 8000 + Math.random() * 2000);
    }
    function startGame() {
        score = 0;
        sDisplay.textContent = score;
        clearInterval(gameInterval);
        gameInterval = setInterval(randomMole, 800);
        setTimeout(() => clearInterval(gameInterval), 10000);
    }

    document.getElementById('start-button')
    .addEventListener('click', function() {
        createGrid();
        startGame();
    });


});