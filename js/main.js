// Consegna
// Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe. Attenzione: nella stessa cella può essere posizionata al massimo una bomba, perciò nell'array delle bombe non potranno esserci due numeri uguali.
// In seguito l'utente clicca su una cella: se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina. Altrimenti la cella cliccata si colora di azzurro e l'utente può continuare a cliccare sulle altre celle.
// La partita termina quando il giocatore clicca su una bomba o quando raggiunge il numero massimo possibile di numeri consentiti (ovvero quando ha rivelato tutte le celle che non sono bombe).
// Errata corrige: rendere le caselle "non cliccabili" e far finire la partita è un superbonus, non è richiesto dalla consegna!
// Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l'utente ha cliccato su una cella che non era una bomba.
// BONUS
// Aggiungere una select accanto al bottone di generazione, che fornisca una scelta tra tre diversi livelli di difficoltà:
// - difficoltà 1 ⇒ 100 caselle, con un numero compreso tra 1 e 100, divise in 10 caselle per 10 righe;
// - difficoltà 2 ⇒ 81 caselle, con un numero compreso tra 1 e 81, divise in 9 caselle per 9 righe;
// - difficoltà 3 ⇒ 49 caselle, con un numero compreso tra 1 e 49, divise in 7 caselle per 7 righe;
// Consigli del giorno: :party_wizard:
// Scriviamo prima cosa vogliamo fare passo passo in italiano, dividiamo il lavoro in micro problemi.
// Ad esempio
// Di cosa ho bisogno per generare i numeri?
// Proviamo sempre prima con dei console.log() per capire se stiamo ricevendo i dati giusti.
// Le validazioni e i controlli possiamo farli anche in un secondo momento.
// SUPERBONUS 1
// Quando si clicca su una bomba e finisce la partita, evitare che si possa cliccare su altre celle.
// SUPERBONUS 2
// Quando si clicca su una bomba e finisce la partita, il software scopre tutte le bombe nascoste.

const challengeSelectEl = document.getElementById("challenge-select");

const gridEl = document.getElementById("grid");
const startButtonEl = document.getElementById("start-button");
const easy = 100;
const normal = 81;
const hard = 49;

let gridDimension = 0;
let classToAdd = "";
// let bombsPositions = [];

startButtonEl.addEventListener("click", function () {
  let levelChoice = challengeSelectEl.value;
  if (levelChoice == "easy") {
    classToAdd = "easy";
    gridDimension = easy;
  } else if (levelChoice == "normal") {
    classToAdd = "normal";
    gridDimension = normal;
  } else {
    classToAdd = "hard";
    gridDimension = hard;
  }
  generateGrid(gridEl, gridDimension);
  let bombsPositions = [];
  while (bombsPositions.length < 16) {
    const generateBombs = randomNumberInterval(1, 100);
    if (!bombsPositions.includes(generateBombs)) {
      bombsPositions.push(generateBombs);
    }
  }

  console.log(bombsPositions);
});

// var e = document.getElementById("ddlViewBy");
// var value = e.value;
// var text = e.options[e.selectedIndex].text;

/****************************************************
 *                                                  *
 *                  FUNCTIONS                       *
 *                                                  *
 ****************************************************/

/**
 * Funzione che genera una griglia che seleziona il quadrato cliccato con un toggle
 * di dimensioni in base ai parametri inseriti.
 * @param {HTMLElement} gridEl Elemento in cui inserire la griglia generata
 * @param {int} dimension Dimensione della griglia
 */

function generateGrid(gridEl, dimension) {
  gridEl.innerHTML = "";
  for (let i = 0; i < gridDimension; i++) {
    // genero un div
    // lo aggiungo html
    const squareEl = document.createElement("div");
    squareEl.append(i + 1);

    // assegna un numero progressivo per ogni div
    // squareEl.append(i + 1);

    // aggiungo la classe per far si che diventi un quadrato e gli da i bordi
    squareEl.classList.add("square", classToAdd);

    //  aggiungo un addeventlistener sul click che faccia il "toggle" della classe .active
    squareEl.addEventListener("click", function () {
      this.classList.toggle("active");
      console.log(bombsPositions);

      console.log(this.innerHTML);
    });

    //   aggiungo alla griglia
    gridEl.append(squareEl);
  }
}

/**
 * Funzione che genera due numeri casuali in un range stabilito
 * @param {int} min  numero minimo per stabilire il range
 * @param {int} max  numero massimo per stabilire il range
 */

function randomNumberInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
