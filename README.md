#
Aromatic
## **What is it?**
This is templates with elements [mustache](http://mustache.github.io/) and similar to [handlebars](http://handlebarsjs.com/)

Written [Typescript](http://www.typescriptlang.org/) and a little bit rock and roll.

To use it is quite simple and trivial.

**To communicate you need to remember just two calls**


*
*How to install?**
```
npm install aromatic
```
```
// index.js import Aromatic from './src/Aromatic';

let node = document.querySelector('#test');
let some = { foo : 'light', foo2 : 'some' ,

deep : {
name : 'Yee
}
Aromatic.compile(node.innerHTML, some);

// first parameter is your original string
// second parameter is the object with data

// to get generated html, just call getHtml node.innerHTML = Aromatic.getHtml();

// What to find in html?

// index.html
<div id="test">
<div>{{ foo }}</div>
<div>{{ foo2 }}</div>
<div>{{ deep.name }}</div>
</div>

```


**Simple expressions in all templates**

Expressions in parentheses correspond to data in the object


```
let data = {
one : 'one string',
two : 'two string'
}
// index.html
<div id="test">
<div>{{ one }}</div>
<div>{{ two }}</div>
</div>
// after compile
<div id="test">
<div>one string</div>
<div>two string</div>
</div>
```


_It's simple, you write Aromatic inserts_


**Sometimes you may have html in data**

**example** :


```
let data = {
one : '<p>one string</p>',
two : '<h2>two string</h2>'
}
```
if you want to html escape, it is necessary in the line

```
<div id="test">
<div>{{ !!one!! }}</div>
<div>{{ !!two!! }}</div>
</div>
```
**Loops? No, problem**

Let's imagine that we need a loop


```
// data let loop = [
{ firstname : 'Ilya',
lastname : 'Chubarov'
},
{
firstname : 'Maria',
lastname : 'Ivanova'
},
{
firstname : 'Misha',
lastname : 'Bootosov',
age : 20
},
{
firstname : 'Misha',
lastname : 'Bootosov',
age : 20 ,
child : {
name : 'To'
}
}
];

// index.html
<div id="test">
<div class="entry">
<ul>


{{#each loop}}
<li>
<p>firstname : {{ firstname }}</p>
<p>lastname {{ lastname }}<p>

{{#if age}}
<h1>{{ age }}</h1>
{{#else}}
<p>it is unknown how many years</p>
{{/if}}

{{#if child}}
<h1>{{ child.name }}</h1>
{{/if}}
</li>
{{/each}}
</ul>
</div>
</div>
```

**I want to add your filter values**

```

let data = {
one : 'ONE STRING',
two : 'two string'
}

// html
<div id="test">
<div>{{ one | toLowerCase}}</div>
<div>{{ two }}</div>
</div>

Aromatic.registerFilter('toLowerCase', function(test) {
return test.test.toLowerCase();
});

// after compile
<div id="test">
<div>one string</div>
<div>two string</div>
</div>

```









