const base_url = "http://localhost:3000/api/";

export const loginUser = async (username: string, password: string) => {
    const response = await fetch(base_url + 'users/login/', {
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({username, password}),
    });


    return response.json();
}

export const getPosts = async () => {
    const response = await fetch(base_url + 'posts/all/', {
        headers: {'Authorization' : 'Bearer ' + localStorage.getItem('token')},
    });

    return response.json();
}

