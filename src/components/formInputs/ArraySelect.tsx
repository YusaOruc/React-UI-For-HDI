import { Autocomplete } from "mui-rff"


interface ArraySelectProps {
    required?: boolean
    disabled?: boolean
    name: string
    options: any
    label: string
    loading?: boolean
    size?: "small" | "medium" | undefined
}

const ArraySelect = (props: ArraySelectProps) => {
    const { required = false, disabled = false, name, options, label, loading = false, size = "medium" } = props

    return (
        <Autocomplete
            label={label}
            name={name}
            options={options}
            getOptionValue={loading ? undefined : (option:any) => option}
            getOptionLabel={(option:any) => option ?? "Yükleniyor..."}
            required={required}
            disabled={disabled}
            loading={loading}
            size={size}
        />
    )
}

export const ListSelect = (props: ArraySelectProps) => {
    const { required = false, disabled = false, name, options, label, loading = false, size = "medium" } = props

    return (
        <Autocomplete
            label={label}
            name={name}
            options={options}
            getOptionValue={loading ? undefined : (option:any) => option.id}
            getOptionLabel={(option:any) => option.name ?? "Yükleniyor..."}
            required={required}
            disabled={disabled}
            loading={loading}
            size={size}
        />
    )
}

export default ArraySelect
