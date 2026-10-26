# Agentic SDLC

A guide on adopting agentic AI in the software development lifecycle (SDLC).

_Things are rapidly evolving; this is current as of October 2026._

## Contents

- [Current State: How AI Is Changing Software Development](#current-state-how-ai-is-changing-software-development)
- [From Conductor Mode to Loops](#from-conductor-mode-to-loops)
- [Software Factories](#software-factories)
  - [Specs for Building New Features](#specs-for-building-new-features)
  - [Infrastructure for Running Loops](#infrastructure-for-running-loops)
- [Concepts](#concepts)

## Current State: How AI Is Changing Software Development

With the advent of AI, typing code is obsolete.

Typing code is no longer the bottleneck. It started with code completion, then to an AI assistant sitting with a classic IDE, to chat-based agent-first interfaces. As this progression was happening, LLMs have gotten so much better at understanding larger instructions.

This is a huge shift since the advent of higher-level programming languages: now we have non-deterministic compilers in LLMs.

Software engineers are being relieved of typing duties and can now focus solely on [durable decisions](#durable-decisions), like architecture, API design, and the domain model: the things that are strategic.

While chat-based interfaces are great for certain aspects of software development, for example asking questions about the codebase or brainstorming ideas to decide what you want to build, once you have decided and created a good specification of what needs to be built, you no longer have to stay within the loop.

Google's white paper calls this [orchestrator vs. conductor](#conductor-vs-orchestrator).

## From Conductor Mode to Loops
Currently, the majority are in [conductor](#conductor-vs-orchestrator) mode for all types of tasks. In some cases, humans are just doing tasks like giving their coding agent the ticket ID. These things can be automated, and this is where [loops](#loops) come in to address the gap. A loop is nothing but an automation, triggered by an event, that runs a sequence of agents to accomplish a goal.

You can create loops for many things, for example:
- Loops to create a spec from an idea
- Loops to implement from the spec
- Loops to do PR review and fix
- Loops that automatically triage issues

Since you can create loops for many things, it is even better to have a system in place to manage them in a consistent way. This is where [software factories](#software-factory) come in, to harness loops at scale. The key thing here is that coding agents are no longer running on a developer's local machine.

## Software Factories

One of the things the DevOps movement taught us in the past is to look at it as capabilities instead of a maturity model. DevOps transformation also taught us that it is not just tools and technologies that bring about change; process and people are also significantly important ([Accelerate](https://itrevolution.com/product/accelerate/), [State of DevOps report](https://dora.dev/research/)). DevOps as a whole culture is still the foundation to get meaningful impact in the agentic era as well.

A lot of the technical capabilities in DevOps, like CI/CD, can bring a lot more benefits with AI. CI/CD and automations now get a boost with agents, because agents can look at a stack trace, find issues, and even raise a PR to fix them. We will also look at what additional capabilities are needed on top. We will be primarily focusing on these capabilities here.

### Specs for Building New Features

The first capability is specs for building new features. At a minimum, a specification should contain:

- Intent
- Requirements
- Acceptance criteria in Given/When/Then format
- Any other additional context

For a good model of what a spec should be, see [MinimumCD: Agent Delivery Contract](https://beyond.minimumcd.org/docs/agentic-cd/specification/first-class-artifacts/).

Use [conductor mode](#conductor-vs-orchestrator) to arrive at this. Human involvement is most needed here; at this moment, full automation is not possible in this area. Be a conductor and author the spec, and then switch to being an [orchestrator](#conductor-vs-orchestrator) and manage the outer loop.

### Infrastructure for Running Loops

A key infrastructure capability needed is for coding agents to run on a remote machine rather than on a developer's machine. This is a key requirement for running [loops](#loops). A loop is nothing but an automation, triggered by an event, that runs a sequence of agents to accomplish a goal. Humans are still in the loop for any [durable decisions](#durable-decisions).

Loops are moving development from a developer typing in a terminal to team-based workflows. Wherever human attention was needed in traditional CI/CD, it can now be delegated to loops, and human attention is directed toward tasks that agents are not good at or cannot do. The ecosystem of loops forms a [software factory](#software-factory). Even though the term has existed [since 1969](http://hdl.handle.net/1721.1/47992), this definition fits well for the current agentic era. What CI/CD is for DevOps transformation, a [software factory](#software-factory) is for agentic transformation.

All of a sudden, software development is more observable and automatable than ever before, because it happens in a remote environment visible to the entire team.

## Concepts

### Durable Decisions

Architecture, API design, and the domain model: the things that are strategic.

Reference: [Kiro: Frontier Engineering](https://kiro.dev/topics/frontier-engineering/)

### Conductor vs. Orchestrator

As a conductor, the person is in the loop; as an orchestrator, the person is outside the loop, managing the [loop](#loops).

**Conductor:** You work hands-on with an agent in a chat-based interface and stay in the loop: asking questions about the codebase, brainstorming ideas to decide what to build, and authoring the spec. This is where human involvement is most needed.

**Orchestrator:** Once there is a good specification, the spec is handed over to an [implementation loop](#loops), and you no longer have to stay in the inner loop. You manage the outer loop and step in for anything that needs human input, preferably high-impact decisions, not just to monitor the spec's implementation.

Reference: [Google white paper: The New SDLC with Vibe Coding](https://www.kaggle.com/whitepaper-the-new-SDLC-with-vibe-coding)

### Loops

A loop is nothing but an automation, triggered by an event, that runs a sequence of agents to accomplish a goal. Humans are still in the loop for any [durable decisions](#durable-decisions).

### Software Factory

The ecosystem of loops forms a software factory. In essence, a software factory is a system in itself that allows the creation of [loops](#loops), provides observability, and allows humans to make decisions at the necessary places. Even though the term has existed [since 1969](http://hdl.handle.net/1721.1/47992), this definition fits well for the current agentic era. What CI/CD is for DevOps transformation, a software factory is for agentic transformation.

While there is no common definition for this modern software factory, this definition sums it up well: a software factory is harnessing loops at scale.

Reference: [Addy Osmani: Software Factories](https://addyosmani.com/blog/software-factories/)
