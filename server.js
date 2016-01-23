#!/usr/bin/nodejs
// AVR Controller Server - Setups all the hardware and listens for external API calls.
// This is the main proccess, everything comes together in here.

var 	avr 		= require('./hardware/pioneeravr.js'),
	tele		= require('./hardware/sharptv.js'),
//	vol		= require('./hardware/powermote.js'),
    	request 	= require('request'),
	http 		= require('http'),
    	url 		= require('url'),
	net 		= require('net');

var options = {
	// AVR Connection Settings
	port: 50000,
	host: "192.168.4.66",
	// Debug Logging
	log: false
};

// Setup Hardware
var	receiver 	= new avr.Pioneer(options);
var	tv 		= new tele.SharpTV(options);

// Setup Software
var 	webserver 	= http.createServer().listen(8090, 'localhost');
receiver.on("connect", function() {
	console.log("Pioneer: connected");
});

// WebServer Listen for Input Changes (Domoticz)
webserver.on('request', function(req, res) {
	var url_parts = url.parse(req.url, true);
	switch(url_parts.pathname) {
	    case '/on':
		receiver.power(1);
		tv.power(1);
		if(options.log) { console.log("HTTP-GET: /on"); }
		break;
	    case '/off':
		receiver.power(0);
		tv.power(0);
		if(options.log) { console.log("HTTP-GET: /off"); }
		break;
	    case '/muteon':
		receiver.mute(1);
		tv.mute(1);
		if(options.log) { console.log("HTTP-GET: /muteon"); }
		break;
	    case '/muteoff':
		receiver.mute(0);
		tv.mute(0);
		if(options.log) { console.log("HTTP-GET: /muteoff"); }
		break;
	    case '/ps3':
		setInput("04");		// This has to be paded with a zero as the input is 04 not 4
		if(options.log) { console.log("HTTP-GET: /ps3"); }
		break;
	    case '/ps4':
		setInput(22);
		if(options.log) { console.log("HTTP-GET: /ps4"); }
		break;
	    case '/nexus':
		setInput(15);
		if(options.log) { console.log("HTTP-GET: /nexus"); }
		break;
	    case '/ipcameras':
		setInput(24);1
		if(options.log) { console.log("HTTP-GET: /ipcameras"); }
		break;
	    case '/':
	      res.write('<html><body>Hello, I am the AVR Controller.</body></html>');
	      break;
	    default:
	      res.write('Unknown path: ' + JSON.stringify(url_parts));
	  }
	  res.end();
});

// Perform tasks every input change.
function setInput(input) {
	receiver.power(1);
	tv.power(1);
	receiver.selectInput(input);
//	receiver.mute(false);
}

