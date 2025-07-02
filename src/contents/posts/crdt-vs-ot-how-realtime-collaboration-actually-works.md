---
title: "CRDT vs OT: How Real-Time Collaboration Actually Works"
publishedAt: "2025-07-02"
category: General
tags:
  - Systems Design
  - Design principals
  - Software Development
  - Open Source
  - CRDT
  - OT


summary: "You and your friend Alice are typing a story together on the same document. Suddenly, you both make changes at the exact same spot — Alice inserts a phrase, and you delete a letter. What happens? Does the document explode into chaos? Or does it somehow magically stay in sync?"
banner: /images/banner/posts/crdt-ot.png
alt: "CRDT vs OT: How Real-Time Collaboration Actually Works"
mathjax: false
---


*Imagine this:* You and your friend Alice are typing a story together on the same document. Suddenly, you both make changes at the exact same spot — Alice inserts a phrase, and you delete a letter. What happens? Does the document explode into chaos? Or does it somehow magically stay in sync?

![CRDT vs OT: How Real-Time Collaboration Actually Works](/images/crdt-ot.png)

Welcome to the fascinating world of **real-time collaboration** — where multiple people can edit the same document *at the same time*, and everything just works. But behind this magic is some clever computer science.

Today, we’re going to pull back the curtain and explore the two key ideas that make this possible:

- **OT (Operational Transformation)**
- **CRDT (Conflict-free Replicated Data Types)**

Let’s break these down with clear explanations, simple examples, and a little bit of drama.

---

## The Problem: Concurrent Edits

Let’s set the scene:

- Alice types: `"Hello"` → then inserts `" World"` right after.
- Bob deletes the letter `"e"` from `"Hello"` at the same time.

### The Question:

**How do we merge their edits so the final document is still correct?**

The naive solution is to just apply edits as they arrive. But what if:

- Bob’s delete arrives *after* Alice’s insert?
- Bob has a slow or unreliable internet connection?
- Edits arrive out of order?

If we don’t handle this carefully, the document could become a jumbled mess — or worse, users might overwrite each other’s work.

To solve this, computer scientists invented two powerful approaches: **Operational Transformation (OT)** and **Conflict-free Replicated Data Types (CRDTs).**

---

## Operational Transformation (OT)

### What is OT?

Think of OT like a dance where each dancer adjusts their steps based on their partner’s moves.

- Every change you make is an **operation** — for example, *insert " World" at position 5* or *delete character at position 1*.
- When operations come in out of order, OT **transforms** them so they still apply correctly.

### How OT Works — Step by Step

1. Alice inserts `" World"` at position 5 in `"Hello"`, turning it into `"Hello World"`.
2. Bob deletes the character at position 1 (the `"e"` in `"Hello"`).
3. If Bob’s delete arrives **after** Alice’s insert, the system shifts Bob’s delete operation to the correct position, so it still deletes the `"e"` — even though the document is now longer.
4. This “transformation” keeps the document consistent for everyone.

### Key Idea:

> Each operation is **transformed** based on the operations that came before it.

### Pros of OT

- Time-tested and battle-proven (used by Google Docs, Etherpad).
- Works great for linear text editing.
- Efficient for centralized systems.

### Cons of OT

- Requires a central server to order and transform operations.
- Complex transformation logic that can be tricky to implement.
- Limited support for offline or peer-to-peer collaboration.

---

## Conflict-free Replicated Data Types (CRDT)

### What is CRDT?

Now imagine Lego blocks that snap together perfectly — no matter who builds first or last.

- Each piece of data (like a character or an object) is **smart** and knows how to merge itself with others.
- Users edit their **local copies** independently.
- When devices sync, the system merges changes **automatically** without conflicts.

### How CRDT Works — Step by Step

1. Each character or element has a **unique ID** and metadata like timestamps.
2. Alice inserts `" World"` at position 5 with an ID (say, `123`).
3. Bob deletes the character with ID `045` (the `"e"`).
4. When Alice and Bob’s devices sync, the system merges their changes by comparing IDs and timestamps.
5. The final document is consistent, no matter the order or timing of edits.

### Key Idea:

> The data itself contains enough information to **resolve conflicts mathematically** and merge automatically.

### Pros of CRDT

- Works perfectly offline; syncs later without conflicts.
- Decentralized — no need for a central server.
- Ideal for peer-to-peer apps and distributed systems.

### Cons of CRDT

- Requires more memory and metadata to track changes.
- More complex to design for rich text or complex data structures.
- Implementation can be challenging.

---

## OT vs CRDT: The Face-Off

| Feature          | OT (Operational Transformation)      | CRDT (Conflict-free Replicated Data Types)  |
|------------------|-------------------------------------|---------------------------------------------|
| **Architecture** | Centralized server                   | Decentralized, peer-to-peer                  |
| **Offline Support** | Limited                          | Excellent                                    |
| **Complexity**   | Complex transformation logic        | Complex data structure design                |
| **Use Cases**    | Google Docs, Etherpad                | Notion, Figma, peer-to-peer apps             |
| **Conflict Handling** | Transform operations dynamically | Merge changes automatically                   |

---

## Which One Should You Use?

| You want to build...           | Use        |
|-------------------------------|------------|
| A Google Docs-style editor     | **OT**     |
| A collaborative whiteboard app | **CRDT**   |
| A peer-to-peer note-taking app | **CRDT**   |
| A centralized real-time editor | **OT**     |

---

## Final Thoughts

Real-time collaboration is not magic — it’s math, metadata, and a lot of clever computer science.

Whether you choose **OT** or **CRDT**, you’re working with powerful ideas that turn potential chaos into smooth teamwork.

So next time you and a friend edit a document together, remember: behind the scenes, a brilliant dance or a perfect Lego snap is happening — all to keep your words in harmony.

And now, you know exactly how it works.

---

*Happy collaborating!*
