#RethinkDB
* open-source database for realtime web

#Examples
* Google Docs
* Slack

#Use Case
* Photo booth

#Tools
* Raspberry Pi
* React

#RethinkDB
* makes a query and also a "notify if changed" request which opens a stream about changes

        r.table('users')
            .pluck('last_name')
            .distinct().count()

* Polling is slow, cumbersome, and hard to maintain

#Horizon
* realtime, open-source backend for JS apps
* 