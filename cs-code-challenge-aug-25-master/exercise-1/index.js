    const start = async() => {
        const url = 'https://5dc588200bbd050014fb8ae1.mockapi.io/assessment';
        var contextData = { users: [] };
        const jsonData = await fetch(url);
        contextData.users = await jsonData.json();
        console.log(':: context', contextData);
        let templateScriptData = document.querySelector('#template').innerHTML;
        let templateHandler = Handlebars.compile(templateScriptData);
        let compiledHtmlData = templateHandler(contextData);
        document.querySelector('#content').innerHTML = compiledHtmlData;
        console.log(':: templateScript', compiledHtmlData);

    };

    start();

    module.exports.start = start;