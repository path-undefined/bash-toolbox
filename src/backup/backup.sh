#!/usr/bin/env bash

BACKUP_NAME=backup-$(date +%Y-%m-%d)

mkdir -p ${BACKUP_NAME}/bin
cp -r \
  ${HOME}/bin/backup* \
  ${HOME}/bin/envman* \
  ${HOME}/bin/gitman* \
  ${HOME}/bin/nopazz* \
  ${BACKUP_NAME}/bin

cp -r ${HOME}/.envman ${BACKUP_NAME}/envman

tar czf ${BACKUP_NAME}.tar.gz ${BACKUP_NAME}

rm -rf ${BACKUP_NAME}
