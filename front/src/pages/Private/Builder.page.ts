interface Props {
    keys: string[];
    data: any;
    callback: any;
    constants: any;
}

const drawRow = ({ keys, data, callback, constants }: Props) => {
    const children = keys.map(key => {
        const contents = callback({ key, data });
        return { type: "td", children: [{ type: "div", contents }] };
    });

    if (!constants) return children;

    constants.forEach((values: any) => {
        const { startPosition, newElement } = values;
        children.splice(startPosition, 0, newElement);
    });

    return { type: "tr", children };
};

interface Props {
    director: any;
    headers: string[];
    titles: [string, string];
    searcher: any;
    categories: any;
    tag?: string;
    buttons?: any;
}

const drawSelectionTable = ({
    director,
    headers,
    titles,
    searcher,
    categories,
    buttons,
    tag,
}: Props) => {
    director.buildTree({
        member: {
            type: "main",
            children: [
                { type: "h3", contents: titles[0] },
                ...(categories ?? null),
                searcher ?? null,
                {
                    type: "div",
                    children: [
                        { type: "h4", contents: titles[1] },
                        {
                            type: "table",
                            children: [
                                {
                                    type: "thead",
                                    children: [
                                        {
                                            type: "tr",
                                            children: headers.map(
                                                (contents: string) => {
                                                    return {
                                                        type: "th",
                                                        contents,
                                                    };
                                                },
                                            ),
                                        },
                                    ],
                                },
                                { type: "tbody", id: "search-results" },
                            ],
                        },
                    ],
                },
                { type: "div", id: "pagination" },
                {
                    type: "div",
                    children: [
                        {
                            type: "div",
                            children: [
                                {
                                    type: "button",
                                    id: "ok-button",
                                    contents: "< < Aceptar Selección > >",
                                },
                            ],
                        },
                        {
                            type: "div",
                            children: [
                                {
                                    type: "button",
                                    id: "cancel-button",
                                    contents: "CERRAR",
                                },
                            ],
                        },
                        ...(buttons ?? []),
                    ],
                },
            ],
        },
        tag: tag ?? "panel-busqueda",
    });

    const cancel = document.querySelector("#cancel-button")!;
    cancel.addEventListener("click", () => window.close());
};
