#!/bin/bash

# Execute na raiz do projeto ./scripts/create-migration.sh NOME_MIGRATION

# Verifica se o nome da migração foi passado como argumento
if [ -z "$1" ]; then
  echo "Por favor, forneça o nome da migração."
  exit 1
fi

# Executa o comando com o nome da migração substituído
yarn typeorm migration:create ./src/infra/database/typeorm/recognition_sign_db/migrations/"$1"

# Executa comando para atualizar orm
yarn upgrade typeorm

# Roda as migrations pendentes
yarn typeorm migration:run -d ./dist/infra/database/typeorm/recognition_sign_db/connection