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

import * as models from './models';

export interface TournamentSubmission {
    id: number;

    status: models.StatusBccEnum;

    logs: string;

    episode: string;

    team: number;

    teamname: string;

    user: number;

    username: string;

    created: string;

    accepted: boolean;

    _package: string;

    description: string;

    sourceCode: string;

    tournament: string;

}
export namespace TournamentSubmission {
}
