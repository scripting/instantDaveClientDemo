# instantDaveClientDemo

Demo code for hooking up to the Instant Dave server.

### The story of Instant Dave

I'm trying to do two things with my blogging --

1. Make it more real-time.

2. Join multiple flows into one. 

That is why I've produced an Electron app, that runs on the Mac, called <a href="http://instantdave.com/">Instant Dave</a>. 

It combines the flow of my <a href="http://scripting.com/">blog</a>, <a href="http://scripting.com/?tab=links">linkblog</a>, photos posted to Flickr and a few other RSS flows.

It's realtime. You get each item as it's posted, through the magic of webSockets.

### The story of this demo app

This app plugs into the same webSocket stream that Instant Dave does, giving you, the JavaScript programmer, the beginnings of an alternate user interface. Or a way to build a compatible <i>Instant</i> product, with your own sources. Instant Wisconsin or Instant Knicks for example. Instant Axios. Instant TPM.

It's time to explore realtime newsfeeds outside of Twitter and Facebook. This is a step in a bootstrap. And an offer to interop. In the most compelling form, example code that works. 

### The tech is very simple

You can run the <a href="http://scripting.com/misc/instantDaveClientDemo/">app</a> here to see how it works. Or you can read the <a href="https://github.com/scripting/instantDaveClientDemo/blob/master/code.js">source</a> here on the repo, or <a href="https://github.com/scripting/instantDaveClientDemo/archive/master.zip">download</a> it and run it on your own machine. 

Here's how it works --

1. When it starts up it gets the "chatlog" file from the server, with the previous posts in the timeline. 

2. Every second it checks to see if the socket is undefined. If so, it starts it up, sending a "watch chatlog" message to the server, and providing a routine to handle an incoming message. 

3. When the socket receives a message, it is separated into two parts, a verb and JSON-formatted data. 

4. When it receives an <i>update</i> message, it parses the JSON and displays the text on screen. It then looks in the <i>chatlog</i> structure to see if there already is a message with the  ID. If there is, it copies the data from the incoming message into the structure. Otherwise it pushes the message object on the end of the chatlog <i>messages</i> structure. 

5. There are a couple of other messages it will handle, <i>rollover</i> and <i>reload</i> which cause the chatlog to reload, or cause the app to reload. 

### Questions?

Post an issue <a href="https://github.com/scripting/instantDaveClientDemo/issues">here</a>. 

Dave Winer, September 2017

