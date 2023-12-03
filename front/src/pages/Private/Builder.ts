class HTMLBuilder {
    bs: Element = document.createElement("div");

    get result() {
        return this.bs;
    }

    new(tipo: string) {
        this.bs = document.createElement(tipo);
        return this;
    }

    id(id?: string) {
        if (id) this.bs.id = id;
        return this;
    }

    clases(cls: string[]) {
        cls.forEach(clase => {
            this.bs.classList.add(clase);
        });

        return this;
    }

    inner(content?: string) {
        this.bs.innerHTML = content ?? "";
        return this;
    }

    render(element?: Element) {
        const parent = element ?? document.body;
        parent.appendChild(this.bs);

        return this;
    }

    setAttributes(attrs: [qualifiedName: string, value: string][]) {
        attrs.forEach(a => {
            this.bs.setAttribute(a[0], a[1]);
        });
        return this;
    }

    setName(name: string) {
        (this.bs as HTMLSelectElement).name = name;
        return this;
    }
}

type BuilderProps = {
    type: string;
    parent?: Element;
    id?: string;
    classes?: string[];
    attributes?: [qualifiedName: string, value: string][];
    contents?: string;
    children?: BuilderProps[];
};

type ElementProps = {
    type: string;
    parent?: Element;
    id?: string;
    classes?: string[];
    attributes?: [qualifiedName: string, value: string][];
    contents?: string;
};

type TreeBuilderProps = {
    member: BuilderProps;
    tag?: string;
};

class HTMLDirector {
    builder = new HTMLBuilder();

    getParent(tag?: string) {
        return tag ? document.querySelector(`#${tag}`) : document.body;
    }

    buildRecursively(props: BuilderProps, parent: Element) {
        const current = this.buildElement({ ...props, parent });
        props.children?.forEach(child => this.buildRecursively(child, current));
    }

    buildTree({ member, tag }: TreeBuilderProps) {
        const parent = this.getParent(tag)!;
        const root = this.buildElement({ ...member, parent });

        member.children?.forEach(e => this.buildRecursively(e, root));

        return root;
    }

    minimal(parent: Element, type?: string) {
        const t = type ?? "div";

        return this.builder.new(t).render(parent).result;
    }

    buildElement({
        type,
        id,
        classes,
        attributes,
        parent,
        contents,
    }: ElementProps) {
        return this.builder
            .new(type)
            .id(id)
            .clases(classes ?? [])
            .inner(contents ?? "")
            .setAttributes(attributes ?? [])
            .render(parent ?? document.body).result;
    }
}
