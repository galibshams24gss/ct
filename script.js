function getContent(fragmentId, callback){
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
	   callback(xhttp.responseText);
    }
};
	xhttp.open("GET", fragmentId + ".html");
	xhttp.send(null);
}

function navigate(){
	var contentDiv = document.getElementById("content");
	fragmentId = location.hash.substr(1);
	//console.log(fragmentId);
	getContent(fragmentId, function(content){
		contentDiv.innerHTML = content;
	});
	
	//console.log(fragmentId);
	if(fragmentId == "details"){
		var xhttp = new XMLHttpRequest();
		xhttp.onload = function() {
		var response = JSON.parse(xhttp.responseText);
		var data = response.data;
		//console.log(data);
		var output = '';
		output += '<thead><tr>';
		output += '<th>'+"Time"+'</th>';
		output += '<th>'+"Span ID"+'</th>';
		output += '<th>'+"Trace ID"+'</th>';
		output += '<th>'+"Response"+'</th>';
		output += '<th>'+"Cause"+'</th>';
		output += '</tr></thead>';
		for(var i=0; i<data.length; i++){
		output += '<tbody><tr>';
		output += '<td>'+data[i].time+'</td>';
		output += '<td>'+data[i].span_id+'</td>';
		output += '<td>'+data[i].trace_id+'</td>';
		output += '<td>'+data[i].response+'</td>';
		output += '<td>'+data[i].msg+'</td>';
		output += '</tr></tbody>';
		}
	   document.getElementById('dt').innerHTML = output;
	};
	xhttp.open("GET", "log-data.json", true);
	xhttp.send();
	}
	
	if(fragmentId == "success"){
		var xhttp = new XMLHttpRequest();
		xhttp.onload = function() {
		var response = JSON.parse(xhttp.responseText);
		var data = response.data;
		var output = '';
		output += '<thead><tr>';
		output += '<th>'+"Time"+'</th>';
		output += '<th>'+"Span ID"+'</th>';
		output += '<th>'+"Trace ID"+'</th>';
		output += '<th>'+"Cause"+'</th>';
		output += '</tr></thead>';
		for(var i=0; i<data.length; i++){
		if(data[i].response == 200){
		output += '<tbody><tr>';
		output += '<td>'+data[i].time+'</td>';
		output += '<td>'+data[i].span_id+'</td>';
		output += '<td>'+data[i].trace_id+'</td>';
		output += '<td>'+data[i].msg+'</td>';
		output += '</tr></tbody>';
		}
		}
	   document.getElementById('greencases').innerHTML = output;
	};
	xhttp.open("GET", "log-data.json", true);
	xhttp.send();
	}
	
	if(fragmentId == "failed"){
		var xhttp = new XMLHttpRequest();
		xhttp.onload = function() {
		var response = JSON.parse(xhttp.responseText);
		var data = response.data;
		var output = '';
		output += '<thead><tr>';
		output += '<th>'+"Time"+'</th>';
		output += '<th>'+"Span ID"+'</th>';
		output += '<th>'+"Trace ID"+'</th>';
		output += '<th>'+"Cause"+'</th>';
		output += '</tr></thead>';
		for(var i=0; i<data.length; i++){
		if(data[i].response == 500){
		output += '<tbody><tr>';
		output += '<td>'+data[i].time+'</td>';
		output += '<td>'+data[i].span_id+'</td>';
		output += '<td>'+data[i].trace_id+'</td>';
		output += '<td>'+data[i].msg+'</td>';
		output += '</tr></tbody>';
		}
		}
	   document.getElementById('redcases').innerHTML = output;
	};
	xhttp.open("GET", "log-data.json", true);
	xhttp.send();
	}

	if(fragmentId == "overall"){
		var xhttp = new XMLHttpRequest();
		xhttp.onload = function() {
		var response = JSON.parse(xhttp.responseText);
		var data = response.data;
		var output = '';
		output += '<thead><tr>';
		output += '<th>'+"Transactions Completed"+'</th>';
		output += '<th>'+"Total Spans"+'</th>';
		output += '<th>'+"Successful Transactions"+'</th>';
		output += '<th>'+"Failed Transactions"+'</th>';
		output += '<th>'+"Percentage"+'</th>';
		output += '</tr></thead>';
		
		var uniqueSpanId = [];
		for(var i=0; i<data.length; i++){
			if(uniqueSpanId.indexOf(data[i].span_id) === -1){
				uniqueSpanId.push(data[i].span_id);
			}
		}
	    var usi = uniqueSpanId.length;

	   	var uniqueTraceId = [];
		for(var i=0; i<data.length; i++){
			if(uniqueTraceId.indexOf(data[i].trace_id) === -1){
				uniqueTraceId.push(data[i].trace_id);
			}
		}
	   	var uti = uniqueTraceId.length;

	   	var greenCases = [];
	   	for(var i=0; i<data.length; i++){
			if(greenCases.indexOf(data[i].trace_id) === -1 && data[i].response == 200){
				greenCases.push(data[i].trace_id);
			}
		}
		var gc = greenCases.length;

		var redCases = [];
		for(var i=0; i<data.length; i++){
			if(redCases.indexOf(data[i].trace_id) === -1 && data[i].response == 500){
				redCases.push(data[i].trace_id);
			}
		}
		var rc = redCases.length;

	   	output += '<tbody><tr>';
		output += '<td>'+uti+'</td>';
		output += '<td>'+usi+'</td>';
		output += '<td>'+gc+'</td>';
		output += '<td>'+rc+'</td>';
		output += '<td>'+(rc/uti)*100+"%"+'</td>';
		output += '</tr></tbody>';
		document.getElementById('overallresult').innerHTML = output;
	};
	xhttp.open("GET", "log-data.json", true);
	xhttp.send();
	}
}

if(!location.hash){
	location.hash = "#home";
}

navigate();
window.addEventListener("hashchange",navigate)