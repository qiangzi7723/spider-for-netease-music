var Nightmare = require('nightmare'),
    nightmare = Nightmare({
        show: true
    });

async function run() {
    var result = await nightmare
        //load a url
        .goto('http://yahoo.com')
        //simulate typing into an element identified by a CSS selector
        //here, Nightmare is typing into the search bar
        //click an element identified by a CSS selector
        //in this case, click the search button
        //wait for an element identified by a CSS selector
        //in this case, the body of the results
        //execute javascript on the page
        //here, the function is getting the HREF of the first search result
        .evaluate(function () {
            return document.title;
        });


    //queue and end the Nightmare instance along with the Electron instance it wraps
    await nightmare.end();

    console.log(result);
};

run()