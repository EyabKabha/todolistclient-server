// function myCounter (){
//     let max = 5
//     let count = 0
//     setInterval(() => {
//         if(count === max){
//             return
//         }else{
//             count = count+=1
//             console.log(count)
//         }
//     }, 1000);
// }


const myCounter = () => {
    let max = 5
    let count = 0
    setInterval(() => {
        if (count === max) {
            return
        } else {
            count = count += 1
            console.log(count)
        }
    }, 1000);
}

myCounter()