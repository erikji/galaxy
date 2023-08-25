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
import type { TournamentRound } from './TournamentRound';
import {
    TournamentRoundFromJSON,
    TournamentRoundFromJSONTyped,
    TournamentRoundToJSON,
} from './TournamentRound';

/**
 * 
 * @export
 * @interface PaginatedTournamentRoundList
 */
export interface PaginatedTournamentRoundList {
    /**
     * 
     * @type {number}
     * @memberof PaginatedTournamentRoundList
     */
    count?: number;
    /**
     * 
     * @type {string}
     * @memberof PaginatedTournamentRoundList
     */
    next?: string | null;
    /**
     * 
     * @type {string}
     * @memberof PaginatedTournamentRoundList
     */
    previous?: string | null;
    /**
     * 
     * @type {Array<TournamentRound>}
     * @memberof PaginatedTournamentRoundList
     */
    results?: Array<TournamentRound>;
}

/**
 * Check if a given object implements the PaginatedTournamentRoundList interface.
 */
export function instanceOfPaginatedTournamentRoundList(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function PaginatedTournamentRoundListFromJSON(json: any): PaginatedTournamentRoundList {
    return PaginatedTournamentRoundListFromJSONTyped(json, false);
}

export function PaginatedTournamentRoundListFromJSONTyped(json: any, ignoreDiscriminator: boolean): PaginatedTournamentRoundList {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'count': !exists(json, 'count') ? undefined : json['count'],
        'next': !exists(json, 'next') ? undefined : json['next'],
        'previous': !exists(json, 'previous') ? undefined : json['previous'],
        'results': !exists(json, 'results') ? undefined : ((json['results'] as Array<any>).map(TournamentRoundFromJSON)),
    };
}

export function PaginatedTournamentRoundListToJSON(value?: PaginatedTournamentRoundList | null): any {
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
        'results': value.results === undefined ? undefined : ((value.results as Array<any>).map(TournamentRoundToJSON)),
    };
}

