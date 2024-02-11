function createElement(tagName,className,content=null,attribute=null,attributeValue=null){

 const element=document.createElement(tagName)
 element.className=className
 if(content){
   element.innerHTML=content 
 }

 if(attribute&&attributeValue){
   element.setAttribute(attribute,attributeValue) 
 
 }

 return element
    
}

function updateActiveIndicators(allIndicators,currentIndex,startIndex){



allIndicators.forEach((elem)=>{
   elem.classList.remove('activePaginationItem') 
   elem.classList.remove('active') 
})

for(let i=startIndex;i<=currentIndex;i++){

  allIndicators[i].classList.add('activePaginationItem')  
}





}









function createSlider(selector,options={}){
    


    const optionsDef={
        btnBack: '<',
        btnNext: '>',
        onPrev: () => {},
        onNext: () => {},
        widthSlide:'200px',
        heightSlide:'200px'

    }

    options=Object.assign({},optionsDef,options)


    const sliderList=document.querySelector(`${selector}`)
    if(!sliderList){throw new Error('Селектор не найден')}
    sliderList.style.display='flex'
    sliderList.style.padding='0'
    sliderList.style.position='absolute'
    sliderList.style.transition='left 1s'
    sliderList.style.left='0'    

    const lengthList=sliderList.children.length-1


const buttonPrev=createElement('button','buttonPrev',options.btnBack,'type','button')
const buttonNext=createElement('button','buttonNext',options.btnNext,'type','button')
const sliderBlock=createElement('div','sliderBlock')

const paginationSlider=createElement('div','pagination')
paginationSlider.style.position='absolute'
paginationSlider.style.display='flex'
paginationSlider.style.gap='10px'
paginationSlider.style.left='53px'
paginationSlider.style.top='223px'



for(let i=0;i<=lengthList;i++){
  const paginationItem=createElement('div','paginationItem')

  paginationItem.style.width='20px';
  paginationItem.style.height='20px';
  paginationItem.style.border='2px solid black';
  paginationItem.style.borderRadius='50%';
  paginationItem.innerHTML=i+1;
  paginationItem.style.textAlign='center'
  paginationSlider.appendChild(paginationItem)  

  if(i<5){paginationItem.classList.add('activePaginationItem')}

}

const indicators=[...paginationSlider.children]
let sliderCounter=0;
let sliderCoordinate=0;
let startIndex = 0;

indicators[sliderCounter].classList.add('active')







sliderBlock.style.width=options.widthSlide
sliderBlock.style.height=options.heightSlide
sliderBlock.style.overflow='hidden'
sliderBlock.style.position='relative'


const sliderWrapper=createElement('div','sliderWrapper')

sliderWrapper.style.display='flex'
sliderWrapper.style.position='relative'
sliderWrapper.appendChild(buttonPrev)
sliderWrapper.appendChild(sliderBlock)
sliderWrapper.appendChild(buttonNext)


sliderList.insertAdjacentElement("afterend",sliderWrapper)

sliderBlock.appendChild(sliderList)

sliderWrapper.insertAdjacentElement("afterend",paginationSlider)





const parseWidth=parseInt(options.widthSlide,10)
sliderWrapper.addEventListener('click',(event)=>{





  



 const eventTargetClass=event.target.closest('button').classList
 

if(eventTargetClass.contains('buttonNext')){

    

   

sliderCoordinate-=parseWidth;
sliderCounter++
startIndex = Math.max(sliderCounter - 4, 0);

if(sliderCounter>lengthList){
sliderCounter=0
sliderCoordinate=0
}

sliderList.style.left=`${sliderCoordinate}px`

}

if(eventTargetClass.contains('buttonPrev')){

  

if(sliderCounter!==0){
sliderCounter--
startIndex = Math.max(sliderCounter - 4, 0);
sliderCoordinate+=parseWidth


}else{
sliderCounter=lengthList
sliderCoordinate=-parseWidth*lengthList
startIndex = Math.max(sliderCounter - 4, 0);}    


sliderList.style.left=`${sliderCoordinate}px`

}

if(sliderCounter<5){updateActiveIndicators(indicators,4,0)}else{updateActiveIndicators(indicators,sliderCounter,startIndex)}

indicators[sliderCounter].classList.add('active')






   



})





}




createSlider('.list')




