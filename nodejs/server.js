var http=require('http');
var fs=require('fs');
var path=require('path');
var mime=require('mime');
var cache={};

function send404(response){
	response.writeHead(404,{'Content-Type':'text/plain'});
	response.write('Error 404:resource not found.');
	response.end();
}

function sendFile(response,filepath,filecontents){
	response.writeHead(200,{'Content-Type':mime.lookup(path.basename(filepath))});
	response.end(filecontents);
}

function serverstatic(response,cache,abspath){
	if(cache[abspath]){
		sendFile(response,abspath,cache[abspath]);
	}else{
		fs.exists(abspath,function(exists){
			if(exists){
				fs.readFeli(abspath,function(err,data){
					if(err){
						send404(response);
					}else{
						cache[abspath]=data;
						sendFile(response,abspath,data);
					}
				});
			}else{
				send404(response);
			}
		});
	}
}

var server=http.createServer(function(request,response){
	var filepath=false;
	if(request.url=='/'){
		filepath='public/index.html';
	}else{
		filepath='public'+request.url;
	}
	var abapath='./'+filepath;
	serverstatic(response,cache,abspath);
});

server.listen(3000,function(){
	console.log('run in 3000')
})