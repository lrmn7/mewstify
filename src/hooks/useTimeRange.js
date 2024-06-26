import { useContext } from 'react';
import { TimeRangeContext } from '../context/timeRange';

export function useTimeRange() {
    const { timeRange, setTimeRange } = useContext(TimeRangeContext);

    return {
        timeRange,
        setTimeRange,
    };
}
