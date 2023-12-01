export default {
    interface: {
        confirm: {
            0: "Accept",
            1: "Send",
            2: "Confirm",
        },
        reject: {
            0: "Cancel",
            1: "Reject",
        },
    },
    shared: {},
    privateRoutes: {},
    publicRoutes: {
        register: {
            title: "REGISTER",
            fields: {
                0: {
                    label: "username",
                    note: "4 to 24 characters.\nIt must begin with a letter.\nAllows letters, digits, numbers, - and _",
                },
                1: {
                    label: "password",
                    note: '16 to 96 characters.\nIt must contain an uppercase, lowercase a number and special character.\nIt allows <span aria-label="exclamation">!</span>, <span aria-label="at">@</span>, <span aria-label="hashtag">#</span>, <span aria-label="dollar sign">$</span> and <span aria-label="percent">%</span>.',
                },
                2: {
                    label: "email",
                    note: 'It must contain an <span aria-label="at sign">@</span> and a dot after it.',
                },
            },
            nav: {
                title: "Already have an account?",
                action: "Login",
            },
        },
        login: {
            title: "LOGIN",
            fields: {
                0: "username",
                1: "password",
            },
            nav: {
                title: "Don't have an account",
                action: "Register",
            },
        },
    },
};
