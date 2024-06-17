window.onload = () => {
    document.querySelector(".loader").style.display = "none";
}

var yapim="...";
var i=0;
const myinterval = setInterval(() => {document.getElementById("construct").innerHTML+=yapim[i];i++;if(i==4) 
{i=0;document.getElementById("construct").innerHTML="Yapım Aşamasında ";}}, 500);