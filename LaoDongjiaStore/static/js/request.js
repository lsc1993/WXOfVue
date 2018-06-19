/**
 * 描述：通用的请求工具，基于ajax实现
 * @author liushuang
 * 2018-02-14
 */
//==========================================================================

domain = "http://localhost";
requestUrl = domain + ":8088";
imageUrl = domain + ":1993/ImageResource/";

CONTENT_TYPE_JSON = "application/json; charset=utf-8";
CONTENT_TYPE_XML = "applocation/xml; charset=utf-8";

DATA_TYPE_JSON = "json";

REQUEST_TYPE_GET = "GET";
REQUEST_TYPE_POST = "POST";

/**
 * 发送http请求
 * @param {Object} url 发送请求的地址
 * @param {Object} requestType 请求类型，默认GET
 * @param {Object} data 发送到服务器的数据
 * @param {Object} dataType 预期服务器返回的数据类型，如果不指定，根据HTTP包的MIME类型判断
 * @param {Object} contentType 发送信息至服务器的内容编码类型
 * @param {Object} processData true处理转化data传递的数据，false不转化 ，默认true
 * @param {Object} successFn 处理返回结果
 * @param {Object} failFn 处理失败结果
 */
function request(url, requestType, data, dataType, contentType, processData, successFn, failFn) {
	$.ajax({
		type: requestType,
		url: requestUrl + url,
		data: data,
		dataType: dataType,
		contentType: contentType,
		processData: processData,
		async:true,
		success: function(data) {
			successFn(data);
		},
		error: function() {
			failFn();
		}
	});
}
/**
 * 用于发送普通请求，以JSON格式向服务器发送数据
 * @param {Object} url
 * @param {Object} requestType
 * @param {Object} data
 * @param {Object} successFn
 * @param {Object} failFn
 */
function requestOnce(url, requestType, data, successFn, failFn) {
	request(url, requestType, data, DATA_TYPE_JSON, CONTENT_TYPE_JSON, true, successFn, failFn);
}

/**
 * 用于发送表单类型数据
 * @param {Object} url
 * @param {Object} requestType
 * @param {Object} data
 * @param {Object} successFn
 * @param {Object} failFn
 */
function requestWithFormData(url, requestType, data, successFn, failFn) {
	request(url, requestType, data, DATA_TYPE_JSON, false, false, successFn, failFn);
}
