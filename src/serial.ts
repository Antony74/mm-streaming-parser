import nearley from 'nearley';
import { Lexer } from 'nearley';

const url = 'https://raw.githubusercontent.com/metamath/set.mm/develop/set.mm';
const filename = url.split('/').pop();

const asSeconds = (start: number, end: number) =>
    `${((end - start) / 1000).toFixed(2)} seconds`;

const main = async (grammar: any, lexer: Lexer) => {
    const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar), {
        lexer,
    });
    
    const start = performance.now();
    const response = await fetch(url);
    const text = await response.text();
    const middle = performance.now();
    console.log(`Downloaded ${filename} in ${asSeconds(start, middle)}`);
    parser.feed(text);
    const end = performance.now();
    console.log(`Parsed ${filename} in ${asSeconds(middle, end)}`);
};

console.log('Doing nothing until a parser is found and adopted');

//main();
