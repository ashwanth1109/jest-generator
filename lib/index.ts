import Parser from "./parser.ts";

const fileName = Deno.args[0];
const file = await Deno.readFile(fileName);
const decoder = new TextDecoder("utf-8");
const fileContents = decoder.decode(file);

const output = Parser.parseCode(fileContents);

const encoder = new TextEncoder();
const data = encoder.encode(output);
const outputFileName = Deno.args[1];
await Deno.writeFile(outputFileName, data, { append: true });
