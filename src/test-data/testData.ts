export const USER_CREDENTIALS = {
    member: {
        email: process.env.MEMBER_EMAIL || 'memberb@email.com',
        password: process.env.MEMBER_PASSWORD || 'password',
        invalidPassword: process.env.MEMBER_INVALID_PASSWORD || 'fakepassword'
    }
    
}as const;

export const INVALID_LOGIN_CASES = [
    {
        case: 'wrong password',
        email: USER_CREDENTIALS.member.email,
        password: USER_CREDENTIALS.member.invalidPassword,
        error: 'Invalid email or password'
    },
    {
        case: 'unknown email',
        email: 'unknown-member@example.test',
        password: USER_CREDENTIALS.member.invalidPassword,
        error: 'Invalid email or password'
    }
    // {
    //     case: 'empty password and email',
    //     email: '',
    //     password: '',
    //     error: 'Invalid email or password'
    // }
    // {
    //     case: 'empty email',
    //     email: '',
    //     password: USER_CREDENTIALS.member.password,
    //     expected: { type: 'native-validation', field: 'email', state: 'valueMissing' }
    // }
    // Could do empty email, empty password, invalid email format, invalid password format (text box issues not implemented)

] as const;
