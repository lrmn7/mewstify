import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { Input } from '@nextui-org/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

export function SearchInput() {
    const [value, setValue] = useState('')
    const [searchParams, setSearchParams] = useSearchParams()
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        if (value) {
            setSearchParams({ query: value })
            
            if (location.pathname !== '/search') {
                navigate('/search')
            }
        }
    }, [value])

    return (
        <Input
            classNames={{
                base: 'max-w-full sm:max-w-[13rem] h-11',
                inputWrapper: 'h-full font-normal text-default-500',
            }}
            size='sm'
            radius='md'
            type='search'
            color='success'
            variant='bordered'
            placeholder='Search'
            className='flex-1'
            startContent={<FontAwesomeIcon className='w-3 h-3 pl-2' icon={faSearch} />}
            value={value}
            onValueChange={setValue}
        />
    )
}
