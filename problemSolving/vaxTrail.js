const peoplesArray = [
    { name: "sakib", age: 32, temperature: 100 },
    { name: "obamai", age: 23, temperature: 107 },
    { name: "dulal", age: 43, temperature: 99 },
    { name: "arif", age: 39, temperature: 95 },
    { name: "mahbub", age: 37, temperature: 95 },
    { name: 'ripon', age: 29, temperature: 92 },
    { name: "noman", age: 11, temperature: 105 },
    { name: "hussain", age: 77, temperature: 103 },
    { name: "dulal", age: 48, temperature: 97 },
    { name: "abul", age: 32, temperature: 95 },
    { name: 'Biplap', age: 22, temperature: 98 },
    { name: 'dolar', age: 26, temperature: 92 },
    { name: "max", age: 10, temperature: 104 },
    { name: "hadi", age: 07, temperature: 104 },

];

function vaxTrail(peoples) {

    let A = [];
    let B = [];
    let C = [];
    let D = [];
    for (const people of peoples) {
        if (people.age >= 22 && people.age <= 30 && people.temperature < 100) {
            if (people.age % 2 === 0) {
                A = [people, ...A]
            } else { A = [...A, people] }
        }
        else if (people.age >= 31 && people.age <= 40 && people.temperature < 100) {
            if (people.age % 2 === 0) {
                B = [people, ...B]
            } else { B = [...B, people] }
        }
        else if (people.age >= 41 && people.age <= 50 && people.temperature < 100) {
            if (people.age % 2 === 0) {
                C = [people, ...C]
            } else { C = [...C, people] }
        }
        else if (people.temperature >= 100) {
            if (people.age % 2 === 0) {
                D = [people, ...D]
            } else { D = [...D, people] }
        }
    }
    return {
        A,
        B,
        C,
        D,
    };
};

const ans = vaxTrail(peoplesArray);
console.log("vaxTrail-Ans:", ans);