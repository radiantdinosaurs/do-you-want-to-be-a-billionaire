function shuffle(array) {
    let currentIndex = array.length;
    let temporaryValue, randomIndex;

    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

export function handlePhoningARobot(answerOptions) {
    const quotes = [
        "Hmmmm...I think the right answer is ",
        "I know! The answer is ",
        "You should definitely choose this answer: "
    ];
    let correctAnswer;

    answerOptions.forEach(answer => {
        if (answer.correct) {
            let quote = quotes[Math.floor(Math.random() * quotes.length)];
            correctAnswer = `${quote}${answer.name}`;
        }
    });

    return correctAnswer;
}

export function handleAskingTheAudience(answerOptions) {
    let askTheAudience = [];

    answerOptions.forEach(answer => {
        if (answer.correct) {
            const percent = Math.floor(Math.random() * (89 - 50) + 50);
            askTheAudience.push({
                answer: answer.name,
                audience: percent
            });
        } else {
            const percent = Math.floor(Math.random() * (45 - 10) + 10);
            askTheAudience.push({
                answer: answer.name,
                audience: percent
            });
        }
    });

    return askTheAudience;
}

export function handleSplittingAnswers(answerOptions) {
    let answersRemoved = 0;
    shuffle(answerOptions.slice());

    answerOptions.forEach(answer => {
        if (answersRemoved < 2) {
            if (!answer.correct) {
                document.getElementById(answer.name).style.opacity = "0";
                answersRemoved++;
            }
        }
    });
}
