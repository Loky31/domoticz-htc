#!/usr/bin/nodejs
// Sharp Aquos TV - HDMI CEC for TV power does not work, so lets use a serial connection.
// Power/Mute functionality only.

var 	serialport 	= require("serialport"),
	events 		= require('events'),
	util   		= require('util');

// Defaults
var 	TRACE 	= false,
	serialdevice = "/dev/ttyUSB-TV",
	serialbaud = 9600,

var SharpTV = function(options) {
	events.EventEmitter.call(this); 	// inherit from EventEmitter
    	TRACE = options.log;
    	serialdevice = options.serialport;
    	serialbaud = options.serialbaud;
}

util.inherits(SharpTV, events.EventEmitter);

var SerialPort = serialport.SerialPort; 	// localize object constructor 
var sp = new SerialPort(serialdevice, {
	baudrate: serialbaud,
	parser: serialport.parsers.readline("\r")
});
// Connect
sp.on('open', function() {
	console.log('TV: connected @ ' + sp.options.baudRate);
	setTimeout(function() {
		sp.write("RSPW1   \r");		// Disable energy saving mode.
	}, 1000);
});

sp.on("data", function (data) {
	if(TRACE) {
	  	console.log("TV GET: "+data);
	}
});

SharpTV.prototype.power = function(value) {
	var data = "POWR" + value + "   \r";	// Needs padding, has to be 8-Bit
	sp.write(data);
	if(TRACE) { console.log("TV SEND: " + data + "\r"); }
}

SharpTV.prototype.mute = function(value) {
	var data = "MUTE" + value + "   \r";	// Needs padding, has to be 8-Bit
	sp.write(data);
	if(TRACE) { console.log("TV SEND: " + data + "\r"); }
}

exports.SharpTV = SharpTV;
