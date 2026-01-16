import axios from "axios"

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjkzMTgxMTcxMzExZmQ3YjAzMzZiYzgyIiwiaWF0IjoxNzY1OTg4NjYwfQ.DkwKeUPRh0p5HQ6d8cxIwIEAzixolX_npL6UeoNngcM'


export async function getLoggedUserDataApi() {
    try {
        const { data } = await axios.get(`https://linked-posts.routemisr.com/users/profile-data`, {
            headers: { token: token }
        })
        return data
    } catch (err) {
        console.log(err.response.data)
        return err.response.data
    }
}
export const getAllPostsAPi = async () => {
    const { data } = await axios.get('https://linked-posts.routemisr.com/posts', {
        headers: { token: token },
        params: { limit: 10, sort: '-createdAt' }
    })
    return data
}

export async function getPostDetailsApi(postId) {
    const { data } = await axios.get(`https://linked-posts.routemisr.com/posts/${postId}`, {
        headers: { token: token }
    })
    return data
}

export async function getUserPostsApi(userId) {
    const { data } = await axios.get(`https://linked-posts.routemisr.com/users/${userId}/posts`, {
        headers: { token: token },
    })
    return data
}

export async function createPostApi(formData) {
    const { data } = await axios.post('https://linked-posts.routemisr.com/posts', formData, {
        headers: {
            token: token
        }
    })
    return data
}
export async function updatePostApi(postId, formData) {
    const { data } = await axios.put(`https://linked-posts.routemisr.com/posts/${postId}`, formData, {
        headers: {
            token: token
        }
    })
    return data
}
export async function deletePostApi(postId) {
    try {
        const { data } = await axios.delete(`https://linked-posts.routemisr.com/posts/${postId}`, {
            headers: {
                token: token
            }
        })
        return data
    } catch (err) {
        console.log(err.response.data)
        return err.response.data
    }
}

export async function getPostCommentsApi(postId) {
    const { data } = await axios.get(`https://linked-posts.routemisr.com/posts/${postId}/comments`, {
        headers: { token: token }
    })
    return data
}



export async function addCommentApi(commentContent, postId) {
    const { data } = await axios.post(`https://linked-posts.routemisr.com/comments`, {
        content: commentContent,
        post: postId
    }, {
        headers: { token: token }
    })
    return data
}


export async function updateCommentApi(commentContent, commentId) {
    const { data } = await axios.put(`https://linked-posts.routemisr.com/comments/${commentId}`, {
        content: commentContent,
    }, {
        headers: { token: token }
    })
    return data
}

export async function deleteCommentApi(commentId) {
    try {
        const { data } = await axios.delete(`https://linked-posts.routemisr.com/comments/${commentId}`, {
            headers: {
                token: token
            }
        })
        return data
    } catch (err) {
        console.log(err.response.data)
        return err.response.data
    }
}