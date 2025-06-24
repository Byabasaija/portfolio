---
title: "Real-Time on the Web: WebSockets vs SSE, Polling, and REST — What to Use When"
publishedAt: "2025-06-16"
category: Systems Design
tags:
  - Systems Design
  - Software Development
  - Open Source
  - ChatAPI

summary: "Real-time functionality is no longer a luxury. Whether you're building a chat app, a stock ticker, or a multiplayer game, users expect updates as they happen."
banner: /images/banner/posts/websockets-sse-polling.png
alt: "Real-Time on the Web: WebSockets vs SSE, Polling, and REST — What to Use When"
mathjax: false
---

## Introduction
Real-time functionality is no longer a luxury. Whether you're building a chat app, a stock ticker, or a multiplayer game, users expect updates **as they happen**.

But there’s more than one way to deliver real-time features on the web.

When I started building a multi-tenant real-time ChatAPI, I ran into this question early:

> **Should I use REST with polling? Server-Sent Events? WebSockets?**

Turns out — each method has trade-offs.

In this post, I’ll break down four popular options:
- Polling
- Long Polling
- Server-Sent Events (SSE)
- WebSockets

And I’ll tell you exactly **when each one makes sense**, with real examples.

---

## 1. 🌀 Polling

**How it works:**  
The client sends a request at a fixed interval to ask:  
> “Do you have anything new?”

```js
setInterval(() => {
  fetch('/api/messages').then(renderMessages);
}, 3000);
```
### Pros:

- Simple to implement

- Works with any backend

### Cons:

- Delayed response (worst-case latency = polling interval)

- Wastes resources with empty requests

- Poor scalability

- When to use:

- Data updates slowly (e.g. checking a report every 30s)

- You want a dead-simple approach for MVPs

## 2. 🔁 Long Polling

**How it works:**   
The client sends a request and the server holds it open until new data is available.

When data arrives, the server responds — then the client sends another request.

```js
function longPoll() {
  fetch('/api/messages/stream')
    .then(res => res.json())
    .then(data => {
      render(data);
      longPoll(); // repeat
    });
}
```
### Pros:

- More responsive than polling

- Compatible with older HTTP infrastructure

### Cons:

- Still HTTP-based: repeated connections, overhead

- Slight delay between disconnect + reconnect

### When to use:

- You’re stuck with HTTP/1.1 and can't use WebSockets

- You need better latency than basic polling


## 3. 📡 Server-Sent Events (SSE)
**How it works:**   
SSE lets the server push updates to the client over a single HTTP connection using the EventSource API.

```js
const source = new EventSource('/events');
source.onmessage = (event) => {
  render(JSON.parse(event.data));
};
```
### Pros:

- Built into the browser

- Lightweight and efficient

- Automatic reconnection

### Cons:

- One-way only (server → client)

- Only works over HTTP, not HTTPS/2 with full bi-directional support

- Limited support outside browsers (e.g., mobile/websocket clients)

### When to use:

- You only need server-to-client updates

- You're building dashboards, notifications, or analytics

- You want something simpler than WebSockets

## 4. 🌐 WebSockets
**How it works:**   
A full-duplex connection where both client and server can send messages in real time — using a single TCP connection.

```js
const socket = new WebSocket('wss://chat.example.com/ws');
socket.onmessage = (event) => {
  render(JSON.parse(event.data));
};
```
### Pros:

- True bi-directional communication

- Low latency, persistent connection

- Ideal for real-time apps (chat, games, collab tools)

### Cons:

- Slightly more complex setup

- Not always supported by older firewalls/proxies

- Not ideal for low-frequency, one-way updates

### When to use:

- Real-time chat, multiplayer games, live editing

- You need instant, two-way communication

- You want scalable real-time experience with low overhead


As i concluded, choosing a real-time strategy isn't just about what's trending — it's about what fits.
