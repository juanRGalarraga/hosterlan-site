export const LOGIN_QUERY = `
query Login($auth: Authentication!) {
    login(auth: $auth) {
        user{
            _id
            email
            profile
        }
        accessToken
    }
}`;