const base_url = "http://localhost:3000/api/";

export const loginUser = async (username: string, password: string) => {
    const response = await fetch(base_url + 'users/login/', {
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({username, password}),
    });


    return response.json();
}

export const getUser = async (id: string) => {
    const response = await fetch(base_url + 'users/' + id);
    return response.json();
}

export const getPosts = async () => {
    const response = await fetch(base_url + 'posts/all/', {
        headers: {'Authorization' : 'Bearer ' + localStorage.getItem('token')},
    });
    if (response.status === 401) {
        localStorage.clear();
        return {error: 'Token Expired'};
    }
    return response.json();
}

export const getPost = async (id: string) => {
    const response = await fetch(base_url + 'posts/' + id);
    return response.json();
}

export const getComments = async (id: string) => {
    const response = await fetch(base_url+ 'posts/' + id + "/comments");
    return response.json();
}

export const getComment = async (id: string, comment_id: string) => {
    const response = await fetch(base_url + 'posts/' + id + "/comments/" +comment_id);
    return response.json();
}

