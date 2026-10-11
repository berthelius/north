# Integration: a written file is not a loaded file

Check the agent's current documentation before assuming how it discovers files. This skill ships no installer and runs no third-party commands.

## 1. Choose the file and its scope

`NORTH.md` goes at the repository root. In a monorepo with several distinct products, each product may have its own `NORTH.md` in its package root, and the root file then describes the umbrella ambition. Do not create one per folder. If the umbrella file and a product's file conflict, show the conflict and ask; do not invent a precedence rule.

If a NORTH.md exists, keep what is still valid and show a diff. If it targets another version of the specification, do not migrate it without reviewing the change. Keep publishable strategy apart from confidential notes; do not publish a second copy of private information for convenience.

## 2. Use the mechanism that is actually active

Find out which instruction file the agent actually loads, not just which names exist on disk. Do not create every context file of the convention. Do not replace global instructions with project ones.

### Claude Code

In the `CLAUDE.md` next to `NORTH.md`, add this line:

```text
@NORTH.md
```

Claude Code loads `CLAUDE.md` at the start of every session, and the import brings `NORTH.md` with it. Write the line as plain text in the target file: no quotes, backticks or code fence. Relative paths resolve from the importing file, so from `.claude/CLAUDE.md` the path must point to where `NORTH.md` really is. Check that the target exists and avoid cyclic or duplicate imports. Source: https://code.claude.com/docs/en/memory

### AGENTS.md or any other rules file

Add this block:

```markdown
See [NORTH.md](./NORTH.md) for project purpose and ambition. Before
architectural decisions, check The Bar, the Anti-Goals and the Trade-off
Defaults; do not flip a default unless its "Flip when" condition is met.
```

Use it as written, whatever the language of the NORTH.md: it names sections and a column whose labels stay in English. Change only the relative path if the rules file is not next to `NORTH.md`. This asks the agent to read the file; it is not an automatic import and does not by itself prove the agent will open it. If an equivalent block already exists, keep it: running the adoption twice must not add a second one.

### Other agents and chats

Check their current documentation for how they load instructions and skills. Do not carry `@NORTH.md` over to another product assuming it will work. If there is no verified mechanism, tell the agent to open the file explicitly, or attach or paste its content. Without write tools, provide the file and the suggested edit without claiming they were applied.

When delegating to another agent, do not assume it inherits your context. Give it the path and scope of the applicable NORTH.md, or the minimum excerpt if it has no access. Do not pass on another product's or client's strategy. Keep context you passed on apart from a read you verified.

## 3. Keep control and other people's changes

Get approval for the draft and for the files you will touch. Where Git is available, inspect the status and the diff of those files; do not restore or delete changes that are not yours. A README mention or badge is optional and must be within the agreed scope. Do not install dependencies, change global configuration, or commit, push or deploy to "complete" the adoption.

## 4. Verify in layers

Report each layer separately. Each one proves only what it says.

1. **File written.** Re-read the saved bytes and check they match the approved content.
2. **Integration line added.** Check path, scope, mechanism and that there are no duplicates. This proves the configuration was written, not that it loads.
3. **Read in this session.** Point to the tool call or context evidence that shows this session read the right `NORTH.md`, then apply it to a new decision. Repeating an excerpt that was pasted into the prompt does not prove the file was read.
4. **Loads in a fresh session.** Mark it verified only if a clean session was actually opened and you checked which instructions and files it loaded or read, together with a test of applying them. A manual read in this conversation says nothing about how the next one starts. If you cannot open or inspect that session, report "not verified" and give a suggested test.

Suggested test for another session, without pasting NORTH.md into it: "Without editing anything, list the sources of project direction available here. Then resolve this dilemma: … State which criterion you applied and which permission would be missing." Replace the dilemma with a real one. The result is limited evidence from one run, not a universal guarantee.

## 5. Maintenance

Suggest revisiting NORTH.md when a strategic decision changes or a test shows a criterion is out of date. Do not turn it into a diary, a backlog or an automatic summary of each sprint. Keep one canonical statement and link to what is already documented.
