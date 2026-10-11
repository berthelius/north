# Adaptive interview

## Principle

A good question changes a decision; it does not fill a box. Read the context first and ask only about what is still open. Do not infer strategy from a technology's popularity, the size of the repository or what another company would do.

Keep a short evidence map in the conversation: criterion, status, source and conflict. An explicit answer from the owner is evidence of intent. A README can be out of date. A test proves only the behaviour it checks. When two sources disagree, explain what changes and settle it with the owner.

## First reply

"I understand this project serves …, aims to … and today has … . That rests on … . What I still need to decide is …, because it changes … . My first question is …"

Do not use the ellipses literally. If everything is already answered, present a summary for review instead of inventing questions. If there is not enough context to name the user and their problem, start there; do not jump to infrastructure choices.

## Question bank: select, do not recite

Each topic maps to a section of the file. Ask only about the gaps.

### Destination (North Star)

"What important change should this project bring about for a specific person, and what alternative should they no longer need?"

Precision test: the answer must rule out at least one attractive direction. "Lead with AI" decides nothing. The specification asks for a destination that is ambitious enough to be uncomfortable: test the answer against that, but do not impose a date, a global market or a financial target the owner has not stated.

### Acceptable quality (The Bar)

"What would have to be true for you to put this in a user's hands? Which failure would stop a release? Where should this sit above the usual standard for this kind of project?"

Propose thresholds only from the case at hand. For each, keep apart: the approved target, the mechanism that checks it, whether that mechanism exists, and the observed result. A reproducible human review rule is a valid mechanism; not everything needs a linter. Do not present an aspiration as current compliance. Do not lower limits already in force.

### Where to invest (Asymmetric Bets)

"If only one part could be exceptional and another deliberately plain, which would you choose, and why?"

Look for justified, disproportionate investment and explicit restraint, not a list where everything matters. 10x is not an order to multiply code, cost or scope. It can mean removing steps, fixing a cause or cutting maintenance.

### Refusals (Anti-Goals)

"Which tempting request would you turn down, even from a good customer or with revenue attached, because it pulls the project away from its purpose?"

Record the reason. Separate a strategic refusal from something merely postponed this week. "We do not write bad software" gives no criterion. The owner may conclude that a category needs no specific Anti-Goal.

### Recurring decisions (Trade-off Defaults)

"When A and B collide, which do we usually prefer, and what concrete fact would make us switch?"

Pick tensions present in this project, for example depth versus breadth, build versus buy, customisation versus a common product, or compatibility versus simplification. Do not impose them all. For each: the trade-off, the default and the observable condition that flips it. If no threshold has been agreed, ask; until it is, the row stays out of the adopted file. Do not invent numbers.

### When to rethink a solution (Ambition Triggers)

"What signal should make an agent question a solution that is too small? When should it conclude that the simple version is already right?"

Keep open the option of recommending a structural change when it serves the goal better. Separate proposing an ambitious alternative from carrying it out beyond the task. Do not turn every copy change into a strategy review.

### Decisions that are expensive to undo (Reversibility)

"Which decisions commit data, users, contracts or reputation? Which can really be reversed, how, and who can authorise them?"

Classify with evidence from the project. Do not assume every dependency is reversible or every database change irreversible. Ask about rollback, impact and the default when in doubt. If no authorisation exists, do not fabricate one.

## Helping without steering

When there are options, present two or three that fit what you read, explain what each gains and gives up, recommend one while stating your assumption, and leave room for another answer. Do not present your favourite as the answer the owner already gave.

Hypothetical example: "I see two plausible bets: saving time on a repetitive workflow, or widening functional coverage. I recommend the first if that workflow explains most of the observed pain. What evidence do you have on which weighs more?"

## When to stop

Stop asking when you can draft criteria that are specific, consistent and usable in the three review scenarios. Summarise only new decisions and material doubts. If a business disagreement appears that the owner cannot resolve yet, deliver a provisional proposal with that specific blocker; do not prolong the interview to reach a number of questions.
