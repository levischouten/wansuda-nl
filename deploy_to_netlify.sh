#!/bin/bash

# Replace with your actual Netlify site ID
NETLIFY_SITE_ID="2118a2f6-884e-4649-a10e-1ac61ba85275"

# Netlify Personal Access Token
export NETLIFY_AUTH_TOKEN="${NETLIFY_AUTH_TOKEN}"

# GitHub Personal Access Token
GITHUB_TOKEN="${GITHUB_TOKEN}"
GITHUB_REPO="levischouten/wansuda-nl"

# Get the current timestamp
current_timestamp=$(date +%s)

# Get the last commit time on the main branch from GitHub
last_commit_time=$(curl -s -H "Authorization: token $GITHUB_TOKEN" "https://api.github.com/repos/$GITHUB_REPO/commits/main" | jq -r '.commit.committer.date')

# Convert to timestamp
last_commit_timestamp=$(date -d "$last_commit_time" +%s)

# Calculate the difference in hours
diff_hours=$(( (current_timestamp - last_commit_timestamp) / 3600 ))

# Check if there have been commits in the last 24 hours and deploy if true
if [ "$diff_hours" -le 24 ]; then
  echo "New commits found in the last 24 hours. Starting Netlify deployment."
  netlify deploy --site $NETLIFY_SITE_ID --build
else
  echo "No new commits in the last 24 hours."
fi
