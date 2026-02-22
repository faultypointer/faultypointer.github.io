#!/usr/bin/env node
/**
 * build-fs.js
 * -----------
 * Converts ./fs (a directory of .md files) into ./fs.json
 * for the portfolio terminal.
 *
 * Each .md file becomes a file node:
 *   { type: "file", content: "<raw markdown string>", link?: "https://..." }
 *
 * Optional file-level link:
 *   Add an HTML comment on the very first line of the file:
 *     <!-- link: https://example.com -->
 *   This will be stripped from the content and stored as node.link,
 *   used by the terminal's `open` command.
 *
 * Usage:
 *   node build-fs.js              # reads ./fs, writes ./fs.json
 *   node build-fs.js src dst      # custom source dir and output file
 */

import { readdirSync, readFileSync, statSync, writeFileSync } from "fs";
import { join, extname } from "path";

const [,, srcArg, dstArg] = process.argv;
const SRC = srcArg || "fs";
const DST = dstArg || "fs.json";

const LINK_RE = /^<!--\s*link:\s*(\S+)\s*-->\n?/;

function parseFile(fullPath) {
  let raw = readFileSync(fullPath, "utf8");
  const node = { type: "file" };

  const m = raw.match(LINK_RE);
  if (m) {
    node.link = m[1];
    raw = raw.slice(m[0].length);
  }

  node.content = raw;
  return node;
}

function buildTree(dirPath) {
  const node = { type: "dir", children: {} };
  const entries = readdirSync(dirPath).sort();

  for (const entry of entries) {
    const fullPath = join(dirPath, entry);
    const stat = statSync(fullPath);

    if (stat.isDirectory()) {
      node.children[entry] = buildTree(fullPath);
    } else if (stat.isFile() && extname(entry) === ".md") {
      node.children[entry] = parseFile(fullPath);
    }
  }

  return node;
}

try {
  statSync(SRC);
} catch {
  console.error(`Error: source directory "${SRC}" not found.`);
  process.exit(1);
}

const tree = buildTree(SRC);
writeFileSync(DST, JSON.stringify(tree, null, 2), "utf8");

let fileCount = 0, dirCount = 0;
function count(n) {
  if (n.type === "file") { fileCount++; return; }
  dirCount++;
  for (const c of Object.values(n.children)) count(c);
}
count(tree);

console.log(`Built ${DST}`);
console.log(`  ${dirCount} director${dirCount === 1 ? "y" : "ies"}, ${fileCount} file${fileCount !== 1 ? "s" : ""}`);