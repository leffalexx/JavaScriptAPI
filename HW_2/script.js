const leftPointer = document.querySelector(".left-pointer");
const rightPointer = document.querySelector(".right-pointer");

const slides = document.querySelectorAll(".slider-image");
const bottom = document.querySelector(".bottom");

let currentSlideIndex = 0;
const navigationCircles = [];


function createNavCircles() {
    const div = document.createElement("div");
    div.className = "navigation-circle";
    bottom.appendChild(div);
    navigationCircles.push(div);
}


function addNavigationCircles() {
    slides.forEach(createNavCircles);
    navigationCircles[0].classList.add("active");
    navigationCircles.forEach((circle, index) => {
        circle.addEventListener("click", () => changeSlide(index));
    });
}


function addActiveClass() {
    navigationCircles[currentSlideIndex].classList.add("active");
}


function removeActiveClass() {
    navigationCircles[currentSlideIndex].classList.remove("active");
}


function showSlide() {
    slides[currentSlideIndex].classList.add("block");
}


function hideSlide() {
    slides[currentSlideIndex].classList.remove("block");
}


function changeSlide(slideIndex) {
    hideSlide();
    removeActiveClass();
    currentSlideIndex = slideIndex;
    addActiveClass();
    showSlide();
}


function nextSlide() {
    let newSlideIndex = currentSlideIndex + 1;
    if (newSlideIndex > slides.length - 1) {
        newSlideIndex = 0;
    }
    changeSlide(newSlideIndex);
}


function previousSlide() {
    let newSlideIndex = currentSlideIndex - 1;
    if (newSlideIndex < 0) {
        newSlideIndex = slides.length - 1;
    }
    changeSlide(newSlideIndex);
}


addNavigationCircles();

leftPointer.addEventListener("click", previousSlide);
rightPointer.addEventListener("click", nextSlide);
