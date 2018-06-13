
var animals = ["dog","ferret","turtle","hamster"];
var img;

renderbtns();

function renderbtns(){
    for (var i=0;i<animals.length;i++){
        var anmlbtn = $("<button>");
        anmlbtn.text(animals[i]);
        anmlbtn.addClass("btn_creature");
        anmlbtn.addClass("btn");
        anmlbtn.addClass("btn-primary");
        $("#creat_btn").append(anmlbtn);
    }
}


$("#add").on("click", addChar);

$(document).keypress(function (e) {
    if (e.which == 13 || event.keyCode == 13) {
        //alert('enter key is pressed');
        addChar();
    }
});

function addChar(){
    console.log($("#new_creature").val());
    var newamlbtn = $("<button>");
    newamlbtn.text($("#new_creature").val());
    newamlbtn.addClass("btn_creature");
    newamlbtn.addClass("btn");
    newamlbtn.addClass("btn-primary");
    $("#creat_btn").append(newamlbtn);
}
var lmt = 0;
var clicked_gif;
$(document).on("click", ".btn_creature",function(){
    lmt = 0;
    $("#creature_gifs").empty();
    console.log("You clicked on "+$(this).text());
    lmt+=10;   
    var queryURL = "https://api.giphy.com/v1/gifs/search?q="+$(this).text()+"&api_key=dc6zaTOxFJmzC&limit="+lmt;
    clicked_gif = $(this).text();
    
    console.log(queryURL);
    
    $.ajax({
        url: queryURL,
        method: "GET"
      }).then (load_gifs_api_call);
})

//var clik=1;
 
$(document).on("click", ".new_gifs",function(){
    lmt+=10;
    $("#creature_gifs").empty();
    var queryURL = "https://api.giphy.com/v1/gifs/search?q="+clicked_gif+"&api_key=dc6zaTOxFJmzC&limit="+lmt;
    console.log(queryURL);

    $.ajax({
        url: queryURL,
        method: "GET"
      }).then (load_gifs_api_call);

    });

$(document).on("click", ".crtgif",function(){

    var state = $(this).attr("data-state");
    var anmtdUrl = $(this).attr("animtd");
    var staticUrl = $(this).attr("static");

//
if (state == "still") {
    $(this).attr("src",anmtdUrl);
    $(this).attr("data-state","animate");
  }
  
  if (state == "animate") {
    $(this).attr("src",staticUrl);
    $(this).attr("data-state","still");
  }
//
});

var load_gifs_api_call = function(response) {
  
       
    for (i=0; i<response.data.length;i++){
       //create a div/block for each image with text
        if (response.data[i].rating.toLowerCase() !="r"){ 
            rtdiv = $("<div>");
            rtdiv.addClass("animalblk");
            rtp = $("<p class ='rating_p'>");
            rtp.text("Rating: "+response.data[i].rating);
            rtdiv.append(rtp);

            img = $("<img>");
            img.attr("src", response.data[i].images.original_still.url);
            img.attr("animtd", response.data[i].images.original.url);
            img.attr("static", response.data[i].images.original_still.url);
            img.attr("data-state","still");
            img.addClass("crtgif");
            
            rtdiv.append(img);

            $("#creature_gifs").append(rtdiv);

                  
        }
    }  

    var btn_load_new = $("<button>");
    btn_load_new.addClass("new_gifs");
    btn_load_new.addClass("btn");
    btn_load_new.addClass("btn-primary");
    btn_load_new.text("Load 10 more images");   

    $("#creature_gifs").append(btn_load_new);
    };
