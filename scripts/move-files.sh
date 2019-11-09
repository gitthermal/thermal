#!/usr/bin/env bash

echo "Executing ${0}"
printf "\n"

# list dist directory content
bash ./scripts/print-directory-content.sh dist ./dist

# artifacts directory name
directoryName=artifacts
echo Create artifacts directory name: $directoryName
mkdir ./dist/$directoryName
ls ./dist/
printf "\n"

# moving directory content
echo Moving content to artifacts directory
mv --verbose ./dist/thermal-$1* --target-directory ./dist/$directoryName

# list artifacts directory content
bash ./scripts/print-directory-content.sh artifacts ./dist/artifacts
