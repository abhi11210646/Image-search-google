const expect = require("chai").expect;
const googleImage = require('./../lib/image-search');
const client = new googleImage(process.env.CSEID, process.env.API_KEY);
describe('##Image Search Google##', () => {
    describe('search()', () => {
        it('it should throw error if query not passed', () => {
            expect(() => client.search()).to.throw('Expected a query in string format!');
        });
        it('it should return array of results on valid input', async () => {
            const result = await client.search('1234');
            expect(result).to.be.a('array');
            expect(result[0]).to.be.a('object').to.have.any.keys('url', 'thumbnail');
        });
    });
});