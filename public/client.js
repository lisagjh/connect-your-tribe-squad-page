const scrollBtn = document.querySelector(".scroll-btn");
const root = document.documentElement;

// wanneer je 100px naar beneden scrollt, komt de knop te voorschijn
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
    scrollBtn.style.display = "block";
  } else {
    scrollBtn.style.display = "none";
  }}

  // geeft de knop de functionaliteit
function topFunction() {
    // Scroll to top logic
    root.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }
  scrollToTopBtn.addEventListener("click", scrollToTop);



  // toms background color generator

//   // Bepaal alle hexadecimale kleurcodes die een kleur kan hebben
// const colors = ["9DE5A4", "FFBABA", "3D5E85", "EE9DF0", "ECEE89", "A2FAE5", "FB8888", "B7FF95", "E385CF", "B4CCF0"];

// // Haal een willekeurige kleur op uit de array
// function generateNewColor() {
//     const randomIndex = Math.floor(Math.random() * colors.length);
//     return '#' + colors[randomIndex];
// }

// function cardcolor() {
//     // Haal de elementen met de class "card" op
//     const cardElements = document.querySelectorAll(".card");
//     // Voor elke kaart, genereer een andere achtergrondkleur
//     cardElements.forEach(function(card) {
//         card.style.background = generateNewColor();
//     });
// }

// // haal de cardcolor op
// cardcolor();