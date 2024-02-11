const obj1={
    name:"Miroslav",
    age:"26"

}

const obj2={
    name2:"Vlad",
    age:"20"
}


const join=Object.assign({}, obj1, obj2, {hh:1,name:"Kiril"})
console.log(join)

