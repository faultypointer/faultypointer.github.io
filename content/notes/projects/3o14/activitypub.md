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
- generally one of `ActivityStreams` `Actor` types
  - other types like `Profile` can also be `Actors`
- retrieved like any other objects
- has an `id` (URI)
- **ID Normalization**:
  - if `id` is valid URI, it is used directly
  - if user forgot to add scheme for a URI, client may provide a default scheme
  - otherwise entered value is considered invalid
- once actor's URI is identified, it should be dereferenced


### Actor objects
- **MUST have following properties** along with the ones specified in [Object Identifiers](#object-identifiers)
  - *Inbox*:
    - reference to [Ordered Collection] comprised of all the messages received by actor
  - *Outbox*:
    - [Ordered collection] of all the messages produced by actor
  - *Following*:
    - [Collection] of actors this actor is following
  - *Followers*:
    - [Collection] of actors that follow this actor
- **Maybe Properties**
  - *Liked*:
    - [Collection] of objects this actor has liked
  - *Streams*:
    - list of supplementary Collections of interests
  - *preferredUsername*:
    - short username which maybe used to refer to the actor
  - *endPoints*:
    - json object which maps additional endpoints which maybe useful for this actor
    - *endPoints object may include following properties*:
      - proxyUrl
        - endpoint URI so the actor's client may access [objects] which require authentication to access
        - to use this endpoint, client POSTs an `x-www-form-urlencoded id` parameter with the value being `id` of requested object
      - oauthAuthorizationEndpoint
        - TODO
      - sharedInbox
        - used for wide delivery of publicly addressed activities, activities sent to followers
        - should be publicly reachable [OrderedCollection] addressed to [Public] special collection

## Collections
- `ActivityPub` defines several [Collections] with special behaviour
- uses [ActivityStreams paging] to traverse large sets of objects
- some collections are [Ordered Collection]
  - which MUST be presented consistently in reverse chronological order

### Outbox
- discovered through `outbox` property of [Actor](#actor-objects) profile
- MUST be an [Ordered Collection]
- contains activities user has published, subject to the ability of requestor to retrieve the activity
- if requested without [Authorization], server should respond with all the [Public](#public-addressing) posts

### Inbox
- discovered through `inbox` property of [Actor](#actor-objects) profile
- MUST be an [Ordered Collection]
- contains all the activities received by actor
- server should filter content according to requester's permission
- server MUST perform `de-duplication` of activities returned by inbox by comparing `id`
- inboxes of actors on federated servers should accept HTTP POST request

### Followers Collection
- every `actor` should have a `followers` collection
- list of everyone who sent a [Follow] activity for the actor
- MUST be an [Ordered Collection] or a [Collection]
- default target for [delivery](#delivery) notification

### Following Collection
- list of everybody the actor has followed

### Liked Collection
- every object from actor's [Like] activities

### Public Addressing
- activities may be addressed to special `public` collection
  - with `id` `https://www.w3.org/ns/activitystreams#Public`
- activities addressed to this URI shall be accessible to all users, without authentication
- MUST not deviler to public special colletion

### Likes Collection
- **NOT THE LIKED COLLECTION**
- list of all [Like] activities referencing this object

### Shares Collection
- list of all [Announce] activities with this object as the `object` property

## Server to Server Interactions
- server communicate with other servers by posting activities to actors `inbox` endpoints.
- an activity sent over a network SHOULD have an `id` (unless transient)
- POST req. must be made with Content-Type of `application/ld+json; profile="https://www.w3.org/ns/activitystreams"`
- GET requests with an Accept header of `application/ld+json; profile="https://www.w3.org/ns/activitystreams"`
- server should interpret a Content-Type or Accept header of `application/activity+json` as equivalent to one described above for server to server interactions

### Propagating updates through social graph
- the receipient of activities are determined by following the appropriate links between objects until you reach an actor
- the activity is then inserted into actor's inbox allowing recepient servers to:
  - conduct any side effects related to Activity
  - deliver the Activity to recipients of original object
- *Delivery is usually triggered by:*
  - Activity being created in an actor's outbox with [Followers Collection] as recipents
  - Activity being created in actor's outbox with directly addressed recipients
  - Activity being created in actor's outbox with user-curated collections as recipients
  - Activity being created in actos's outbox or inbox which references another object
- server performing delivery on other servers MUST provide the `object` property in the activity:
  - Create, Update, Delete, Follow, Add, Remove, Like, Block, Undo
  - MUST also provide `target` property for: Add, Remove

- **TODO: something about HTTP caching mechanism**

### Delivery
- **Only required for federation**
- activity is delivered to targets(actors) by looking up their inboxes and then posting to those inboxes
- targets are determined by checking [ActivityStreams audience targeting]; `to`, `bto`, `cc`, `bcc`, and `audience` fields
- inbox is determined by:
  1. retrieving target actor's json-ld representation
  2. looking up inbox property
    - if recipient is a [Collection] or [Ordered Collection], server MUST dereference the collection and discover inboxes for each item
  3. server MUST limit the no of layers of indirections through collecions (may be 1)
  4. server MUST de-duplicate the final recipient list
  4. MUST also exclude actors from the list which are same as the actor of the Activity
- HTTP POST request is then made to inbox, with activity as the body of request
- this activity is, then, added by receiver as an item in the inbox

#### Outbox Delivery Requirements for server to server
- when objects are received in the outbox, the server MUST target and deviler to:
  - `to`, `bto`, `cc`, `bcc` or `audience` fields
  - these feilds will be populated by client

#### Forwarding from Inbox
- when activities are received in the inbox, the server needs to forward these to recipients that the origin was unable to deliver to
- for this, server MUST target and deliver to the values of `to`, `cc`, and/or `audience` if and only if all the following are true:
  - first time server has seen this Activity
  - values of `to`, `cc`, and/or `audience` contain a [Collection] owned by server
  - values of `inReplyTo`, `object`, `target`, and/or `tag` are objects owned by the server
  - recursion to look for linked obejct (also set recursion limit)
#### Shared Inbox Delivery
- when delivering object to originating actor's followers, a server may deviler objects to `sharedInbox`
- if an object is addressed to [Public] special collection, server MAY deliver that object to all known sharedInbox endpoints on the network
- origin servers sending publicly addressed activities to sharedInbox endpoints MUST still deliver to actors and collections otherwise addressed which do not have sharedInbox

### Create Activity
- the activity should appear in actor's inbox (server will want to locally store a repr of this activity/object)

### Update Activity
- receiving server SHOULD update its copy of the `object` of same `id`
- receiving server MUST take care to be sure that Update is authorized

### Delete Activity
- the receiving server SHOULD remove its repr of object with same `id`

### Follow Activity
- receiving server should generate either an Accept or Reject activity with the Follow as the `object`
- deliver it to the actor of Follow
- in case of receiving an Accept referencing this Follow, server SHOULD add the actor to the object actor's Followers Collection

### Accept Activity
- side effect determined by type of object received

### Reject Activity
- also determined by type of object received

### Add/Remove Activity
- add/remove the object to the collection specified in the `target` property
- *Unless*:
  - target is not owned by receiving server
  - object is not allowed to be added/removed to the target

### Like Activity
- increment the object's count of likes by adding the received activity to the likes collection

### Announce Activity
- increment the object's count of shares by adding it to shares collection

### Undo Activity
- undo the side effect of previous activities
