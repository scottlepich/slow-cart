# Slow Cart #

Prototype of a cart UI that handles slow server-side inventory updates.

## Features ##

- Update cart UI is immediate for user (local state)
- Quantity updates are debouced
- Update cart when asynchronous change happens on server
- When there is a discrepancy
  - update cart
  - update inventory
  - alert user

### Requirements ###

- Get inventory when App initializes
- Cart is kept in a context
- Use a Websocket for atomic cart communication
- Use a toast component for user messaging

