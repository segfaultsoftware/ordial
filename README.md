# Ordial

Ordial is an evolution simulator

We've been running locally with
`grunt`

First you will need to install grunt-cli.

`npm install grunt-cli -g`


### how to push to Cloud Foundry

`cf push`

### how to run headless mode

`node headless.js`

#### How to retrieve the state of the world from the server

`curl localhost:3000/world | pbcopy` 

Paste the contents of the save world into the browser version to see your headless world.

#### How to reset your server's state 

- copy serialized world (e.g. from the gui)

`curl localhost:3000/world -X POST -d $(pbpaste)` 
