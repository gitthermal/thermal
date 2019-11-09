#!/usr/bin/env bash

# $1: Webhook url
# $2: Commit message
# $3: Organisation name/repository name
# $4: Ref (branch) name
# $5: Commit ID
# $6: Author name
# $7: Author image

DISCORD_WEBHOOK=$1
COMMIT_MESSAGE=$2
REPOSITORY_ORG_NAME=$3
REF=$4
COMMIT_ID=$5
AUTHOR_NAME=$6
AUTHOR_IMAGE=$7
current_date=$(date --iso-8601=seconds)

STATUS_COLOR=0x2664261

curl \
	--header "content-type: application/json" \
	--request POST \
	--data '{
		"username": "GitHub"
		"avatar_url": "https://i.imgur.com/u6mj8bs.png",
		"embeds": [
			{
				"description": "Build [4534633]() is successful `origin/master`",
				"color": "'"$STATUS_COLOR"'",
				"timestamp": "'"$current_date"'",
				"author": {
					"name": "'"$AUTHOR_NAME"'",
					"image": "'"$AUTHOR_IMAGE"'"
				},
				"fields": [
					{
						"name": "Commit ID",
						"value": "["'"$COMMIT_ID"'"](https://www.github.com/"'"$REPOSITORY_ORG_NAME"'"/commit/"'"$COMMIT_ID"'")"
					}
				]
			}
		]
	}' $DISCORD_WEBHOOK
