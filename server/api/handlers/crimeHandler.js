'use strict';
const Got = require('got');

const getCrimes = async () => {

    try {
        const crimesResponse = await Got('https://data.raleighnc.gov/resource/3bhm-we7a.json');
        return [null, crimesResponse.body];
    } catch (e) {
        return [e.response.body];
    }
};

const options = {

    async handler(request, h) {

        // todo: add joi
        const query = request.query.query;
        console.info(`Requested crimes matching ${query}`);

        const [error, crimesData] = await getCrimes();

        if (error) {
            // todo: add boom
            return h.response('Could not get Raleigh crimes\n' + error)
                .code(500);
        }

        const crimes = JSON.parse(crimesData);

        if (!query || query.length < 1) {
            console.info('No query - returning all results');
            return crimes;
        }

        return crimes.filter((c) => c.lcr_desc.match(query));
    }
};

module.exports = options;
