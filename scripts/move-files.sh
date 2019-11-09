#!/usr/bin/env bash

echo "Executing ${0}"
printf "\n"

# list dist directory content
bash ./scripts/print-directory-content.sh dist ./dist

# artifacts directory name
directoryName=artifacts
echo Create artifacts directory name: $directoryName
mkdir $directoryName
ls
printf "\n"

# moving directory content
echo Moving content to artifacts directory
mv --verbose thermal-$1* --target-directory $directoryName

# list artifacts directory content
bash ./scripts/print-directory-content.sh artifacts ./dist/artifacts
# cd ./dist
# echo List directory content

# for entry in "$search_dir"./*
# do
#   echo $entry
# done
