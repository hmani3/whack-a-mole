window.addEventListener('load', function () {
    let score;
    let curMole = null;
    let gameInterval;
    const grid = document.querySelector('.grid');
    const scoreH = document.getElementById('score');
    const scoreD = document.getElementById('score-display')
    const columnForm = document.getElementById('columns');
    const rowForm = document.getElementById('rows');
    const startButton = document.getElementById('start-button');
    const menu = document.getElementById('main-menu');
    startButton.disabled = true;

    function validIn() {
        const val1 = parseFloat(columnForm.value);
        const val2 = parseFloat(rowForm.value);
        const valid1 = !isNaN(val1) && val1 >= parseFloat(columnForm.min) && val1 <= parseFloat(columnForm.max);
        const valid2 = !isNaN(val2) && val2 >= parseFloat(rowForm.min) && val2 <= parseFloat(rowForm.max);
        startButton.disabled = !(valid1 && valid2);
    }

    columnForm.addEventListener('input', validIn);
    rowForm.addEventListener('input', validIn);

    // document.getElementsByClassName('dropdown')
    // function dropdown() {
    // }


    function createGrid() {
        const columns = columnForm.value; // replace x with your desired column count
        const rows = rowForm.value;    // replace y with your desired row count

        // Optionally, set grid style to display as a grid with the correct number of columns
        grid.style.display = 'grid';
        grid.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
        grid.innerHTML = ''; // clear previous grid if any

        for (let i = 0; i < columns * rows; i++) {
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
        gameInterval = setTimeout(randomMole, Math.floor(Math.random() * 300) + 400);
    }
    function startGame() {
        score = 0;
        scoreH.textContent = score;
        clearTimeout(gameInterval);
        randomMole();
        
    }

    document.getElementById('start-button')
        .addEventListener('click', function () {
            menu.style.display = 'none';
            scoreD.style.display = 'block';
            createGrid();
            startGame();
        });


});