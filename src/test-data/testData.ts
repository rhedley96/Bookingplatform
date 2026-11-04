export const USER_CREDENTIALS = {
    member: {
        email: process.env.MEMBER_EMAIL || 'memberb@email.com',
        password: process.env.MEMBER_PASSWORD || 'password',
        invalidPassword: process.env.MEMBER_INVALID_PASSWORD || 'fakepassword'
    }
    
}as const;
