"use strict"

let scores = 0;
let timeDiv=document.createElement("div");
let scoreDiv=document.createElement("div");
let subDiv=document.createElement("div");
createra();
timer();

let board = document.createElement("div")
let raport = document.createElement("div")
var subRestDiv = document.getElementById("subRest");
raport.classList.add("re")
board.classList.add("board-container")
let mat = []
let numOfSubDivs = 0;
let sub = 5;
console.log(localStorage.getItem("user"));

let mat_img_1 = [5];
mat_img_1[0] = ["./images/yo/yo1.png", "./images/yo/yo2.png",
    "./images/yo/yo3.png", "./images/yo/yo4.png"];
mat_img_1[1] = ["./images/ro/ro1.png", "./images/ro/ro2.png", "./images/ro/ro3.png"]
mat_img_1[2] = ["./images/bo/bo1.png", "./images/bo/bo2.png", "./images/bo/bo3.png"]
mat_img_1[3] = ["./images/oo/oo1.png", "./images/oo/oo2.png"]
mat_img_1[4] = ["./images/obo/obo1.png"]

let mat_img_2 = [5];
mat_img_1[0] = ["./images/yr/yr1.png", "./images/yr/yr2.png",
    "./images/yr/yr3.png", "./images/yr/yr4.png"];
mat_img_1[1] = ["./images/rr/rr1.png", "./images/rr/rr2.png", "./images/rr/rr3.png"]
mat_img_1[2] = ["./images/br/br1.png", "./images/br/br2.png", "./images/br/br3.png"]
mat_img_1[3] = ["./images/or/or1.png", "./images/or/or2.png"]
mat_img_1[4] = ["./images/obr/obr1.png"]


let letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
let i = 0;
let j = 0;
let x;
for (i = 0; i < 12; i++) {
    mat[i] = [];
    for (j = 0; j < 12; j++) {
        mat[i][j] = document.createElement("button");
        let s = mat[i][j];
        if((i!=0&&j!=0&&i!=11&&j!=11)){
        mat[i][j].classList.add("square");}
        else{
            mat[i][j].classList.add("notsquare");
        }

        mat[i][j].id = i + "" + j;
        if (i > 0 && i < 11 || j > 0 && j < 11) {
            mat[i][j].addEventListener("click", click);
        }
        if (i == 11 || j == 11 || i == 0 || j == 0) {
            if (i == 0)
                mat[i][j].classList.add("side");

            if (i > 0 && j > 0) {
                if (i == 11 && j != 11 || i == 0 && j != 0) {
                    mat[i][j].innerHTML = letters[j - 1];
                    mat[i][j].classList.add("side");
                }
            }
            if (j == 0)
                mat[i][j].classList.add("line")
            if (j > 0 && i > 0) {
                if (j == 11 && i != 11 || j == 0 && i != 0) {
                    mat[i][j].innerHTML = numbers[i - 1];
                    mat[i][j].classList.add("line");
                }
            }
            if (i == 11 && j == 11 || i == 0 && j == 0) {
                mat[i][j].classList.add("side");
            }
        }
        board.appendChild(mat[i][j]);
    }
}
let cnt = 0;
document.body.appendChild(board);
document.body.appendChild(raport);
raport.classList.add("re");
board.classList.add("boar-container");
const seq = [4, 3, 3, 2, 1];
let place = [5];
let placeOfSub = [5];
for (let i = 0; i < 5; i++) {
    place[i] = [31];
    place[i][0] = seq[i];
    placeOfSub[i] = [12];
}

let cntSub = [5];
for (let k = 0; k < 5; k++) {
    cntSub[k] = 0;
}
randoms();
//רינדומים

function randoms() {

    for (let i = 0; i < seq.length; i++) {
        //רינדום מיקום ראשוני של צוללת
        let ran1 = (Math.random() * 9) + 1;
        ran1 = parseInt(ran1);
        let ran2 = (Math.random() * 9) + 1;
        ran2 = parseInt(ran2);
        // העברה לבדיקה האם המיקום כבר מוגדר או שכן של מיקום מוגדר
        mat[ran1][ran2].classList.add("check");
        let flag = 0;

        if (mat[ran1][ran2].classList.contains("sub")) {
            flag = 1;
        }
        for (let j = -1; j < 2; j++) {
            if (mat[ran1 + j][ran2 + 1].classList.contains("sub") || mat[ran1 + j][ran2 - 1].classList.contains("sub")) {
                flag = 1;
            }
        }
        if (mat[ran1 + 1][ran2].classList.contains("sub") || mat[ran1 - 1][ran2].classList.contains("sub")) {
            flag = 1;
        }
        if (flag == 1) {
            i--;
            mat[ran1][ran2].classList.remove("check");
        }
        else {
            mat[ran1][ran2].classList.remove("check");
            down(ran1, ran2, i);
        }
    }
    for (let b = 0; b < 12; b++) {
        mat[0][b].classList.add("neigh");
        mat[b][0].classList.add("neigh");
    }

     console.log(place);
     console.log(placeOfSub);
}
function down(in1, in2, i) {
    let flag = 0;
    if ((in1 + seq[i]) >= 10) {
        left(in1, in2, i)
    }
    else {
        for (let k = 0; k <= seq[i]; k++) {
          //  console.log("down", in1, in2, "seq", seq[i]);
            if (mat[in1 + k][in2].classList.contains("sub")) {
                flag = 1;
            }
            if (mat[in1 + k][in2 + 1].classList.contains("sub") || mat[in1 + k][in2 - 1].classList.contains("sub")) {
                flag = 1;
            }
            if (k == seq[i] - 1) {
                if (mat[in1 + k + 1][in2 + 1].classList.contains("sub") || mat[in1 + k + 1][in2 - 1].classList.contains("sub") ||
                    mat[in1 + k + 1][in2].classList.contains("sub"))
                    flag = 1;
            }
        }
        let dir = [-1, 0, 1];
        if (flag == 0) {
            for (let v = (7 + seq[i] * 4); v < 30; v++) {
                place[i][v] = 0;
            }
            for (let v = (seq[i] * 2 - 1); v < 11; v++) {
                placeOfSub[i][v] = 0;
            }
            place[i][30] = i;
            place[i][1] = (1);
            for (let k = 0; k < 6; k++) {
                place[i][2 + k] = (in1 - 1);
                ++k;
                place[i][2 + k] = (in2 + dir[Math.floor(k / 2)]);
            }
            placeOfSub[i][11] = i;
            for (let k = 0; k < seq[i]; k++) {
                mat[in1 + k][in2].classList.add("sub");
                numOfSubDivs++;
                placeOfSub[i][k * 2] = (in1 + k);
                placeOfSub[i][k * 2 + 1] = in2;
            }



            for (let k = 0; k < seq[i]; k++) {
                place[i][8 + k * 4] = (in1 + k);
                place[i][9 + k * 4] = (in2 + 1);
                place[i][10 + k * 4] = (in1 + k);
                place[i][11 + k * 4] = (in2 - 1);

            }
            for (let k = 0; k < 6; k++) {
                place[i][8 + seq[i] * 4 + k] = (in1 + seq[i]);
                ++k;
                place[i][8 + seq[i] * 4 + k] = (in2 + dir[Math.floor(k / 2)]);
            }
          //  console.log(place[i]);
        }
        else {
            left(in1, in2, i)
        }
    }
}

function left(in1, in2, i) {//v
    let flag = 0;

    if ((in2 + seq[i]) > 10) {
        up(in1, in2, i)
    }
    else {
        for (let k = 0; k <= seq[i]; k++) {
    
            if (mat[in1][in2 + k].classList.contains("sub")) {
                flag = 1;
            }
            if (mat[in1 + 1][in2 + k].classList.contains("sub") || mat[in1 - 1][in2 + k].classList.contains("sub")) {
                flag = 1;
            }
            if (k == seq[i] - 1) {
                if (mat[in1 + 1][in2 + k + 1].classList.contains("sub") || mat[in1 - 1][in2 + k + 1].classList.contains("sub") || mat[in1][in2 + k + 1].classList.contains("sub"))
                    flag = 1;
            }
        }
        let dir = [-1, 0, 1];
        place[i][1] = 2;

        if (flag == 0) {
            for (let v = (7 + seq[i] * 4); v < 30; v++) {
                place[i][v] = 0;
            }
            for (let v = (seq[i] * 2 - 1); v < 11; v++) {
                placeOfSub[i][v] = 0;
            }
            place[i][30] = i;
            for (let k = 0; k < 6; k++) {
                place[i][2 + k] = (in1 + dir[Math.floor(k / 2)]);
                k++;
                place[i][2 + k] = (in2 - 1);
            } place[i][1] = 2;
            placeOfSub[i][11] = i;
            for (let k = 0; k < seq[i]; k++) {
                mat[in1][in2 + k].classList.add("sub")
                numOfSubDivs++;
                placeOfSub[i][k * 2] = (in1);
                placeOfSub[i][k * 2 + 1] = (in2 + k);
            }
            for (let k = 0; k < seq[i]; k++) {
                place[i][8 + k * 4] = (in1 + 1);
                place[i][9 + k * 4] = (in2 + k);
                place[i][10 + k * 4] = (in1 - 1);
                place[i][11 + k * 4] = (in2 + k);
            }
            for (let k = 0; k < 6; k++) {
                place[i][8 + seq[i] * 4 + k] = (in1 + dir[Math.floor(k / 2)]);
                ++k;
                place[i][8 + seq[i] * 4 + k] = (in2 + seq[i]);
            }
     
        }
        else {
            up(in1, in2, i);
        }
    }
}

function up(in1, in2, i) {

    let flag = 0;
    if ((in1 - seq[i]) < 1) {
        right(in1, in2, i)
    } else {
        for (let k = 0; k <= seq[i]; k++) {

            if (mat[in1 - k][in2].classList.contains("sub")) {
                flag = 1;
                break;
            }
            if (mat[in1 - k][in2 + 1].classList.contains("sub") || mat[in1 - k][in2 - 1].classList.contains("sub")) {
                flag = 1;
                break;
            }
            if (k == seq[i] - 1) {

                if (mat[in1 - k][in2 + 1].classList.contains("sub") || mat[in1 - k][in2 - 1].classList.contains("sub") || mat[in1 - k][in2].classList.contains("sub"))
                    flag = 1;
            }
        }

        let dir = [-1, 0, 1];
        if (flag == 0) {
            place[i][1] = 1;
            for (let v = (7 + seq[i] * 4); v < 30; v++) {
                place[i][v] = 0;
            }
            for (let v = (seq[i] * 2 - 1); v < 11; v++) {
                placeOfSub[i][v] = 0;
            }
            place[i][30] = i;
            for (let k = 0; k < 6; k++) {
                place[i][2 + k] = (in1 + 1);
                k++;
                place[i][2 + k] = (in2 + dir[Math.floor(k / 2)]);
            } placeOfSub[i][11] = i;
            for (let k = 0; k < seq[i]; k++) {
                mat[in1 - k][in2].classList.add("sub")
                numOfSubDivs++;
                placeOfSub[i][k * 2] = (in1 - k);
                placeOfSub[i][k * 2 + 1] = in2;
            }
            for (let k = 0; k < seq[i]; k++) {
                place[i][8 + k * 4] = (in1 - k);
                place[i][9 + k * 4] = (in2 + 1);
                place[i][10 + k * 4] = (in1 - k);
                place[i][11 + k * 4] = (in2 - 1);
            }
            for (let k = 0; k < 6; k++) {
                place[i][8 + seq[i] * 4 + k] = (in1 - seq[i]);
                ++k;
                place[i][8 + seq[i] * 4 + k] = (in2 + dir[Math.floor(k / 2)]);
            }
        }
        else {
            right(in1, in2, i);
        }
    }
}

function right(in1, in2, i) {
    let flag = 0;
    if (in2 + seq[i] >= 10) {
        i--;
    }
    else {
        for (let k = 0; k <= seq[i]; k++) {

            if (mat[in1][in2 + k].classList.contains("sub")) {
                flag = 1;
            }
            if (mat[in1 + 1][in2 + k].classList.contains("sub") || mat[in1 - 1][in2 + k].classList.contains("sub")) {
                flag = 1;
            }
            if (k == seq[i] - 1) {
                if (mat[in1 + 1][in2 + k + 1].classList.contains("sub") || mat[in1 - 1][in2 + k + 1].classList.contains("sub") || mat[in1][in2 + k + 1].classList.contains("sub"))
                    flag = 1;
            }
        }
        let dir = [-1, 0, 1];
        if (flag == 0) {
            for (let v = (7 + seq[i] * 4); v < 30; v++) {
                place[i][v] = 0;
            }
            for (let v = (seq[i] * 2 - 1); v < 11; v++) {
                placeOfSub[i][v] = 0;
            }
            place[i][1] = 2;
            place[i][30] = i;
            for (let k = 0; k < 6; k++) {
                place[i][2 + k] = (in1 + dir[Math.floor(k / 2)]);
                k++;
                place[i][2 + k] = (in2 + 1);
            } placeOfSub[i][11] = i;
            for (let k = 0; k < seq[i]; k++) {

                mat[in1][in2 - k].classList.add("sub");
                numOfSubDivs++;
                placeOfSub[i][k * 2] = (in1);
                placeOfSub[i][k * 2 + 1] = (in2 - k);
            }
            for (let k = 0; k < seq[i]; k++) {
                place[i][8 + k * 4] = (in1 + 1);
                place[i][9 + k * 4] = (in2 - k);
                place[i][10 + k * 4] = (in1 - 1);
                place[i][11 + k * 4] = (in2 - k);
            }
            for (let k = 0; k < 6; k++) {
                place[i][8 + seq[i] * 4 + k] = (in1 + dir[Math.floor(k / 2)]);
                ++k;
                place[i][8 + seq[i] * 4 + k] = (in2 - seq[i]);
            }
       
        }
        else {
            i--
        }
    }
}

if (numOfSubDivs < 13) {
    console.log("not good");
    location.reload();
}
else {
    console.log("okkkkkk");
}
function click(event) {
   // console.log(event.target);

    let point = event.target.id;
    let coll = point % 10;
    let row = point / 10;

    if (parseInt(point / 100) > 0) {
        if (point % 100 == 10) {
            row = point / 100;
            coll = point % 100;
        }
        else {
            row = point / 10;
            coll = point % 10;
        }
    }
    row = parseInt(row);

    let a = [-1, 1, -1, 1];
    let b = [-1, -1, 1, 1];

    let c = [-1, 1, -1, 1, -1, 1, 0, 0];
    let d = [-1, -1, 1, 1, 0, 0, -1, 1];

    if (mat[row][coll].classList.contains("sub")) {
        mat[row][coll].innerHTML="⚫";
        for (let k = 0; k < a.length; k++) {
            if (!(mat[row + a[k]][coll + b[k]].classList.contains("side") || mat[row + a[k]][coll + b[k]].classList.contains("line"))) {
                mat[row + a[k]][coll + b[k]].innerHTML = "✔️";
                mat[row + a[k]][coll + b[k]].classList.add("neigh");

            }
        } scores += 20;
        checkIfSub();
    } else {
        
            if((row!=0 && coll!=0 && row!=11 && coll!=11)){
                scores += 2;
                mat[row][coll].innerHTML = "❌";
            }
        
    }
    for (let l = 0; l < c.length; l++) {
        if (mat[row + c[l]][coll + d[l]].classList.contains("sub") && !mat[row][coll].classList.contains("sub")) {
            mat[row][coll].innerHTML = "✔️";
            scores += 2;
            mat[row][coll].classList.add("neigh");

        }
     }
    scoreDiv.innerHTML="score: " + scores;
    checkIfSub();

}
async function checkIfSub() {

    for (let l = 0; l < 5; l++) {

        let flag = 1;
       
        for (let m = 2; m < (13 + place[l][0] * 4); m++) {
            if (!(mat[place[l][m]][place[l][m + 1]].classList.contains("neigh"))) {
                flag = 0;
            } ++m;
        }
        if (flag == 1) {
            if(cntSub[l]==0){
            sub--;
            subDiv.innerHTML="rest submarins: "+sub;
           
            
            cntSub[placeOfSub[l][11]] = 1;
            if (place[l][0] == 1) {
                await showImage((placeOfSub[l][0]),(placeOfSub[l][1]))
                mat[placeOfSub[l][0]][placeOfSub[l][1]].style.backgroundImage = "url(./images/obr/obr1.png)";
            }
            else {
                if (place[l][1] == 1) {
                    
                    if (placeOfSub[l][0] < placeOfSub[l][2]) {
                        
                        for (let s = 0; s < (seq[l] * 2 - 1); s += 2) {
                             await showImage((placeOfSub[l][s]),(placeOfSub[l][s + 1]));
                            mat[placeOfSub[l][s]][placeOfSub[l][s + 1]].style.backgroundImage = `url(${mat_img_1[placeOfSub[l][11]][Math.floor(s / 2)]})`;
                            mat[placeOfSub[l][s]][placeOfSub[l][s + 1]].style.backgroundSize = "cover"
                            mat[placeOfSub[l][s]][placeOfSub[l][s + 1]].classList.add("opo");

                        }
                    } else {
                        
                        for (let s = 0; s < (seq[l] * 2 - 1); s += 2) {
                            await  showImage((placeOfSub[l][s]),(placeOfSub[l][s + 1]));
                            mat[placeOfSub[l][s]][placeOfSub[l][s + 1]].style.backgroundImage = `url(${mat_img_1[placeOfSub[l][11]][(seq[l] * 2 - seq[l]-1) - Math.floor(s / 2)]})`;                  
                            mat[placeOfSub[l][s]][placeOfSub[l][s + 1]].style.backgroundSize = "cover"
                            mat[placeOfSub[l][s]][placeOfSub[l][s + 1]].classList.add("opo");
                            // console.log((placeOfSub[l][11]), "&", ((seq[l] * 2 - seq[l]) - Math.floor(s / 2)));

                        }
                    }
                } else {
                    if (placeOfSub[l][1] > placeOfSub[l][3]) {
                        
                        for (let s = 0; s < (seq[l] * 2 - 1); s += 2) {
                          await showImage((placeOfSub[l][s]),(placeOfSub[l][s + 1]));
                            mat[placeOfSub[l][s]][placeOfSub[l][s + 1]].style.backgroundImage = `url(${mat_img_1[placeOfSub[l][11]][Math.floor(s / 2)]})`;
                            mat[placeOfSub[l][s]][placeOfSub[l][s + 1]].style.backgroundSize = "cover"
                      //      console.log(1);
                        }
                    } else {
                       
                        for (let s = 0; s < (seq[l] * 2 - 1); s += 2) {
                            await showImage((placeOfSub[l][s]),(placeOfSub[l][s + 1]));
                            mat[placeOfSub[l][s]][placeOfSub[l][s + 1]].style.backgroundImage = `url(${mat_img_1[placeOfSub[l][11]][(seq[l] * 2 - seq[l]-1) - Math.floor(s / 2)]})`;
                            mat[placeOfSub[l][s]][placeOfSub[l][s + 1]].style.backgroundSize = "cover"
                          //  console.log((placeOfSub[l][11]), "&", ((seq[l] * 2 - seq[l]) - Math.floor(s / 2)));
                        }
                    }
                }
            }
        } }
      
    }
}

function relocalst(){
    if(localStorage.getItem("max1") == null){
        localStorage.setItem("max3", 0);
        localStorage.setItem("max2", 0);
        localStorage.setItem("max1", 0);

        localStorage.setItem("level3", 0);
        localStorage.setItem("level2", 0);
        localStorage.setItem("level1", 0);

        localStorage.setItem("name3", "player");
        localStorage.setItem("name2", "player");
        localStorage.setItem("name1", "player");
    }
    
}

function getCurrentScore(level) {
    localStorage.setItem("currentScore", scores);
    localStorage.setItem("level", level);
    console.log(localStorage.getItem("user"));

    let a = parseInt(localStorage.getItem("currentScore"));
    let b = parseInt(localStorage.getItem("max1"));
    let c = parseInt(localStorage.getItem("max2"));
    let d = parseInt(localStorage.getItem("max3"));

    // if the score is minimal
    if (a < b  || b == 0) {

        localStorage.setItem("max3", localStorage.getItem("max2"));
        localStorage.setItem("max2", localStorage.getItem("max1"));
        localStorage.setItem("max1", localStorage.getItem("currentScore"));

        localStorage.setItem("level3", localStorage.getItem("level2"));
        localStorage.setItem("level2", localStorage.getItem("level1"));
        localStorage.setItem("level1", localStorage.getItem("level"));

        localStorage.setItem("name3", localStorage.getItem("name2"));
        localStorage.setItem("name2", localStorage.getItem("name1"));
        localStorage.setItem("name1", localStorage.getItem("user"));


    }
    // if the score is bigger than the 2nd storage value
    else if (a < c || c == 0) {

        localStorage.setItem("max3", localStorage.getItem("max2"));
        localStorage.setItem("max2", localStorage.getItem("currentScore"));

        localStorage.setItem("level3", localStorage.getItem("level2"));
        localStorage.setItem("level2", localStorage.getItem("level"));

        localStorage.setItem("name3", localStorage.getItem("name2"));
        localStorage.setItem("name2", localStorage.getItem("user"));

    }
    // if yhe score is bigger than the 3rd value
    else if (a < d || d == 0) {
        localStorage.setItem("max3", localStorage.getItem("currentScore"));

        localStorage.setItem("level3", localStorage.getItem("level"));

        localStorage.setItem("name3", localStorage.getItem("user"));
    }

}


function timer() {

    var timeLeft = 60;
    var timer = setInterval(function () {
        timeDiv.innerHTML=("rest time: " +"00:"+timeLeft);
        let flag1 = 1;
        for (let k = 0; k < 5; k++) {
            if (cntSub[k] == 0) {
                flag1 = 0;
            }
        }
        timeLeft--;

        if ((timeLeft < 0) || flag1 == 1) {

            randoms();
            clearInterval(timer);

             console.log("cntSub"+cntSub);
            relocalst();

            if (flag1 == 1) {
                gameWin();
            }
            else {
                endGame();
            }
        }


    }, 1000);
}


function endGame() {

    getCurrentScore(0);

    document.getElementById("win").innerText =  `${localStorage.getItem('user')}
    ${""}
    There are submarines that you haven't discovered!`;
    document.getElementById("win").style='font-size:5vh;';

    document.getElementById("newGame").textContent="play again"
    
              document.querySelector(".over").style.display = "none";
         document.querySelector(".end").style.display = "block";
     setTimeout(
        function open(event) {
   
    let LinkbackToHome = document.createElement("a");
    let backToHome = document.createElement("button");
    document.getElementsByClassName('end')[0].appendChild(LinkbackToHome);
    LinkbackToHome.appendChild(backToHome);
    backToHome.textContent = 'home';
    LinkbackToHome.href = "./homePage.html"
    backToHome.id = 'back_to_home';

     }, 0);
}

function gameWin() {

    let level = (10 - (Math.floor(scores / 100)));
    getCurrentScore(level);
    console.log("winwinwin");
    document.getElementById("win").innerText = `You discovered all the submarines!!!
    ${document.getElementById("name1").innerHTML = localStorage.getItem("user")} 
    score: ${document.getElementById("score").innerHTML = scores}
    level: ${level}
    
    place 1: ${localStorage.getItem("level1")} ${localStorage.getItem("max1")} ${localStorage.getItem("name1")}
    place 2: ${localStorage.getItem("level2")} ${localStorage.getItem("max2")} ${localStorage.getItem("name2")}
    place 3: ${localStorage.getItem("level3")} ${localStorage.getItem("max3")} ${localStorage.getItem("name3")}`;
    document.getElementById("win").style='font-size:3vh;';
    setTimeout(
        function open(event) {
            document.querySelector(".end").style.display = "block";
            let LinkbackToHome = document.createElement("a");
            let backToHome = document.createElement("button");
            document.getElementsByClassName('end')[0].appendChild(LinkbackToHome);
            LinkbackToHome.appendChild(backToHome);
            backToHome.textContent = 'home';
            LinkbackToHome.href = "./homePage.html"
            backToHome.id = 'back_to_home';
        }, 2000)
}


function getuser() {
    
    if(localStorage.getItem('user') == null){
        localStorage.setItem('user',"player");
    }
    else{
        document.getElementById("name1").innerHTML = localStorage.getItem("user");
    }
    
}

function createra(){
let reoDiv=document.createElement("div");
reoDiv.id="reo";
document.body.appendChild(reoDiv);
let nameDiv=document.createElement("div");
reoDiv.appendChild(nameDiv);
nameDiv.id="name2";
nameDiv.textContent= localStorage.getItem("user");
reoDiv.appendChild(timeDiv);
timeDiv.id = "time";
timeDiv.textContent= "rest time: "+"00:00"; 
reoDiv.appendChild(scoreDiv);
scoreDiv.id="scor"
scoreDiv.textContent="score: "+"0";
reoDiv.appendChild(subDiv);
subDiv.id="subm";
subDiv.textContent="rest subnarines: "+5;

}
  async function showImage(y, x) {
        mat[y][x].innerHTML = "";

        mat[y][x].style.backgroundImage = "url(./videos/boom2.gif)";
        let sound = new Audio('notset.mp3');
        sound.play();

        await new Promise((resolve) => setTimeout(resolve, 600));
      }
