const burger = document.getElementById("hamburger")

burger.addEventListener("click", function() {
    // Watch for clicking on the hamburger.
    // May need to come in from the side
    // <div id="hamburger" class="topnavHamburger">
    //     <img class="topnavHamburgerImg" src="img/icons/menu.svg">
    // </div>
    if (window.innerWidth <= 900) {
        console.log("we on mobile")

        const links = document.getElementById("navLinks")

        // Check if we are on mobile
        if (links.style.display === "none") {
            // Update it back into our grid
            links.style.display = "grid"
        } else {
            // Assume that we are hiding the display again
            links.style.display = "none";
        }
    }
})