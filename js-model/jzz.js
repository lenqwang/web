function Fangzi() {
    this.woshi = '';
    this.keting = '';
    this.chufang = '';
}

function Baogongtou() {
    this.gaifangzi = function(gongren) {
        gongren.jian_woshi();
        gongren.jian_keting();
        gongren.jian_chufang();
    };
}

function Gongren() {
    this.jian_woshi = function() {
        console.log('卧室建好了');
    };
    this.jian_keting = function() {
        console.log('客厅建好了');
    };
    this.jian_chufang = function() {
        console.log('厨房建好了');
    };
    this.jiaogong = function() {
        var _fangzi = new Fangzi();
        _fangzi.woshi = 'ok';
        _fangzi.keting = 'ok';
        _fangzi.chufang = 'ok';
        return _fangzi;
    };
}

var gongren = new Gongren();
var baogongtou = new Baogongtou();
baogongtou.gaifangzi(gongren);

var myfangzi = gongren.jiaogong();
console.log(myfangzi);