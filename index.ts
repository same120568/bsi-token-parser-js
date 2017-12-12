/*!
 * (c) Copyright 2017 EntIT Software LLC
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import * as urlParse from 'url-parse';
import { Base64 } from 'js-base64';

export class BsiTokenParser {

    private static _tokenDefaults: IBsiToken = {
        tenantId: 0,
        tenantCode: '',
        releaseId: 0,
        assessmentTypeId: 0,
        payloadType: 'ANALYSIS_PAYLOAD',
        scanPreferenceId: 1,
        scanPreference: 'Standard',
        auditPreferenceId: 1,
        auditPreference: 'Manual',
        includeThirdParty: false,
        includeOpenSourceAnalysis: false,
        portalUri: 'https://ams.fortify.com',
        apiUri: 'https://api.ams.fortify.com',
        technologyTypeId: 0,
        technologyType: null,
        technologyVersionId: null,
        technologyVersion: null
    };

    public parse(token: string): IBsiToken {

        const trimmedToken = token.trim();

        if (trimmedToken.indexOf('/bsi2.aspx?') >= 0) {
            return this.parseLegacyUrl(token);
        } else {
            return this.parseBsiToken(token);
        }
    }

    private parseLegacyUrl(urlString: string): IBsiToken {

        const url = urlParse(urlString, true);

        let baseUri = null;
        if (url.protocol && url.host) {
            baseUri = `${url.protocol}//${url.host}`;
        }

        const token: IBsiToken = {
            apiUri: baseUri || BsiTokenParser._tokenDefaults.apiUri,
            portalUri: BsiTokenParser._tokenDefaults.portalUri,
            tenantId: parseInt(url.query['tid']),
            tenantCode: url.query['tc'],
            assessmentTypeId: parseInt(url.query['astid']),
            payloadType: url.query['payloadType'],
            releaseId: parseInt(url.query['pv']),
            technologyType: url.query['ts'],
            technologyVersion: url.query['ll'] || BsiTokenParser._tokenDefaults.technologyVersion,
            includeOpenSourceAnalysis: BsiTokenParser._tokenDefaults.includeOpenSourceAnalysis,
            auditPreference: BsiTokenParser._tokenDefaults.auditPreference,
            auditPreferenceId: BsiTokenParser._tokenDefaults.auditPreferenceId,
            includeThirdParty: BsiTokenParser._tokenDefaults.includeThirdParty,
            scanPreference: BsiTokenParser._tokenDefaults.scanPreference,
            scanPreferenceId: BsiTokenParser._tokenDefaults.scanPreferenceId,

            // these values can't be filled in with legacy URLs
            // would need to make a converter that remembers
            // will come back and do that if it becomes necessary
            technologyTypeId: BsiTokenParser._tokenDefaults.technologyTypeId,
            technologyVersionId: BsiTokenParser._tokenDefaults.technologyVersionId
        };

        return token;
    }

    private parseBsiToken(encodedToken: string): IBsiToken {
        const decodedToken: IBsiToken = JSON.parse(Base64.decode(encodedToken));

        // Some tokens generated invalid scanPreference values
        // to support these "bad" tokens, fix the default value to Standard
        if (decodedToken.scanPreference === '0') {
            decodedToken.scanPreference = BsiTokenParser._tokenDefaults.scanPreference;
        }
        decodedToken.scanPreferenceId = decodedToken.scanPreferenceId || BsiTokenParser._tokenDefaults.scanPreferenceId;

        return decodedToken;
    }
}

export interface IBsiToken {
    tenantId: number;
    tenantCode: string;
    releaseId: number;
    assessmentTypeId: number;

    payloadType: string;

    scanPreferenceId: number;
    scanPreference: string;

    auditPreferenceId: number;
    auditPreference: string;

    portalUri: string;
    apiUri: string;

    technologyTypeId: number;
    technologyType: string | null;

    technologyVersionId: number | null;
    technologyVersion: string | null;

    includeThirdParty: boolean;
    includeOpenSourceAnalysis: boolean;
}
