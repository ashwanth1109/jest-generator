class Parser {
  public static minifyCode(code: string): string {
    return code.replace(/\r?\n|\r/g, "");
  }

  public static parseCode(code: string) {
    const minifiedCode = Parser.minifyCode(code);
    const importStatements = [];

    let letters: string[] = minifiedCode.split("");

    while (letters.length > 0) {
      // console.log(letters.length);
      const letter = letters[0];

      switch (letter) {
        case "i": {
          // import
          if (letters.slice(0, 6).join("") === "import") {
            const scIndex = letters.indexOf(";");
            const statement = letters.splice(0, scIndex + 1).join("");
            importStatements.push(statement);
            break;
          }
        }
        default:
          letters.splice(0, 1);
          break;
      }
    }

    const localServiceImports = importStatements.filter((statement) => {
      const module = statement.split("'")[1];

      return module.match(/^\./) && module.match(/\.service/);
    });

    let output = `import { mocked } from 'ts-jest/utils';\n\n${localServiceImports.join(
      "\n"
    )}`;

    output = `${output}\n\n`;

    localServiceImports.forEach((statement) => {
      const module = statement.split("'")[1];

      output = `${output}jest.mock('${module}');\n`;
    });

    output = `${output}`;

    const mockClears = localServiceImports.reduce((acc, val) => {
      const importedFunc = val.split("{")[1].split("}")[0].replace(/\s/g, "");

      return `${acc}mocked(${importedFunc}).mockClear();\n`;
    }, "");

    output = `${output}\n\ndescribe('[.handler]', () => {\nbeforeAll(() => {\n${mockClears}});\n});`;

    return output;
  }
}

export default Parser;
