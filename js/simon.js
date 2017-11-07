var rangeValues =
{
    "1": "PLEASE DON'T HURT ME...",
    "2": "I'M READY FOR YOU!",
    "3": "COME GET SOME!!",
    "4": "RESISTANCE IS FUTILE!!!"
};

let rangeText = document.getElementById("rangeText");
rangeText.innerHTML = rangeValues[1]; /* Set default slider text Value */
$("#mid").hide(); 

/* Slider on Input */
slideInput.oninput = () => {
    rangeText.innerHTML = rangeValues[slideInput.value];


    if(slideInput.value === "1"){
        $("#mid").hide('slow'); 
        $("#content").show('slow');
    }
    
    if(slideInput.value === "2"){
        $("#content").hide('slow'); 
        $("#mid").show('slow'); 
    }
}



