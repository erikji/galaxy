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
import type { ScrimmageRequest } from './ScrimmageRequest';
import {
    ScrimmageRequestFromJSON,
    ScrimmageRequestFromJSONTyped,
    ScrimmageRequestToJSON,
} from './ScrimmageRequest';

/**
 * 
 * @export
 * @interface PaginatedScrimmageRequestList
 */
export interface PaginatedScrimmageRequestList {
    /**
     * 
     * @type {number}
     * @memberof PaginatedScrimmageRequestList
     */
    count?: number;
    /**
     * 
     * @type {string}
     * @memberof PaginatedScrimmageRequestList
     */
    next?: string | null;
    /**
     * 
     * @type {string}
     * @memberof PaginatedScrimmageRequestList
     */
    previous?: string | null;
    /**
     * 
     * @type {Array<ScrimmageRequest>}
     * @memberof PaginatedScrimmageRequestList
     */
    results?: Array<ScrimmageRequest>;
}

/**
 * Check if a given object implements the PaginatedScrimmageRequestList interface.
 */
export function instanceOfPaginatedScrimmageRequestList(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function PaginatedScrimmageRequestListFromJSON(json: any): PaginatedScrimmageRequestList {
    return PaginatedScrimmageRequestListFromJSONTyped(json, false);
}

export function PaginatedScrimmageRequestListFromJSONTyped(json: any, ignoreDiscriminator: boolean): PaginatedScrimmageRequestList {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'count': !exists(json, 'count') ? undefined : json['count'],
        'next': !exists(json, 'next') ? undefined : json['next'],
        'previous': !exists(json, 'previous') ? undefined : json['previous'],
        'results': !exists(json, 'results') ? undefined : ((json['results'] as Array<any>).map(ScrimmageRequestFromJSON)),
    };
}

export function PaginatedScrimmageRequestListToJSON(value?: PaginatedScrimmageRequestList | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'count': value.count,
        'next': value.next,
        'previous': value.previous,
        'results': value.results === undefined ? undefined : ((value.results as Array<any>).map(ScrimmageRequestToJSON)),
    };
}

