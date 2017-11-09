
/* MouseOver Functionality */
let btnMouseHover = document.getElementById("btn-mousehover");
let midMouseHover = document.getElementById("mid-mousehover");
let hardMouseHover = document.getElementById("hard-mousehover");

btnMouseHover.addEventListener("mouseover", mouseOver, false);
midMouseHover.addEventListener("mouseover", mouseOver, false);
hardMouseHover.addEventListener("mouseover", mouseOver, false);

function mouseOver(e) {
    let id = e.target.id;
    let idObj = document.getElementById(id);

    const darkcolors = {
        darkgreen: "rgb(0, 100, 0)",
        darkred: "rgb(139, 0, 0)",
        darkyellow: "rgb(184, 134, 11)",
        darkblue: "rgb(0, 0, 139)"
    };

    const lightcolors = {
        lightgreen: "rgb(144, 238, 144)",
        lightred: "rgb(240, 128, 128)",
        lightyellow: "rgb(255, 255, 224)",
        lightblue: "rgb(173, 216, 230)"
    }

    if (window.getComputedStyle(idObj, null).getPropertyValue("background-color") === darkcolors.darkgreen) {
        idObj.style.backgroundColor = lightcolors.lightgreen;
    }
    if (window.getComputedStyle(idObj, null).getPropertyValue("background-color") === darkcolors.darkred) {
        document.getElementById(id).style.backgroundColor = lightcolors.lightred;
    }
    if (window.getComputedStyle(idObj, null).getPropertyValue("background-color") === darkcolors.darkyellow) {
        document.getElementById(id).style.backgroundColor = lightcolors.lightyellow;
    }
    if (window.getComputedStyle(idObj, null).getPropertyValue("background-color") === darkcolors.darkblue) {
        document.getElementById(id).style.backgroundColor = lightcolors.lightblue;
    }

    btnMouseHover.addEventListener("mouseout", mouseOut, false);
    midMouseHover.addEventListener("mouseout", mouseOut, false);
    hardMouseHover.addEventListener("mouseout", mouseOut, false);

    function mouseOut() {

        if (window.getComputedStyle(idObj, null).getPropertyValue("background-color") === lightcolors.lightgreen) {
            idObj.style.backgroundColor = darkcolors.darkgreen;
        }
        if (window.getComputedStyle(idObj, null).getPropertyValue("background-color") === lightcolors.lightred) {
            document.getElementById(id).style.backgroundColor = darkcolors.darkred;
        }
        if (window.getComputedStyle(idObj, null).getPropertyValue("background-color") === lightcolors.lightyellow) {
            document.getElementById(id).style.backgroundColor = darkcolors.darkyellow;
        }
        if (window.getComputedStyle(idObj, null).getPropertyValue("background-color") === lightcolors.lightblue) {
            document.getElementById(id).style.backgroundColor = darkcolors.darkblue;
        }
    }
}

var rangeValues =
    {
        "1": "PLEASE DON'T HURT ME...",
        "2": "I'M READY FOR YOU!!",
        "3": "COME GET SOME!!!"
        // "4": "RESISTANCE IS FUTILE!!!"
    };

let rangeText = document.getElementById("rangeText");
rangeText.innerHTML = rangeValues[1]; /* Set default slider text Value */
$(".mid").hide();
$(".hard-lvl").hide();

/* Slider on Input */
slideInput.oninput = () => {
    rangeText.innerHTML = rangeValues[slideInput.value];

    if (slideInput.value === "1") {
        $(".mid").hide('slow');
        $(".hard-lvl").hide('slow');
        $(".content").show('slow');
        easyMode();
    }

    if (slideInput.value === "2") {
        $(".content").hide('slow');
        $(".hard-lvl").hide('slow');
        $(".mid").show('slow');
    }
    if (slideInput.value === "3") {
        $(".content").hide('slow');
        $(".mid").hide('slow');
        $(".hard-lvl").show('slow');
    }
}

const easyMode = () => {

}
