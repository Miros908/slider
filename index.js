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



buttonBack.addEventListener('click',()=>{
if(currentNumber>0){currentNumber--}

if(listItems[currentNumber]!=undefined){
currentElement.innerHTML=listItems[currentNumber].innerHTML;

console.log(currentNumber)

}

})

buttonNext.addEventListener('click',()=>{
    if(currentNumber<listItems.length-1){
        currentNumber++
    }
 
    if(listItems[currentNumber]!=undefined){
    currentElement.innerHTML=listItems[currentNumber].innerHTML;
    

 
    }



    console.log(currentNumber)
    
    })

















