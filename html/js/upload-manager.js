var watchers = [];

function AddWatcher(patterns, method) {
   watchers.push([patterns, method]);
}

function CheckWatchers() {
    let i = 0;
    while (i < watchers.length) {
        let id_objs = [];
        let j = 0;
        while (j < watchers[i][0].length) {
            let obj = GetOneObjectForType(watchers[i][0][j]);
            if (obj == null) {
                break;
            }
            id_objs.push(obj);
            j++;
        }
        if (id_objs.length == watchers[i][0].length) {
            let method = watchers[i][1];
            if (id_objs.length == 1) {
                method(id_objs[0]);
            }
        }
        i++;
    }
}

Dropzone.autoDiscover = false;

document.getElementById("uploadZone").style.display = "";

var myDropzone = new Dropzone("div#uploadZone", {
    url: "/upload"
  });
  myDropzone.on("success", function(response) {
    let re = /(?:\.([^.]+))?$/;

    let ext = re.exec(response.name)[1];
    let res = JSON.parse(response.xhr.responseText);

    for (let idx in res["objects"]) {
        objMapping[res["objects"][idx][0]] = res["objects"][idx];
    }
    algoMapping[res["algoResult"][0]] = res["algoResult"];

    CheckWatchers();
});