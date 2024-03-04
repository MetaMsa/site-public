var karsilama="MERHABA";
var i=0;
const myinterval = setInterval(() => {document.getElementById("merhaba").innerHTML+=karsilama[i];i++;if(i==8) {i=0;document.getElementById("merhaba").innerHTML=" ";}}, 1000);