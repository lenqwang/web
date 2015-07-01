/*
    引入一个模块
*/
// import Point from './Point.js';

// import { zip } from 'lodash';

// var body = document.querySelector('body');

// body.textContent = 'Good point: ' + new Point(1, 23);

// console.log(zip(['1', '2'], ['a', 'b']));

/*
    Arrows - function可以直接这样写了
*/

// var evens = ['james', 'cady', 'roomen', 'master', 'bructh'];

// var odds = evens.map(v => v + 1);

// console.log(odds);

// var evens = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// var nums = evens.map((v, i) => v + i);

// 语句
// var fives = [];

// evens.forEach(v => {
//   if(v % 5 === 0) {
//       fives.push(v);
//   } 
// });

// console.log(fives);

// 对象可以这样来写

// var bob = {
//     _name: 'Bob',
//     _friends: ['jake', 'lucy'],
//     printFriends() {
//         this._friends.forEach(f =>
//             console.log(this._name + ' knows ' + f)
//         )
//     }
// };

// bob.printFriends();

/*
    增强的对象字面量
*/

// var theProtoObj = function() {
//     this.name = 'jake';
// };

// function handler() {
//     console.log('i am handler!');
// }

// var obj = {
//     __proto__: theProtoObj,
//     handler,
//     toString() {
//         return 'd ' + super.toString();
//     },
//     ['proto_' + (() => 42)()]: 42
// };

// console.log(obj);

/*
    Template Strings
*/

// var name = 'lenq', time = Date.now();

// var str = `In es5 this is 
//     not legel`;
    
// var paragraph = `My name is ${name} and today is ${time} now`;
    
// console.log(paragraph);

/*
    解构
*/

// var [a, , b] = [1, 2, 3];

// console.log(a, b);  //1, 3

// var { op: a, lhs: { op: b }, rhs: c }
//       = getASTNode()
       
// var {op, lhs, rhs} = getASTNode()

// function g({name: x}) {
//     console.log(x);
// }

// g({name: 8});

// var [a] = [];

// console.log(a); // undefined

// var [a = 1] = [];

// console.log(a); // 1

/*
    Default + Rest + Spread
*/

// function f(x, y = 12) {
//     console.log(x + y);
// }

// f(3);   // 15

// function f(x, ...y) {
//     console.log(x * y.length);
// }

// f(2, ['hello'], 'lenq', 123);   // 6

// function f(x, y, z) {
//     console.log(x, y, z);   // 1, 2, 3
// }

// f(...[1,2,3]);

/*
    Let and Const 变量和常量的操作
*/

// function f() {
//     {
//         let x;
//         {
//             const x = 'hello';  // x 已经申明为常量
//             x = 'world!';       // 会报错，常量不可以更改
//         }
//         let x = 'inner';    // 会报错，已经申明了这个变量
//     }
// }

/*
    迭代器 + For..Of
*/

let fibonacci = {
    [Symbol.iterator]() {
        let pre = 0, cur = 1;
        
        return {
            next() {
                [pre, cur] = [cur, pre + cur];
                return {done: false, value: cur}
            }
        }
    }
}


for(var n of fibonacci) {
    if(n > 1000) 
        break;
    console.log(n);
}