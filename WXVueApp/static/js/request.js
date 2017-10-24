function ajaxRequest(url, type, data, successFn, failFn){
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
		$.ajax({
			type: "post",
			url: url,
			dataType: "json",
			data: JSON.stringify(data),
			contentType: "application/json; charset=utf-8",
			async:true,
			success: function(data){
				successFn(data);
			},
			error: function(){
				failFn();
			}
		});
	}
}
