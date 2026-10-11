# north-adoption

[![Skills Directory: security grade A](https://img.shields.io/badge/Skills_Directory-Security_A-111111?style=flat-square&labelColor=111111&color=fafafa)](https://www.skillsdirectory.com/skills/berthelius-north-adoption)

An [Agent Skill](https://agentskills.io/specification) that helps you write a
[NORTH.md](https://northfile.dev/spec) for your project with your coding agent.

It tells the agent to read the repository first, then interview you one
question at a time, draft the seven canonical sections, test the draft against
three decisions from your project (one where investing more is right, one where
simplifying is right, one that touches a limit or a one-way door) and, once you
approve it, link it from `CLAUDE.md` or `AGENTS.md`. The agent is told to report
four states separately (file written, integration line added, read in this
session, loads in a fresh session) and never to mark the last one verified
without evidence.

It interviews you in your language and writes the file in that language; the
seven section headings stay in English, as the specification defines them.

## Install

With the [skills CLI](https://github.com/vercel-labs/skills):

```bash
npx skills add berthelius/north --skill north-adoption
```

To list the skills in this repository first:

```bash
npx skills add berthelius/north --list
```

The CLI collects anonymous usage data; set `DISABLE_TELEMETRY=1` or
`DO_NOT_TRACK=1` to opt out.

Manual install: copy this folder into your agent's skills directory, for
example `.claude/skills/north-adoption/` in your project for Claude Code.

Then ask your agent to adopt NORTH.md, or name the skill: "Use north-adoption
for this project."

## Without skill support

[`PROMPT.md`](PROMPT.md) carries the same method in one self-contained message.
Paste it into your agent's chat.

## Contents

- [`SKILL.md`](SKILL.md): the procedure and when to use it.
- [`PROMPT.md`](PROMPT.md): the standalone prompt.
- [`references/`](references/): the interview, review and integration guides.
- [`assets/NORTH.template.md`](assets/NORTH.template.md): the canonical v0.1
  template, identical to the one in the repository README.
- [`tests/scenarios.md`](tests/scenarios.md): twelve evaluation scenarios.
- [`LICENSE`](LICENSE): MIT.

## Status

v0.1.0, targeting NORTH.md specification v0.1. There is no published evaluation:
the scenarios in `tests/scenarios.md` are defined but have not been run. That
the interview leads to better decisions is a hypothesis. If you test it, open an
issue at [berthelius/north](https://github.com/berthelius/north/issues) with the
results, flattering or not.

## Licence

MIT. See [LICENSE](LICENSE).
