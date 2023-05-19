
enum EAction {
    MATCHES_REQUEST = 'MATCHES_REQUEST',
    MATCHES_FETCHING = 'MATCHES_FETCHING',
    MATCHES_FAILURE = 'MATCHES_FAILURE'
}

type TValueFields = {
    id: string,
    name: string
}

enum EStatus {
    NO_PROCESS = 0,
    PROCESS = 1
}

interface IMatches {
    home: TValueFields,
    away: TValueFields,
    league: TValueFields,
    id: string,
    time_status: EStatus
}

export { EStatus, EAction }
export type { TValueFields, IMatches }
