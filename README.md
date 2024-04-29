# Slow Cart #

Prototype of a cart UI that handles slow server-side inventory updates.

## Features ##

- Update cart UI is immediate for user (local state)
- Quantity updates are debouced
- Update cart when asynchronous change happens on server
- When there is a discrepancy
  - Update cart
  - Update inventory
  - Alert user

## Requirements ##

- Get inventory when App initializes
- Cart is kept in a context
- Use a Websocket for atomic cart communication
- Use a toast component for user messaging

## Startup

### Install bun
If you don't have this yet, it's fantastic for prototyping with a lot of built-in scaffloding.
```
curl https://bun.sh/install | bash
```

### Run local
Install packages 
```
$ bun install
```

Run bun server and react
```
$ bun dev
$ bun backend
```

View locally
http://localhost:5175/

API is here
http://localhost:3000/
