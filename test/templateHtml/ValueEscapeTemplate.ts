let valueEscape : string = `<div><h1>{{ !!title!! }}</h1><p>{{ !!name!! }}</p><p>{{ !!firstname!!}}</p></div>`;

let data = {
    title : '<span>Title</span>',
    name  : '<span>Ilya</span>',
    firstname : '<span>firstname</span>'
};
let afterCompile = `<div><h1><span>Title</span></h1><p><span>Ilya</span></p><p><span>firstname</span></p></div>`;
export {valueEscape as Html,data as Values,afterCompile};