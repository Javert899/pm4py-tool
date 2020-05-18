function AjaxCall(url, data) {
    data = JSON.stringify(data);
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

function Execute(method, args0, kwargs0, suggestedType="", retAlgo=true, updatedObj=null) {
    let args = args0.slice();
    let kwargs = Object.assign({}, kwargs0);
    let i = 0;
    while (i < args.length) {
        if (Array.isArray(args[i])) {
            args[i] = args[i][0];
        }
        i++;
    }
    for (let key in kwargs) {
        if (Array.isArray(kwargs[key])) {
            kwargs[key] = kwargs[key][0];
        }
    }
    let res = AjaxCall('/execute', {"method": method, "args": args, "kwargs": kwargs, "suggested_type": suggestedType}).responseJSON;
    if (updatedObj != null) {

        if (res["objects"].length == 1) {
            res["objects"][0][1]["depending"] = updatedObj[1]["depending"];
        }
        //UpdateCallback(updatedObj);
    }
    for (let idx in res["objects"]) {
        objMapping[res["objects"][idx][0]] = res["objects"][idx];
    }
    algoMapping[res["algoResult"][0]] = res["algoResult"];
    if (retAlgo) {
        if (updatedObj != null) {
            res["algoResult"][1]["depending"] = updatedObj[1]["depending"];
            UpdateCallback(res["algoResult"]);
        }
        return res["algoResult"];
    }
    if (res["objects"].length == 1) {
        if (updatedObj != null) {
            res["objects"][0][1]["depending"] = updatedObj[1]["depending"];
            UpdateCallback(res["objects"][0]);
        }
        return res["objects"][0];
    }
    return res["objects"];
}

function Repr(obj, variant, kwargs=null) {
    if (kwargs == null) {
        kwargs = {};
    }
    if (Array.isArray(obj)) {
        obj = obj[0]
    }
    let res = AjaxCall("/representation", {"obj": obj, "variant": variant, "kwargs": kwargs}).responseJSON;
    return res["repr"];
}

function GetCurrMap() {
    let res = AjaxCall("/getCurrMap", {}).responseJSON;
    algoMapping = res["algoMapping"];
    objMapping = res["objMapping"];
    objNames = res["objNames"];
}

GetCurrMap();
