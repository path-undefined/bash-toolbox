#!/usr/bin/env bash

ENV_NAME=$1
ENV_PATH="${HOME}/.envman/env-${ENV_NAME}"

echo "Using configuration file: ${ENV_PATH}"

if [ ! -d ${ENV_PATH} ]; then
  >&2 echo -e "\e[31mEnvironment \e[01;31m${ENV_NAME}\e[00;31m does not exist!\e[0m"
  exit 1
fi

bash --rcfile "${ENV_PATH}/envrc"
