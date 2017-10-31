import { expect } from 'chai';
import { BsiTokenParser } from '../index';

const parser = new BsiTokenParser();
{
    const bsiUrl1 = '/bsi2.aspx?tid=1&tc=Tenant1&pv=332&payloadType=ANALYSIS_PAYLOAD&astid=7&ts=ABAP';
    describe(`parsing "${bsiUrl1}"`, () => {

        it('should at least parse without crashing', () => {
            const result = parser.parse(bsiUrl1);
            
        });

        it('should parse tokens and provide defaults where data is missing', () => {
            const token = parser.parse(bsiUrl1);

            expect(token.apiUri).to.equal('https://api.ams.fortify.com');

            expect(token.includeThirdParty).to.equal(false);
            expect(token.includeOpenSourceAnalysis).to.equal(false);
            expect(token.portalUri).to.equal('https://ams.fortify.com');
            expect(token.apiUri).to.equal('https://api.ams.fortify.com');
        });
    });
}

{
    const bsiUrl2 = 'http://127.0.0.1:8888/bsi2.aspx?tid=2222&tc=SourceControl&pv=7812&payloadType=ANALYSIS_PAYLOAD&astid=7&ts=PHP';

    describe(`parsing "${bsiUrl2}"`, () => {

        const token = parser.parse(bsiUrl2);

        it('should have an apiUri of "http://127.0.0.1:8888"', () => {
            expect(token.apiUri).to.equal('http://127.0.0.1:8888');
        });

        it('should parse tokens and provide defaults where data is missing', () => {
            expect(token.includeThirdParty).to.equal(false);
            expect(token.includeOpenSourceAnalysis).to.equal(false);
            expect(token.portalUri).to.equal('https://ams.fortify.com');
        });
    });
}

{
    const bsiToken1 = 'eyJ0ZW5hbnRJZCI6MSwidGVuYW50Q29kZSI6IlRlbmFudDEiLCJyZWxlYXNlSWQiOjYsInBheWxvYWRUeXBlIjoiQU5BTFlTSVNfUEFZTE9BRCIsImFzc2Vzc21lbnRUeXBlSWQiOjgsInRlY2hub2xvZ3lUeXBlIjoiX05FVCIsInRlY2hub2xvZ3lUeXBlSWQiOjEsInRlY2hub2xvZ3lWZXJzaW9uIjoiXzRfMCIsInRlY2hub2xvZ3lWZXJzaW9uSWQiOjUsImF1ZGl0UHJlZmVyZW5jZSI6Ik1hbnVhbCIsImF1ZGl0UHJlZmVyZW5jZUlkIjoxLCJpbmNsdWRlVGhpcmRQYXJ0eSI6ZmFsc2UsImluY2x1ZGVPcGVuU291cmNlQW5hbHlzaXMiOmZhbHNlLCJzY2FuUHJlZmVyZW5jZSI6IlN0YW5kYXJkIiwic2NhblByZWZlcmVuY2VJZCI6MSwicG9ydGFsVXJpIjoiaHR0cDovL2ZvZC5sb2NhbGhvc3QiLCJhcGlVcmkiOiIifQ';
    describe(`parsing "${bsiToken1}"`, () => {

        it('should at least parse without crashing', () => {
            parser.parse(bsiToken1);
        });

        // it('should parse tokens and provide defaults where data is missing', () => {
        //     const token = parser.parse(bsiToken1);

        //     expect(token.apiUri).to.equal('https://api.ams.fortify.com');
        // });
        
    });
}
