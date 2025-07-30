"use strict";

const ctx = canvas.getContext("2d");

const board = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0]
]
const array = [10,120,230,340];

function addOne(num){
  return num += 1;
}

function reset() {
  let counter = 0;
  for (let x = 0; x < 4; x++){
    for(let y = 0; y < 4; y++){
      if (board[y][x] !== 0){
        counter = addOne(counter);
      }
      board[y][x] = 0;
    }
  }
  if (counter >= 1){
    gamestart();
  }
}

function gamestart(){
  let counter = 0;
  for (let y = 1; y < 4; y++){
    for (let x = 0; x < 4; x++){
      if (board[y][x] !== 0){
        counter = addOne(counter);
      }
    }
  }
  if(counter === 0){
    let xPosition = Math.floor(Math.random() * 4);//0
    let yPosition = Math.floor(Math.random() * 4);//2
    board[yPosition][xPosition] = 2;
    addBoardNew2();
  }
}

function addBoardNew2(){
  let x2;
  let y2;
  let flag = 0;
  
  do {
    x2 = Math.floor(Math.random() * 4);
    y2 = Math.floor(Math.random() * 4);
    if(board[y2][x2] === 0){
      board[y2][x2] = 2;
      flag = 1;
    }
  } while (flag <= 0);

  canvusReflesh();
}

function canvusReflesh(){
  ctx.fillStyle = "rgb(213, 213, 213)"; 
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  for (let x = 0; x < 4; x++) {
    for (let y = 0; y < 4; y++) {
      if (board[y][x] > 0){
        const number = board[y][x];
        if (number === 2){
          ctx.fillStyle = "#ffe9bcff";
        } else if (number === 4){
          ctx.fillStyle = "#f1fcbcff";
        } else if (number === 8){
          ctx.fillStyle = "#d4ffbfff";
        } else if (number === 16){
          ctx.fillStyle = "#bfffc9ff";
        } else if (number === 32){
          ctx.fillStyle = "#c0ffeaff";
        } else if (number === 64){
          ctx.fillStyle = "#bff4ffff";
        } else if (number === 128){
          ctx.fillStyle = "#bcd2fdff";
        } else if (number === 256){
          ctx.fillStyle = "#cfc6ffff";
        } else if (number === 512){
          ctx.fillStyle = "#eac0ffff";
        }  else if (number === 1024){
          ctx.fillStyle = "#ffbdf4ff";
        } else if (number === 2048){
          ctx.fillStyle = "#ffc3d7ff";
        }
        ctx.fillRect(array[x], array[y], 100, 100);
        ctx.font = "40px Arial"; 
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText (number, array[x] + 50, array[y] + 50);
      }
    }
  }
}

function upBlock(){
    let counter = 0;
    for (let y = 1; y < 4; y++){
        for (let x = 0; x < 4; x++){
            if (board[y][x] > 0){
                for (let i = y - 1; i > -1; i--){
                    if (board[i][x] === 0){
                        board[i][x] = board[i + 1][x];
                        board[i + 1][x] = 0;
                        counter = addOne(counter);
                    }else if (board[i][x] === board[i + 1][x]){
                        board[i][x] = board[i + 1][x] * 2;
                        board[i + 1][x] = 0;
                        counter = addOne(counter);
    }}}}}
    if(counter !== 0){
        addBoardNew2();
    }                 
}

document.body.addEventListener("keydown",(e) => {
  if (e.key === "ArrowUp"){
    upBlock();
  } else if (e.key === "ArrowDown"){
    downBlock();
  } else if (e.key === "ArrowRight"){
    rightBlock();
  } else if (e.key === "ArrowLeft"){
    leftBlock();
  }
});

function downBlock(){
  let counter = 0;
  for (let y = 2; y > -1; y--){
    for (let x = 0; x < 4; x++){
      if (board[y][x] > 0){
        for (let i = y + 1; i < 4; i++){
            if (board[i][x] === 0){
              board[i][x] = board[i - 1][x];
              board[i - 1][x] = 0;
              counter = addOne(counter);
            }else if (board[i][x] === board[i - 1][x]){
              board[i][x] = board[i - 1][x] * 2;
              board[i - 1][x] = 0;
              counter = addOne(counter); 
            }}}}}
  if(counter !== 0){
    addBoardNew2();
  }                 
}

function rightBlock(){
  let counter = 0;
  for (let x = 2; x > -1; x--){
    for (let y = 0; y < 4; y++){
      if (board[y][x] > 0){
        for (let i = x + 1; i < 4; i++){
            if (board[y][i] === 0){
              board[y][i] = board[y][i - 1];
              board[y][i - 1] = 0;
              counter = addOne(counter);
            }else if (board[y][i] === board[y][i - 1]){
              board[y][i] = board[y][i - 1] * 2;
              board[y][i - 1] = 0;
              counter = addOne(counter); 
            }}}}}
  if(counter !== 0){
    addBoardNew2();
  }                 
}

function leftBlock(){
  let counter = 0;
  for (let y = 0; y < 4; y++){
    for (let x = 1; x < 4; x++){
      if (board[y][x] > 0){
        for (let i = x - 1; i > -1; i--){
            if (board[y][i] === 0){
              board[y][i] = board[y][i + 1];
              board[y][i + 1] = 0;
              counter = addOne(counter);
            }else if (board[y][i] === board[y][i + 1]){
              board[y][i] = board[y][i + 1] * 2;
              board[y][i + 1] = 0;
              counter = addOne(counter); 
            }}}}}
  if(counter !== 0){
    addBoardNew2();
  }                 
}
