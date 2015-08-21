function Orientation(selector) {

}

Orientation.prototype.init = function () {
    window.addEventListener('deviceorientation', this.orientationListener, false);
    window.addEventListener('MozOrientation', this.orientationListener, false);
    window.addEventListener('devicemotion', this.orientationListener, false);
};

Orientation.prototype.orientationListener = function (evt) {
    if(!evt.gamma && !evt.beta) {
        evt.gamma = (evt.x * (180 / Math.PI));  // change to ½Ç¶È
        evt.beta = (evt.y * (180 / Math.PI));
        evt.alpha = (evt.z * (180 / Math.PI));
    }

    var gamma = evt.gamma,
        beta = evt.beta,
        alpha = evt.alpha;

    if(evt.accelerationIncludingGravity) {
        gamma = event.accelerationIncludingGravity.x * 10;
        beta = -event.accelerationIncludingGravity.y * 10;
        alpha = event.accelerationIncludingGravity.z * 10;
    }

    if(this._lastGamma != gamma || this._lastBeta != beta) {
        this.callback(beta.toFixed(2), gamma.toFixed(2), (alpha != null ? alpha.toFixed(2) : 0));

        // style.left =  gamma / 90 * 200 + 200 + 'px'
        // style.top = beta/90 * 100 + 100 + 'px'

        this._lastGamma = gamma;
        this._lastBeta = beta;
    }
};

// init
(new Orientation()).init();