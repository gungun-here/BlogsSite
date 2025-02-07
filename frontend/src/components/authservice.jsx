import axios from "axios"

export function is_authenticated() {
    const token = localStorage.getItem("token")
    if (token){
        return true
    }else{
        return false
    }
}

export function logout(){
    localStorage.removeItem("token")
    location.href = "/"
}

export async function showprofile() {
    const response = await axios.get("http://localhost:4000/api/users/profile", {headers:{Authorization: localStorage.getItem("token")}})
    return response.data
}