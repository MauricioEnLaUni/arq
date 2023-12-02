export interface LinkData {
  refName: string;
  contents: Array<{
    text: string;
    to: string
  }>
}

const data = [
  {
    "refName": "logged-tab",
    "contents": [
      {
        "text": "Account",
        "to": "/u/"
      },
      {
        "text": "Logout",
        "to": "/logout"
      }
    ]
  },
  {
    "refName": "visitor-tab",
    "contents": [
      {
        "text": "Register",
        "to": "/register"
      },
      {
        "text": "Login",
        "to": "/"
      }
    ]
  },
  {
    "refName": "nav-links",
    "contents": [
      {
        "text": "HOME",
        "to": "/"
      },
      {
        "text": "Boxes",
        "to": "/box"
      }
    ]
  }
];

export default data;
