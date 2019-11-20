#!/usr/bin/env bash

# -u: Webhook url
DISCORD_WEBHOOK=""

# -m: Commit message
COMMIT_MESSAGE=""

# -r: Organisation name/repository name
REPOSITORY_ORG_NAME=""

# -b: Ref (branch) name
REF=""

# -c: Commit ID
COMMIT_ID=""

# -n: Author name
AUTHOR_NAME=""

# -i: Author image
AUTHOR_IMAGE=""

current_date=$(date --iso-8601=seconds)

STATUS_COLOR=0x2664261

while getopts "u:m:r:b:c:n:i" opt; do
	case $opt in
		u)
			DISCORD_WEBHOOK=$OPTARG
			;;
		m)
			COMMIT_MESSAGE=$OPTARG
		r)
			REPOSITORY_ORG_NAME=$OPTARG
		b)
			REF=$OPTARG
		c)
			COMMIT_ID=$OPTARG
		n)
			AUTHOR_NAME=$OPTARG
		i)
			AUTHOR_IMAGE=$OPTARG
		\?)
			help_func
			exit 1
			;;
	esac
done

# echo all variables
echo $DISCORD_WEBHOOK
echo $COMMIT_MESSAGE
echo $REPOSITORY_ORG_NAME
echo $REF
echo $COMMIT_ID
echo $AUTHOR_NAME
echo $AUTHOR_IMAGE
echo $current_date
echo $STATUS_COLOR

curl \
	--header "content-type: application/json" \
	--request POST \
	--data '{
		"username": "GitHub Actions",
		"avatar_url": "https://i.imgur.com/u6mj8bs.png",
		"embeds": [
			{
				"title": "'"$COMMIT_MESSAGE"'",
				"url": "https://www.github.com/'"$REPOSITORY_ORG_NAME"'/commit/'"$COMMIT_ID"')",
				"timestamp": "'"$current_date"'",
				"author": {
					"name": "'"$AUTHOR_NAME"'",
					"icon_url": "'"$AUTHOR_IMAGE"'"
				},
				"fields": [
					{
						"name": "Branch",
						"value": "'"$REF"'"
					},
					{
						"name": "Commit ID",
						"value": "'"$COMMIT_ID"'"
					}
				]
			}
		]
	}' $DISCORD_WEBHOOK

function help_func() {
	echo "Discord notification - Send notifications to Discord"
	printf "\n"

	echo "Usage: ./scripts/discord-notification.sh <command>"
	printf "\n"

	echo "where <command> is one of:"
	echo "u, m, r, b, c, n, i"
	printf "\n"

	echo "-u		Discord webhook url"
	echo "-m		Commit message"
	echo "-r		Organization and repository name"
	echo "-b		Reference branch nane"
	echo "-c		Long hash (commit ID)"
	echo "-n		Sender or author name"
	echo "-i		Sender or author image"
}
