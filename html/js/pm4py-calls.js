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

function Execute(method, args, kwargs) {
    let res = AjaxCall('/execute', {"method": method, "args": args, "kwargs": kwargs});
    return res.responseJSON;
}
