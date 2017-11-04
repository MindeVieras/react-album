/*
 * The users reducer will always return an array of users no matter what
 * You need to return something, so if there are no users then just return an empty array
 * */

export default function () {
    return [
        {
            id: 1,
            title: "Dashboard",
            body: "Welcome to album!"
        },
        {
            id: 2,
            title: "Login",
            body: "Please login"
        }
    ]
}
