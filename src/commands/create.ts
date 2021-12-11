import { TemplateManager } from "../util/templateManager";
import * as inquirer from "inquirer"
import {Answer} from "../interfaces/answer";

export async function create(templateName: string, filename: string | null) {
    const templateManager = new TemplateManager();

    const destination = process.cwd();
    const variables = templateManager.parseTemplate(templateName);
    let answers: Answer[] = [];

    for (const variable of variables) {
        const input = await inquirer.prompt([
            {
                message: `What's the value of ${variable.name}?`,
                name: variable.name,
                type: "input",
            }
        ]);

        const answer: Answer = {
            variable: variable.variable,
            answer: input[variable.name]
        }

        answers.push(answer);
    }

    templateManager.create(templateName, destination, answers, filename);
}
