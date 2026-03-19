#!/usr/bin/env node

const fs = require('fs')
const { default: chalk } = require("chalk");
const { program } = require("commander");

const FILE_PATH = './tasks.json';

const getTasks = () => {
    if (!fs.existsSync(FILE_PATH)) return [];
    const data = fs.readFileSync(FILE_PATH);
    return JSON.parse(data);
};

const saveTasks = (tasks) => {
    fs.writeFileSync(FILE_PATH, JSON.stringify(tasks, null, 2));
};

program
    .name("todo")
    .description("A simple todo CLI")
    .version("1.0.0")

program
    .command("add <task>")
    .description("Add new task")
    .action((task) => {
        const tasks = getTasks();

        const nextId = tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1;

        tasks.push({ id: nextId, content: task, check: false });

        saveTasks(tasks);

        console.log(chalk.green("Task added to your list"));
    });

program
    .command("list")
    .description("List all tasks")
    .action(() => {
        const tasks = getTasks();
        if (tasks.length === 0) {
            console.log('Task list is empty');
            return;
        }
        console.log(chalk.blue.bold('\n My tasks ᕙ(⇀ ‸↼‶)ᕗ'));
        tasks.forEach(t => {
            const status = t.check ? chalk.green('[ ✔ ]') : chalk.red('[   ]');
            const content = t.check ? chalk.gray.italic(t.content) : chalk.yellow(t.content);
            console.log(`${chalk.blue(t.id + '.')} ${status} ${content}`);
        });
    });

program
    .command("remove <id>")
    .description("Remove task by ID")
    .action((id) => {
        let tasks = getTasks();
        const newList = tasks.filter(t => t.id !== parseInt(id));

        if (tasks.length === newList.length) {
            console.log(chalk.red('ID not found'));
        } else {
            saveTasks(newList);
            console.log(chalk.red(`Task ${id} was removed!`));
        }
    });

program
    .command("check <id>")
    .description("Check/Uncheck task")
    .action((id) => {
        let tasks = getTasks();
        const task = tasks.find(t => t.id === Number(id));
        if (task) {
            task.check = !task.check;
            const msg = task.check ? "checked" : "unchecked"
            console.log(chalk.green(`Task ${chalk.yellow(id)} was marked as ${msg}`));
            saveTasks(tasks);
        } else {
            console.log(chalk.red("Task not found"));
        }
    });

program
    .command("flush")
    .description("Nuclear option: wipe everything out")
    .action(() => {
        saveTasks([]);
        console.log(chalk.bgRed.white.bold(` ALL TASKS HAVE BEEN WIPED OUT! `))
    }
    );

program.parse()