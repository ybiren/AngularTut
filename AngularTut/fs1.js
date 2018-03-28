
var fs = require('fs');

var WriteToFile = function(str){
	

	fs.appendFile('scripts/bundle.js', str, function(err) {
		if(err) {
			console.log('there was an error: ', err);
			return;
		}
		console.log('data was appended to file');
	
	});
	
};

var arr = ['scripts/app.js','list.html','scripts/list.js','scripts/dtls.js','dtls.html'];

if (fs.existsSync('scripts/bundle.js'))
  fs.unlinkSync('scripts/bundle.js');


for(i=0;i<arr.length;i++){
	fs.readFile(arr[i],'utf8',function(err,data){
		
		if(err){ throw err;}
		console.log(data);
		WriteToFile(data);
		WriteToFile('---------------------------------------------------------------------------------------------------\r\n');
   		WriteToFile('---------------------------------------------------------------------------------------------------\r\n');
       	WriteToFile('---------------------------------------------------------------------------------------------------\r\n');
	});
}