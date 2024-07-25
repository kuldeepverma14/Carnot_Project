import { useRouteError } from 'react-router-dom'

function Error() {
    const error = useRouteError()
    console.log(error)
    return (
        <div className='text-red-500 min-h-screen flex flex-col justify-center items-center' > <h1>Error 404</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p>
                Page {error.statusText || error.message}
            </p>
        </div>
    )
}

export default Error