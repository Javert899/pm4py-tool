Dropzone.autoDiscover = false;

document.getElementById("uploadZone").style.display = "";

var myDropzone = new Dropzone("div#uploadZone", {
    url: "/upload"
  });
  myDropzone.on("success", function(response) {
    console.log(response);
    console.log(response.name);
    console.log(response.xhr.responseText);
});
