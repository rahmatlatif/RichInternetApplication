var default_content="";

$(document).ready(function(){

	checkURL();
	$('ul li a').click(function (e){
			checkURL(this.hash);
	});

	//filling in the default content
	default_content = $('#pageContent').html();


	setInterval("checkURL()",250);

});

var lasturl="";

function checkURL(hash)
{
	if(!hash) hash=window.location.hash;

	if(hash != lasturl)
	{
		lasturl=hash;
		// FIX - if we've used the history buttons to return to the homepage,
		// fill the pageContent with the default_content
		if(hash=="")
		$('#pageContent').html(default_content);

		else if
		  (hash=="#products")
		 	{loadProducts();
		} else if
		   (hash=="#word")
		 	{loadWord();
		} else if
		   (hash=="#excel")
		 	{loadExcel();
		} else if
		   (hash=="#googledocs")
		 	{loadGoogleDocs();
		} else if
		   (hash=="#videoedit")
		 	{loadVideoEdit();
		} else if
		   (hash=="#screencap")
		 	{loadScreenCap();
		} else if
		   (hash=="#podcast")
		 	{loadPodCast();
		 } else {
		   loadPage(hash);
		}
	}
}


function loadPage(url)
{
	url=url.replace('#page','');

	$('#loading').css('visibility','visible');

	$.ajax({
		type: "POST",
		url: "load_page.py",
		data: 'page='+url,
		dataType: "html",
		success: function(msg){

			if(parseInt(msg)!=0)
			{
				$('#pageContent').html(msg);
				$('#loading').css('visibility','hidden');
			}
		}

	});

}

	
	
function loadProducts() {
  $('#loading').css('visibility','visible');
  var jsonURL = "courses.json";

  $.getJSON(jsonURL, function (json)
  {


    var imgList= '<select id="currency" onchange="Convert()"><option value="sgd" selected="selected">SGD</option><option value="myr">MYR</option><option value="inr">INR</option><option value="php">PHP</option><option value="idr">IDR</option></select><ul class=\"products\">';
	$.each(json.courses, function () {
      imgList += '<li class="nostyle"><a href="#' + this.id + '" class="nostyle">' + '<img src= "' + this.imgPath + ' "></a><h4>' + this.name + '</h4><h5 class="price">' + this.price + "</h5></li>";
      
	});
    imgList+='</ul>'
   $('#pageContent').html(imgList);
   $('#loading').css('visibility','hidden');
 	});
}

function Convert() {
	  $('#loading').css('visibility','visible');
	  var jsonConvert = "currency.json";
	  var jsonURL = "courses.json";
			$.getJSON(jsonURL, function (json)
			{
			for (var i = 0; i < (json.courses.length); i++) {
			document.cookie = '"' + "price" + json.courses[i].id + "=" + json.courses[i].price + ";" + '"';
			}
			});
	   
	   $.getJSON(jsonConvert, function (json)
	{
	  
	  var madeSelection = document.getElementById("currency").value;
	  var list = document.getElementsByClassName("price");
	  
	  for (var i = 0; i < list.length; i++){
	    if (madeSelection == "myr") {
			var allprice = document.cookie;
			priceArray = allprice.split(';');
			for (var i = 0; i < priceArray.length; i++){
			name = priceArray[i].split('=')[0];
			value = parseInt(priceArray[i].split('=')[1]);
			var conversion = json.currencies[0].conversion;
			rate = parseFloat(conversion);
			document.getElementsByClassName("price")[i].innerHTML = value*rate;
			}
		}
		
	    if (madeSelection == "inr") {
			var allprice = document.cookie;
			priceArray = allprice.split(';');
			for (var i = 0; i < priceArray.length; i++){
			name = priceArray[i].split('=')[0];
			value = parseInt(priceArray[i].split('=')[1]);
			var conversion = json.currencies[1].conversion;
			rate = parseFloat(conversion);
			document.getElementsByClassName("price")[i].innerHTML = value*rate;
			}
		}
	    if (madeSelection == "php") {
			var allprice = document.cookie;
			priceArray = allprice.split(';');
			for (var i = 0; i < priceArray.length; i++){
			name = priceArray[i].split('=')[0];
			value = parseInt(priceArray[i].split('=')[1]);
			var conversion = json.currencies[2].conversion;
			rate = parseFloat(conversion);
			document.getElementsByClassName("price")[i].innerHTML = value*rate;
			}
		}
	    if (madeSelection == "idr") {
			var allprice = document.cookie;
			priceArray = allprice.split(';');
			for (var i = 0; i < priceArray.length; i++){
			name = priceArray[i].split('=')[0];
			value = parseInt(priceArray[i].split('=')[1]);
			var conversion = json.currencies[3].conversion;
			rate = parseFloat(conversion);
			document.getElementsByClassName("price")[i].innerHTML = value*rate;
			}
		}
	    if (madeSelection == "sgd") {
			var allprice = document.cookie;
			priceArray = allprice.split(';');
			for (var i = 0; i < priceArray.length; i++){
			name = priceArray[i].split('=')[0];
			value = parseInt(priceArray[i].split('=')[1]);
			document.getElementsByClassName("price")[i].innerHTML = value;
			}
		}		
	  }

	});
$('#loading').css('visibility','hidden');
}
	  

function loadWord() {
   $('#loading').css('visibility','visible');
   var jsonURL = "courses.json";
   $.getJSON(jsonURL, function (json)
   {
     var description= "<h3>";
     description += json.courses[0].name + "</h3>" + '<br>' + '<img src= "' + json.courses[0].imgPath + '"><br><p>"' + json.courses[0].summary + '</p>' + '<br>';
     description += '<a href=#page8>Course Schedule</a>'
	 description += '<br><a href=#page2>Register</a>'
    $('#pageContent').html(description);
    $('#loading').css('visibility','hidden');
  });
 }

 function loadExcel() {
   $('#loading').css('visibility','visible');
   var jsonURL = "courses.json";
   $.getJSON(jsonURL, function (json)
   {
     var description= "<h3>";
     description += json.courses[1].name + "</h3>" + '<br>' + '<img src= "' + json.courses[1].imgPath + '"><br><p>"' + json.courses[1].summary + '</p>' + '<br>';
     description += '<a href=#page9>Course Schedule</a>'
	 description += '<br><a href=#page2>Register</a>'
    $('#pageContent').html(description);
    $('#loading').css('visibility','hidden');
  });
 }

 function loadGoogleDocs() {
   $('#loading').css('visibility','visible');
   var jsonURL = "courses.json";
   $.getJSON(jsonURL, function (json)
   {
     var description= "<h3>";
     description += json.courses[2].name + "</h3>" + '<br>' + '<img src= "' + json.courses[2].imgPath + '"><br><p>"' + json.courses[2].summary + '</p>' + '<br>';
     description += '<a href=#page10>Course Schedule</a>'
	 description += '<br><a href=#page2>Register</a>'
    $('#pageContent').html(description);
    $('#loading').css('visibility','hidden');
  });
 }
 function loadVideoEdit() {
   $('#loading').css('visibility','visible');
   var jsonURL = "courses.json";
   $.getJSON(jsonURL, function (json)
   {
     var description= "<h3>";
     description += json.courses[3].name + "</h3>" + '<br>' + '<img src= "' + json.courses[3].imgPath + '"><br><p>"' + json.courses[3].summary + '</p>' + '<br>';
     description += '<a href=#page11>Course Schedule</a>'
	 description += '<br><a href=#page2>Register</a>'
	 
    $('#pageContent').html(description);
    $('#loading').css('visibility','hidden');
  });
 }
  function loadScreenCap() {
    $('#loading').css('visibility','visible');
    var jsonURL = "courses.json";
    $.getJSON(jsonURL, function (json)
    {
      var description= "<h3>";
     description += json.courses[4].name + "</h3>" + '<br>' + '<img src= "' + json.courses[4].imgPath + '"><br><p>"' + json.courses[4].summary + '</p>' + '<br>';
     description += '<a href=#page12>Course Schedule</a>'
	 description += '<br><a href=#page2>Register</a>'
     $('#pageContent').html(description);
     $('#loading').css('visibility','hidden');
   });
 }
   function loadPodCast() {
     $('#loading').css('visibility','visible');
     var jsonURL = "courses.json";
     $.getJSON(jsonURL, function (json)
     {
       var description= "<h3>";
     description += json.courses[5].name + "</h3>" + '<br>' + '<img src= "' + json.courses[5].imgPath + '"><br><p>"' + json.courses[5].summary + '</p>' + '<br>';
     description += '<a href=#page13>Course Schedule</a>'
	 description += '<br><a href=#page2>Register</a>'
      $('#pageContent').html(description);
      $('#loading').css('visibility','hidden');
    });
 }