export default {
    interface: {
        confirm: {
            0: "Aceptar",
            1: "Enviar",
            2: "Confirmar",
        },
        reject: {
            0: "Cancelar",
            1: "Rechazar",
        },
    },
    shared: {},
    privateRoutes: {},
    publicRoutes: {
        register: {
            title: "REGISTRARSE",
            fields: {
                0: {
                    label: "usuario",
                    note: "4 a 24 caracteres.\nDebe empezar con letra.\nPermite letras, números, - y _",
                },
                1: {
                    label: "contraseña",
                    note: '16 a 96 caracteres.\nDebe contener mayúscula, minúscula, un número y un caracter especial.\nSe permiten <span aria-label="exclamación">!</span>, <span aria-label="arroba">@</span>, <span aria-label="signo de gato">#</span>, <span aria-label="dolar">$</span> y <span aria-label="porcentaje">%</span>.',
                },
                2: {
                    label: "email",
                    note: 'Debe contener una <span aria-label="arroba">@</span> y un punto despues de la <span aria-label="@">@</span>.',
                },
            },
            nav: {
                title: "¿Ya estás registrado?",
                action: "Acceder",
            },
        },
        login: {
            title: "ACCEDER",
            fields: {
                0: "usuario",
                1: "contraseña",
            },
            nav: {
                title: "¿No tienes cuenta?",
                action: "Registrarme",
            },
        },
    },
};
