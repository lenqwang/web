/*
    将图片转换成base64
*/
var convertImgToBase64 = function(imageurl, callback, outputFormat) {
    var img = new Image();
    
    //img.crossOrigin = 'Anonymous';
    img.onload = function() {
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');
        
        canvas.width = this.width;
        canvas.height = this.height;
        
        ctx.drawImage(this, 0, 0);
        
        var dataUrl = canvas.toDataURL(outputFormat || 'image/png');
        
        callback(dataUrl);
        
        callback = null;
    };
    
    img.src = imageurl;
};

convertImgToBase64('https://www.google.com/images/srpr/logo11w.png', function(base64Img) {
    console.log(base64Img);
});

