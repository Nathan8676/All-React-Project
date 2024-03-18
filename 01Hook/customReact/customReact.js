function customRender(reactElement,container){
/*
    const domElement = document.createElement(reactElement.type);
    domElement.innerHTML = reactElement.children;
    domElement.setAttribute('hraf', reactElement.prosp.href);
    domElement.setAttribute('target', reactElement.prosp.target);
    container.appendChild(domElement);*/

    const domElement = document.createElement(reactElement.type);
    domElement.innerHTML = reactElement.children;
    for (const prop in reactElement.prosp) {
        if (prop === 'children') continue;
        domElement.setAttribute(prop, reactElement.prosp[prop]);
    }
    container.appendChild(domElement);
}
const reactElement = {
    type: 'a',
    prosp: {
        href: 'https://google.com',
        target: '_blank '
    },
    children: 'Click me to visit google'
};

const main = document.querySelector("#root");

customRender(reactElement, main);