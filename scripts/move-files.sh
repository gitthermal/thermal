#!/usr/bin/env bash

echo "Executing ${0}"
printf "\n"

# list dist directory content
# $0: folder name
# $1: folder path
bash ./scripts/print-directory-content.sh dist ./dist

# artifacts directory name
directoryName=artifacts
echo Create artifacts directory name: $directoryName

# create with directory name
mkdir ./dist/$directoryName
ls ./dist/
printf "\n"

# moving content to artifacts directory
echo Moving content to $directoryName directory
mv -v ./dist/thermal-$1* ./dist/$directoryName

# list artifacts directory content
bash ./scripts/print-directory-content.sh $directoryName ./dist/$directoryName
