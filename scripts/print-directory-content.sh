#!/usr/bin/env bash

cd $2
echo pwa
echo List $1 directory content

for entry in "$search_dir"./*
do
  echo $entry
done
printf "\n"
