var lian = {};

lian.paobing = function (num) {
    console.log(num + '炮兵开始战斗!');
};

lian.bubing = function (num) {
    console.log(num + '步兵开始战斗!');
};

lian.lianzhang = function (ml) {
    lian[ml.type](ml.num);
};

// 开始发出命令
lian.lianzhang({
    type: 'paobing',
    num: 100
});

lian.lianzhang({
    type: 'bubing',
    num: 500
});