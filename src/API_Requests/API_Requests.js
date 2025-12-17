import axios from "axios"

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjkzMTgxMTcxMzExZmQ3YjAzMzZiYzgyIiwiaWF0IjoxNzY1OTg4NjYwfQ.DkwKeUPRh0p5HQ6d8cxIwIEAzixolX_npL6UeoNngcM'



export const getAllPostsAPi = async () => {
    const { data } = await axios.get('https://linked-posts.routemisr.com/posts', {
        headers: { token: token },
        params: { limit: 10, sort: '-createdAt' }
    })
    return data
}