function AjaxCall(url, data) {
    data = JSON.stringify(data);
    console.log(data);
    console.log("xxxx");
      let res = $.ajax({
        url: ServiceUrl + url,
        data: data,
      dataType: 'json',
      contentType : 'application/json',
        type: 'POST',
        async: false,
        done: function(response) {
            return response;
        }
      });
      return res;
}

function Execute(method, args, kwargs, retAlgo=false) {
    let res = AjaxCall('/execute', {"method": method, "args": args, "kwargs": kwargs}).responseJSON;
    for (let idx in res["objects"]) {
        objMapping[res["objects"][idx][0]] = res["objects"][idx][1];
    }
    algoMapping[res["algoResult"][0]] = res["algoResult"][1];
    return res;
}
