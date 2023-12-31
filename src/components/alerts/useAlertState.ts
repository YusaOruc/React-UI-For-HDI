import React, { useCallback } from "react"

interface IAlertStateParams {
    initialState?: boolean
    noInterval?: boolean
}
function useAlertState(params: IAlertStateParams) {
    const { initialState = false, noInterval = false } = params
    const [alertState, setAlertState] = React.useState(initialState)

    const showAlert = () => {
        setAlertState(true)
        if (!noInterval) {
            setInterval(() => {
                setAlertState(false)
            }, 15000)
        }
    }
    const hideAlert = useCallback(() => {
        setAlertState(false)
    }, [])

    return { alertState, showAlert, hideAlert }
}

export default useAlertState
