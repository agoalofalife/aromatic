let each : string = `<div>{{ title | upperCase}}</div>`;

let data = {
    title : 'text will handler in upper case'
};

let afterCompile = `<div>TEXT WILL HANDLER IN UPPER CASE</div>`;
export {each as Html,data as Values,afterCompile};