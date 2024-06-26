import { Button, ButtonGroup } from '@nextui-org/react'
import { useTimeRange } from '../../hooks'
import { ranges } from '../../constants/lists'

export function TimeRangeGroup() {
    const { timeRange, setTimeRange } = useTimeRange()

    return (
        <ButtonGroup>
            {ranges.map((range, index) => (
                <Button
                    key={index}
                    className={'font-medium bg-chinese-black ' + (timeRange === range.value ? 'text-guppie-green bg-guppie-green/10' : 'hover:text-foreground-500 transition-all')}
                    onClick={() => setTimeRange(range.value)}
                >
                    {range.label}
                </Button>
            ))}
        </ButtonGroup>
    )
}