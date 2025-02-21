#!/usr/bin/env bash

ENV_NAME=$1
ENV_PATH="${HOME}/.envman/env-${ENV_NAME}"

if [ -z ${ENV_NAME} ]; then
  >&2 echo -e "\e[31mEnvironment name cannot be empty!\e[0m"
  exit 1
fi

if [ -d ${ENV_PATH} ]; then
  >&2 echo -e "\e[31mEnvironment \e[01;31m${ENV_NAME}\e[00;31m already exists!\e[0m"
  exit 1
fi

echo "Creating environment ${ENV_NAME} ..."
echo

mkdir -p ${ENV_PATH}

echo "Creating envrc file for the environment ${ENV_NAME} ..."
echo

read -p "Please enter git user name: " GIT_USER_NAME
read -p "Please enter git user email: " GIT_USER_EMAIL

cat > "${ENV_PATH}/envrc" <<EOL
. \${HOME}/.profile
. \${HOME}/.bashrc

ENV_NAME=${ENV_NAME}
ENV_PATH=\${HOME}/.envman/env-\${ENV_NAME}
SSH_PRIVATE_KEY=\${ENV_PATH}/ssh-key

PS1="[\${ENV_NAME}]\$PS1"

export NOPAZZ_FILE="\${ENV_PATH}/nopazz"
export NOPAZZ_CLIPBOARD="clip.exe"

export GITMAN_USER_NAME=${GIT_USER_NAME}
export GITMAN_USER_EMAIL=${GIT_USER_EMAIL}

export GIT_SSH_COMMAND="ssh -i \${SSH_PRIVATE_KEY}"

alias ssh="ssh -i \${SSH_PRIVATE_KEY}"
alias scp="scp -i \${SSH_PRIVATE_KEY}"
alias git="git"
EOL

echo "Creating SSH key for the environment ${ENV_NAME} ..."
echo

ssh-keygen -t ed25519 -f ${ENV_PATH}/ssh-key
