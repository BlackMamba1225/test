var fs=require('fs');
var stream=fs.createReadeStream('./data.json');
stream.on('data',function(chunk){
	console.log(chunk);
});
stream.on('end',function(){
	console.log('finished');
});