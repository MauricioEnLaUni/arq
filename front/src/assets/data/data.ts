export interface LinkData {
    refName: string;
    contents: Array<{
        text: string;
        to: string;
    }>;
}

const data = [
    {
        refName: "logged-tab",
        contents: [
            {
                text: "Account",
                to: "/u/",
            },
            {
                text: "Logout",
                to: "/logout",
            },
        ],
    },
    {
        refName: "visitor-tab",
        contents: [
            {
                text: "Register",
                to: "/auth/register",
            },
            {
                text: "Login",
                to: "/auth/login",
            },
        ],
    },
    {
        refName: "nav-links",
        contents: [
            {
                text: "HOME",
                to: "/",
            },
            {
                text: "Boxes",
                to: "/box",
            },
        ],
    },
];

export default data;
