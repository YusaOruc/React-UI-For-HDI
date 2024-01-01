import { Autocomplete } from "mui-rff"
import { useGetSurveyNameList } from "../../stores/SurveyStore"
import { useGetUserNameList } from "../../stores/UserStore"


interface IUserSelectProps {
    required?: boolean
    disabled?: boolean
    readOnly?: boolean
    label?: string
    name?: string
    size?:"medium"|"small"
    
}

const UserSelect = (props: IUserSelectProps) => {

    const { name="userId",size,readOnly = false, required = false, disabled = false,   label = "Kullanıcı" } = props
    const { isLoading, data = [] } = useGetUserNameList()
    return (
        <Autocomplete
            label={label!}
            name={name}
            size={size}
            options={data!}
            getOptionValue={(option:any) => option.id}
            getOptionLabel={(option) => option.name ?? "Yükleniyor..."}
            required={required}
            loadingText={"Yükleniyor..."}
            loading={isLoading}
            disabled={disabled}
            readOnly={readOnly}
            renderOption={(props, option) => {
                return (
                    <li {...props} key={option.id}>
                        {option.name}
                    </li>
                )
            }}
        />
    )
}

export default UserSelect
