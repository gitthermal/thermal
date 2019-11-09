#!/usr/bin/env bash

cd $2
echo List $1 directory content

for entry in "$search_dir"./*
do
  echo $entry
done
printf "\n"
