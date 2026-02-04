## Findings

### Can only validate the changes of the PR even if instructions say otherwise

Your CLAUDE.md says "review the entire file for /accessibility", but the plugin's internal validation logic says "pre-existing issues are false positives" - and the plugin     
wins.

This is a fundamental limitation of the code-review@claude-code-plugins plugin. It's designed to only comment on issues introduced by the PR, regardless of what your CLAUDE.md 
says.
