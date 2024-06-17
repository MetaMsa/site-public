var namee, year, comp, c; 

window.onload = () => {
    document.querySelector(".loader").style.display = "none";
}

var time=new Date("2024-05-23");
var today=new Date();
var timestamp=Math.floor((today-time) / (1000*60*60*24));

var data=fetch("data/lang.json")
    .then(response => response.json())
    .then(data => {var index = timestamp % data.length;
                   namee = data[index].name;
                   year = data[index].year;
                   comp = data[index].compiled;
                   c = data[index].c;
                   document.getElementById("langimg").src=data[--timestamp % data.length].image;
    });

var count=0;

var match = () => {
    var a=document.getElementById("game").value.toLowerCase().trim();

    var data=fetch("/data/lang.json")
    .then(response => response.json())
    .then(data => {
        for(let i=0;i<data.length;i++) 
            {
            if (data[i].name == a) {
    
                if (data[i].name == namee) 
                {
                    document.getElementById("gamebox1").style.backgroundColor = "yellow";
                    document.getElementById("gamebox2").style.backgroundColor = "yellow";
                    document.getElementById("gamebox3").style.backgroundColor = "yellow";

                    document.getElementById("game1-text").innerHTML = year;
                    document.getElementById("yeartext").innerHTML = "";
                    document.getElementById("game2-text").innerHTML = comp;
                    document.getElementById("game3-text").innerHTML = c;

                    alert("Tebrikler! Doğru dil adını buldunuz!");

                    count++;
                }

                else{
                        if(data[i].year > year)
                        {
                            document.getElementById("yeartext").innerHTML = "daha eski bir dil";

                            document.getElementById("gamebox1").style.backgroundColor = "red";

                            count++;
                        }

                        if(data[i].year == year)
                        {
                            document.getElementById("gamebox1").style.backgroundColor = "yellow";
                            document.getElementById("yeartext").innerHTML = "Bu yıl çıkmış başka bir dil";
                            
                            count++;
                        }

                        if(data[i].year < year)
                        {
                            document.getElementById("yeartext").innerHTML = "daha yeni bir dil";

                            document.getElementById("gamebox1").style.backgroundColor = "red";

                            count++;
                        }
            
                        if(data[i].compiled == comp) 
                        {
                            document.getElementById("gamebox2").style.backgroundColor = "yellow";

                            count++;
                        }

                        if(data[i].compiled != comp) 
                            {
                                document.getElementById("gamebox2").style.backgroundColor = "red";

                                count++;
                            }
            
                        if(data[i].c == c) 
                        {
                            document.getElementById("gamebox3").style.backgroundColor = "yellow";

                            count++;
                        }

                        if(data[i].c != c) 
                            {
                                document.getElementById("gamebox3").style.backgroundColor = "red";

                                count++;
                            }

                        document.getElementById("game1-text").innerHTML = data[i].year;
                        document.getElementById("game2-text").innerHTML = data[i].compiled;
                        document.getElementById("game3-text").innerHTML = data[i].c;
                }
            }
        }

        if(count==0)
        {
            alert("Hatalı dil adı girdiniz! ");

            document.getElementById("yeartext").innerHTML = "";

            document.getElementById("game1-text").innerHTML = "";
            document.getElementById("game2-text").innerHTML = "";
            document.getElementById("game3-text").innerHTML = "";

            document.getElementById("gamebox1").style.backgroundColor = "red";
            document.getElementById("gamebox2").style.backgroundColor = "red";
            document.getElementById("gamebox3").style.backgroundColor = "red";
        }   
        count=0;
    });
}