window.onscroll = function() {functionScroll()};

function functionScroll() {
    var x = document.body.scrollTop || document.documentElement.scrollTop;
    var header = document.getElementsByClassName("hide")[0];
    
    if (x > 0) {
        header.classList.add("scroll");
    } else {
        header.classList.remove("scroll");
    }
}