import type {
  CompeteMatchHistoricalRatingListRequest,
  CompeteMatchListRequest,
  CompeteMatchScrimmageListRequest,
  CompeteMatchTournamentListRequest,
  CompeteRequestInboxListRequest,
  CompeteRequestOutboxListRequest,
  CompeteSubmissionListRequest,
  CompeteSubmissionTournamentListRequest,
} from "../_autogen";
import type { QueryKeyBuilder } from "../apiTypes";

interface CompeteKeys {
  // --- SUBMISSIONS --- //
  subBase: QueryKeyBuilder<{ episodeId: string }>;
  subList: QueryKeyBuilder<CompeteSubmissionListRequest>;
  tourneySubs: QueryKeyBuilder<CompeteSubmissionTournamentListRequest>;
  // --- SCRIMMAGES --- //
  scrimBase: QueryKeyBuilder<{ episodeId: string }>;
  inbox: QueryKeyBuilder<CompeteRequestInboxListRequest>;
  outbox: QueryKeyBuilder<CompeteRequestOutboxListRequest>;
  scrimsMeList: QueryKeyBuilder<CompeteMatchScrimmageListRequest>;
  scrimsOtherList: QueryKeyBuilder<CompeteMatchScrimmageListRequest>;
  // --- MATCHES --- //
  matchBase: QueryKeyBuilder<{ episodeId: string }>;
  matchList: QueryKeyBuilder<CompeteMatchListRequest>;
  tourneyMatchList: QueryKeyBuilder<CompeteMatchTournamentListRequest>;
  // --- PERFORMANCE --- //
  ratingHistoryBase: QueryKeyBuilder<{ episodeId: string }>;
  ratingHistoryTopList: QueryKeyBuilder<CompeteMatchHistoricalRatingListRequest>;
  ratingHistoryMeList: QueryKeyBuilder<CompeteMatchHistoricalRatingListRequest>;
}

// ---------- KEY RECORDS ---------- //
export const competeQueryKeys: CompeteKeys = {
  // --- SUBMISSIONS --- //
  subBase: {
    key: ({ episodeId }: { episodeId: string }) =>
      ["compete", episodeId, "submissions"] as const,
  },

  subList: {
    key: ({ episodeId, page = 1 }: CompeteSubmissionListRequest) =>
      [...competeQueryKeys.subBase.key({ episodeId }), "list", page] as const,
  },

  tourneySubs: {
    key: ({ episodeId }: CompeteSubmissionTournamentListRequest) =>
      [...competeQueryKeys.subBase.key({ episodeId }), "tournament"] as const,
  },

  // --- SCRIMMAGES --- //
  scrimBase: {
    key: ({ episodeId }: { episodeId: string }) =>
      ["compete", episodeId, "scrimmages"] as const,
  },

  inbox: {
    key: ({ episodeId, page = 1 }: CompeteRequestInboxListRequest) =>
      [
        ...competeQueryKeys.scrimBase.key({ episodeId }),
        "inbox",
        page,
      ] as const,
  },

  outbox: {
    key: ({ episodeId, page = 1 }: CompeteRequestOutboxListRequest) =>
      [
        ...competeQueryKeys.scrimBase.key({ episodeId }),
        "outbox",
        page,
      ] as const,
  },

  scrimsMeList: {
    key: ({ episodeId, page = 1 }: CompeteMatchScrimmageListRequest) =>
      [
        ...competeQueryKeys.scrimBase.key({ episodeId }),
        "list",
        "me",
        page,
      ] as const,
  },

  scrimsOtherList: {
    key: ({ episodeId, teamId, page = 1 }: CompeteMatchScrimmageListRequest) =>
      [
        ...competeQueryKeys.scrimBase.key({ episodeId }),
        "list",
        teamId,
        page,
      ] as const,
  },

  // --- MATCHES --- //
  matchBase: {
    key: ({ episodeId }: { episodeId: string }) =>
      ["compete", episodeId, "matches"] as const,
  },

  matchList: {
    key: ({ episodeId, page = 1 }: CompeteMatchListRequest) =>
      [...competeQueryKeys.matchBase.key({ episodeId }), "list", page] as const,
  },

  tourneyMatchList: {
    key: ({
      episodeId,
      teamId,
      tournamentId,
      roundId,
      page = 1,
    }: CompeteMatchTournamentListRequest) =>
      [
        ...competeQueryKeys.matchBase.key({ episodeId }),
        "tournament",
        tournamentId,
        roundId,
        teamId,
        page,
      ] as const,
  },

  // --- PERFORMANCE --- //
  ratingHistoryBase: {
    key: ({ episodeId }: { episodeId: string }) =>
      ["compete", episodeId, "ratingHistory"] as const,
  },

  ratingHistoryTopList: {
    key: ({ episodeId }: CompeteMatchHistoricalRatingListRequest) =>
      [
        ...competeQueryKeys.ratingHistoryBase.key({ episodeId }),
        "top",
      ] as const,
  },

  ratingHistoryMeList: {
    key: ({ episodeId }: CompeteMatchHistoricalRatingListRequest) =>
      [...competeQueryKeys.ratingHistoryBase.key({ episodeId }), "me"] as const,
  },
};

export const competeMutationKeys = {
  // --- SUBMISSIONS --- //
  uploadSub: ({ episodeId }: { episodeId: string }) =>
    ["compete", episodeId, "submit"] as const,

  // --- SCRIMMAGES --- //
  requestScrim: ({ episodeId }: { episodeId: string }) =>
    ["compete", episodeId, "scrimmage", "request"] as const,

  acceptScrim: ({ episodeId }: { episodeId: string }) =>
    ["compete", episodeId, "scrimmage", "accept"] as const,

  rejectScrim: ({ episodeId }: { episodeId: string }) =>
    ["compete", episodeId, "scrimmage", "reject"] as const,

  cancelScrim: ({ episodeId }: { episodeId: string }) =>
    ["compete", episodeId, "scrimmage", "cancel"] as const,
};