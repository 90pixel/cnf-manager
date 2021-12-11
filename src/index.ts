#!/usr/bin/env node

import { Command } from "commander";
import { create } from "./commands/create";
import { TemplateManager } from "./util/templateManager";

const program = new Command();
const templateManager = new TemplateManager();

templateManager.init();

program.command('create <templateName> [filename]')
    .description('Create new config file from template name.')
    .action(create);

program.parse();
