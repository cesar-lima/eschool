import { InputHTMLAttributes, useEffect, useRef } from 'react'
import { useField } from "@unform/core";
import '../styles/input.scss'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
}

const InputComponent: React.FC<InputProps> = ({
    name,
    ...rest
}) => {
    const inputRef = useRef(null)
    const { fieldName, error, registerField } = useField(name);

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputRef.current,
            path: 'value',
       });
    }, [fieldName, registerField]);

    return (
        <div>
            <input 
                className="input" 
                ref={inputRef} 
                {...rest}
            />
            {error}
        </div>
    );
};

export default InputComponent;