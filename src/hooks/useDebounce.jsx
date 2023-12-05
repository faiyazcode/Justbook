import { useState, useEffect } from 'react'

export const useDebounce = (value) => {
    const milliSeconds = 2000
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, milliSeconds);

        return () => {
            clearTimeout(handler);
        };
    }, [value, milliSeconds]);

    return debouncedValue;
};