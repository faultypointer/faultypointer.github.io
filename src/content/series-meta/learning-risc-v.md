---
title: "Learning RISC-V With Entirely Too Many Kernels"
description: "Lets learn RISC-V"
tags: ["riscv", "assembly"]
draft: true
---

We are going to learn about RISC-V by writing few kernels for RISC-V in assembly.

## Background
I did [Os in 1000 lines](https://1000os.seiya.me/en/) a few weeks ago. Having learned about theory regarding
Operating System, I did follow the series only practically and skipping explanations for few things like the
tar file system etc. I realized doing it in another language would have been more benificial. I was also 
interested in RISC-V because of that series.

[I tried to learn x86-64 assembly](https://faulty.carboxi.de/x86-64-assembly-part-1/) but I quit after few weeks.
After getting interested in RISC-V, I though starting with a simpler one is a good idea and here we are.

## How are we going to do it?
I didn't just take inspiration from 1000 line OS, I also took the kernel script and maybe the OS itself.
I haven't decided what kinds of kernel I will be making but the first few ones will not be actual kernels
in their true sense. There will not me management of memory, disk or any other resources nor will we be 
writing device drivers.  
Actually, I'm not sure what there will be. I've only planned the first "kernel" where we print hello world
using the OpenSBI Supervisor Execution Environment (we will see what this means in part 0 of the series).

Maybe for the second kernel we will do a full rewrite of the OS series in assembly but I'm not sure.