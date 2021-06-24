String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

String.prototype.capitalizeMonth = function() {
    let capPos = 3
    if (this.length < 6){
        capPos = 2
    }
    return this.substr(0, capPos) + this.charAt(capPos).toUpperCase() + this.slice(capPos+1);
}

String.prototype.capitalizeDate = function () {
    return this.charAt(0).toUpperCase() + this.substr(1, this.lastIndexOf(' '))
        + this[this.lastIndexOf(' ')+1].toUpperCase() + this.substr(this.lastIndexOf(' ')+2)
}

Date.prototype.startOfDay = function (){
    return this.setHours(0,0,0,0)
}

Array.prototype.remove = function() {
    let what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};