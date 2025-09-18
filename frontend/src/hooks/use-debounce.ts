import { useEffect, useState } from "react"

export function useDebounce<T extends (...args: any[]) => void>(
  callback: T,
  delay: number
) {
    const [debouncedCallback] = useState(() =>
        debounce(callback, delay)
    )

    useEffect(() => {
        return () => {
        debouncedCallback.cancel?.()
        }
    }, [debouncedCallback])

    return debouncedCallback
}

export function debounce<T extends (...args: any[]) => void>(
  func: T,
  wait: number
): T & { cancel: () => void } {
    let timeout: NodeJS.Timeout | null = null

    const debounced = ((...args: any[]) => {
        if (timeout) clearTimeout(timeout)
        timeout = setTimeout(() => func(...args), wait)
    }) as T & { cancel: () => void }

    debounced.cancel = () => {
        if (timeout) {
        clearTimeout(timeout)
        timeout = null
        }
    }

    return debounced
}