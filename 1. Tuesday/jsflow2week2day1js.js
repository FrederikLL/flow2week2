var names = ["Lars", "Jan", "Peter", "Bo", "Frederik"];

console.log(names);


function returna(arg1) {
for (var i = 0; i < names.length; i++){
    if(arg1[i] === "a"){
        return arg1;
    }
}
}
console.log(names.filter(returna));

//måske her skal man split, reverse, join
console.log(names.reverse());


//2a
const myFilter = function(array, callback){
const newArr = [];
for (let idx in array){
    if(callback(array[idx])){
        newArr.push(array[idx]);
    }
}
return newArr;
};
const namesWithA2 = myFilter(names, el => el.includes("a"));
console.log(namesWithA2);

/*
//4a
//el er et element i arrayet, idx er index pladsen, og arr er hele arrayet
const numbers = [1,3,5,10,11];
const add2next = numbers.map((el, idx, arr) => {
    if(idx=== arr.length - 1) return el;
    return el + arr[idx + 1];
});
console.log(add2next);



//4c
const persons =[
{name: "Lars", phone: "12345"},
{name: "Kurt", phone: "123456"}

];
const rows = persons
.map(el == "<tr><td>" + el.name + "</td><td>" + el.phone + "</td></tr>")
.join("");


//5e
const votes = ["clinton", "trump", "clinton", "trump"];

const electionresult = votes.reduce((acc, el) =>{
    if(acc[el])
        acc[el]++;
    else
        acc[el] = 1;
    return acc;
}, {});
console.log(electionResult);
*/
console.log("yoyo")