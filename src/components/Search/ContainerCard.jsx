import { Card, CardHeader, CardBody } from '@nextui-org/react'

export function ContainerCard({ title, children }) {
    return (
        <Card className='shadow-none p-4'>
            <CardHeader className='flex flex-col sm:flex-row justify-between gap-3'>
                <h3 className='w-full text-2xl sm:text-4xl font-bold'>
                    {title}
                </h3>
            </CardHeader>
            <CardBody className='px-3'>
                <div className='grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-4'>
                    {children}
                </div>
            </CardBody>
        </Card>
    )
}
