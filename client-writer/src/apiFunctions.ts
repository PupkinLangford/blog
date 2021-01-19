const base_url = "http://localhost:3000/api/";

export const loginUser = async (username: string, password: string) => {
    const formdata = new URLSearchParams();
    formdata.append('username', username);
    formdata.append('password', password);
    const response = await fetch(base_url + 'users/login/', {
        method: 'POST',
        headers: {'Content-Type' : 'application/x-www-form-urlencoded'},
        body: formdata,
    });


    return response.json();
}

