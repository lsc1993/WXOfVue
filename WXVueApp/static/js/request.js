domain = "http://localhost:";
requestUrl = domain;
imageUrl = domain + "1993/ImageResource/";

function ajaxRequest(url, type, data, jsonType, successFn, failFn){
	if(type == "GET"){
		$.ajax({
			type: "get",
			url: url,
			async:true,
			success: function(data){
				successFn(data);
			},
			error: function(){
				failFn();
			}
		});
	}else if(type == "POST"){
		if(jsonType){
			$.ajax({
				type: "post",
				url: url,
				dataType: "json",
				data: JSON.stringify(data),
				contentType: "application/json; charset=utf-8",
				async: true,
				success: function(data) {
					successFn(data);
				},
				error: function() {
					failFn();
				}
			});
		}else{
			$.ajax({
				type: "post",
				data: data,
				processData: false,
				url: url,
				contentType: false,
				cache: false,
				async: true,
				success: function(data) {
					successFn(data);
				},
				error: function() {
					failFn();
				}
			});
		}
	}
}

function requestOnce(url, type, data, formType, successFn, failFn){
	ajaxRequest(url, type, data, formType, successFn, failFn);
}

function toJSONString(key,value){
	var json = '"' + key + '"' + ":" + '"' + value + '"' + ",";
	return json;
}

function toJSONStringWithOutSplit(key,value){
	var dd = '"' + key + '"' + ":" + '"' + value + '"';
	return dd;
}