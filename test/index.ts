import { expect } from 'chai';
import { BsiTokenParser, IBsiToken } from '../index';

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
    });
}

{
    const bsiToken2 = 'eyJ0ZW5hbnRJZCI6MSwidGVuYW50Q29kZSI6IlRlbmFudDEiLCJyZWxlYXNlSWQiOjMyMSwicGF5bG9hZFR5cGUiOiJBTkFMWVNJU19QQVlMT0FEIiwiYXNzZXNzbWVudFR5cGVJZCI6OCwidGVjaG5vbG9neVR5cGUiOiJKQVZBL0oyRUUiLCJ0ZWNobm9sb2d5VHlwZUlkIjo3LCJ0ZWNobm9sb2d5VmVyc2lvbiI6IjEuOSIsInRlY2hub2xvZ3lWZXJzaW9uSWQiOjE3LCJhdWRpdFByZWZlcmVuY2UiOiJBdXRvbWF0ZWQiLCJhdWRpdFByZWZlcmVuY2VJZCI6MiwiaW5jbHVkZVRoaXJkUGFydHkiOmZhbHNlLCJpbmNsdWRlT3BlblNvdXJjZUFuYWx5c2lzIjpmYWxzZSwic2NhblByZWZlcmVuY2UiOiIwIiwic2NhblByZWZlcmVuY2VJZCI6MCwicG9ydGFsVXJpIjoiaHR0cDovL2ZvZC5sb2NhbGhvc3QiLCJhcGlVcmkiOiJodHRwOi8vYXBpLmZvZC5sb2NhbGhvc3QifQ==';
    describe(`parsing "${bsiToken2}"`, () => {

        it('should at least parse without crashing', () => {
            parser.parse(bsiToken2);
        });
        
        it('should have a Technology Type of "JAVA/J2EE"', () => {
            const token = parser.parse(bsiToken2);
            expect(token.technologyType).to.equal("JAVA/J2EE");
        });

        it('should have a Technology Version of "1.9"', () => {
            const token = parser.parse(bsiToken2);
            expect(token.technologyVersion).to.equal("1.9");
        })

        it('should have an Audit Preference of "Automated"', () => {
            const token = parser.parse(bsiToken2);
            expect(token.auditPreference).to.equal("Automated");
            expect(token.auditPreferenceId).to.equal(2);
        });

        it('should not include third-party library scanning', () => {
            const token = parser.parse(bsiToken2);
            expect(token.includeThirdParty).to.equal(false);
        });

        it('should have an Assessment Type ID of "8"', () => {
            const token = parser.parse(bsiToken2);
            expect(token.assessmentTypeId).to.equal(8);
        });
        
        it('should have an API URI of "http://api.fod.localhost"', () => {
            const token = parser.parse(bsiToken2);
            expect(token.apiUri).to.equal("http://api.fod.localhost");
        });

        it('should have a Portal URI of "http://fod.localhost"', () => {
            const token = parser.parse(bsiToken2);
            expect(token.portalUri).to.equal("http://fod.localhost");
        });

        it('should have a Release ID of "321"', () => {
            const token = parser.parse(bsiToken2);
            expect(token.releaseId).to.equal(321);
        })

    });
}
