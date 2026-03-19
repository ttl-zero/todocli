# Todo CLI

### Uma ferramenta de linha de comando (CLI) simples e colorida para gerenciar suas tarefas diárias, feita com Node.js, Commander e Chalk.

## Como instalar

### Clone o repositório
```
    git clone https://github.com/ttl-zero/todocli.git
    cd todocli
```
### Instale as dependências:

```
   npm install
```
### Para usar globalmente:
```
   npm link
```

## Comandos
```
add <task>                  Adiciona uma nova tarefa.
list                        Lista todas as tarefas com status e ID.
check <id>                  Alterna o status da tarefa (Feito/Pendente).
edit <id> <texto>           Edita o conteúdo de uma tarefa existente.
remove <id>                 Remove uma tarefa específica pelo ID.
flush                       Cuidado! Apaga todas as tarefas da lista.
```

## Exemplo de uso:
```
# Adicionar uma tarefa (use aspas para frases)
todo add "Estudar Node.js"

# Listar tarefas
todo list

# Marcar tarefa 1 como concluída
todo check 1

# Editar o texto da tarefa 1
todo edit 1 "Estudar Node.js e Commander"
``` 

## Armazenamento

As tarefas são salvas globalmente no seu computador no arquivo:

~/.todo-tasks.json (na sua pasta de usuário/Home).
