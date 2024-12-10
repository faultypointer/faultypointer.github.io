+++
author = "faultypointer"
title = "PngMe"
date = "2024-11-29"
description = "Encode and Decode secret messages in png file."
tags = [
    "PngMe",
    "Rust",
]
categories = [
    "Project",
]
+++

A program that encodes a message into a png image. (also decodes)

## PNG Specification

### Chunk Types

Chunk type codes are assigned so that a decoder can determine some properties of a chunk even when it does not recognize the type code. These rules are intended to allow safe, flexible extension of the PNG format, by allowing a decoder to decide what to do when it encounters an unknown chunk. The naming rules are not normally of interest when the decoder does recognize the chunk's type.

0 = upper case
1 = lowercase
only for human understanding
proper testing with the actual bit 5 only

4 bytes of chunk type
bit 5 of each bit is used to convey chunk property

#### Properties

- **Ancillary Bit**:
  - bit 5 of first byte
  - 0 = critical; 1 = ancillary
  - chunks that are not strictly necessary to display the contents of file are ancillary chunk
- **Private Bit**
  - second byte
  - 0 = public; 1 = private
  - public chunk: part of PNG specification or in registered list of PNG special purpose public chunk types
- **Reserved Bit**
  - third byte
  - must be 0 (PNG version 1.2)
- **Safe to Copy**
  - fourth byte
  - 0 = unsafe to copy
  - 1 = safe to copy
  - only needed by png editors
  - If 1, the chunk may be copied to a modified PNG file whether or not the software recognizes the chunk type, and regardless of the extent of the file modifications.

## Crc Calculation

calculated by standard method defined by ISO 3309
**polynomial**:
   x^32+x^26+x^23+x^22+x^16+x^12+x^11+x^10+x^8+x^7+x^5+x^4+x^2+x+1

```c
// in binary
0b0000100000100110000010001110110110111
// in hex
0x0104C11DB7
// highest term (32 bit) is not usually written
0x04_C1_1D_B7

// reversed form (why??)
0b1110110110111000100000110010000010000
0xedb88320
```

so we calculate the crc table for each possible value in a byte (0 to 255)

```
for n from 0 to 255
 c = n
 for k from 0 to 7
  if lsb of c is 1
   c = 0xedb88320 ^ (c>>1)
  else
   c = c >> 1
 crc_table[n] = c
```

then to calculate crc of chunk
c = 0xffffffff
for each byte in chunktype bytes and data bytes (not length)
 c = crc_table[c ^ byte & 0xff] ^ (c >> 8);

final_crc = c ^ 0xffffffff
