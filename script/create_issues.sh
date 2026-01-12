#!/usr/bin/env bash
set -euo pipefail

# Creates GitHub issues for each PR scope.
# No labels. No owners. Each issue points back to Notion as the source of truth.
# Usage:
#   chmod +x create_issues.sh
#   ./create_issues.sh
#
# Requirements:
#   - GitHub CLI installed: gh
#   - Authenticated: gh auth login
#   - Run inside the target repo directory (or pass --repo owner/name to gh manually)

create_issue () {
  local title="$1"
  local body="$2"
  echo "Creating issue: $title"
  gh issue create --title "$title" --body "$body" >/dev/null
}

NOTION_NOTE="Refer to Notion: %s

Notion is the source of truth for:
- the full task list
- the Definition of Done (DoD)
- ownership and assignments

Please follow the matching Notion PR section exactly."

create_issue \
  "PR 1: Navbar Cleanup & Redesign" \
  "$(printf "$NOTION_NOTE" "PR 1 — Navbar Cleanup & Redesign")"

create_issue \
  "PR 2: Hero + About Unified Section Enhancements" \
  "$(printf "$NOTION_NOTE" "PR 2 — Hero + About Unified Section Enhancements")"

create_issue \
  "PR 3: Last Year Section + Stats Fix" \
  "$(printf "$NOTION_NOTE" "PR 3 — Last Year Section + Stats Fix")"

create_issue \
  "PR 4: Sponsors + FAQ Corrections" \
  "$(printf "$NOTION_NOTE" "PR 4 — Sponsors + FAQ Corrections")"

create_issue \
  "PR 5: Dino Game / Team Game Updates" \
  "$(printf "$NOTION_NOTE" "PR 5 — Dino Game / Team Game Updates")"

create_issue \
  "PR 6A: Mobile Sweep (Top Half)" \
  "$(printf "$NOTION_NOTE" "PR 6A — Mobile Sweep (Top Half)")"

create_issue \
  "PR 6B: Mobile Sweep (Bottom Half)" \
  "$(printf "$NOTION_NOTE" "PR 6B — Mobile Sweep (Bottom Half)")"

echo "✅ Done! Created all issues."
