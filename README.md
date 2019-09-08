# Ordial

Ordial is an evolution simulator. A server runs in the background constantly simulating while an independent
simulation can be run in the browser.

### How to run

We've been running locally with `grunt`

First you will need to install grunt-cli.

`npm install grunt-cli -g`

Running `grunt` on the command line will start a watcher and a nodejs server.

#### How to run browser simulation

Visit `localhost:3000`

#### How to retrieve the state of the world from the server

`curl localhost:3000/world | pbcopy` 

Paste the contents of the save world into the browser version to see your headless world.

#### How to reset your server's state 

- copy serialized world (e.g. from the gui)

`curl localhost:3000/world -X POST -d $(pbpaste)` 

### how to push to Cloud Foundry

`cf push`
