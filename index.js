const cheerio = require('cheerio');
const fastify = require('fastify')({});
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

/*fetch('http://thailand-seals.jeep.in.th')
    .then(res => res.text())
    .then(body => {
        const $ = cheerio.load(body);
        //get div with class "province-box"
        const provinces = $('div.province-box');
        //loop through each province
        provinces.each((i, province) => {
            //get province name
            const provinceName = $(province).find('h2').text();
            //get all seals
            const seals = $(province).find('img');
            //loop through each seal
            seals.each((i, seal) => {
                //get seal url
                const sealUrl = $(seal).attr('src');
                //get seal name
                const sealName = $(seal).attr('alt');
                console.log(`${provinceName} - ${sealName} - ${sealUrl}`);
            });
        });
    })*/

fastify.get('/', async (request, reply) => {
    const result = await fetch('http://thailand-seals.jeep.in.th');
    const body = await result.text();
    const $ = cheerio.load(body);
    let data = [];
    //get div with class "province-box"
    const provinces = $('div.province-box');
    //loop through each province
    provinces.each((i, province) => {
        //get province name
        const provinceName = $(province).find('h2').text();
        //get all seals
        const seals = $(province).find('img');
        //loop through each seal
        seals.each((i, seal) => {
            //get seal url
            const sealUrl = $(seal).attr('src');
            //get seal name
            const sealName = $(seal).attr('alt');
            //console.log(`${provinceName} - ${sealName} - ${sealUrl}`);
            data.push({
                provinceName,
                sealName,
                sealUrl
            });
        });
    });
})

// Run the server!
const start = async () => {
    try {
        await fastify.listen({ port: 3000 })
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}
start()