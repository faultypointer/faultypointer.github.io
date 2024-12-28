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

## Example 1
```json
{
  "@context": "https://www.w3.org/ns/activitystreams",
  "type": "Note",
  "to": ["https://chatty.example/ben/"],
  "attributedTo": "https://social.example/alyssa/",
  "content": "Say, did you finish reading that book I lent you?"
}
```

The above json object is the {{<backlink "activitystream" "ActivityStreams">}} object
composed by Alyssa to her friend ben as a Note.

Alyssa POSTs this to her outbox.

The `Note` is a non-activity object which the server recognizes as an object being
newly created so it wraps it in a `Create` activity.

```json
{"@context": "https://www.w3.org/ns/activitystreams",
 "type": "Create",
 "id": "https://social.example/alyssa/posts/a29a6843-9feb-4c74-a7f7-081b9c9201d3",
 "to": ["https://chatty.example/ben/"],
 "actor": "https://social.example/alyssa/",
 "object": {"type": "Note",
            "id": "https://social.example/alyssa/posts/49e2d03d-b53a-4c4c-a95c-94a6abf45a19",
            "attributedTo": "https://social.example/alyssa/",
            "to": ["https://chatty.example/ben/"],
            "content": "Say, did you finish reading that book I lent you?"}}
```

Alyssa's server looks up Ben's ActivityStreams actor object, finds his inbox endpoint, and POSTs her
object to his inbox.

When Alyssa checks new messages, a while later, her phone app polls her inbox via GET,
and among other posts, she sees the following:

```json
{"@context": "https://www.w3.org/ns/activitystreams",
 "type": "Create",
 "id": "https://chatty.example/ben/p/51086",
 "to": ["https://social.example/alyssa/"],
 "actor": "https://chatty.example/ben/",
 "object": {"type": "Note",
            "id": "https://chatty.example/ben/p/51085",
            "attributedTo": "https://chatty.example/ben/",
            "to": ["https://social.example/alyssa/"],
            "inReplyTo": "https://social.example/alyssa/posts/49e2d03d-b53a-4c4c-a95c-94a6abf45a19",
            "content": "<p>Argh, yeah, sorry, I'll get it back to you tomorrow.</p>
                        <p>I was reviewing the section on register machines,
                           since it's been a while since I wrote one.</p>"}}
```

## Objects
- core concepts around with activitypub is built
- often are wrapped in activities or part of a collection
- server should validate the content they receive to avoid spoofing attacks
  - checking the object appears as received at its origin
  - checking signatures [recommended]

### Object Identifiers
- all objects in {{<backlink "activitystream" "ActivityStream">}} should have unique global indetifiers
  - MUST in activitypub, unless short-lived activities

- must fall under one of the following groups
  - Publicly dereferencable URIs
  - id explicitely specified as JSON `null` object

- all object have following properties
  - **id**: unique global identifier
  - **type**: type of object


### Retrieving Objects
- HTTP GET may be dereferenced against objects `id` property
- servers may use HTTP content negotiation as defined in [RFC7231](https://www.w3.org/TR/activitypub/#bib-RFC7231) to select the type of data to return in response to a request
- but MUST present `ActivityStreams` object representation in response to `application/ld+json; profile="https://www.w3.org/ns/activitystreams"`
- SHOULD also present the representation in response to `application/activity+json`
- client MUST specify `Accept` header with `application/ld+json; profile="https://www.w3.org/ns/activitystreams"` media type

### Source Property
- `ActivityPub` extends the properties of `object` defined by {{<backlink "activityvocab" "Activity Vocabulary">}} by supplying `source` property
- convey the source from which content markup was derived


## Actors
