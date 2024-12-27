+++
author = "faultypointer"
    title = "ActivityPub"
date = "2024-11-29"
description = "Notes on ActivityPub for minor project"
tags = [
    "3o14",
    "minor-project",
    "activitypub",
]
categories = [
    "Project",
]
+++

# ActivityPub

- users represented by `actors` (user accounts on server)
- each `Actor` has an `inbox`(to get message from world) and `outbox`(send message to the world).
  - they are essentially just urls
- uses {{<backlink "activitystream" "ActivityStream">}} for vocabulary

## Two Protocols

ActivityPub provides two protocol.

- **server to server federation protocol:**
  - share information between decentralized websites
- **client to server protocol:**
  - users to communicate with their account on servers using activitypub

- POST to someone's inbox to send them a message (S2S)
- GET from your inbox to read your latest message (C2S)
- POST to your outbox to send message to the world (C2S)
- GET from someone's outbox to see what messages they have posted (C2S / S2S)

**Note: federation happens usually by servers posting messages sent by actors to actors on other servers' inboxes.**
