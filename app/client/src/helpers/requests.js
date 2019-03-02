const endpoints = {
    GET_TOKEN: "https://opentdb.com/api_token.php?command=request",
    GET_TRIVIA: "/api/v1/trivia",
    RESET_TOKEN: token =>
        `https://opentdb.com/api_token.php?command=reset&token=${token}`
};

export function resetToken() {
    const token = sessionStorage.getItem("token");

    return fetch(endpoints.RESET_TOKEN(token));
}

function getQuestions(token) {
    const options = {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify({ token: token })
    };
    return fetch(endpoints.GET_TRIVIA, options)
        .then(response => {
            return response.json();
        })
        .catch(error => {
            console.log("Error: ", error);
        });
}

export function getSession() {
    fetch(endpoints.GET_TOKEN)
        .then(response => {
            return response.json();
        })
        .then(response => {
            if (response.token) sessionStorage.setItem("token", response.token);
            else {
                console.log(
                    new Error("Error: Token was not fetched successfully.")
                );
            }
        })
        .catch(error => {
            // TODO: Add in functionality to display errors
            console.log("Error: ", error);
        });
}

export function handleFetchingTrivia() {
    const token = sessionStorage.getItem("token");

    return getQuestions(token).then(response => {
        if (response.error && response.error === "Token is empty.") {
            return response;
        } else return response.questions;
    });
}
