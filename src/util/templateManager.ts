import * as os from "os";
import * as fs from "fs";
import * as path from "path"
import {Answer} from "../interfaces/answer";
import {Variable} from "../interfaces/variable";

export class TemplateManager {
    private readonly templateRootPath = path.join(os.homedir(), 'cnf-manager');

    init() {
        if (!fs.existsSync(this.templateRootPath)) {
            fs.mkdirSync(this.templateRootPath);
        }
    }

    create(templateName: string, destination: string, answers: Answer[], filename: string | null = null) {
        if (filename == null || filename.length <= 0) {
            filename = templateName;
        }

        const confFile = path.join(destination, filename);
        let templateContent = this.readTemplateContent(templateName);

        for (const answer of answers) {
            const rxp = new RegExp(answer.variable, 'gmi');
            templateContent = templateContent?.replace(rxp, answer.answer) ?? templateContent;
        }

        fs.promises
            .access(destination, fs.constants.R_OK | fs.constants.W_OK)
            .then(async () => {
                if (templateContent) {
                    await fs.writeFileSync(confFile, templateContent);
                }
            })
            .catch((err) => console.error("cannot access", err));
    }

    parseTemplate(templateName: string): Variable[] {
        const templateContent = this.readTemplateContent(templateName);
        const rxp = new RegExp("{{[A-z]*}}", 'gmi')
        let variables: Variable[] = [];

        if (templateContent?.length) {
            let match: RegExpExecArray | null;
            let matches: string[] = [];

            while (match = rxp.exec(templateContent)) {
                let matched = match[0];

                if (matches.indexOf(matched) < 0) {
                    matches.push(match[0]);
                }
            }

            if (matches.length) {
                matches.forEach((value) => {
                    const variableName = value.replace(/[{}]/g, '');

                    let variableObject: Variable = {
                        variable: value,
                        name: variableName
                    }

                    variables.push(variableObject);
                })
            }
        }

        return variables;
    }

    readTemplateContent(templateName: string): string | null {
        const templatePath = path.join(this.templateRootPath, templateName);
        let templateContent = fs.readFileSync(templatePath);

        return templateContent?.toString();
    }
}
