import { createContext, useState } from 'react'

export const TimeRangeContext = createContext()

export function TimeRangeProvider({ children }) {
    const [timeRange, setTimeRange] = useState('long_term')
    
    return (
        <TimeRangeContext.Provider
            value={{
                timeRange,
                setTimeRange,
            }}
        >
            {children}
        </TimeRangeContext.Provider>
    )
}    
