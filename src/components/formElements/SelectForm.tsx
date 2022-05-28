import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { Select as AntdSelect, SelectProps } from 'antd';
import { ErrorMessage, useField } from 'formik';
import styled from 'styled-components';

interface IProps extends SelectProps<any> {
    label: string,
    name: string,
    required?: boolean,
    disabled?: boolean
    id?: string // necessário para execução de teste
    onChange?: (value: any) => void
}

const Select: React.FC<IProps> = ({
    name, required = false, label, children, id, disabled, onChange, ...rest
}) => {
    const [field, meta, helpers] = useField(name);
    return (
        <Wrapper required={required}>
            <label htmlFor={name}>{required ? `${label}:` : `${label}:`}</label>
            <AntdSelect
                id={id}
                defaultValue={meta.initialValue}
                onChange={(e) => { 
                    if (onChange) onChange(e)
                    helpers.setValue(e)
                }}
                disabled={disabled}
                onBlur={field.onBlur}
                value={field.value}
                {...rest}
            >
                {children}
            </AntdSelect>
            <ErrorMessage
                name={name}
            >
                {
                    (a) => (Array.isArray(a)
                        // @ts-ignore
                        ? a.map((msg) => (
                            <Message>
                                <FontAwesomeIcon icon={faExclamationCircle} />
                                {msg}
                            </Message>
                        ))
                        : (
                            <Message>
                                <FontAwesomeIcon icon={faExclamationCircle} />
                                {a}
                            </Message>
                        ))
                }
            </ErrorMessage>
        </Wrapper>
    );
};
export default Select;

const Message = styled.span`
    color: red;
`;

const Wrapper = styled.div<{ required: boolean }>`
    display:flex;
    flex-direction:column;
    margin-bottom: 15px;

    label {
        font-weight: 500;
        ${(props) => props.required && "::after{ content:'*'; margin-left:5px; color:red; }"}
    }
    
    svg {margin-right: 5px;}
    .error-wrapper{
        display:flex;
        flex-direction:column;
    }
`;
