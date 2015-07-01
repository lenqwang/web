// 获取选中的文本内容

document.onselectionchange = function() {
    var text = '';
    
    // 处理兼容问题
    if(window.getSelection) {
        text = window.getSelection().toString();
    }
    else if(document.selection && document.selection.type != 'Control') {
        text = document.selection.createRange().text;
    }
    
    if(text === '') {
        return;
    }
    
    return text;
};