window.addEventListener('load', function () {
    let score;
    let curMole = null;
    let gameInterval;
    let difficulty = 'easy';
    const grid = document.querySelector('.grid');
    const scoreH = document.getElementById('score');
    const scoreD = document.getElementById('score-display')
    const columnForm = document.getElementById('columns');
    const rowForm = document.getElementById('rows');
    const startButton = document.getElementById('start-button');
    const menu = document.getElementById('main-menu');
    const dropdowns = document.getElementsByClassName('dropdown');
    const innerDiff = document.getElementById('inner-diff');
    const timeForm = document.getElementById('time');
    const timeD = document.getElementById('timer');
    const game = document.getElementById('main-game');
    let cols = parseFloat(columnForm.value);
    let rows = parseFloat(rowForm.value);
    startButton.disabled = true;
    function startTimer() {
        let sec = parseInt(timeForm.value, 10);
        timeD.textContent = sec;
        let timer = setInterval(function(){
            sec--;
            timeD.textContent = sec;
            if (sec < 0) {
                clearInterval(timer);
            }
        }, 1000);
    }

    function validIn() {
        cols = parseFloat(columnForm.value);
        rows = parseFloat(rowForm.value);
        const valid1 = cols >= parseFloat(columnForm.min) && cols <= parseFloat(columnForm.max);
        const valid2 = rows >= parseFloat(rowForm.min) && rows <= parseFloat(rowForm.max);
        startButton.disabled = !(valid1 && valid2);
    }

    columnForm.addEventListener('input', validIn);
    rowForm.addEventListener('input', validIn);

    Array.from(dropdowns).forEach(function (dropdown) {
        dropdown.addEventListener('click', function () {
            const dropdownContent = this.getElementsByClassName('dropdown-content')[0];
            if (dropdownContent.style.display === 'flex') {
                dropdownContent.style.display = 'none';
            } else {
                dropdownContent.style.display = 'flex';
            }
        });
    });


    function createGrid() {
        grid.style.display = 'grid';
        grid.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
        grid.innerHTML = ''; // clear previous grid if any

        for (let i = 0; i < cols * rows; i++) {
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
        if (curMole && curMole.style.display === 'block') {
            score++;
            scoreH.textContent = score;
            curMole.style.display = 'none';
        } else if (curMole && curMole.style.display === 'flex') {
            score--;
            scoreH.textContent = score;
            curMole.style.display = 'none';
        }
    }
    function randomMole() {
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
        let interv = difficulty === 'easy'
            ? Math.floor(Math.random() * 1000) + 400
            : difficulty === 'medium'
                ? Math.floor(Math.random() * 800) + 250
                : Math.floor(Math.random() * 650) + 150;
        gameInterval = setTimeout(randomMole, interv);
    }
    function startGame() {
        score = 0;
        scoreH.textContent = score;
        timeD.textContent = timeForm.value;
        clearTimeout(gameInterval);
        randomMole();
        setTimeout(function () {
            clearTimeout(gameInterval);
            let dFactor = difficulty === 'easy' ? 3 : difficulty === 'medium' ? 10 : 15
            alert("Game Over! Final score: " + (score > 0 ? (score * cols * rows * dFactor) : 0));
            game.style.display = 'none';
            menu.style.display = 'block';
        }, timeForm.value * 1000);

    }
    document.querySelectorAll('#easy, #medium, #hard').forEach(function (button) {
        button.addEventListener('click', function () {
            difficulty = button.id;
            innerDiff.textContent = (button.id).charAt(0).toUpperCase() + (button.id).slice(1);
            console.log(difficulty);
        });
    });

    document.getElementById('start-button')
        .addEventListener('click', function () {
            menu.style.display = 'none';
            scoreD.style.display = 'flex';
            game.style.display = 'block';
            createGrid();
            startGame();
            startTimer();
            
        });



});