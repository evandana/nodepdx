#Intro

##imperative v declarative 

###declarative

import { Component } from '@angular/core'
    @Component({

##browser support
* no native browser support
* transpilers needed
* props needed
    * Object.defineProperty
    * Object.getOwnPropertyDescriptor

##TypeScript
* subset of JS
* optional static typing
    * allows static analysis
* features from the future: ES6, ES7, ES++

#Log Decorator Demo

Live-writing a custom decorator
* great [documentation on Stack Overflow](http://stackoverflow.com/questions/29775830/how-to-implement-a-typescript-decorator) for creating TypeScript custom decorator
* [decorator pattern](http://www.dofactory.com/javascript/decorator-design-pattern)

#Useful Decorators
* @after(3) // 
* @debounce(1000) // debounce the target
* @connectToStores([] ... ) // React for store setup

#Word of Caution
* Not fully developed
    * Probably not for enterprise level apps
    * Great for small, experiments (for now)

