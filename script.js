let words = [
    "alma", "fa", "kutya", "számítógép", "autó", "ház", "tenger", "hegy", "nap", "virág",

    "H Astra", "Sztálin", "Brácsa", "Gordonka", "tizenötezerhétszáztíz", "osztály", "egyes", "lapot elő", "elnézést", "felelés",
    "Pyke", "Mátészalkai Szakképzési Centrum Gépészeti Technikum és Kollégium", "Sarka Levente", "Quiz játék", "jó ez a játék", "szervó", "opel", "Sopron", "Győr", "Habsburg Ferdinánd",
    "Fidesz", "háromnegyed", "iphone", "tetoválás", "Csicseriborsó", "kisujj", ",egtagadva", "keskemy", "Vans", "float",
    "szék", "asztal", "laptop", "telefon", "domb", "tó", "folyó", "hegy", "szél", "eső",
    "felhő", "állat", "madár", "hal", "erdő", "város", "kert", "szoba", "ajtó", "ablak",
    "föld", "ég", "híd", "fáklya", "pénz", "bank", "bolt", "autóbusz", "vonat", "repülő",
    "kerékpár", "séta", "futás", "úszás", "tanulás", "munka", "szórakozás", "nyár", "tél",
    "tavasz", "ősz", "kép", "film", "zene", "könyv", "mozi", "színház", "hang", "szó",
    "éneklés", "tánc", "főzés", "pizzéria", "étterem", "szálloda", "hotel", "utcai", "park",
    "szórakozóhely", "házasság", "szerelem", "barátok", "család", "barát", "lány", "fiú", "gyerek",
    "fiatal", "öreg", "férfi", "nő", "állás", "szakma", "tanár", "orvos", "mérnök", "újságíró",
    "színész", "énekes", "költő", "művész", "festő", "szobrász", "programozó", "digitális", "kód",
    "internet", "mobil", "kamera", "fotó", "videó", "monitor", "billentyűzet", "egér", "mikrofon",
    "hangszóró", "zongora", "gitár", "dob", "szintetizátor", "traktor", "hó", "télapó", "karácsony",
    "születésnap", "húsvét", "nyaralás", "hegyvidék", "sivatag", "erdő", "kerti munka", "foci", "kosárlabda"
];

let currentWord = "";
let score = 0;
let gameActive = false;
let timeLeft = 90; // Kezdő idő 1 perc 30 másodperc (90 másodperc)
let timerInterval;
let wordCount = 0;

function startGame() {
    score = 0;
    wordCount = 0;
    timeLeft = 90; // 1 perc 30 másodperc
    gameActive = true;
    document.getElementById("word-input").disabled = false;
    document.getElementById("word-input").value = "";
    document.getElementById("message").innerText = "";
    document.getElementById("score").innerText = `Szó száma: ${wordCount}`;
    document.getElementById("timer").innerText = `Idő: ${formatTime(timeLeft)}`;
    
    // Indítsuk el az időmérőt
    timerInterval = setInterval(updateTimer, 1500); // Módosítottuk az idő intervallumot
    displayNextWord();
}

function displayNextWord() {
    if (!gameActive || wordCount >= 100) return;

    let randomIndex = Math.floor(Math.random() * words.length);
    currentWord = words[randomIndex];
    document.getElementById("word-display").innerText = currentWord;
}

function checkWord() {
    let userInput = document.getElementById("word-input").value;

    if (userInput === currentWord) {
        wordCount++;
        document.getElementById("score").innerText = `Szó száma: ${wordCount}`;
        document.getElementById("word-input").value = "";  // Clear input field
        displayNextWord();
        
        // Minden 10. szó után extra 5 másodperc
        if (wordCount % 10 === 0) {
            timeLeft += 5;
        }
    } else if (userInput !== currentWord.substring(0, userInput.length)) {
        // Elgépelés esetén
        gameActive = false;
        document.getElementById("message").innerText = "Játék vége! Elgépelted a szót.";
        document.getElementById("word-input").disabled = true; // Disable input field
    }
}

function updateTimer() {
    if (timeLeft > 0 && gameActive) {
        timeLeft--;
        document.getElementById("timer").innerText = `Idő: ${formatTime(timeLeft)}`;
    } else {
        clearInterval(timerInterval);
        gameActive = false;
        document.getElementById("message").innerText = `Játék vége! Szó száma: ${wordCount}`;
        document.getElementById("word-input").disabled = true;
    }
}

function formatTime(seconds) {
    let minutes = Math.floor(seconds / 60);
    let remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds}`;
}
