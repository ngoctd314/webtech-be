#!/bin/bash


# Declare variable
type="full"
path=""
file=""

for item in $1 $2 $3
do
  # Set comma as delimiter
  IFS='='
  #Read the split words into an array based on comma delimiter
  read -a arr <<< "$item"
  if [[ ${arr[0]} == "type" ]]
  then
    type=${arr[1]}
  elif [[ ${arr[0]} == "path" ]]
  then
    path=${arr[1]}
  elif [[ ${arr[0]} == "file" ]]
  then
    file=${arr[1]}
  fi
done

if [[ $type == "full" ]]
then
  echo "Run Full Test"
elif [[ $type == "folder" ]]
then 
  echo  "Run Folder Test On Path: ${path}"
elif [[ $type == "file" ]]
then 
  echo "Run File Test on Path: ${path}/**/${file}.spec.ts"
fi

if [[ $type == "full" ]]
then
  NODE_ENV=test mocha --timeout 10000 -r ts-node/register -r tsconfig-paths/register -r dotenv/config --file src/__test__/setup.spec.ts src/**/__test__/**/*.spec.ts dotenv_config_path=./.env 
elif [[ $type == 'folder' ]]
then
  NODE_ENV=test mocha --timeout 10000 -r ts-node/register -r tsconfig-paths/register -r dotenv/config dotenv_config_path=./.env --file src/__test__/setup.spec.ts src/$path/__test__/**/*.spec.ts
elif [[ $type == 'file' ]]
then
  NODE_ENV=test mocha --timeout 10000 -r ts-node/register -r tsconfig-paths/register -r dotenv/config dotenv_config_path=./.env --file src/__test__/setup.spec.ts src/$path/__test__/**/$file.spec.ts
fi