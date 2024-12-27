+++
author = "faultypointer"
title = "Activity Vocabulary"
date = "2024-11-29"
description = "Notes on Activity Vocabulary for minor project"
tags = [
    "3o14",
    "minor-project",
    "activityvocabulary",
]
categories = [
    "Project",
]
+++

# Activity Vocabulary

- defines the properties of vocabulary of {{<backlink "activitystream" "ActivityStream">}}
- *Core set:*
  - properties describing generalized structure of an Activity
  - extended properties that cover specific types of Activities
  
## Core Types

### Object

- object of any kind
- base type for most kinds of objects
- *Properties:*
  - [attachment](#attachment), [attributedTo](#attributedto), [audience](#audience)
  - [content](#content), [context](#context), [name](#name), [location](#location)
  - [endTime](#endtime), [generator](#generator), [icon](#icon), [image](#image)
  - [inReplyTo](#inreplyto), [preview](#preview), [published](#published)
  - [replies](#replies), [startTime](#starttime), [summary](#summary), [tag](#tag)
  - [updated](#updated), [url](#url), [to](#to), [bto](#bto), [cc](#cc)
  - [bcc](#bcc), [mediaType](#mediatype), [duration](#duration)

### Link

- reference to resource identified by a URL
- establishes a [qualified relation](https://patterns.dataincubator.org/book/qualified-relation.html) connecting subject to resource
- *Properties:*
  - [href](#href), [rel](#rel), [mediaType](#mediatype), [name](#name)
  - [hreflang](#hreflang), [height](#height), [width](#width), [preview](#preview)

### Activity

- describes some form of action
- *Properties:*
  - inherits all properties from [Object](#object)
  - [actor](#actor), [object](#object-1), [target](#target), [result](#result)
  - [origin](#origin), [instrument](#instrument)
  
### Collection

- ordered or unordered sets of [Object](#object) or [Link](#link) instances
- *Properties:*
  - all properties from [Object](#object)
  - [totalItems](#totalitems), [current](#current), [first](#first), [last](#last)
  - [items](#items)

### CollectionPage

- distinct subsets of items from a [Collection](#collection)
- *Properties:*
  - all properties from [Collection](#collection)
  - [partOf](#partof), [next](#next), [prev](#prev)

## Extended Types

### Activity Types

#### Accept

- actor accepts the object
- [target](#target) property can be used to indicate the context into which object has been accepted

#### Add

- added object to target
- if target not specified, need to be determined from context

#### Create

- actor has created the object

#### Delete

- actor has deleted the object
- origin (if specified) indicates the context from which object was deleted

#### Follow

- actor is following the object

#### Join/Leave

- actor has joined/left the object

#### Like

- actor likes the object

#### Remove

- actor is removing the object

#### Undo

- actor is undoing the object
- eg: undoing the previously liked article

#### Update

- actor has updated the object

#### View

- actor has viewed the object

#### Read

- actor has read the object

#### Announce

- actor is calling target's attention to the object

#### Question

- represents a question being asked
- intransitive activity: would not contain [object](#object-1) property
- *Properties:*
  - [oneOf](#oneof), [anyOf](#anyof), [closed](#closed)

### Actor Types

#### Application

- software application

#### Group

- formal or informal collective of Actors

#### Organization

- represents an organization

#### Person

- represents an individual

#### Service

- service of any kind

### Object and Link Types

#### Relationship

- relationship between two individuals
- *Priperties:*
  - [subject](#subject), [object](#object), [relationship](#relationship-1)

#### Article

- any type of multi-paragraph written work

#### Document

- document of any kind

#### Audio

- audio document

#### Image

- image document

#### Video

- video document of any kind

#### Note

- short written work (typically less than a paragraph)

#### Page

- web page

#### Mention

- specialized [Link](#link) that represents an @mention

#### Profile

- content object that describes another object
- used to describe [Actor Type](#actor-types) objects
- *Properties:*
  - [describes](#describes)

## Properties

### id

- unique identifier for [Object](#object) or [Link](#link)
- range: anyURI

### type

- identifies the [Object](#object) or [Link](#link) type

### actor

- one or more entities that performed or are expected to perform the activity

### attachment

- ids a resource attached to an object
- similar to attachment in email
- may require special handling

### attributedTo

- one or more entities to which object is attributed

### audience

- identifies one or more entities that represent total population of entities for whic object is relevant

### bcc

- one or more private secondary audience

### bto

- private primary audience

### cc

- part of public secondary audience

### context

- context within which object exists or activity is performed

### current

- page that contains most recently updated member items in Collection

### first

- furthest preceding page if items in Collection

### generator

- entity that generated the object

### icon

- icon of the obejct

### image

- image for the object

### inReplyTo

- one or more entities for which this object is considered a response

### instrument

- one or more objects used in completion of an activity

### last

- furthest proceding page of Collection

### location

- one or more physical or logical location related to object

### items

- items contained in a Collection

### oneOf

- exclusive option of a Question

### anyOf

- inclusive option of a Question

### closed

- question has been closed

### origin

- indirect object from which the activity is directed

### next

- next page of items in Collection

### object

- `Activity:` direct object of Activity
- `Relationship:` entity to which subject is related

### prev

- previous page of items in Collection

### preview

- entity that provides a preview of the object

### result

- result of an activity

### replies

- Collection containing objects considered to be response to this object

### tag

- one or more *tags* associated with an object

### target

- indirect object of the activity

### to

- public primary audience

### url

- one or more links to representations of object

### content

- textual representation of object encoded as JSON string

### name

- human readable, plain-text name of object

### height/width

- specifies a hint as to rendering height and weight in device-independent pixels

### href

- target resource pointed to by a [Link](#link)

### hreflang

- hint of language used by target resource

### partOf

- Collection to which CollectionPage item belongs to

### mediaType

- `on Link`: MIME media type of referenced resource
- `on Object`: MIME media type of value of content property

### endTime

- date and time describing ending time of an object

### published

- date and time at which object was published

### startTime

- date and time describing starting time of and object

### rel

- link relation associated with [Link](#link)
- **must** conform to both [HTML5](https://html.spec.whatwg.org/multipage/) and [RFC5988](https://datatracker.ietf.org/doc/html/rfc5988) standard

### startIndex

- A non-negative integer value identifying the relative position within the logical view of a strictly ordered collection

### summary

- natural language summarization of object encoded as HTML

### totalItems

- A non-negative integer specifying the total number of objects contained by the logical view of the collection.

### updated

- date and time at which the object was updated

### subject

- one of the connected individals

### relationship

- kind of relationship

### describes

- object described by [Profile](#profile)
