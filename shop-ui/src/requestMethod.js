import axios from "axios";
const BASE_URL="http://localhost:5000/shop/";

const TOKEN=JSON.parse(JSON.parse(localStorage.getItem('persist:root')).currentUser).accessToken||"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YzIwMDEwMzVlMjVhZjAyYWQ1YjU1NiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTcxMTk4MjY0OCwiZXhwIjoxNzEyMDY5MDQ4fQ.QixGrKVFU5OJSCQVq8_bcW8JISS_7i3gCVl8rsWjNF4"
// console.log(JSON.parse(JSON.parse(localStorage.getItem('persist:root')).currentUser).accessToken);
console.log(TOKEN);
export const publicRequest=axios.create({
    baseURL:BASE_URL,
});
export const userRequest=axios.create({
    baseURL:BASE_URL,
    headers:{token:`aman ${TOKEN}`}
});
