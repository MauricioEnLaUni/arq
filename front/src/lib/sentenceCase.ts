const dict = new Set<string>([
    "ellas",
    "ellos",
    "una",
    "unas",
    "del",
    "los",
    "las",
]);

export default (sentence: string) => {
    const parts = sentence.split(" ");

    return parts
        .map((part, index) => {
            const up =
                part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();
            if (index === 0) {
                return up;
            }

            const sanitized = part.match(/\b\p{L}+\b/gu)?.join("") ?? "";
            const l = sanitized?.length;

            return l > 2 && !dict.has(sanitized) ? up : part;
        })
        .join(" ");
};
