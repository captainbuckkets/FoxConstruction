window.addEventListener("scroll", function() {

    if (window.innerWidth >= 900) {
        // If we are on a normal screen, scrolling is enabled.
        var e = document.getElementById("splashPage");
        window.scrollY > e.offsetTop + e.offsetHeight ? document.getElementById("navbar").style.backgroundColor = "#2c2c2c" : document.getElementById("navbar").style.backgroundColor = "transparent";
        } else {
        // If we are on mobile, script is disabled
    }

    
})