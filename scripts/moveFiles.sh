#!/usr/bin/env bash

echo "Executing ${0}"
printf "\n"

# list directory content
cd ./dist
echo List directory content

for entry in "$search_dir"./*
do
  echo $entry
done
printf "\n"

# artifacts directory name
directoryName=artifacts
echo Crate artifacts directory name: $directoryName
mkdir $directoryName
printf "\n"

# moving directory content
echo Moving content to artifacts directory
mv --verbose thermal-$1* --target-directory $directoryName
