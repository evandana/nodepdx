##speaker - Joel Lord

#What are websockets?

###How he encountered them
* Saw them on Trello

###What
* protocol between client and server
* bi-directional channel

###Describes basic use-case
* HTTP req, resp and polling is clumbsy

#Pros
* fast
* bi-directional data transfer
* low bandwidth
* detects connection and disconnection

#Examples
* Trello
* Live feeds (Twitter)
* Multi-player HTML5 game
* Chat clients (Slack)

#Use with HTML5

###Events
* onopen
* onclose

###Sending
* send(..)
* can't send obj, but can stringify and send that

#Getting Started
* PubNub (cloud)
* Ratchet (php)
* Jetty (Java)
* socket.io (node.js) 

#Socket.io
* fallbacks to polling if not supported
* server- and client-side implementation

#Examples
* [poke the server](http://gentle-mountain-89409.herokuapp.com/)
* [poke the button](http://arcane-cliffs-82633.herokuapp.com/)
* [chat](http://serene-cove-25475.herokuapp.com/)