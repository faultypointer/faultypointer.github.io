---
title: "Introduction to RISC-V"
description: "Setting up the development environment to learn RISC-V and a brief introduction to RISC-V"
date: "2026-01-12"
tags: ["riscv", "assembly"]
part: 0
---


## RISC-V
RISC-V is an open standard Instruction Set Architecture. As an ISA it is just a protocol between the hardware (or software simulating the hardware) and the software. The actual hardware implementations are provided by implementors like [SiFive](https://www.sifive.com/).

## RISC-V Hardware Platform
The hardware implementations are concrete system composed of one or more RISC-V cores, other non-RISC-V cores, memory, I/O, interconnect structures that enables communications between the components.

### Software Execution Environment
- behaviour of risc-v program depends on the EE it runs on
- Execution Environment Interface defines
  - initial state of program
  - no and types of harts
  - accessibility and attributes of memory and I/O regions
  - behaviour of all legal instructions (ISA is a part of EEI)
  - handling of interrupts and exceptions
  eg: linux ABI, RISC-V SBI
- implementation of EE can be pure hw, pure sw or mix

Examples of Execution Environment Implementations:
- Bare metal hardware where harts are directly implemented by the physical processor threads. Instructions have full access to physical address space.
- RISC-V OS
- RISC-V hypervisors
- RISC-V emulators

As far as a program running on a given EE, a hart is a resource that fetches instructions and executes them autonomously.

we will use qemu for emulating risc-v
with virt machine
and opensbi as our SEE


### ISA Overview
RISC-V ISA is defined as a base integer ISA that must be present in any implementation and additional extensions that are
optional.

There are currenly 4 base ISAs. Each ISA is characterized by the width of integer register and corresponding size of address
space and by the number of registers.
Two primary base variants: RV32I and RV64I.
XLEN = width of integer register in bits.
RV32E and RV64E: variants of RV32I and RV64I but with half the no of integer registers

### Memory
A RISC-V hart has a single byte addressable address space of $2^{XLEN}$ bytes. The address space is circular.


### Resources
Here are few resources that we will reference:
- [RISC-V Instruction Set Manual Vol. 1: Unprivileged ISA](https://docs.riscv.org/reference/isa/unpriv/unpriv-index.html)
- [RISC-V Instruction Set Manual Vol. 2: Privileged ISA](https://docs.riscv.org/reference/isa/priv/priv-index.html)
- [RISC-V Assembly Programmer's Manual](https://github.com/riscv-non-isa/riscv-asm-manual)
- [RISC-V ABIs Specification](https://riscv-non-isa.github.io/riscv-elf-psabi-doc/)
- [RISC-V SBI Specification](https://github.com/riscv-non-isa/riscv-sbi-doc/releases/tag/v3.0)
