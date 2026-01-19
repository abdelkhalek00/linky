import axios from "axios";

export async function RegisterFunctionApi(formData) {
    try {
        const { data } = await axios.post('https://linked-posts.routemisr.com/users/signup', formData)
        console.log(data)
        return data;
    } catch (err) {
        console.log(err.response.data)
        console.log(err.response.data)
        return err.response.data
    }
}

export async function LoginFunctionApi(formData) {
    try {
        const { data } = await axios.post('https://linked-posts.routemisr.com/users/signin', formData)
        console.log(data)
        return data;
    } catch (err) {
        console.log(err.response.data)
        return err.response.data
    }
}