# Agentic SDLC

A guide on adopting agentic AI in the software development lifecycle (SDLC).

## Contents

- [Current State: How AI Is Changing Software Development](#current-state-how-ai-is-changing-software-development)
- [Building on DevOps](#building-on-devops)
- [Specs for Building New Features](#specs-for-building-new-features)

## Current State: How AI Is Changing Software Development

_Things are rapidly evolving; this is current as of October 2026._

With the advent of AI, typing code is obsolete.

Typing code is no longer the bottleneck. It started with code completion, then to an AI assistant sitting with a classic IDE, to chat-based agent-first interfaces. As this progression was happening, LLMs have gotten so much better at understanding larger instructions.

This is a huge shift since the advent of higher-level programming languages: now we have non-deterministic compilers in LLMs.

Software engineers are being relieved of typing duties and can now focus solely on [durable decisions](https://kiro.dev/topics/frontier-engineering/), like architecture, API design, and the domain model: the things that are strategic.

While chat-based interfaces are great for certain aspects of software development, for example asking questions about the codebase or brainstorming ideas to decide what you want to build, once you have decided and created a good specification of what needs to be built, you no longer have to stay within the loop.

Google's white paper calls this [orchestrator vs. conductor](https://www.kaggle.com/whitepaper-the-new-SDLC-with-vibe-coding).

## Building on DevOps

One of the things the DevOps movement taught us in the past is to look at it as capabilities instead of a maturity model. DevOps transformation also taught us that it is not just tools and technologies that bring about change; process and people are also significantly important ([Accelerate](https://itrevolution.com/product/accelerate/), [State of DevOps report](https://dora.dev/research/)). DevOps as a whole culture is still the foundation to get meaningful impact in the agentic era as well.

A lot of the technical capabilities in DevOps, like CI/CD, can bring a lot more benefits with AI. We will also look at what additional capabilities are needed on top. We will be primarily focusing on these capabilities here.

## Specs for Building New Features

The first capability is specs for building new features. At a minimum, a specification should contain:

- Intent
- Requirements
- Acceptance criteria in Given/When/Then format
- Any other additional context

Use conductor mode to arrive at this. Human involvement is most needed here; at this moment, full automation is not possible in this area. Be a conductor and author the spec, and then switch to being an orchestrator and manage the outer loop.
