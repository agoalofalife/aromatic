let value : string = `<div><h1>{{ title }}</h1><p>{{ name }}</p><p>{{ firstname}}</p></div>`;

let data = {
    title : 'Title',
    name  : 'Ilya',
    firstname : 'firstname'
};
let afterCompile = `<div><h1>Title</h1><p>Ilya</p><p>firstname</p></div>`;
export {value as Html,data as Values,afterCompile};