
function slider2(selector,setting){
    
    if(!document.querySelector(selector)){
      throw new Error('Неверный селектор')
    }
    let list=document.querySelector(selector)

    if(list.children.length===0){
        throw new Error('Отстутствуют элементы в блоке')
      }
    let listItems=[...list.children]


const buttonBack = ` <button class='slider__back'>${setting.back}</button>`;
const buttonNext = `<button class='slider__next'>${setting.next}</button>`;

const currentSlide="<div class='slider__current'></div>"

const slider=`<div class="slider">${buttonBack}${currentSlide}${buttonNext}</div>`
    
list.outerHTML=slider




const sliderBlock= document.querySelector('.slider')



const currentElement=sliderBlock.querySelector('.slider__current')

currentElement.append(listItems[0])



let currentNumber=0;

sliderBlock.addEventListener('click',(event)=>{



 


const currentParentClass=event.target.parentElement.classList[0]
const currentClass=event.target.classList[0]


console.log(currentClass)


    if(currentParentClass==="slider__back"||currentClass==="slider__back"){
        if(currentNumber>0){currentNumber-- }
        console.log(currentNumber)
    
        if(listItems[currentNumber]!=undefined){
        currentElement.innerHTML=listItems[currentNumber].innerHTML
        
    
        
        }
    
    }
    
    
    if(currentParentClass==="slider__next"||currentClass==="slider__next"){

        if(currentNumber<listItems.length-1){
            currentNumber++
            
       
           }
       
     console.log(currentNumber)
        if(listItems[currentNumber]!=undefined){
           


    currentElement.innerHTML=listItems[currentNumber].innerHTML

        
    
     
        }
    
    }
    })




    
    
    
    
    
    

    
    
    }





const setting={

    back:` <svg height="128px" id="Layer_1" style="enable-background:new 0 0 128 128;" version="1.1" viewBox="0 0 128 128" width="128px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <g>
        <line style="fill:none;stroke:#2F3435;stroke-width:12;stroke-linecap:square;stroke-miterlimit:10;" x1="87.5" x2="40.5" y1="111" y2="64"/>
        <line style="fill:none;stroke:#2F3435;stroke-width:12;stroke-linecap:square;stroke-miterlimit:10;" x1="40.5" x2="87.5" y1="64" y2="17"/>
    </g>
</svg>`,

next:`<svg height="128px" id="Layer_1" style="enable-background:new 0 0 128 128;" version="1.1" viewBox="0 0 128 128" width="128px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g><line style="fill:none;stroke:#2F3435;stroke-width:12;stroke-linecap:square;stroke-miterlimit:10;" x1="40.5" x2="87.5" y1="17" y2="64"/><line style="fill:none;stroke:#2F3435;stroke-width:12;stroke-linecap:square;stroke-miterlimit:10;" x1="87.5" x2="40.5" y1="64" y2="111"/></g></svg>`
}


    slider2('.list',setting)
    
    
     
        
    
    
    
    
    
    