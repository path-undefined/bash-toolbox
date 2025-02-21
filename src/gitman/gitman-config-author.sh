#!/usr/bin/env bash

if [ -z ${GITMAN_USER_NAME} ]; then
  >&2 echo -e "\e[31mEnvironment variable \e[01;31mGITMAN_USER_NAME\e[00;31m not defined!\e[0m"
  exit 1
fi

if [ -z ${GITMAN_USER_EMAIL} ]; then
  >&2 echo -e "\e[31mEnvironment variable \e[01;31mGITMAN_USER_EMAIL\e[00;31m not defined!\e[0m"
  exit 1
fi

git config user.name "${GITMAN_USER_NAME}"
git config user.email "${GITMAN_USER_EMAIL}"
