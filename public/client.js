const scrollBtn = document.querySelector(".scroll-btn");
const root = document.documentElement;

// wanneer je 100px naar beneden scrollt, komt de knop te voorschijn
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (
    document.body.scrollTop > 100 ||
    document.documentElement.scrollTop > 100
  ) {
    scrollBtn.style.display = "block";
  } else {
    scrollBtn.style.display = "none";
  }
}

// geeft de knop de functionaliteit
function topFunction() {
  // Scroll to top logic
  root.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

//
const filterBtn = document.querySelector(".filter-btn");
const filterView = document.querySelector(".filter-view");

filterBtn.addEventListener("click", function () {
  filterView.classList.toggle('show');
});
