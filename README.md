Slow Cart

Prototype of a cart UI that handles slow server-side inventory updates.

Features

- Update cart UI is immediate for user (local state)
- Quantity updates are debouced
- Update cart when asynchronous change happens on server
- When there is a discrepancy
  - update cart
  - update inventory
  - alert user

Requirements

- Get inventory on app init
- Cart is kept in a context
- Use Websocket for atomic cart communication
- Toast component for messaging

