"use strict";
//canvasを作った(４５０*４５０）
//ブロックを一つ作成
//一つ目のブロックと位置が被らないように2つ目のブロックを作成
//↑その際位置決め用の配列を作成
//⏫を作成
//ボタンを押したら一つ目のブロックが上にスライドする関数を作成
//ボタンを押したら一つ目のブロックが下にスライドする関数を作成
//連なったブロックが重ならないようにスライドするように変更する
//ブロックの中央に数字を乗せる
//配列に入っている数字1を1→2に変更して整える

//同じ数字であれば足してブロックが一つになって上にいく
//空白と上下で同じ数字が無いときはブロックを作成しない
//resetボタンを押したら2が2つある状態からやり直せる
//boardに数値がある状態でGameStartを押しても何も起きない
//下ボタンを押したらブロックが下に移動＋数字を足す（移動も数字を足すこともできないときは何もしない）
//右カーソルを押すとブロックが右に移動＋数字を足す（移動も数字を足すこともできないときは何もしない）
//左カーソルを押すとブロックが左に移動＋数字を足す（移動も数字を足すこともできないときは何もしない）
//挙動の移動ボタンの挙動がおかしいため、修正
//ボタン位置等の修正

//数字が足せなくなったらGameOverと表示する



// //Game画面を用意する
// const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
// ctx.fillStyle = "#ffff00";
// ctx.fillRect(0, 0, canvas.width, canvas.height);

//Gameのボードを用意する
const board = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0]
]
const array = [10,120,230,340];

// Resetボタンを押したらゲーム開始前の画面になる
function reset(){
  for (let x = 0; x < 4; x++){
    for(let y = 0; y < 4; y++){
      board[y][x] = 0;
    }
  }
  gamestart();
}

//最初のブロックの位置を定義(boardに数値が入っているときは動かない)
function gamestart(){
  let counter = 0;
  for (let y = 1; y < 4; y++){
    for (let x = 0; x < 4; x++){
      if (board[y][x] !== 0){
        counter += 1;
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

//ボタンを押すと２のブロックがランダムに作成される
function addBoardNew2(){
  let x2;
  let y2;
  let flag = 0;
  
  do {
    x2 = Math.floor(Math.random() * 4);//0~3
    y2 = Math.floor(Math.random() * 4);//0~3
    if(board[y2][x2] === 0){
      board[y2][x2] = 2;
      flag = 1;
    }
  } while (flag <= 0);

  canvusReflesh();
}

//canvusを初期化して数字の入ったブロックに色をつける
function canvusReflesh(){
  ctx.fillStyle = "#4de7ffff"; //canvas全体の色を指定
  ctx.fillRect(0, 0, canvas.width, canvas.height);//canvasを塗る

  for (let x = 0; x < 4; x++){
    for(let y = 0; y < 4; y++){
      if(board[y][x] > 0){
        const number = board[y][x];
        ctx.fillStyle = "#ffffff";//ブロックの色を指定
        ctx.fillRect(array[x], array[y], 100, 100);//ブロックを塗る

        ctx.font = "40px Arial"; // フォントを指定
        ctx.fillStyle = "black"; // 文字色を指定
        ctx.textAlign = "center"; // 水平方向の中央揃え
        ctx.textBaseline = "middle"; // 垂直方向の中央揃え
        ctx.fillText(number, array[x] + 50, array[y] + 50);//フォントを表示
      }
    }
  }
}

// 上ボタンを押すとブロックが上に移動する
// function upBlock(){
//   for (let x = 0; x < 4; x++){
//     for (let y = 0; y < 4; y++){
//       if (board[y][x] > 0){
//         if(y > 0){
//           for (let i = 1; i <= y; i++){
//             if (board[y - i][x] === 0){
//               board[y - 1][x] = board[y][x];
//               board[y][x] = 0;
//   }}}}}}    
//   canvusReflesh();
// }

// リファクタリング、変更１
// function upBlock(){
//   for (let x = 0; x < 4; x++){
//     for (let y = 1; y < 4; y++){
//       if (board[y][x] === 1){
//         for (let i = y - 1; i > -1; i--){
//             if (board[i][x] === 0){
//               board[i][x] = board[i + 1][x];
//               board[i + 1][x] = 0;
//   }}}}}
//   canvusReflesh();
// }

// リファクタリング、変更２
// function upBlock(){
//   for (let x = 0; x < 4; x++){
//     for (let y = 1; y < 4; y++){
//       if (board[y][x] > 0){
//         for (let i = y - 1; i > -1; i--){
//             if (board[i][x] === 0){
//               console.log(board);
//               board[i][x] = board[i + 1][x];
//               board[i + 1][x] = 0;
//   }}}}}
//   canvusReflesh();
//   addBoardNew2();
// }

//リファクタリング、変更３
console.log(board);
function upBlock(){
    let counter = 0;
    for (let y = 1; y < 4; y++){
        for (let x = 0; x < 4; x++){
            if (board[y][x] > 0){
                for (let i = y - 1; i > -1; i--){
                    if (board[i][x] === 0){
                        board[i][x] = board[i + 1][x];
                        board[i + 1][x] = 0;
                        counter += 1;
                    }else if (board[i][x] === board[i + 1][x]){
                        board[i][x] = board[i + 1][x] * 2;
                        board[i + 1][x] = 0;
                        counter += 1; 
    }}}}}
    if(counter !== 0){
        addBoardNew2();
    }                 
}

//リファクタリング、変更１
function downBlock(){
  let counter = 0;
  for (let y = 2; y > -1; y--){
    for (let x = 0; x < 4; x++){
      if (board[y][x] > 0){
        for (let i = y + 1; i < 4; i++){
            if (board[i][x] === 0){
              board[i][x] = board[i - 1][x];
              board[i - 1][x] = 0;
              counter += 1;
            }else if (board[i][x] === board[i - 1][x]){
              board[i][x] = board[i - 1][x] * 2;
              board[i - 1][x] = 0;
              counter += 1; 
            }}}}}
  if(counter !== 0){
    addBoardNew2();
  }                 
}

//右ボタンを押すとブロックが右に移動する
function rightBlock(){
  let counter = 0;
  for (let x = 2; x > -1; x--){
    for (let y = 0; y < 4; y++){
      if (board[y][x] > 0){
        for (let i = x + 1; i < 4; i++){
            if (board[y][i] === 0){
              board[y][i] = board[y][i - 1];
              board[y][i - 1] = 0;
              counter += 1;
            }else if (board[y][i] === board[y][i - 1]){
              board[y][i] = board[y][i - 1] * 2;
              board[y][i - 1] = 0;
              counter += 1; 
            }}}}}
  if(counter !== 0){
    addBoardNew2();
  }                 
}

//左ボタンを押すとブロックが左に移動する
function leftBlock(){
  let counter = 0;
  for (let y = 0; y < 4; y++){
    for (let x = 1; x < 4; x++){
      if (board[y][x] > 0){
        for (let i = x - 1; i > -1; i--){
            if (board[y][i] === 0){
              board[y][i] = board[y][i + 1];
              board[y][i + 1] = 0;
              counter += 1;
            }else if (board[y][i] === board[y][i + 1]){
              board[y][i] = board[y][i + 1] * 2;
              board[y][i + 1] = 0;
              counter += 1; 
            }}}}}
  if(counter !== 0){
    addBoardNew2();
  }                 
}
