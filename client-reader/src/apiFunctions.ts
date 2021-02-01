const base_url = "http://localhost:3000/api/";

export const getUser = async (id: string) => {
    const response = await fetch(base_url + 'users/' + id);
    return response.json();
}

export const getPosts = async () => {
    const response = await fetch(base_url + 'posts/');
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

export const createComment = async (post_id: string, username: string, content: string) => {
    const response = await fetch(base_url + 'posts/' + post_id + '/comments', {
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({username, content})
    });
    return response.json();
}