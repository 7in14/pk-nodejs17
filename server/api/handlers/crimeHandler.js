'use strict';
const Got = require('got');
const CrimeValidator = require('../validators/crimeValidator');

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
            return Boom.serverUnavailable('Could not get Raleigh crimes from Open Data API', error);
        }

        // map the results
        const crimes = JSON.parse(crimesData)
            .map(({
                district,
                inc_datetime,
                lcr,
                lcr_desc
            }) => {

                return {
                    district,
                    inc_datetime,
                    lcr,
                    lcr_desc
                };
            });

        if (!query || query.length < 1) {
            console.info('No query - returning all results');
            return crimes;
        }

        return crimes.filter((c) => c.lcr_desc.match(query));
    },

    validate: CrimeValidator.validate
};

module.exports = options;
