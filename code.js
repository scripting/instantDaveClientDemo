var myVersion = "0.4.0", myProductName = "instantDaveClientDemo"; 

var config = {
	urlHttpServer: "http://hub2.screen2.io/",
	urlWebsocketsServer: "ws://hub2.screen2.io:5365/"
	}
var mySocket = undefined;
var chatlog = new Array ();

function getChatlog (callback) {
	$.ajax ({
		type: "GET",
		url: config.urlHttpServer + "getchatlog",
		success: function (data) {
			callback (data);
			},
		error: function (status) { 
			console.log ("getChatlog: error == " + JSON.stringify (status, undefined, 4));
			callback (undefined);
			},
		dataType: "json"
		});
	}
function chatlogStart (callback) {
	var whenstart = new Date ();
	getChatlog (function (chatlogSubset) {
		chatlog = chatlogSubset;
		console.log ("chatlogStart: " + chatlog.messages.length + " messages, took " + secondsSince (whenstart) + " secs.");
		if (callback !== undefined) {
			callback ();
			}
		});
	}
function handleUpdate (jstruct) {
	var flNewMessage = true;
	for (var i = 0; i < chatlog.messages.length; i++) { //see if an existing message was updated
		var item = chatlog.messages [i];
		if (item.id == jstruct.id) {
			for (var x in jstruct) { 
				item [x] = jstruct [x];
				}
			flNewMessage = false;
			break;
			}
		}
	if (flNewMessage) {
		chatlog.messages.push (jstruct);
		}
	}
function handleSocketMessage (verb, jsontext) {
	console.log ("handleSocketMessage: verb == " + verb);
	switch (verb) {
		case "update":
			var jstruct = JSON.parse (jsontext);
			$("#idLatestMessage").text (jsonStringify (jstruct));
			handleUpdate (jstruct);
			break;
		case "rollover":
			chatlogStart ();
			break;
		case "reload": 
			window.location.href  = window.location.href; 
			break;
		}
	}
function startSocket (s, callback) {
	mySocket = new WebSocket (config.urlWebsocketsServer); 
	mySocket.onopen = function (evt) {
		console.log ("mySocket is open.");
		mySocket.send (s); //send a  message to wake up server
		};
	mySocket.onmessage = function (evt) {
		var s = evt.data;
		if (s !== undefined) { //no error
			var verb = stringNthField (s, "\r", 1);
			s = stringDelete (s, 1, verb.length + 1);
			callback (verb, s);
			}
		};
	mySocket.onclose = function (evt) {
		console.log ("mySocket was closed.");
		mySocket = undefined;
		};
	mySocket.onerror = function (evt) {
		console.log ("mySocket received an error");
		};
	}
function everySecond () {
	if (mySocket === undefined) { //try to open the connection
		startSocket ("watch chatlog", handleSocketMessage);
		}
	}
function startup () {
	console.log ("startup");
	chatlogStart (function () {
		if (chatlog.messages.length > 0) {
			$("#idLatestMessage").text (jsonStringify (chatlog.messages [chatlog.messages.length - 1]));
			}
		setInterval (everySecond, 1000); 
		});
	}
