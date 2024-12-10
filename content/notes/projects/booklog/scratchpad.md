+++
author = "faultypointer"
title = "BookLog Scratchpad"
date = "2024-11-29"
description = "Rough Notes for the project"
tags = [
    "BookLog",
]
categories = [
    "Project Ideas",
]
+++
## How to read Epub

essentially

1. read the epub file (which is essentially a zip file)
2. use zip::ZipArchive to extract all the files in the epub file
3. get the contents and their src from toc.rcx
4. read the files using src obtained from toc
5. strip all html tags to get the text only (tags and style maybe later)

## Epub structure

what fields and methods the Epub structures should have. blatantly copied from [epr](https://github.com/wustho/epr) and [bk](https://github.com/aeosynth/bk)

### Fields

- zip file container: container for files extracted from epub file
- root directory: root directory
- chapters: chapter is another struct defined in bk to i assume chapter contents and titles etc
  - it was to render the chapters
- links: to store links to chapters and other stuff
- meta: holds the metadata

### Methods

get_text: helper method to get the text content from the zip file
get_chapters: get the chapter contents
get_spline: get the chapters and such with paths and title and other metadata

## My app

app home page showing list of books
open book
loads the book from the last read state
read the book
add notes, comments on the current line (or word too?)
option to view notes on this page or all the notes for this book (also all notes on all books on home page)
option to open journal
vim like controls
