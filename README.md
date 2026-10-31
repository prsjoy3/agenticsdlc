# Agentic SDLC

A guide on adopting agentic AI in the software development lifecycle (SDLC).

_Things are rapidly evolving; this is current as of October 2026._

## Contents

- [How AI Is Changing Software Development](#how-ai-is-changing-software-development)
- [Capabilities](#capabilities)
    - [Set Up Your Codebase for Agents](#set-up-your-codebase-for-agents)
    - [Give Agents a Way to Verify Its Work](#give-agents-a-way-to-verify-its-work)
    - [Adopt Spec-Driven Development](#adopt-spec-driven-development)
    - [Automate with Loops](#automate-with-loops)
    - [Scale Loops with Software Factories](#scale-loops-with-software-factories)
- [Conclusion](#conclusion)
- [References](#references)

## How AI Is Changing Software Development

With the advent of AI, typing code is no longer the bottleneck. It started with code completion, then to an AI assistant bundled within a classic IDE. It then shifted towards coding agents and agent-first interfaces. As this progression was happening, LLMs have gotten so much better at following larger instructions, gotten really good at writing code and tool calling, harnesses have gotten better as well. 

This is a huge shift since the advent of higher-level programming languages, now the intent can be represented in human language, and agents compiles it to a high level language, but with a nuance, it is non-deterministic in nature. Software engineers can now focus solely on [durable decisions](https://kiro.dev/topics/frontier-engineering/), like architecture, API design, and the domain model, etc the things that are strategic in nature.

> **Developers' job is not to use agents to write code. Their job is changing to lead the agents to help them write code.**

While chat-based agentic interfaces are great for certain aspects of software development, for example asking questions about the codebase or brainstorming ideas to decide what you want to build, once you have decided and created a good specification of what needs to be built, you no longer have to stay within the loop. Google's white paper calls this [orchestrator vs. conductor](https://www.kaggle.com/whitepaper-the-new-SDLC-with-vibe-coding).

One of the key lessons we learned from the DevOps transformation is to look at these as capabilities rather than as a maturity model, since a maturity model may give a false notion that we have arrived. It is important to follow a continuous improvement mindset, even more so in this agentic transformation era.

## Capabilities

Below is a list of capabilities to progress in the adoption of the agentic SDLC. Each capability is complementary to the others, and the sequence below also serves as building blocks. In essence, these capabilities maximize the ways for humans to stay in the outer loop and be an orchestrator, rather than being a conductor who stays in the inner loop.

### Set Up Your Codebase for Agents

Ensure linting and styling tools are set up for the codebase, preferably as a script that agents can run, and add them to the git pre-commit hooks as well. Any other context that you have but agents don't should be added to AGENTS.md; for example, any practices that are specific to your codebase. Don't bloat AGENTS.md with things that agents are already good at. The codebase is the best documentation that agents have, and agents follow the existing patterns in the codebase.

Organize your project using tactical DDD, ports and adapters, or any other best practice to structure the codebase. In essence, business logic should be independently unit testable with as few dependencies as possible.

### Give Agents a Way to Verify Its Work

Whether the implementation is happening on a developer machine or in a cloud agent as a part of a [loop](#automate-with-loops), it is important for the agent to verify its work as fast as possible—not just unit tests. It should be higher-level tests, UI tests, and also linting and style checks that are hooked as a part of the build / pre-commit hooks. It is important to give agents a fast feedback loop so that they can run tests locally and self-correct before you ever look at the code; otherwise, you're the bottleneck.

Of late, there has been a lot of interest in using [Lean](https://lean-lang.org/) and [TLA+](https://learntla.com/) to formally verify application logic.

The coding agent should also attach proofs of its verification on a pull request for human review. It is important for humans to review [durable decisions](https://kiro.dev/topics/frontier-engineering/) and proofs more than code diffs.

Humans reviewing code diffs can soon become a bottleneck and need intelligent ways to be selective. Until there are good ways to do this, human reviews on a PR should focus on reviewing proofs and [durable decisions](https://kiro.dev/topics/frontier-engineering/), and the code diff for any mission-critical PRs / codebases.

### Adopt Spec-Driven Development

Currently, the default mode in most places is to stay in the loop and prompt agents every step of the way. A person with a great software engineering fundamentals can be highly productive with this approach. There are alternatives to consider to structure and scale this process, in most cases this is not a single person activity in a larger enterprise. This is where Spec-driven Development as a methodology can be considered, and an essential way to get better benefits from software factory.

Spec-driven development can also be adopted independently using local coding agents; [Martin Fowler: Understanding Spec-Driven-Development: Kiro, spec-kit, and Tessl](https://martinfowler.com/articles/exploring-gen-ai/sdd-3-tools.html) has a good overview. Just using specs as a way to kick-start your implementation, instead of turn-by-turn prompting, is in itself a good skill to get used to. It is unclear at this time whether keeping the spec as the source of truth and keeping drift in check is essential.

At a minimum, a specification should contain:

- Intent
- Requirements
- Acceptance criteria in Given/When/Then format
- Any other additional context

For a good model of what a spec should be, see [MinimumCD: Agent Delivery Contract](https://beyond.minimumcd.org/docs/agentic-cd/specification/first-class-artifacts/).

Working in small batches continues to be very important.

### Automate with Loops
Lot of places where human attention was needed in traditional CI/CD, it can now be delegated to coding agents running in a remote machine. This approach is called as loops. A loop is nothing but an automation to accomplish a particular goal, triggered by an event or schedule, that runs a multi-agent workflows with humans on the loop to make any [durable decisions](https://kiro.dev/topics/frontier-engineering/) as needed for that workflow. With loops, software development is more observable and automatable than ever before, because it happens in a remote environment visible to the entire team. There is input and output, it can be eval'ed, it enables to find better cheaper model for a particular type of tasks etc. Since these loops are setup at a team level, the workflow is visible for the entire team and any optimization that can be done at the loop level, benefits the whole team.
 
You can create loops for many things, for example:
- Loops to create a spec from an idea
- Loops to implement from the spec
- Loops to do PR review and fix
- Loops that automatically triage issues

Since you can create loops for many things, it is important to have a system in place to manage them at scale. This is where [software factories](#scale-loops-with-software-factories) come in, to harness loops at scale. 

### Scale Loops with Software Factories

A software factory is harnessing [loops](#automate-with-loops) at scale. In essence, it is a system in itself that is built to create loops, provides observability, and allows humans to make decisions at the necessary places. The ecosystem of loops forms a software factory. Even though the term has existed [since 1969](http://hdl.handle.net/1721.1/47992), this definition fits well for the current agentic era. What CI/CD is for DevOps transformation, a software factory is for agentic transformation. See also [Addy Osmani: Software Factories](https://addyosmani.com/blog/software-factories/).

## Conclusion
While there will be gains by adopting AI in software development, it is still important to look at the core DORA model and DevOps culture as a whole to reap big benefits. See [DORA Research](https://dora.dev/research/?view=detail).

## References

- [Factory concepts and practices in software development : an historical overview](http://hdl.handle.net/1721.1/47992) — cited in [Scale Loops with Software Factories](#scale-loops-with-software-factories)
- [MinimumCD: Agent Delivery Contract](https://beyond.minimumcd.org/docs/agentic-cd/specification/first-class-artifacts/) — cited in [Adopt Spec-Driven Development](#adopt-spec-driven-development)
- [Martin Fowler: Understanding Spec-Driven-Development: Kiro, spec-kit, and Tessl](https://martinfowler.com/articles/exploring-gen-ai/sdd-3-tools.html) — cited in [Adopt Spec-Driven Development](#adopt-spec-driven-development)
- [Lean](https://lean-lang.org/) — cited in [Give Agents a Way to Verify Its Work](#give-agents-a-way-to-verify-its-work)
- [Learn TLA+](https://learntla.com/) — cited in [Give Agents a Way to Verify Its Work](#give-agents-a-way-to-verify-its-work)
- [DORA Research](https://dora.dev/research/?view=detail) — cited in [Conclusion](#conclusion)
- [Kiro: Frontier Engineering](https://kiro.dev/topics/frontier-engineering/) — cited in [How AI Is Changing Software Development](#how-ai-is-changing-software-development)
- [Google white paper: The New SDLC with Vibe Coding](https://www.kaggle.com/whitepaper-the-new-SDLC-with-vibe-coding) — cited in [How AI Is Changing Software Development](#how-ai-is-changing-software-development)
- [Addy Osmani: Software Factories](https://addyosmani.com/blog/software-factories/) — cited in [Scale Loops with Software Factories](#scale-loops-with-software-factories)
