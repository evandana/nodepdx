[instructor files](https://github.com/martypdx/workshop-promises-fat-arrows)

polled room, most people don't know promises/js much

#Covered Fat arrow basics

#Three JS Functional Patterns

1. Functional programming

    > ex: `array.map( x => x*x ); // next line immediately called after this`
    
    > Not useful for promises

2. Asynch "callbacks"

    > ex: `fs.readFile('foo.txt', (err, buffer) => {...}); // next line called immediately after this is started`
    
    > Perfect for promises

3. Event emitters
    
    > ex: `app.get('/foo', (req, res) => {...});`
    
    > ex: `element.addEventListener('click', event => {...});`
    
    > ex: `$('div').click( event => {...});`
    
    > NOT good for promises

#Event Loop

#Destructuring
({directory}) => getSomething( arg1 )


#Control Flow
Interesting, that we're trying to write sequential code with promises

try `async` and `await` on [babel site](https://babeljs.io/repl/)

#Promise Libraries

Why use something else (or not)?

1. Bluebird will optimize *event loop* for efficiency and timing (setTimeout actually takes 5ms, when using other calls could be more immediate)
2. Native promise method will be faster than library wrapper, but may not be optimized

`setImmediate()` puts it in the front of the event queue

`process.nextTick()` puts it at the end of the current operation (before `setImmediate()`)

You can set the promise library
