#!/usr/bin/env bash

cd $2
# directory path
echo pwd
echo List $1 directory content

# list each item from directory in new line
for entry in "$search_dir"./*
do
  echo $entry
done
printf "\n"
