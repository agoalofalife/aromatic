![](http://i12.pixs.ru/storage/6/8/5/cat1000x50_1655040_24826685.jpg)
#Aromatic
## **What is it?**

This is templates with elements [mustache](http://mustache.github.io/) and similar to [handlebars](http://handlebarsjs.com/)

Written [Typescript](http://www.typescriptlang.org/) and a little bit rock and roll.

To use it is quite simple and trivial.


**How to install?**

```
npm install aromatic
```


* [Simple expressions](https://github.com/agoalofalife/aromatic/wiki/Simple-expressions) 

* [Escape HTML](https://github.com/agoalofalife/aromatic/wiki/Escape-HTML)

* [Loop](https://github.com/agoalofalife/aromatic/wiki/Loop)

* [Filter values](https://github.com/agoalofalife/aromatic/wiki/Custom-Filter-function)


| Expression         	|                     How to use                    	|
|--------------------	|:-------------------------------------------------:	|
| {{ value }}        	| Insert the values from the object the first level 	|
| {{ !!value!! }}    	|  Insert the value of the first level with tagged  	|
| {{ value.value }}  	|      Insert nested objects, following levels      	|
| {{ #each array }}  	| Through data loop over array of objects           	|
| {{ /each }}        	| The end of loop                                   	|
| {{ #if contecxt }} 	| If the current context is present                 	|
| {{ /if }}          	| the end conditions                                	|
| {{ #else }}        	| otherwise, if the current context does not have   	|



