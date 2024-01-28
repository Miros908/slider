import { slider } from './slider.js'; 

let list =document.querySelector('.list')
let listItems=list.querySelectorAll('.list__item')


list.innerHTML=slider()

const sliderBlock= list.querySelector('.slider')

const currentElement=sliderBlock.querySelector('.slider__current')

currentElement.append(listItems[0])

const buttonBack=sliderBlock.querySelector('.slider__back')
const buttonNext=sliderBlock.querySelector('.slider__next')

let currentNumber=0;







sliderBlock.addEventListener('click',(event)=>{

if(event.target.className==="slider__back"){
    if(currentNumber>0){currentNumber--}

    if(listItems[currentNumber]!=undefined){
    currentElement.innerHTML=listItems[currentNumber].innerHTML;
    

    
    }

}


if(event.target.className==="slider__next"){
    if(currentNumber<listItems.length-1){
        currentNumber++
    }
 
    if(listItems[currentNumber]!=undefined){
    currentElement.innerHTML=listItems[currentNumber].innerHTML;
    

 
    }

}
})















