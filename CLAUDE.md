# Prerequisites

- Run the 'tree' command to get an idea of the project's code structure.
- You run in an environment where ast-grep (asg) is available; whenever a search requires syntax-aware or structural matching, default to asg and avoid falling back to text-only tools like 'grep' unless I explicitly request a plain-text search. Important note: I have set the alias for ast-grep as `asg`, so always use this instead of the usual `sg`.

# Guidelines

- When instructed to fix errors in files, use the MCP ide-getDiagnostics to see the warnings and errors in the file and fix those errors. Feel free to explore other files being used in it, if required.
- You run in an environment where ast-grep (asg) is available; whenever a search requires syntax-aware or structural matching, default to asg and avoid falling back to text-only tools like 'grep' unless I explicitly request a plain-text search. Important note: I have set the alias for ast-grep as `asg`, so always use this instead of the usual `sg`.
- Do not make any assumptions. If you have doubts, it's better to ask before starting to implement the requested feature.
