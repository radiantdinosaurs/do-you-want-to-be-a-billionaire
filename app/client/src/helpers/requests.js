export function getSession() {
    fetch(`https://opentdb.com/api_token.php?command=request`)
        .then(response => {
            return response.json();
        })
        .then(response => {
            if (response.token) sessionStorage.setItem('token', response.token);
            else {
                console.log(
                    new Error('Error: Token was not fetched successfully.')
                );
            }
        })
        .catch(error => {
            // TODO: Add in a snackbar styling for displaying error messages
            // TODO: What if this fails? Add in handling here.
            console.log('Error: ', error);
        });
}

export function fetchTrivia() {
    const token = sessionStorage.getItem('token');
    const options = {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify({ token: token })
    };
    return fetch('/api/v1/trivia', options).then(response => {
        return response.json();
    });
}
