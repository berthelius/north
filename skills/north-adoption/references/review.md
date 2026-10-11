# Decision-oriented review

Do not certify a NORTH.md because it looks professional. Review content and application separately, and do not give a score such as "10/10" without a defined evaluation.

## Editorial check

- Every criterion comes from an owner's decision or a confirmed, current source. Material assumptions stay out of the adopted file.
- The North Star names an outcome and rules out alternatives; it is not a feature list.
- The Bar separates aspiration, the mechanism that checks it and demonstrated compliance.
- Asymmetric Bets also say where a plain solution is enough.
- Every Anti-Goal has a reason.
- Every Trade-off Default has an observable flip condition.
- Ambition Triggers leave room to conclude that a solution is already sufficient.
- Reversibility covers impact, the way back and who authorises.

Check that operational rules, agent persona or visual documentation have not been copied in wholesale; link to the canonical source instead. Keep the seven headings, verbatim and in order, and explain any section that does not apply. The word-count target belongs to this skill, not to the specification.

## Three tests per draft

Use real problems the owner recognises. If none are available, write scenarios marked as hypothetical. Decide what a good answer looks like before judging the output.

1. **Invest more:** two valid solutions; a larger intervention removes a relevant cause or builds a priority capability. The draft must justify it without confusing ambition with volume of work.
2. **Simplify:** a secondary improvement tempts you into complexity. The draft must allow keeping it deliberately simple without breaking The Bar.
3. **Limit or one-way door:** an attractive option touches data, contracts, budget or an Anti-Goal. The draft must clarify the decision and the authorisation it needs, not serve as permission to act.

For each test, present:

| Situation | Reasonable options | Criterion applied | Decision and option ruled out | Evidence that would change it | Authorisation pending |
|---|---|---|---|---|---|

Ask the owner to correct any decision they disagree with. Disagreement is useful: it can reveal an ambiguous NORTH.md, a wrong rule or missing context.

## Result and limits

Report **pass**, **needs revision** or **not checked**, each with concrete evidence. "Not checked" does not mean it failed. A simulation run by the same agent can expose contradictions; it does not show causal improvement or that the result holds across models.

Separate the criterion from its application: a criterion can be well written and still be ignored in execution. Neither a markdown file nor a skill replaces real permission controls, CI or data protection.

## Recommended final delivery

The proposed or applied NORTH.md; confirmed decisions; material doubts; the list or diff of files touched; the results of the three tests; separate states for file written, integration line added, read in this session and loads in a fresh session. Do not store this report inside NORTH.md unless the user explicitly asks for extra documentation.

Scenarios for evaluating the skill itself with independent agents are in `tests/scenarios.md`. They have not been run yet.
