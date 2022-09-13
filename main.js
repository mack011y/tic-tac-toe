const play_polygon = document.getElementById('play_polygon');
const cell = document.getElementsByClassName('cell');
const status = document.getElementById('status');
const btn = document.getElementById('btn');


let Players = ['X', 'O'], NowPlayer = 0;
let game = 1;

for (let i = 0; i < 9; i++){
    play_polygon.innerHTML += "<div class='cell' pos='" + i + "'></div>";
}

let VictoryPos = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
let map_state = [[0, 0, 0],
                 [0, 0, 0],
                 [0, 0, 0]]

function CLickOnCell(id){
    if (map_state[Math.floor(id / 3)][id % 3] || game === 0){
        return;
    }
    map_state[Math.floor(id / 3)][id % 3] = NowPlayer + 1;
    cell[id].innerHTML = Players[NowPlayer];
    if (CheckWin()){
        status.innerHTML = "WIN " + Players[NowPlayer];
        for (let i = 0; i < 3; i++){
            for (let j = 0; j < 3; j++){
                map_state[i][j] = 1;
            }
        }
        game = 0;
    }
    else{
        if (CheckDrow()){
            status.innerHTML = "DRAW";
            game = 0;
        }
    }
    NowPlayer += 1;
    NowPlayer %= 2;
    if (game === 1){
        status.innerHTML = "Ходит " + Players[NowPlayer];
    }
}

function CLickOnRestart(){
    window.location.reload();
}

function CheckWin(){
    for (let el of VictoryPos) {
        let tmp = map_state[Math.floor(el[0] / 3)][el[0] % 3]
        for (let i of el) {
            if (tmp !== map_state[Math.floor(i / 3)][i % 3] || !tmp) {
                tmp = -1
            }
        }
        if (tmp !== -1) {
            game = 0;
            return true;
        }
    }
    return false;
}

function CheckDrow(){
    let tmp = 1;
    for (let i = 0; i < 3; i++){
        for (let j = 0; j < 3; j++){
            if (map_state[i][j] === 0){
                tmp = 0;
            }
        }
    }
    return tmp === 1;
}

for (let i = 0; i < cell.length; i++){
    cell[i].addEventListener('click', () => CLickOnCell(i));
}

btn.addEventListener('click', CLickOnRestart);
