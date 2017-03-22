export const wait = ( delay: number ) : Promise<void> => new Promise( resolve => setTimeout( resolve, delay ) )

export const debounce = ( delay: number, fn: () => any ) : (() => void) => {

    let timeout=null

    return () => {
        clearTimeout(timeout)
        timeout = setTimeout(fn, delay)
    }
}