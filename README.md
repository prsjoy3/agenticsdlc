# Agentic SDLC

A guide on adopting agentic AI in the software development lifecycle (SDLC).

_Things are rapidly evolving; this is current as of October 2026._

## Contents

- [Current State: How AI Is Changing Software Development](#current-state-how-ai-is-changing-software-development)
- [From Agents to Loops](#from-agents-to-loops)
- [Software Factories](#software-factories)
- [Spec-Driven Development](#spec-driven-development)
- [Verification and Proofing](#verification-and-proofing)
- [Software Delivery Performance](#software-delivery-performance)
- [Glossary](#glossary)
- [References](#references)

## Current State: How AI Is Changing Software Development

With the advent of AI, typing code is no longer the bottleneck. It started with code completion, then to an AI assistant sitting with a classic IDE, to chat-based agent-first interfaces. As this progression was happening, LLMs have gotten so much better at understanding larger instructions.

This is a huge shift since the advent of higher-level programming languages: now we have non-deterministic compilers in LLMs.

Software engineers can now focus solely on [durable decisions](#durable-decisions), like architecture, API design, and the domain model: the things that are strategic.

While chat-based interfaces are great for certain aspects of software development, for example asking questions about the codebase or brainstorming ideas to decide what you want to build, once you have decided and created a good specification of what needs to be built, you no longer have to stay within the loop.

Google's white paper calls this [orchestrator vs. conductor](#conductor-vs-orchestrator).

## From Agents to Loops
Currently, the majority are in [conductor](#conductor-vs-orchestrator) mode for all types of tasks. In some cases, humans are just doing tasks like giving their coding agent the ticket ID. These things can be automated, and this is where [loops](#loops) come in to address the gap. A loop is nothing but an automation, triggered by an event, that runs a sequence of agents to accomplish a goal.

You can create loops for many things, for example:
- Loops to create a spec from an idea
- Loops to implement from the spec
- Loops to do PR review and fix
- Loops that automatically triage issues

Since you can create loops for many things, it is even better to have a system in place to manage them in a consistent way. This is where [software factories](#software-factory) come in, to harness loops at scale. The key thing here is that coding agents are no longer running on a developer's local machine.

## Software Factories

A [software factory](#software-factory) is harnessing [loops](#loops) at scale. In essence, it is a system in itself that allows the creation of loops, provides observability, and allows humans to make decisions at the necessary places. What CI/CD is for DevOps transformation, a software factory is for agentic transformation.

A key infrastructure capability needed is for coding agents to run on a remote machine rather than on a developer's machine. This is a key requirement for running [loops](#loops). Humans are still in the loop for any [durable decisions](#durable-decisions).

Loops are moving development from a developer typing in a terminal to team-based workflows. Wherever human attention was needed in traditional CI/CD, it can now be delegated to loops, and human attention is directed toward tasks that agents are not good at or cannot do. The ecosystem of loops forms a [software factory](#software-factory). Even though the term has existed [since 1969](http://hdl.handle.net/1721.1/47992), this definition fits well for the current agentic era.

All of a sudden, software development is more observable and automatable than ever before, because it happens in a remote environment visible to the entire team.

## Spec-Driven Development

In order to effectively use agents and optimize human time, it is important to write a good specification as the starting context.

At a minimum, a specification should contain:

- Intent
- Requirements
- Acceptance criteria in Given/When/Then format
- Any other additional context

For a good model of what a spec should be, see [MinimumCD: Agent Delivery Contract](https://beyond.minimumcd.org/docs/agentic-cd/specification/first-class-artifacts/).

Use [conductor](#conductor-vs-orchestrator) mode to arrive at this. Human involvement is most needed here; at this moment, full automation is not possible in this area. Be a [conductor](#conductor-vs-orchestrator) and author the spec, and then switch to being an [orchestrator](#conductor-vs-orchestrator) and manage the [outer loop](#loops).

## Verification and Proofing

Whether the implementation is happening on a developer machine or in a cloud agent as a part of a [loop](#loops), it is important for the agent to verify its work as fast as possible—not just unit tests. It should be higher-level tests, UI tests, and also linting and style checks that are hooked as a part of the build / pre-commit hooks.

The coding agent should also attach proofs of its verification on a pull request for human review. It is important for humans to review [durable decisions](#durable-decisions) and proofs more than code diffs.

Humans reviewing code diffs can soon become a bottleneck and need intelligent ways to be selective. Until there are good ways to do this, human reviews on a PR should focus on reviewing proofs and [durable decisions](#durable-decisions), and the code diff for any mission-critical PRs / codebases.

## Software Delivery Performance
While there will be gains by adopting AI in software development, it is still important to look at the core DORA model and DevOps culture as a whole to reap big benefits. See [DORA Research](https://dora.dev/research/?view=detail).

## Glossary

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

## References

- [Factory concepts and practices in software development : an historical overview](http://hdl.handle.net/1721.1/47992) — cited in [Software Factories](#software-factories)
- [MinimumCD: Agent Delivery Contract](https://beyond.minimumcd.org/docs/agentic-cd/specification/first-class-artifacts/) — cited in [Spec-Driven Development](#spec-driven-development)
- [DORA Research](https://dora.dev/research/?view=detail) — cited in [Software Delivery Performance](#software-delivery-performance)
- [Kiro: Frontier Engineering](https://kiro.dev/topics/frontier-engineering/) — cited in [Durable Decisions](#durable-decisions)
- [Google white paper: The New SDLC with Vibe Coding](https://www.kaggle.com/whitepaper-the-new-SDLC-with-vibe-coding) — cited in [Conductor vs. Orchestrator](#conductor-vs-orchestrator)
- [Addy Osmani: Software Factories](https://addyosmani.com/blog/software-factories/) — cited in [Software Factory](#software-factory)
