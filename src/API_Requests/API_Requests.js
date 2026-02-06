import axios from "axios"
// const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjkzMTgxMTcxMzExZmQ3YjAzMzZiYzgyIiwiaWF0IjoxNzY1OTg4NjYwfQ.DkwKeUPRh0p5HQ6d8cxIwIEAzixolX_npL6UeoNngcM'


export function getLoggedUserDataApi() {
    return axios.get(`https://linked-posts.routemisr.com/users/profile-data`, {
        headers: { token: localStorage.getItem('token') }
    })
}
export const getAllPostsAPi = () => {
    return axios.get('https://linked-posts.routemisr.com/posts', {
        headers: { token: localStorage.getItem('token') },
        params: { limit: 50, sort: '-createdAt' }
    })
}

export function getPostDetailsApi(postId) {
    return axios.get(`https://linked-posts.routemisr.com/posts/${postId}`, {
        headers: { token: localStorage.getItem('token') }
    })
}

export function getUserPostsApi(userId) {
    return axios.get(`https://linked-posts.routemisr.com/users/${userId}/posts`, {
        headers: { token: localStorage.getItem('token') },
    })
}

export function createPostApi(formData) {
    return axios.post('https://linked-posts.routemisr.com/posts', formData, {
        headers: {
            token: localStorage.getItem('token')
        }
    })
}
export function updatePostApi(postId, formData) {
    return axios.put(`https://linked-posts.routemisr.com/posts/${postId}`, formData, {
        headers: {
            token: localStorage.getItem('token')
        }
    })
}
export function deletePostApi(postId) {
    return axios.delete(`https://linked-posts.routemisr.com/posts/${postId}`, {
        headers: {
            token: localStorage.getItem('token')
        }
    })
}

export function getPostCommentsApi(postId) {
    return axios.get(`https://linked-posts.routemisr.com/posts/${postId}/comments`, {
        headers: { token: localStorage.getItem('token') }
    })
}



export function addCommentApi(commentContent, postId) {
    return axios.post(`https://linked-posts.routemisr.com/comments`, {
        content: commentContent,
        post: postId
    }, {
        headers: { token: localStorage.getItem('token') }
    })
}


export function updateCommentApi(commentContent, commentId) {
    return axios.put(`https://linked-posts.routemisr.com/comments/${commentId}`, {
        content: commentContent,
    }, {
        headers: { token: localStorage.getItem('token') }
    })
}

export function deleteCommentApi(commentId) {
    return axios.delete(`https://linked-posts.routemisr.com/comments/${commentId}`, {
        headers: {
            token: localStorage.getItem('token')
        }
    })

}