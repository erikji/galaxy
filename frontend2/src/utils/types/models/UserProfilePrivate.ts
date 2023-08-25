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
import type { CountryEnum } from './CountryEnum';
import {
    CountryEnumFromJSON,
    CountryEnumFromJSONTyped,
    CountryEnumToJSON,
} from './CountryEnum';
import type { GenderEnum } from './GenderEnum';
import {
    GenderEnumFromJSON,
    GenderEnumFromJSONTyped,
    GenderEnumToJSON,
} from './GenderEnum';

/**
 * 
 * @export
 * @interface UserProfilePrivate
 */
export interface UserProfilePrivate {
    /**
     * 
     * @type {GenderEnum}
     * @memberof UserProfilePrivate
     */
    gender: GenderEnum;
    /**
     * 
     * @type {string}
     * @memberof UserProfilePrivate
     */
    gender_details?: string;
    /**
     * 
     * @type {string}
     * @memberof UserProfilePrivate
     */
    school?: string;
    /**
     * 
     * @type {string}
     * @memberof UserProfilePrivate
     */
    biography?: string;
    /**
     * 
     * @type {string}
     * @memberof UserProfilePrivate
     */
    kerberos?: string;
    /**
     * 
     * @type {string}
     * @memberof UserProfilePrivate
     */
    readonly avatar_url: string;
    /**
     * 
     * @type {boolean}
     * @memberof UserProfilePrivate
     */
    readonly has_avatar: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof UserProfilePrivate
     */
    readonly has_resume: boolean;
    /**
     * 
     * @type {CountryEnum}
     * @memberof UserProfilePrivate
     */
    country: CountryEnum;
}

/**
 * Check if a given object implements the UserProfilePrivate interface.
 */
export function instanceOfUserProfilePrivate(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "gender" in value;
    isInstance = isInstance && "avatar_url" in value;
    isInstance = isInstance && "has_avatar" in value;
    isInstance = isInstance && "has_resume" in value;
    isInstance = isInstance && "country" in value;

    return isInstance;
}

export function UserProfilePrivateFromJSON(json: any): UserProfilePrivate {
    return UserProfilePrivateFromJSONTyped(json, false);
}

export function UserProfilePrivateFromJSONTyped(json: any, ignoreDiscriminator: boolean): UserProfilePrivate {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'gender': GenderEnumFromJSON(json['gender']),
        'gender_details': !exists(json, 'gender_details') ? undefined : json['gender_details'],
        'school': !exists(json, 'school') ? undefined : json['school'],
        'biography': !exists(json, 'biography') ? undefined : json['biography'],
        'kerberos': !exists(json, 'kerberos') ? undefined : json['kerberos'],
        'avatar_url': json['avatar_url'],
        'has_avatar': json['has_avatar'],
        'has_resume': json['has_resume'],
        'country': CountryEnumFromJSON(json['country']),
    };
}

export function UserProfilePrivateToJSON(value?: UserProfilePrivate | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'gender': GenderEnumToJSON(value.gender),
        'gender_details': value.gender_details,
        'school': value.school,
        'biography': value.biography,
        'kerberos': value.kerberos,
        'country': CountryEnumToJSON(value.country),
    };
}

