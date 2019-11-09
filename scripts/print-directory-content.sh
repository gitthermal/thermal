#!/usr/bin/env bash

cd $2
echo pwd
echo List $1 directory content

for entry in "$search_dir"./*
do
  echo $entry
done
printf "\n"
