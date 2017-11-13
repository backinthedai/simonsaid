
const darkcolors = {
    darkgreen: "rgb(0, 100, 0)",
    darkred: "rgb(139, 0, 0)",
    darkyellow: "rgb(184, 134, 11)",
    darkblue: "rgb(0, 0, 139)"
};

const lightcolors = {
    lightgreen: "rgb(144, 238, 144)",
    lightred: "rgb(240, 128, 128)",
    lightyellow: "rgb(255, 255, 224)",
    lightblue: "rgb(173, 216, 230)"
}

var rangeValues =
    {
        "1": "TOO EASY...",
        "2": "BRING IT ON!!",
        "3": "COME GET SOME!!!",
        "4": "WELL DONE!!!"
    };

let gameLevel = {
    "EASY": 4,
    "MID": 8,
    "HARD": 11
}


/* Set title */
let rangeText = document.getElementById("rangeText");
rangeText.innerHTML = rangeValues[1]; /* Set default slider text Value */

const countText = document.getElementById("countText");
const failText = document.getElementById("failText");

const startBtn = document.getElementById("start-btn");
const btnParent = document.getElementById("btn-parent");
const modeBtn = document.getElementById("mode-btn");
const totalNotesLbl = document.getElementById("total-notes");

let counter = 0;
let failCounter = 0;
let totalTurns = 20;
let totalTonesPerTurn = [];
let timeout, delay; // id for setTimeout
let tobeMatch = []; //store ai random set 
let toMatch = []; //store human clicks
let humanIdx = 0; //idx for human clicks
let failed = false;

//prefill random value to each index. Each value will be the numbers of tones to play

const setGameMode = (mode) => {
    totalTonesPerTurn.length = 0;
    for (var i = 0; i < totalTurns; i++) {
        totalTonesPerTurn.push(Math.floor(Math.random() * (mode - (mode - mode + 1) + 1) + (mode - mode + 1)));   //get random number from 1 to 4 b/c four audios
    }
    //console.log(totalTonesPerTurn);
}

const gameMode = () => {
    if (modeBtn.innerHTML === "EASY") {
        modeBtn.innerHTML = "MID";
        rangeText.innerHTML = rangeValues[2];
        setGameMode(gameLevel.MID);
    }
    else if (modeBtn.innerHTML === "MID") {
        modeBtn.innerHTML = "HARD";
        rangeText.innerHTML = rangeValues[3];
        setGameMode(gameLevel.HARD);
    }
    else if (modeBtn.innerHTML === "HARD") {
        modeBtn.innerHTML = "EASY";
        rangeText.innerHTML = rangeValues[1];
        setGameMode(gameLevel.EASY);
    }
}
setGameMode(gameLevel.EASY); //<-- initialize game mode to Easy

startBtn.addEventListener('click', function () {
    //console.log("startbutton:" + startBtn.innerHTML);
    //console.log("counter:" + counter);
    modeBtn.removeEventListener("click", gameMode);

    if (startBtn.innerHTML === "Reset") {
        startBtn.innerHTML = "Start";
        countText.innerHTML = `Success: ${counter = 0}/${totalTurns}`; //display UI turns
        failText.innerHTML = `Fail: ${failCounter}`;
        rangeText.innerHTML = rangeValues[1];
        resetTurnValues();
        modeBtn.addEventListener("click", gameMode);
        setGameMode(gameLevel.EASY);
        modeBtn.innerHTML = "EASY";
        totalNotesLbl.innerHTML = "";

    } else {
        startGame();
    }
});

countText.innerHTML = `Success:  ${counter} / ${totalTurns}`; //display UI turns
failText.innerHTML = `Fail:  ${failCounter}`;

const startGame = () => {
    startBtn.innerHTML = "Reset";

    delay = setTimeout(() => {
        //if failed keep keep the current tobeMatch to try again
        tobeMatch = ai(); //<--AI is here    
 
        //console.log("tobeMatch Value:" + tobeMatch);
        totalNotesLbl.innerHTML = `Notes: ${tobeMatch.length}`; //<-- display how many notes in array to be match
    }, 500);

    delay = setTimeout(() => {
        //Human conditions
        //console.log("tobeMatch Length:" + tobeMatch.length);

        if (tobeMatch.length > 0) {
            btnParent.addEventListener("click", human, false);
        }
    }, 1500);
}

modeBtn.addEventListener("click", gameMode); //change mode of the game

//AI
const ai = () => {
    let tonesArr = [];
    countText.innerHTML = `Success:  ${counter} / ${totalTurns}`;
    tonesArr = playTones(totalTonesPerTurn[counter]);
    return tonesArr;
}

//Human
const human = (e) => {
    //console.log("inside human");
    let id = e.target.id;
    num = +document.getElementById(id).innerHTML;
    playTone(num);
    toMatch.push(num);

    //console.log("toMatch:" + toMatch.length);

    let isSame = (num === tobeMatch[humanIdx]);
    humanIdx++;

    //console.log("idx:" + humanIdx);
    //console.log("is Same:" + isSame);

    if (isSame === false) {
        failed = true;
        resetTurnValues();
        if (counter === 0) {
            counter = 0; //<-- If wrong minus counter
        }

        failText.innerHTML = `Fail:  ${failCounter += 1}`;

        $('#audioWrong')[0].play();
        timeout = setTimeout(() => {
            startGame();
        }, 2000);
    }
    else if (tobeMatch.length === toMatch.length && isSame === true) { //<-- game finish
        resetTurnValues();
        counter++;
        countText.innerHTML = `Success:  ${counter} / ${totalTurns}`;

        //console.log("this is a match");
        timeout = setTimeout(() => {
            $('#audioCorrect')[0].play();
        }, 500);

        timeout = setTimeout(() => {
            startGame();
        }, 2500);
    }

    //at the end of 20 turns
    if (counter === totalTurns) {
        resetGame();

        timeout = setTimeout(() => {
            rangeText.innerHTML = rangeValues[4];
        }, 2000);
    }
}

const resetGame = () => {
    resetTurnValues();
    counter = 0;
    failCounter = 0;
    btnParent.removeEventListener("click", human);

    clearTimeout(timeout);
    clearTimeout(delay);
}

const resetTurnValues = () => {
    tobeMatch.length = 0;
    toMatch.length = 0;
    humanIdx = 0;
    totalNotesLbl.innerHTML = "";
}

//Get the value from totalTonesPerTurn array and use the value to get another randomize array to pick the colors
const playTones = (idxValue) => {
    tones = getRandomTones(idxValue);
    //console.log("random set tones:" + tones);

    if (idxValue === 1) {
        playTone(tones[0]);
    }

    if (idxValue === 2) {
        playTone(tones[0]);
        timeout = setTimeout(() => {
            playTone(tones[1]);
        }, 1000);
    }

    if (idxValue === 3) {
        playTone(tones[0]);
        timeout = setTimeout(() => {
            playTone(tones[1]);
        }, 1000);
        timeout = setTimeout(() => {
            playTone(tones[2]);
        }, 2000);
    }

    if (idxValue === 4) {
        playTone(tones[0]);
        timeout = setTimeout(() => {
            playTone(tones[1]);
        }, 1000);
        timeout = setTimeout(() => {
            playTone(tones[2]);
        }, 2000);
        timeout = setTimeout(() => {
            playTone(tones[3]);
        }, 3000);
    }

    if (idxValue === 5) {
        playTone(tones[0]);
        timeout = setTimeout(() => {
            playTone(tones[1]);
        }, 1000);
        timeout = setTimeout(() => {
            playTone(tones[2]);
        }, 2000);
        timeout = setTimeout(() => {
            playTone(tones[3]);
        }, 3000);
        timeout = setTimeout(() => {
            playTone(tones[4]);
        }, 4000);
    }

    if (idxValue === 6) {
        playTone(tones[0]);
        timeout = setTimeout(() => {
            playTone(tones[1]);
        }, 1000);
        timeout = setTimeout(() => {
            playTone(tones[2]);
        }, 2000);
        timeout = setTimeout(() => {
            playTone(tones[3]);
        }, 3000);
        timeout = setTimeout(() => {
            playTone(tones[4]);
        }, 4000);
        timeout = setTimeout(() => {
            playTone(tones[5]);
        }, 5000);
    }

    if (idxValue === 7) {
        playTone(tones[0]);
        timeout = setTimeout(() => {
            playTone(tones[1]);
        }, 1000);
        timeout = setTimeout(() => {
            playTone(tones[2]);
        }, 2000);
        timeout = setTimeout(() => {
            playTone(tones[3]);
        }, 3000);
        timeout = setTimeout(() => {
            playTone(tones[4]);
        }, 4000);
        timeout = setTimeout(() => {
            playTone(tones[5]);
        }, 5000);
        timeout = setTimeout(() => {
            playTone(tones[6]);
        }, 6000);
    }

    if (idxValue === 8) {
        playTone(tones[0]);
        timeout = setTimeout(() => {
            playTone(tones[1]);
        }, 1000);
        timeout = setTimeout(() => {
            playTone(tones[2]);
        }, 2000);
        timeout = setTimeout(() => {
            playTone(tones[3]);
        }, 3000);
        timeout = setTimeout(() => {
            playTone(tones[4]);
        }, 4000);
        timeout = setTimeout(() => {
            playTone(tones[5]);
        }, 5000);
        timeout = setTimeout(() => {
            playTone(tones[6]);
        }, 6000);
        timeout = setTimeout(() => {
            playTone(tones[7]);
        }, 7000);
    }

    if (idxValue === 9) {
        playTone(tones[0]);
        timeout = setTimeout(() => {
            playTone(tones[1]);
        }, 1000);
        timeout = setTimeout(() => {
            playTone(tones[2]);
        }, 2000);
        timeout = setTimeout(() => {
            playTone(tones[3]);
        }, 3000);
        timeout = setTimeout(() => {
            playTone(tones[4]);
        }, 4000);
        timeout = setTimeout(() => {
            playTone(tones[5]);
        }, 5000);
        timeout = setTimeout(() => {
            playTone(tones[6]);
        }, 6000);
        timeout = setTimeout(() => {
            playTone(tones[7]);
        }, 7000);
        timeout = setTimeout(() => {
            playTone(tones[8]);
        }, 8000);
    }

    if (idxValue === 10) {
        playTone(tones[0]);
        timeout = setTimeout(() => {
            playTone(tones[1]);
        }, 1000);
        timeout = setTimeout(() => {
            playTone(tones[2]);
        }, 2000);
        timeout = setTimeout(() => {
            playTone(tones[3]);
        }, 3000);
        timeout = setTimeout(() => {
            playTone(tones[4]);
        }, 4000);
        timeout = setTimeout(() => {
            playTone(tones[5]);
        }, 5000);
        timeout = setTimeout(() => {
            playTone(tones[6]);
        }, 6000);
        timeout = setTimeout(() => {
            playTone(tones[7]);
        }, 7000);
        timeout = setTimeout(() => {
            playTone(tones[8]);
        }, 8000);
        timeout = setTimeout(() => {
            playTone(tones[9]);
        }, 9000);
    }

    if (idxValue === 11) {
        playTone(tones[0]);
        timeout = setTimeout(() => {
            playTone(tones[1]);
        }, 1000);
        timeout = setTimeout(() => {
            playTone(tones[2]);
        }, 2000);
        timeout = setTimeout(() => {
            playTone(tones[3]);
        }, 3000);
        timeout = setTimeout(() => {
            playTone(tones[4]);
        }, 4000);
        timeout = setTimeout(() => {
            playTone(tones[5]);
        }, 5000);
        timeout = setTimeout(() => {
            playTone(tones[6]);
        }, 6000);
        timeout = setTimeout(() => {
            playTone(tones[7]);
        }, 7000);
        timeout = setTimeout(() => {
            playTone(tones[8]);
        }, 8000);
        timeout = setTimeout(() => {
            playTone(tones[9]);
        }, 9000);
        timeout = setTimeout(() => {
            playTone(tones[10]);
        }, 10000);
    }
    return tones;
}


//play each tone by the value of the tones idx
const playTone = (num) => {
    if (num === 1) {
        playGreenNote();
    }
    if (num === 2) {
        playRedNote();
    }
    if (num === 3) {
        playYellowNote();
    }
    if (num === 4) {
        playBlueNote();
    }
}

const getRandomTones = (num) => {
    let arr = [];
    for (var i = 0; i < num; i++) {
        let rnd = (Math.floor(Math.random() * 4) + 1);
        arr.push(rnd);
    }
    return arr;
}

const playGreenNote = () => {
    $("#one").css("background-color", lightcolors.lightgreen);
    $("#one").css("color", lightcolors.lightgreen);
    $('#audio1')[0].play();
    let timer = setTimeout(() => {
        $("#one").css("background-color", darkcolors.darkgreen);
        $("#one").css("color", darkcolors.darkgreen);
    }, 300);
}

const playRedNote = () => {
    $("#two").css("background-color", lightcolors.lightred);
    $("#two").css("color", lightcolors.lightred);
    $('#audio2')[0].play();
    let timer = setTimeout(() => {
        $("#two").css("background-color", darkcolors.darkred);
        $("#two").css("color", darkcolors.darkred);
    }, 300);
}

const playYellowNote = () => {
    $("#three").css("background-color", lightcolors.lightyellow);
    $("#three").css("color", lightcolors.lightyellow);
    $('#audio3')[0].play();
    let timer = setTimeout(() => {
        $("#three").css("background-color", darkcolors.darkyellow);
        $("#three").css("color", darkcolors.darkyellow);
    }, 300);
}

const playBlueNote = (count) => {
    $("#four").css("background-color", lightcolors.lightblue);
    $("#four").css("color", lightcolors.lightblue);
    $('#audio4')[0].play();
    let timer = setTimeout(() => {
        $("#four").css("background-color", darkcolors.darkblue);
        $("#four").css("color", darkcolors.darkblue);
    }, 300);
}






