+++
author = "faultypointer"
title = "Zhip-8"
date = "2024-11-29"
description = "A chip-8 emulator"
tags = [
    "chip8",
    "zig",
]
categories = [
    "Project",
]
+++
Chip-8 emulator in zig

## What is chip8?
>
> Chip-8 is a simple, interpreted, programming language which was first used on some do-it-yourself computer systems in the late 1970s and early 1980s. The COSMAC VIP, DREAM 6800, and ETI 660 computers are a few examples. These computers typically were designed to use a television as a display, had between 1 and 4K of RAM, and used a 16-key hexadecimal keypad for input. The interpreter took up only 512 bytes of memory, and programs, which were entered into the computer in hexadecimal, were even smaller.
>
> - [Cowgod's Chip8 Techincal Reference](http://devernay.free.fr/hacks/chip8/C8TECH10.HTM)

nowadays its basically a hello world of emulators

## Whats does a chip8 emulator have?

### Memory

- 4 KB of memory
- 0x000 to 0xFFF
- first 512 bytes from 0x000 to 0x1FF should not be used by programs (where original interpreter was located)

### Registers

- 16 general purpose 8 bit registers
  - usually referred to as Vx where x is hexadecimal digit (0 to F)
- one 16 bit register I (used to store memory addresses); only rightmost 12 bits are used
- $V_f$  should not be used by programs. used by some instructions as a flag
- two special 8 bit register for sound and timer. (when they are non zero; auto decrement at rate 60Hz)
- PC (16 bit) used to store currently executing address
- SP (8 bit) top most level of stack.; stack is 16 16-bit values used to store the address that the interpreter should return to when finished with a subroutine

### keyboard

- 16 key hex keyboard
- layout:
  - ![[Pasted image 20241002140007.png]]

### Display

- original implementation has 64x32-pixel mono chrome display
- ![[Pasted image 20241002140316.png]]
- recently super chip-48 added a 128x64-pixel mode
- chip8 draws graphics using sprites
  - a sprite is a group of bytes (which are binary representation of desired picture)
  - sprites maybe upto 15 bytes. (max possible sprite size of 8 * 15)
  - ![[Pasted image 20241002141001.png]]

### Timers and sound

- 2 timers; delay  and sound
- delay timer active when delay time register (DT) is non zero
  - subtracts 1 from the value of DT at the rate of 60 Hz
  - when DT reaches 0, it deactivates
- sound timer active when sound timer register (ST) is non zero
  - also decrements at 60 Hz
  - as long as sound timer is active, chip8's buzzer will sound; it only produces one tone; frequency set by author of implementer

## Instructions
