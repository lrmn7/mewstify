import { Button } from '@nextui-org/react'

export function IconButton({ label, children, handleClick }) {
    return (
        <Button
            isIconOnly
            variant='light'
            aria-label={label}
            onPress={handleClick}
        >
            {children}
        </Button>
    )
}