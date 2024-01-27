export function slider(item) {

const buttonNext="<button class='slider__next'>Следуйщий слайд</button>"
const buttonBack="<button class='slider__back'>Предыдущий слайд</button>"
const currentSlide="<div class='slider__current'></div>"

const slider=`<div class="slider">${buttonBack}${currentSlide}${buttonNext}</div>`
  

return slider

}