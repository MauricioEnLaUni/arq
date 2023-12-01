import { expect, test } from "vitest";
import sentenceCase from "./sentenceCase";

const cases = [
    {
        describe:
            "debe convertir la primera letra de cada palabra en mayúscula",
        input: "esta prueba debe aprobarse.",
        expected: "Esta Prueba Debe Aprobarse.",
    },
    {
        describe: "debe convertir la primera letra de la primera palabra",
        input: "a",
        expected: "A",
    },
    {
        describe: "debe ignorar palabras con menos de 2 letras",
        input: "is no if",
        expected: "Is no if",
    },
    {
        describe: "debe poder reconocer los signos de puntuación y adaptarse",
        input: "de? te! si. ti$ se,",
        expected: "De? te! si. ti$ se,",
    },
    {
        describe: "debe reconocer conjunciones y artículos comunes y evitarlos",
        input: "Es una casa del casero.",
        expected: "Es una Casa del Casero.",
    },
    {
        describe: "debe poder manejar acentos y caracteres especiales",
        input: "á érase únaa ësias",
        expected: "Á Érase Únaa Ësias",
    },
];

cases.forEach(({ describe, input, expected }) => {
    test(describe, () => {
        expect(sentenceCase(input)).toBe(expected);
    });
});
