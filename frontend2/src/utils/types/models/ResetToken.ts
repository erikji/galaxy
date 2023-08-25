/* tslint:disable */
/* eslint-disable */
/**
 * 
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 0.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface ResetToken
 */
export interface ResetToken {
    /**
     * 
     * @type {string}
     * @memberof ResetToken
     */
    token: string;
}

/**
 * Check if a given object implements the ResetToken interface.
 */
export function instanceOfResetToken(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "token" in value;

    return isInstance;
}

export function ResetTokenFromJSON(json: any): ResetToken {
    return ResetTokenFromJSONTyped(json, false);
}

export function ResetTokenFromJSONTyped(json: any, ignoreDiscriminator: boolean): ResetToken {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'token': json['token'],
    };
}

export function ResetTokenToJSON(value?: ResetToken | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'token': value.token,
    };
}

