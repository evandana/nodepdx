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

# Event Loop
