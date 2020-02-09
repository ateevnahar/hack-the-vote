



function getHTMLCards(responseText) {
    let result = "";
    let text = JSON.parse(responseText);
    let array = text["result"]["candidates"];


    for(let i = 0; i < array.length; i++){
        let myvar = '<div className="card col-xs-12 col-sm-6 col-md-4 col-lg-3 col-xl-2">'+
            '            <div class="card">'+
            '              <img src="'+ array[i]["image_link"] +'" class="card-img-top" alt="...">'+
            '              <div class="card-body">'+
            '                <h5 class="card-title">' + array[i]["name"]+'</h5>'+
            '                <p class="card-text">'+ array[i]["issues"]+'</p>'+
            '                <a href="'+array[i]["website"]+'" class="btn btn-primary">Website</a>'+
            '              </div>'+
            '            </div>'+
            '          </div>';
        result+=myvar;
    }
    return result;
}


var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {

        document.getElementById("cards").innerHTML += getHTMLCards(this.responseText);
    }
};
xhttp.open("GET", "/api/candidates", true);
xhttp.send();