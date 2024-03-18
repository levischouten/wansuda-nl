#!/bin/bash

# Replace with your actual Netlify site ID
NETLIFY_SITE_ID="2118a2f6-884e-4649-a10e-1ac61ba85275"

# Netlify Personal Access Token
export NETLIFY_AUTH_TOKEN="${NETLIFY_AUTH_TOKEN}"

# GitHub Personal Access Token
GITHUB_TOKEN="${GITHUB_TOKEN}"
GITHUB_REPO="levischouten/wansuda-nl"

# Get the last successful deployment time from Netlify
last_deploy_time=$(netlify deploy:list --site $NETLIFY_SITE_ID --json | jq -r '.[0].created_at')

# Convert to timestamp
last_deploy_timestamp=$(date -d "$last_deploy_time" +%s)

# Get the last commit time on the main branch from GitHub
last_commit_time=$(curl -s -H "Authorization: token $GITHUB_TOKEN" "https://api.github.com/repos/$GITHUB_REPO/commits/main" | jq -r '.commit.committer.date')

# Convert to timestamp
last_commit_timestamp=$(date -d "$last_commit_time" +%s)

# Compare the timestamps and deploy if there are new commits
if [ "$last_commit_timestamp" -gt "$last_deploy_timestamp" ]; then
  echo "New commits found. Starting Netlify deployment."
  netlify deploy --prod
else
  echo "No new commits since the last deployment."
fi
