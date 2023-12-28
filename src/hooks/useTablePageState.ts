import { useCallback, useState } from "react"

function useTablePageState<idType = number>(initialState = false) {
    const [open, setOpen] = useState(initialState)
    const [currentId, setId] = useState<idType>()

    const handleClickOpen = useCallback(() => {
        setOpen(true)
        setId(undefined)
    }, [])
    const handleClose = useCallback(() => {
        setOpen(false)
    }, [])

    const handleEdit = useCallback((id: idType) => {
        setId(id)
        setOpen(true)
    }, [])

    const formCallback = useCallback((errors:any) => {
        if (!errors) {
            handleClose()
        }
    }, [])

    return { open, isEdit: !!currentId, currentId, handleClickOpen, handleClose, handleEdit, formCallback }
}

export default useTablePageState
