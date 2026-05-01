# Memo: Rethinking the Nomadic acquisition funnel

**To:** Mustafa Bal, Varun Krishnan
**From:** Jaideep Dhanoa
**Date:** April 30, 2026
**Re:** Landing page, demo experience, and pilot conversion path

---

## TL;DR

Nomadic earns warm inbound from physical-AI teams who already know roughly what we do — they heard a podcast, talked to a Zoox engineer, read about Bedrock. They don't need a category education. They need to find out fast whether Nomadic solves their specific problem. The current site introduces Nomadic to a stranger.

This memo proposes three changes — **outcome-led positioning**, **persona routing as the conversion mechanism**, and a **visible concierge-first pilot ladder** with a $25K paid pilot SKU. No brand redesign, no product rebuild. We don't need to build something new — we need to point what we already have at the buyer who already wants it.

## I. What's working

The product works. Bedrock's 98% accuracy on dump-truck loading zones is the strongest case study in physical-AI tooling. Antonio Puglielli's *"weeks into minutes"* is buyer-language we couldn't have manufactured. NomadicVL is a real moat — most competitors wrap GPT-4V or Gemini. The customer logo strip — Zoox, Bedrock, Zendar, NATIX, Mitsubishi Electric, Autoware — is unfakeable credibility. The brand is tight; the site doesn't look amateur.

It looks generic. We're not arguing the site is broken in execution. We're arguing it's misaligned with the buyer who actually shows up.

## II. The walkthrough

The buyer is a VP of Autonomy at an AV company with two years of fleet data and a growing edge-case backlog. She heard Mustafa on a podcast last week. Here's what happens.

**Second 3.** The hero says *"Unlock Physical AI in the Real World"* — a category claim every physical-AI startup makes. She doesn't yet know whether Nomadic is a labeling tool, a video search tool, a monitoring platform, or all three. She scrolls.

**Second 8.** Three numbered cards: *Find. Monitor. Curate.* Real capabilities, but a list of features. She still doesn't know which capability matters for her, or what changes about her week if she signs.

**Second 18.** *Teach Your Machines to Operate Precisely* — an iceberg illustration with small *Automotive / Robotics / Construction* tabs. She clicks Automotive. The tab swaps to relevant copy, but goes nowhere. There's no *try this on my data* button. It's a content swap, not an entry point.

**Second 41.** Antonio Puglielli's testimonial: *"compresses weeks of manual review into minutes."* The most concrete thing on the page so far. She makes a mental note: maybe this is it.

**Second 52.** She clicks *Try Nomadic* and lands on /live-demo. A search bar that says *"Describe what you want to analyze..."* and 25 sample videos. She has roughly two minutes left of attention. She has to decide what to type.

She doesn't know what to type. Sample queries are generic. She doesn't know whether the analysis will tell her anything useful, how long it will take, or whether the 25-video sandbox is representative of her actual fleet. She runs one query, scans results, isn't sure what to do with them. She closes the tab.

**The next day.** Three other vendors are pitching her this week. She doesn't go back to nomadicai.com. This is what happens to most of our warm inbound.

## III. Where the funnel leaks

**Gap 1: The hero promises a category, not an outcome.** The buyer sees *"Unlock Physical AI in the Real World"* — what every physical-AI startup says. She needs a one-sentence claim about *what changes for me if I sign*. In the five seconds she gives the hero, she decides whether to keep scrolling or close the tab. A category claim makes that a coin flip when an outcome claim would earn the next click.

**Gap 2: Capabilities are listed without an outcome attached.** *Find. Monitor. Curate.* are too abstract — they could describe a labeling marketplace, a video editor, or a monitoring tool. The buyer needs two things the current cards don't deliver. First, language that maps to Monday-morning problems: *"Find every double-parked vehicle and near-miss across 100+ hours of fleet video"* is a problem her team has on its roadmap. More importantly, she needs a clear statement of the outcome Nomadic delivers — *Ship physical AI 6–12 months faster by turning fleet video into the edge cases your models are missing.* The current cards give her neither. She never connects features to her actual work, or to a result she'd take to her CTO.

**Gap 3: The site treats every visitor as the same audience.** AV engineers, robotics VLA teams, and construction VPs see the same generic homepage. The existing iceberg-section industry tabs *could* route by persona but don't — they're informational content swaps, not conversion routing. A buyer with a specific problem in a specific industry has to do the translation work herself. Most won't bother.

**Gap 4: The demo has no narrative.** The current demo is a self-service evaluation tool optimized for buyers who already know what they're looking for. Warm-inbound buyers don't yet know what to look for — that's why they came. The buyer needs the demo to *teach* her what to look for, not *test* whether she already knows. The current interaction model assumes she's past the *"is this for me"* question, when answering that question is the entire purpose of the demo.

**Gap 5: The path from interest to commitment is binary.** *Talk to an Expert / Try Nomadic / Book a Consultation* all collapse to the same two states: try the demo, or talk to sales. The buyers most likely to convert to a $500K contract are the ones who'd write a smaller check first to de-risk on their own data. There's no middle rung. High-intent buyers either jump to sales prematurely or back out — both lose the deal silently. We never see the bounces, so we never know how many we lost.

## IV. The pattern across all five gaps

The five gaps share one underlying failure: **the site is built for someone who needs to be educated about the category, not for someone who arrived already understanding it.** Almost all of our warm inbound — podcast listeners, reference referrals, conference contacts, customers from one company moving to another — arrives in the latter state. They came to find out *whether Nomadic is the right answer for their specific situation*. The site is structured to answer the prior question: *what is physical AI and why does it matter*. That's a different funnel position. Each of the five gaps is a downstream consequence of this single mismatch.

This is the safer default for a marketing site, which is why most early-stage companies land here. When the team is building from scratch, the educational frame is what writes itself: *here's what we do, here are our capabilities, here are our customers, here's a demo.* It reads as comprehensive. It works for cold traffic. And it never gets revisited until conversion data forces a rewrite. Nomadic is at the moment where it should get revisited — not because the team made a mistake, but because the buyer who shows up has changed.

A warm-inbound visitor is doing validation, not learning. She arrives with a hypothesis — *Nomadic might solve our edge-case backlog* — and is looking for the fastest, highest-trust signal that her hypothesis is right. Every second the site spends explaining the category is a second she spends not getting that signal. Every feature card she reads without seeing her own problem is friction. The site is doing the work of an introduction when the buyer is past the introduction.

## V. What we propose changing

Three principles.

### Outcome-led positioning.

Replace the hero with a specific time-to-value claim — something like *"Ship physical AI models 6–12 months faster by turning fleet video into the edge cases your models are missing."* This gives the buyer a testable promise in the first five seconds: a specific outcome (six to twelve months of model development time saved) and a specific mechanism (mining edge cases from fleet video).

Add proof tiles directly below the hero — 80%+ lower annotation cost (versus customer baseline), 98% custom-agent accuracy (after feedback-loop refinement on their footage). Both numbers are real, both are footnoted to specific customer engagements, and both translate the abstract value of the platform into terms a budget-holder can immediately evaluate.

Surface the architectural claim that's currently buried: *Most platforms wrap a single VLM. We orchestrate specialized models — vision for spatial events, temporal for sequences, NomadicVL for grounded reasoning, and an agent layer that ties them together. The result: 98% accuracy on custom events, not 60%.* This is the moat — the answer to "why not just use Gemini." Right now it lives as a settings toggle three clicks deep in the demo. It belongs above the fold or directly below.

Sharpen the testimonial framing to lead with the outcome metric, not the company name. *"Weeks into minutes"* is buyer-language; *"Antonio Puglielli, VP Engineering at Zendar"* is attribution. Lead with the outcome; let the attribution provide credibility.

### Persona routing as the conversion mechanism.

Reframe the existing industry tabs as a persona router that routes into the demo. Each persona card gets an outcome-led title (*"Find every double-parked vehicle and near-miss across 100+ hours of fleet video"*), a one-line description of what the demo will show, and a *Run the X demo* CTA. The card click sends the user to /live-demo?persona=av (or robotics, or construction) — which loads a guided four-beat experience instead of the current generic sandbox.

The four beats:

1. **A problem-context modal** that frames why this matters for the chosen persona. ("AV teams miss roughly 1 in 200 near-miss events in routine review. Here's what those events look like and why they matter for your model.")
2. **An auto-populated query** battle-tested for that domain — the user doesn't have to know what to type.
3. **A live narration sidebar** that walks through the agent's reasoning as it analyzes — the buyer sees *why* the system finds what it finds, not just the result.
4. **A quantified value banner** at the end ("47 events found across 120 fleet videos in three minutes") that converts the demo into a concrete take-away the buyer can carry into a sales conversation.

The user doesn't drive the demo. The demo drives the user. This is implementable as an overlay on the existing /live-demo route using components that already exist in the codebase — a content layer, not a new product surface.

### Concierge-first pilot ladder.

Add a $25K paid pilot SKU. Thirty days. Roughly sixteen hours of footage processed. Unlimited iteration rounds. Dedicated engineer assigned. **Round 1 results within 24 hours, Round 2 within 48** — incorporating the buyer's feedback from Round 1. Surface this on the page as the secondary path, paired with the concierge primary: *Schedule a scoping call* and, alongside it, *Or try the self-serve pilot →*.

The Round 1 / Round 2 promise is the thing that closes paid pilots. It is a forcing function for our team and a credibility signal to the buyer. *We will show you results on your data, on a clock* is the kind of commitment technical buyers respond to — because it is the opposite of how most enterprise software vendors behave.

Note what is *not* in this list: a brand redesign, a new domain, a new logo, a new color system, a font change. The cream-on-navy aesthetic stays. The fonts stay. The Mux video integration stays. The iceberg illustration stays. We are changing copy, structure, and conversion mechanics — not visual identity. To anyone who lands on the new site without context, this should look like a positioning update, not a rebuild.

## VI. Why now

Three reasons that compound.

**The funding window.** We just closed $8.4M with TQ Ventures and Pear, with backing from Jeff Dean. The runway lets us invest in conversion infrastructure that compounds. Funded startups that don't fix conversion in the first six months after a raise spend the rest of the round burning cash on traffic that doesn't convert. The cost of fixing this in month four is small. The cost of fixing it in month sixteen is rebuilding while the team is also chasing pipeline.

**The compounding effect.** ARR is at $508K. Every percentage point of demo-to-pilot conversion improvement compounds across every channel — podcast inbound, customer references, conference traffic, cold outbound, every channel we ever try. If we move demo-to-pilot conversion from a (likely) low single-digit baseline to even high single digits, we don't just double pilot starts from this month forward. We change the unit economics of every paid acquisition channel we ever run.

**The competitive window.** Physical-AI tooling is heating up. Roboflow, Encord, Voxel51, and others are all moving toward video. The team that owns *we ship physical AI 6–12 months faster* in the buyer's mind has the cleanest positioning. That positioning is currently uncontested. It will not stay that way — someone is going to claim it, and the longer we sit on a category-claim hero, the easier we make it for them.

## VII. Six months from now — and the case against

Two outcomes that should be measurably different. **Demo-to-pilot conversion rate** — today a guess, six months from now instrumented, persona-segmented, reportable to the team weekly. **Quality of inbound qualification** — sales talks to fewer but more-evaluated prospects; sales cycles shorten because the technical evaluation has already happened. If neither moves, the redesign was wrong and we revert. If both move, we harden it and invest more.

Three counterarguments to expect. *"We are too early to optimize."* $508K ARR with $8.4M in seed capital is exactly the moment. Pre-revenue is too early; Series B is too late. Each pilot we win is a reference customer for the next ten — every leak in the funnel costs us compounding pipeline.

*"This is a distraction from product."* The product team continues. The work scopes to one frontend engineer plus design review without product-engineering involvement. The demo overlay reuses existing components. We are not asking the product team to build anything new.

*"The current site converts fine."* We don't know — demo-to-pilot conversion isn't currently instrumented. The new system adds it. If the numbers don't move after the redesign, we'll know, and we can revert. The downside is small. The upside is a step-function improvement in a metric that compounds for the life of the company.
