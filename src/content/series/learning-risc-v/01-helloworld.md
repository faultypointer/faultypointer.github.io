---
title: "Hello World Kernel"
description: "Let's implement a 'kernel' that prints hello world."
date: "2026-01-13"
tags: ["riscv", "assembly"]
part: 1
draft: false
---

The time has finally comes.
We are going to write a "kernel" for RISC-V 32 that prints "Hello World" to the screen.

> Read the [series's description](../learning-risc-v) for what I mean by "kernels"?

## Setup
Each new part in this series, we will be writing a new kernel unless we are improving a kernel from the previous part.
We will be using clang to assemble our code to an elf file. The script we are going to use to assemble and run the qemu
will be something like this:

```bash
#!/bin/bash
set -xeu
QEMU=qemu-system-riscv32
CC=clang 
CFLAGS="-std=c11 -g3 -Wall -Wextra \
    --target=riscv32-unknown-elf \
    -fuse-ld=lld \
    -nostdlib"
$CC $CFLAGS -Wl,-Tkernel.ld  -o kernel.elf \
    kernel.s
# -machine virt: start the virt machine. virt is a generic riscv emulator
# - bios default: use default firmware(OpenSBI)
# -nographic: start qemu with no graphical window
# - serial mon:stdio: connect qemu's stdio to virt machine's serial port.
#     'mon' allows switching to qemu monitor by pressing C-A then C. 
# --no-reboot: if virtual machine crashes, don't reboot.
$QEMU -machine virt \
    -bios default \
    -nographic \
    -serial mon:stdio \
    --no-reboot \
    -d unimp,guest_errors,cpu_reset \
    -kernel kernel.elf
```
I took this script from [Os in 1000 lines](https://1000os.seiya.me/en/) as well.

Another thing I took from OS in 1000 lines is the linker script that we will be using (the one named kernel.ld in the 
previous script)

```asm
/* set the entry point of the program to symbol 'boot' */
ENTRY(boot)

/* SECTIONS command is used to map input sections to output sections and specify
 * how they are laid out in memory*/
SECTIONS {
    /* 
     * The `.` denotes the current output location counter.
     * Here we set this to value `0x80200000`
     * I'm not sure why but I think it has something to do with qemu riscv32.
     * maybe it jumps to that location at the start.
    */
    . = 0x80200000;
    __kernel_base = .;

    /*
     * This describes the output .text section.
     * .text.boot input section is placed at the beginning
     * KEEP is used to tell the linker when using link-time garbage collection that
     * it should not remove the .text.boot section under any circumstances.
     * after the .text.boot section we include .text and any section starting with .text from all the files
    */
    .text :{
        KEEP(*(.text.boot));
        *(.text .text.*);
    }

    /*
     * Similar to .text section, this is used to describe the .rodata section.
     * ALIGN(4) is used to set the location of .rodata section to be an address aligned to 4 bytes.
    */
    .rodata : ALIGN(4) {
        *(.rodata .rodata.*);
    }

    .data : ALIGN(4) {
        *(.data .data.*);
    }

    .bss : ALIGN(4) {
        /*
         * this assigns the current address location to __bss symbol 
         * which can be referenced in c code as `extern char symbol_name`
        */
        __bss = .;
        *(.bss .bss.* .sbss .sbss.*);
        __bss_end = .;
    }

    /*
     * what ALIGN function does is it returns the location counter aligned to the next n boundary
     * n being specified by the argument (here 4)
     * n must be an expression whose value is a power of 2
    */
    . = ALIGN(4);
    /*
     * Allocate 128KB of stack
    */
    . += 128 * 1024;
    __stack_top = .;

    /*
     * This defines a memory region that is later used by the allocator.
     * In a real operating system, this would be done by obtaining information 
     * from hardware at boot time 
    */
    . = ALIGN(4096);
    __free_ram = .;
    . += 64 * 1024 * 1024;
    __free_ram_end = .;
}

/* 
 * RESOURCES:
 * - https://home.cs.colorado.edu/~main/cs1300/doc/gnu/ld_3.html
 */
```

We will more or less be stuck with this script for the entire series.

I'll explain what these scripts mean where they are relevant in the next few parts so let's not get tied down 
by them now.


### What We will need?
We will be using qemu as our source of riscv system and since we are using clang to compile, we will need llvm's version
of binutils.
- qemu (qemu-system-riscv32 qemu-system-riscv64 specifically)
- clang and llvm tools like llvm-objdump llvm-addr2line etc

## The Kernel
We know, from the script above, we are supposed to write our program in kernel.S file and that 
our starting point is the `.text.boot`. But What exactly is it?

### Section
Our program is divided in different sections like `text`, `data` etc. where different parts of 
our programs live. The `text` section contains the actual code of our program. Similarly `data`
section contains the data used in our program, data that can be read and written to. The `rodata`
section contains the readonly data and the `bss` section contains the zero initialized data.

***So, How do we describe a text section?***  
If you read the RISC-V Assembly Programmer's manual I linked in the [part 0](./00-setup), You might
have come across [Assembly Directives Table](file:///home/faulty/Git/FaultyOS/riscv-asm-manual/build/riscv-asm.html#3ccb2b67-dffa-4886-867f-641166c978d2), which describes the assembly directives we can use. In this 
table, we can find a `.section` directive which is used to emit a section if it doesn't exist and make that
section the current section. For example:

`.section .text`  
emits the .text section (if it didn't exist already) and makes text the current section. This essentially
makes anything after this be placed in the .text section. We can use this or there is a shorter directive
`.text` which does the exact same thing.

***What about the boot?***  
`boot` is a label and according to the *Asm Programmer's Manual*, labels (or text labels) are used as branch
or unconditional jump target (We'll get to what they mean later) and symbol offsets. For now you can think of 
labels like a function name with boot being our entry function as described in the linker script.

So, now we can write our first bit of assembly.

```asm
.text
boot:
```

Now what?  
How do we even begin to write a program (sorry a kernel) that prints "Hello, World" to the screen? Let's forget
kernel for a moment and while we are at it, lets also forget RISC-V for now. Say we were writing a boot function
that does nothing but print "hello world" in c, how would we do it? Its pretty simple right?
```c
#include <stdio.h>

void boot() {
    printf("hello, world");
}
```

What did we just do? We included `stdio.h`, which defines the printf function, defined a `boot` function 
which calls `printf` function, passing "hello world" string. What does it mean to "pass a string"?
If we look the the defination of `printf` function, we can get a better understanding.
```c
int printf(const char *restrict format, ...);
```
Being consistent with our theme, lets also ignore the `...` and just focus on the first parameter.
It is a pointer to characters and in our case above, its a pointer to string "hello, world" or in 
another words, address of the first character 'h' of "hello, world".

***Where is that address exactly?***  
Lets compile our small c program to a object file  
`clang -c -O3 print.c --target=riscv32-unknown-elf`
and disassemble it to see what it gives us.  
`llvm-objdump -dC -r print.o`

```bash
how-to-start.o: file format elf32-littleriscv

Disassembly of section .text:

00000000 <boot>:
       0: 00000537      lui     a0, 0x0
                        00000000:  R_RISCV_HI20 .L.str
                        00000000:  R_RISCV_RELAX        *ABS*
       4: 00050513      mv      a0, a0
                        00000004:  R_RISCV_LO12_I       .L.str
                        00000004:  R_RISCV_RELAX        *ABS*
       8: 00000317      auipc   t1, 0x0
                        00000008:  R_RISCV_CALL_PLT     printf
                        00000008:  R_RISCV_RELAX        *ABS*
       c: 00030067      jr      t1 <boot+0x8>
```

Let's not get tied 
