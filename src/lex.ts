import { Lexer } from 'nearley';

const url =
    'https://raw.githubusercontent.com/metamath/set.mm/develop/demo0.mm';

const main = async (lexer: Lexer) => {
    const response = await fetch(url);
    const text = await response.text();
    lexer.reset(text);
    const tokens = [];
    for (;;) {
        const token = lexer.next();
        if (token) {
            tokens.push(token);
        } else {
            break;
        }
    }

    console.log(tokens);
};

console.log('Doing nothing until a lexer is found and adopted');

//main();
