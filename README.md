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

View locally:
http://localhost:5175/

API is here:
http://localhost:3000/


### Testing
1. Try adding the first product to see the delay in the add to cart message
1. Try adding several of the second product, it simulates an eventual consistency message and update the users cart.

## Rationale

#### Why use react component state?
- Does not block on cart updates
- Allows for quick user feedback on updates

#### Why use react context for cart?
- Allows for updates to surface from the backend
- Used by any component without passing props

#### Why use web sockets?
- Can subscribe to cart/inventory updates
- Allow for atomic, terse updates
- Server side source-of-truth unlocks features like persistent carts, abandoned cart emails, etc.

#### Why use Toast messaging?
- Constient user communication
- Mitigates the reconciliation process server -> cart -> ui. 



