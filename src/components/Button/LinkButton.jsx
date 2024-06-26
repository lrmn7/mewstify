import { Button, Link } from '@nextui-org/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons'

export function LinkButton({ href, isFlat }) {
    return (
        <Button
            isIconOnly
            isExternal
            as={Link}
            href={href}
            variant={isFlat ? 'flat' : 'solid'}
            aria-label='Open in Spotify'
            className='absolute top-3 right-3 hover:scale-125 transition-transform z-10'
        >
            <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
        </Button>
    )
}