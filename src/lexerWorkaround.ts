let leftOverText = '';

const stopOn = ['$)'];

export const lexerWorkaround = (newText: string, done: boolean): string => {
    let returnText = leftOverText + newText;
    leftOverText = '';

    if (done) {
        return returnText;
    }

    const stopPoints = stopOn.map(
        (stopString) => returnText.lastIndexOf(stopString) + stopString.length
    );
    const stopPoint = Math.max(...stopPoints);

    leftOverText = returnText.slice(stopPoint);
    returnText = returnText.slice(0, stopPoint);

    return returnText;
};
