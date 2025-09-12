export const LOGIN_QUERY = `
query Login($auth: Authentication!) {
    login(auth: $auth) {
        accessToken
        user {
            _id
            created_at
            updated_at
            email
            password
            role
            profile {
                name
                last_name
                picture
            }
        }
    }
}`;