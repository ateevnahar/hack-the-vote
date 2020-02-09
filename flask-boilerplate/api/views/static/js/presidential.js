



function getHTMLCards(responseText) {
    let result = "";
    let text = JSON.parse(responseText);
    console.log(text);
    //let array = text["result"]["candidates"];


    for(let i = 0; i < text.length; i++){
        let myvar = '<div className="card col-xs-12 col-sm-6 col-md-4 col-lg-3 col-xl-2">'+
            '            <div class="card">'+
            '              <img src="'+ text[i]["image_link"] +'" class="card-img-top" alt="...">'+
            '              <div class="card-body">'+
            '                <h5 class="card-title">' + text[i]["name"]+'</h5>'+
            printIssuesNicely(text[i]["issues"])+
            '                <a href="'+text[i]["website"]+'" class="btn btn-primary">Website</a>'+
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


function printIssuesNicely(issueArray){
    var output = "";
    for(var i = 0; i < issueArray.length; i++) {
        for(var j = 0; j < issueArray[i].issue_topics.length; j++) {
            output += '<p class="card-text">' +issueArray[i].issue_topics[j] +'</p>';
        }
    }
    return output;
}
