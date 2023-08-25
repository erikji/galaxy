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
 * @interface MatchParticipant
 */
export interface MatchParticipant {
    /**
     * 
     * @type {number}
     * @memberof MatchParticipant
     */
    readonly team: number;
    /**
     * 
     * @type {string}
     * @memberof MatchParticipant
     */
    readonly teamname: string;
    /**
     * 
     * @type {number}
     * @memberof MatchParticipant
     */
    readonly submission: number;
    /**
     * 
     * @type {number}
     * @memberof MatchParticipant
     */
    readonly match: number;
    /**
     * 
     * @type {number}
     * @memberof MatchParticipant
     */
    readonly player_index: number;
    /**
     * 
     * @type {number}
     * @memberof MatchParticipant
     */
    readonly score: number | null;
    /**
     * 
     * @type {number}
     * @memberof MatchParticipant
     */
    readonly rating: number;
    /**
     * 
     * @type {number}
     * @memberof MatchParticipant
     */
    readonly old_rating: number;
}

/**
 * Check if a given object implements the MatchParticipant interface.
 */
export function instanceOfMatchParticipant(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "team" in value;
    isInstance = isInstance && "teamname" in value;
    isInstance = isInstance && "submission" in value;
    isInstance = isInstance && "match" in value;
    isInstance = isInstance && "player_index" in value;
    isInstance = isInstance && "score" in value;
    isInstance = isInstance && "rating" in value;
    isInstance = isInstance && "old_rating" in value;

    return isInstance;
}

export function MatchParticipantFromJSON(json: any): MatchParticipant {
    return MatchParticipantFromJSONTyped(json, false);
}

export function MatchParticipantFromJSONTyped(json: any, ignoreDiscriminator: boolean): MatchParticipant {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'team': json['team'],
        'teamname': json['teamname'],
        'submission': json['submission'],
        'match': json['match'],
        'player_index': json['player_index'],
        'score': json['score'],
        'rating': json['rating'],
        'old_rating': json['old_rating'],
    };
}

export function MatchParticipantToJSON(value?: MatchParticipant | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
    };
}

