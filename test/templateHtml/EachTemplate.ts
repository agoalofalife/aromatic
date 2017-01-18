let each : string = `{{#each loop}}
                    <li>
                    <p>Имя : {{ firstname }}</p><p>Из {{ lastname }} </p>
                    {{#if age}}
                    <h1>{{ age }}</h1>
                    {{#else}}
                    <p>it is unknown how many years</p>
                    {{/if}}
                    {{#if child}}
                    <h1>{{ child.name }}</h1>
                    {{/if}}
                    </li>
                    {{/each}}`;

let data = {
    loop :[
        { firstname : 'Ilya', lastname : 'Chubarov' },
        { firstname : 'Maria', lastname : 'Ivanova' },
        { firstname : 'Misha', lastname : 'Bootosov', age : 20 },
        {
            firstname : 'Misha',
            lastname : 'Bootosov',
            age : 20 ,
            child : {
                name : 'To'
            }
        } ]
};
let afterCompile = `<li><p>Имя : Ilya</p><p>Из Chubarov </p><p>it is unknown how many years</p></li><li><p>Имя : Maria</p><p>Из Ivanova </p><p>it is unknown how many years</p></li><li><p>Имя : Misha</p><p>Из Bootosov </p><h1>20</h1></li><li><p>Имя : Misha</p><p>Из Bootosov </p><h1>20</h1><h1>To</h1></li>`;
export {each as Html,data as Values,afterCompile};