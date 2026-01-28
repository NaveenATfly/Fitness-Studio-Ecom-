let currentIndex = 0;
const slider = document.getElementById("slider");

let isDragging = false;
let startPos = 0;
let currentTranslate = 0;
let prevTranslate = 0;

function getPositionX(event) {
    return event.type.includes('mouse') ? event.clientX : event.touches[0].clientX;
}

function goToSlide(index) {
    currentIndex = index;
    currentTranslate = index * -270;
    prevTranslate = currentTranslate;
    slider.style.transform = `translateX(${currentTranslate}px)`;
}

function dragStart(event) {
    isDragging = true;
    startPos = getPositionX(event);
    slider.style.transition = 'none';
}

function dragMove(event) {
    if (!isDragging) return;
    event.preventDefault();
    const currentPos = getPositionX(event);
    const diff = currentPos - startPos;
    currentTranslate = prevTranslate + diff;
    slider.style.transform = `translateX(${currentTranslate}px)`;
}

function dragEnd() {
    if (!isDragging) return;
    isDragging = false;
    slider.style.transition = 'transform 0.5s ease';

    const movedBy = currentTranslate - prevTranslate;
    if (movedBy < -100 && currentIndex < dots.length - 1) {
        goToSlide(currentIndex + 1);
    } else if (movedBy > 100 && currentIndex > 0) {
        goToSlide(currentIndex - 1);
    } else {
        goToSlide(currentIndex);
    }
}

slider.addEventListener('mousedown', dragStart);
slider.addEventListener('touchstart', dragStart);
document.addEventListener('mousemove', dragMove);
document.addEventListener('touchmove', dragMove);
document.addEventListener('mouseup', dragEnd);
document.addEventListener('touchend', dragEnd);
