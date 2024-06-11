import { Input, useColorModeValue } from "@chakra-ui/react"


const InputComponent = ({
    type,
    border,
    placeholder,
    isFull,
    value,
    handleInput,
    name
}:{
        type:string,
        border:boolean,
        placeholder:string,
        isFull?:boolean,
        value:string|number,
        name:string,
        handleInput: (value:string,name:string) => void
    }) => {

const borderColor = useColorModeValue("#324D68","#DEE6ED");
    return (
        <Input
        type={type}
        border={border ? "1px solid red": "none"}
        borderBottom={!border ? `1px solid ${borderColor}`: "auto"}
        placeholder={placeholder}
        width={isFull? "100%": "20%"}
        value={value}
        name={name}
        borderRadius="0"
        onChange={(e)=>handleInput(e.target.value,e.target.name)}
        />
    )
}

export default InputComponent
