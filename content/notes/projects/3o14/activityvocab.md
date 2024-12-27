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
  - [attachment](#attachment), [attributedTo](#attributedTo), [audience](#audience)
  - [content](#content), [context](#context), [name](#name), [location](#location)
  - [endTime](#endTime), [generator](#generator), [icon](#icon), [image](#image)
  - [inReplyTo](#inReplyTo), [preview](#preview), [published](#published)
  - [replies](#replies), [startTime](#startTime), [summary](#summary), [tag](#tag)
  - [updated](#updated), [url](#url), [to](#to), [bto](#bto), [cc](#cc)
  - [bcc](#bcc), [mediaType](#mediaType), [duration](#duration)

### Link

- reference to resource identified by a URL
- establishes a [qualified relation](https://patterns.dataincubator.org/book/qualified-relation.html) connecting subject to resource
- *Properties:*
  - [href](#href), [rel](#rel), [mediaType](#mediaType), [name](#name)
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
  - [totalItems](#totalItems), [current](#current), [first](#first), [last](#last)
  - [items](#items)

### CollectionPage

- distinct subsets of items from a [Collection](#collection)
- *Properties:*
  - all properties from [Collection](#collection)
  - [partOf](#partOf), [next](#next), [prev](#prev)

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

### attachment

- ids a resource attached to an object
- similar to attachment in email
- may require special handling

### object
