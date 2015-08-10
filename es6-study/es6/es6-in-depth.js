/**
 * for of 循环可以遍历数组、类数组对象(DOM list)、字符串、Map、Set集合等所有这些集合
 * 因为jQuery对象与数组相似，可以为其添加与数组一致的迭代器方法
 * jQuery.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator];
 * @type {string[]}
 */
var arr = ['jquery', 'kissy', 'yui', 'angular', 'react'];
var str = 'hello es6';

for(var value of str) {
    //console.log(value);
}


class RangeIterator {
    constructor(start, stop) {
        this.value = start;
        this.stop = stop;
    }

    [Symbol.iterator]() {return this;}

    next() {
        var value = this.value;
        if(value < this.stop) {
            this.value++;
            return {done: false, value: value};
        }
        else {
            return {done: true, value: undefined};
        }
    }
}

function range(start, stop) {
    return new RangeIterator(start, stop);
}

for(var value of range(0, 3)) {
    console.log('Ding!, at floor #' + value);
}
