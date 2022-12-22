import nearley, { Lexer } from 'nearley';
import { lexerWorkaround } from './lexerWorkaround';

const url =
    'https://raw.githubusercontent.com/metamath/set.mm/develop/demo0.mm';
const filename = url.split('/').pop();

const asMB = (bytes: number) => (bytes / (1024 * 1024)).toFixed(1) + 'MB';

const main = async (grammar: any, lexer: Lexer) => {
    const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar), {
        lexer,
    });

    const [responseForLength, response] = await Promise.all([
        fetch(url, {
            headers: { 'accept-encoding': '' },
        }),
        fetch(url),
    ]);

    const fileSize = parseInt(
        responseForLength.headers.get('content-length') ?? ''
    );

    if (!response || !response.body) {
        throw new Error(`Failed to get ${url}`);
    }

    let amountDownloaded = 0;

    const reader = response.body.getReader();
    const utf8Decoder = new TextDecoder('utf-8');

    let done = false;
    let value: Uint8Array | undefined;

    while (!done) {
        ({ value, done } = await reader.read());

        if (value) {
            const text = utf8Decoder.decode(value);

            amountDownloaded += text.length;
            console.log(
                `${filename} downloaded ${asMB(amountDownloaded)}/${asMB(
                    fileSize
                )}`
            );

            parser.feed(lexerWorkaround(text, done));
        }
    }

    console.log(parser);
};

console.log('Doing nothing until a parser is found and adopted');

//main();
