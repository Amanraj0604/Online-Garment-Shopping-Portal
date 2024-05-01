import axios from "axios";
const BASE_URL="http://localhost:5000/shop/";

// const TOKEN=
const TOKEN=JSON.parse(JSON.parse(localStorage.getItem('persist:root')).currentUser).accessToken||"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YzIwMDEwMzVlMjVhZjAyYWQ1YjU1NiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTcxMTM1ODU5MSwiZXhwIjoxNzExNDQ0OTkxfQ.SFewZ4vT9R9oztNN1SgAsdCoEKVodFp7tnd1dpCMrgw"

// console.log(JSON.parse(JSON.parse(localStorage.getItem('persist:root')).currentUser).accessToken);
export const publicRequest=axios.create({
    baseURL:BASE_URL,
});
export const userRequest=axios.create({
    baseURL:BASE_URL,
    headers:{token:`aman ${TOKEN}`}
});