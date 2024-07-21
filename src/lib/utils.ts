export const pick = <T extends {}>(obj: T, keys: Array<keyof T>) => keys.map(k => obj[k])
