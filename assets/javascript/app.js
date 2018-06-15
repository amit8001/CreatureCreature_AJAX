//Defining global variables
var animals = ["dog","ferret","turtle","hamster"];
var img;
var gifStart;
var gifEnd;
var clicked_gif;

//call the renderbtns function to display the buttons
renderbtns();

//defining the renderbtns function
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

//Handing the click event to add new creature buttons
$("#add").on("click", addChar);

//Below code also adds new buttons for the new creature by hitting Return key from keyboard
$(document).keypress(function (e) {
    if (e.which == 13 || event.keyCode == 13) {
        //alert('enter key is pressed');
        addChar();
    }
});

//Defining the function to add the "new" creature button
function addChar(){
    console.log($("#new_creature").val());
    var newamlbtn = $("<button>");
    newamlbtn.text($("#new_creature").val());
    newamlbtn.addClass("btn_creature");
    newamlbtn.addClass("btn");
    newamlbtn.addClass("btn-primary");
    $("#creat_btn").append(newamlbtn);
}

//Handling the onclick event for one of the creature buttons
$(document).on("click", ".btn_creature",function(){
    gifStart=0;
  //  lmt = 0;
    $("#creature_gifs").empty();
    console.log("You clicked on "+$(this).text());
    //forming the query URL   
    var queryURL = "https://api.giphy.com/v1/gifs/search?q="+$(this).text()+"&api_key=dc6zaTOxFJmzC&limit=10";
    clicked_gif = $(this).text();
    
    console.log(queryURL);
    
    $.ajax({
        url: queryURL,
        method: "GET"
      }).then (load_gifs_api_call);
})

//Handling the onclick event on the "Load more images" button 
$(document).on("click", ".new_gifs",function(){
    $(".div_ld_new_img").remove();
    var queryURL = "https://api.giphy.com/v1/gifs/search?q="+clicked_gif+"&api_key=dc6zaTOxFJmzC&limit=25";
    console.log(queryURL);

    $.ajax({
        url: queryURL,
        method: "GET"
      }).then (load_gifs_api_call);

    });

//Handling the "Play" and "Pause" state of the gifs when clicked
$(document).on("click", ".crtgif",function(){

    var state = $(this).attr("data-state");
    var anmtdUrl = $(this).attr("animtd");
    var staticUrl = $(this).attr("static");
    if (state == "still") {
        $(this).attr("src",anmtdUrl);
        $(this).attr("data-state","animate");
    }
    
    if (state == "animate") {
        $(this).attr("src",staticUrl);
        $(this).attr("data-state","still");
    }
});

//Defining a variable that is assigned a function. This variable is called during AJAX call pulls the data from API.
var load_gifs_api_call = function(response) {
  
    gifEnd=(gifStart+10);
    console.log(response)
       
    for (i=gifStart; i<gifEnd;i++){
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
            gifStart++;
        }
    }  

    var div_ld_new_img = $("<div>");
    div_ld_new_img.addClass("div_ld_new_img");
    var btn_load_new = $("<button>");
    btn_load_new.addClass("new_gifs");
    btn_load_new.addClass("btn");
    btn_load_new.addClass("btn-primary");
    btn_load_new.text("Load More Images");   
    div_ld_new_img.append(btn_load_new);
    $("#creature_gifs").append(div_ld_new_img);
    };