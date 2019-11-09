#!/usr/bin/env bash

# $1: Webhook url

DISCORD_WEBHOOK=$1
current_date=$(date --iso-8601=seconds)

curl \
	--header "content-type: application/json" \
	--request POST \
	--data '{
		"content": "**Build status**",
		"embeds": [
			{
				"description": "Build [4534633]() is successful `origin/master`",
				"color": 7816110,
				"timestamp": "'"$current_date"'",
				"footer": {
					"text": "GitHub Action - CI Workflow"
				}
			}
		]
	}' $DISCORD_WEBHOOK
