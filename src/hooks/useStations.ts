import { useQuery } from '@tanstack/react-query'
import type { Station } from '../types'

const API_URL = 'https://gist.githubusercontent.com/neysidev/bbd40032f0f4e167a1e6a8b3e99a490c/raw'

const getFn = async (): Promise<Station[]> => {
    try {
        const response = await fetch(API_URL)
        if (!response.ok) {
            throw new Error(`Failed to fetch stations: ${response.status} ${response.statusText}`)
        }
        return response.json()
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Station fetch failed: ${error.message}`)
        }
        throw new Error('An unknown error occurred while fetching stations')
    }
}

export function useStationsQuery() {
    return useQuery({
        queryKey: ["stationsQuery"],
        queryFn: getFn
    })
}