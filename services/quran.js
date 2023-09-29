import quran from '../quran.json'

export function getReceiters() {
    return quran.receiters.map(receiter => ({
        name: receiter.name.ar,
        receiterId: receiter.receiterId
    }))
}