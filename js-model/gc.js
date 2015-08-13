var XMLHttpFactory = function () {

};

XMLHttpFactory.createXMLHttp = function () {
    var XMLHttp = null;

    if(window.XMLHttpRequest) {
        XMLHttp = new XMLHttpRequest();
    }
    else if(window.ActiveXObject) {
        XMLHttp = new ActiveXObject('Microsoft.XMLHTTP');
    }

    return XMLHttp;
};

var AjaxHander = function () {
    var XMLHttp = XMLHttpFactory.createXMLHttp();
};