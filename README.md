# instantDaveClientDemo

Demo code for hooking up to the Instant Dave server.

### The story of Instant Dave

I'm trying to do two things with my blogging --

1. Make it more real-time than RSS.

2. Join multiple flows into one. 

That is why I've produced an Electron app, that runs on the Mac, called Instant Dave. 

It combines the flow of my blog, linkblog, photos posted to Flickr and a few other RSS flows.

It's realtime. You get each item as it's posted, through the magic of webSockets.

### The story of this demo app

This app plugs into the same webSocket stream that Instant Dave does, giving you, the JavaScript programmer, the beginnings of an alternate user interface. Or a way to build a compatible Instant product, with your own sources. Instant Murphy or Instant Knicks for example. Instant Axios? Instant TPM? 

It's time to explore realtime newsfeeds outside of Twitter and Facebook. This is a step in a bootstrap. And it's an offer to interop. In the most compelling form, example code that works. 

### The tech is very simple

You can run the app here and view source to see how it works. Or you can read the source here on the repo, or download it and run it on your own machine. 

Here's how it works --

1. When it starts up it gets the "chatlog" file from the server, with the previous posts in the timeline. 

2. Every second it checks to see if the socket is undefined. If so, it starts it up, sending a "watch chatlog" message to the server, and providing a routine to handle an incoming message. 

3. When the socket receives a message, it is separated into two parts, a verb and some JSON-formatted data. 

4. When it receives an update message, it parses the JSON and displays the text on screen. It then looks in the chatlog structure to see if there already is a message with the  ID. If there is, it copies the data from the incoming message into the structure. Otherwise it pushes the message object on the end of the chatlog messages structure. 

5. There are a couple of other messages it will handle, rollover and reload which cause the chatlog to reload, or cause the app to reload. 

### Questions?

Post an issue here. 

Dave Winer, September 2017

