import 'bootstrap/dist/css/bootstrap.css'
import jokes from "./jokes";

//Quote
document.getElementById("but1").addEventListener("click", function(){
    document.getElementById("div1").innerHTML = "Dont let your dreams be dreams";
});
//fetch a joke
document.getElementById("but2").addEventListener("click", function(){
    fetch('https://studypoints.info/jokes/api/jokes/period/hour')
    .then(function(response) {
        return response.json();
      })
      .then(function(myJson) {
        document.getElementById("div1").innerHTML = ""+ JSON.stringify(myJson) +"";
      });
});
//shows all users from the json data (spa assignment in the bottom of day 2 exercise)
document.getElementById("but3").addEventListener("click", function(){
    fetch('http://localhost:3333/api/users')
    .then(function(response) {
        return response.json();
      })
      .then(function(myJson) {
        document.getElementById("div1").innerHTML = UserToHTMLTable(myJson);
      });
});

function UserToHTMLTable(arr){
    var arrHTML = arr.map(item => "<tr>"
                + "<td>" + item.age + "</td>"
                + "<td>" + item.name + "</td>"
                + "<td>" + item.gender + "</td>"
                + "<td>" + item.email + "</td>"
                + "<td>" + item.id + "</td>"
                + "</tr>");
    var arrStr = arrHTML.join('');
    var result = "<table class=\"table table-striped\"><tr>"
            + "<th width = 10%>Age</th>"
            + "<th width = 10%>Name</th>"
            + "<th width = 10%>Gender</th>"
            + "<th width = 10%>Email</th>"
            + "<th width = 10%>ID</th>"
            + arrStr + "</table>";
    return result;
}
//get single user by id
document.getElementById("but4").addEventListener("click",function(){
    var test = document.getElementById("inp1");
    console.log(test.value);
    fetch('http://localhost:3333/api/users/'+ test.value)
    .then(function(response) {
        return response.json();
      })
      .then(function(myJson) {  
        document.getElementById("div1").innerHTML = UserToHTML(myJson); 
      });
    });
    
    function UserToHTML(item){
        var arrHTML = "<tr>"
                    + "<td>" + item.age + "</td>"
                    + "<td>" + item.name + "</td>"
                    + "<td>" + item.gender + "</td>"
                    + "<td>" + item.email + "</td>"
                    + "<td>" + item.id + "</td>"
                    + "</tr>";
        var result = "<table class=\"table table-striped\"><tr>"
                + "<th width = 10%>Age</th>"
                + "<th width = 10%>Name</th>"
                + "<th width = 10%>Gender</th>"
                + "<th width = 10%>Email</th>"
                + "<th width = 10%>ID</th>"
                + arrHTML + "</table>";
        return result;
    }



