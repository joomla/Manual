#!/bin/sh

HEADLINE="$1"
DESCRIPTION="$2"
TARGETURL="$3"

if [ -z "$TARGETURL" ];
then
  echo "Headline, description and targeturl is need."
  exit 1
fi

curl -X POST "https://api.github.com/repos/$DRONE_REPO/statuses/$DRONE_COMMIT" \
  -H "Content-Type: application/json" \
  -H "Authorization: token $GITHUB_TOKEN" \
  -d "{\"state\": \"success\", \"context\": \"$HEADLINE\", \"description\": \"$DESCRIPTION\", \"target_url\": \"$TARGETURL\"}" > /dev/null
