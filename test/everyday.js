/**
 * 计算数组中所有数字出现的次数
 */
// var counts = {};
// var arr = [1, 2, 2, 3, 4, 4, 4, 5];

// arr.forEach(function(x) {
//     counts[x] = (counts[x] || 0) + 1;
// });

// console.log(counts);

// function fibonacci(n) {
//     do {
//         return fibonacci(n - 1) + fibonacci(n - 2);
//     }
//     while(n > 2);
    
//     return [];
// }

// console.log(fibonacci(3));

function fibo(n) {
  return Array.apply(0, Array(n)).
    reduce(function(x, y, z){ return x.concat((z < 2) ? z : x[z-1] + x[z-2]); }, []);
}

console.log(fibo(3));