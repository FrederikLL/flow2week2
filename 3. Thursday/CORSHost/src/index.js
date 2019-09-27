import 'bootstrap/dist/css/bootstrap.css'
import jokes from "./jokes";

document.getElementById("but1").addEventListener("click", function(){
    fetch('http://localhost:8080/flow2week2day3CORS/api/person/all')
    .then(function(response) {
        return response.json();
      })
      .then(function(myJson) {
        document.getElementById("div1").innerHTML = UserToHTMLTable(myJson);
      });
});

function UserToHTMLTable(arr){
    var arrHTML = arr.map(item => "<tr>"
                + "<td>" + item.name + "</td>"
                + "<td>" + item.email + "</td>"
                + "<td>" + item.id + "</td>"
                + "</tr>");
    var arrStr = arrHTML.join('');
    var result = "<table class=\"table table-striped\"><tr>"
            + "<th width = 10%>Name</th>"
            + "<th width = 10%>Email</th>"
            + "<th width = 10%>ID</th>"
            + arrStr + "</table>";
    return result;
}


