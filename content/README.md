# Content library

This directory contains the independent content layer for the application.

## Structure

- `articles/` — article metadata and article body content
- `books/` — book metadata and reading-section data
- `radio/` — radio catalog data
- `games/` — game questions, puzzle data, and game content
- `coloring/templates/` — reusable coloring template source files

The content layer is intentionally separate from page layout and presentation. Future route components should import from here rather than embedding large content arrays inside UI components.
