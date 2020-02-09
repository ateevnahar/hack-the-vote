navigator.geolocation.getCurrentPosition(function(success){

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            parseZipcode(this.responseText);
        }
    };
    xhttp.open("GET", "http://api.geonames.org/findNearbyPostalCodesJSON?lat="+success.coords.latitude+"&lng="+success.coords.longitude+"&username=mullikin.n&radius=0", true);
    xhttp.send();
});

const element = document.getElementById("Zipcode");

function parseZipcode(text){
    var t = JSON.parse(text);
    console.log(t);

    element.value = t.postalCodes[0]["postalCode"];
    updateUrl(element.value);
}
var e1_initial = document.getElementById("next-step-1").getAttribute("href");
var e2_initial = document.getElementById("next-step-2").getAttribute("href");

function updateUrl(value) {
    document.getElementById("next-step-1").setAttribute("href", e1_initial + "?zip="+ value);
    document.getElementById("next-step-2").setAttribute("href", e2_initial + "?zip="+ value);

}

element.addEventListener('input', function (evt) {
    updateUrl(this.value);
});