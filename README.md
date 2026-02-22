# The Terminal

A terminal that can be used to access my information.

## Project Structure

```
root/
├── index.html            # Main entry point
├── style.css             # All styles (edit tokens at the top to retheme)
├── fs.json               # Generated filesystem (not to be edited by hand as the modified content will be discarded when this is generated next time)
├── utils/buildfs.js      # Node.js build tool (generates fs.json from ./fs)
├── README.md
└── fs/                   # Information content
    ├── ...
```

## Getting Started

```bash
# 1. Edit files inside ./fs  (see format below)
# 2. Regenerate fs.json
node utils/buildfs.js
# 3. Serve locally
```

## File Format

Files are written in a small subset of Markdown and live in `./fs/`.
Only `.md` files are picked up by the build tool.

### Supported syntax

| Syntax | Result |
|---|---|
| `# Heading 1` | Large green heading |
| `## Heading 2` | Yellow heading |
| `### Heading 3` | Cyan heading |
| `> quote` | Italic blockquote with purple border |
| `- item` | Bulleted list item |
| ` ```...``` ` | Fenced code block |
| `**bold**` | Bold text |
| `*italic*` | Italic text |
| `` `code` `` | Inline code |
| `[text](url)` | Clickable link |
| `---` | Horizontal rule |

### Example file

```md
# Nova

> Real-time collaborative whiteboard

[View on GitHub](https://github.com/you/nova)

## Stack

- React & Canvas API
- Node.js & Socket.io
```

### File-level link (for the `open` command)

To make a file openable with `open filename.md`, add this HTML comment
on the very first line of the file:

```md
<!-- link: https://github.com/you/project -->
# Project Name
...
```

The comment is stripped from the rendered output and stored as the file's link.

## Terminal Commands

| Command        | Description                             |
|----------------|-----------------------------------------|
| `help`         | Show all commands                       |
| `ls [path]`    | List directory contents                 |
| `cd [path]`    | Change directory (`..`, `~` supported)  |
| `cat <file>`   | Render a markdown file                  |
| `open <file>`  | Open the file's link in a new tab       |
| `pwd`          | Print working directory                 |
| `clear`        | Clear terminal output                   |
| `whoami`       | One-line bio pulled from `about.md`     |
| `↑ / ↓`        | Command history                         |
| `Tab`          | Autocomplete paths                      |

## Customisation

- **Content** — edit `.md` files in `./fs/`, run `node utils/buildfs.js`
- **Colours / sizing** — edit CSS variables at the top of `style.css`
- **Banner** — edit `WELCOME` in `index.html`

## More feature ideas
- image and other types of content support
- description for the directory
- presentation support