import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { Input as AntdInput, InputProps as AntdInputProps } from 'antd';
import { SizeType } from 'antd/lib/config-provider/SizeContext';
import { ErrorMessage, useField } from 'formik';
import styled from 'styled-components';

interface IProps extends AntdInputProps{
    label: string,
    name: string,
    required?: boolean
    size?: SizeType
    style?: React.CSSProperties
}

const Input: React.FC<IProps> = ({
    name, required = false, label, size = 'middle', ...rest
}) => {
    const [field, meta, helpers] = useField(name);

    return (
        <Wrapper required={required}>
            <label htmlFor={name}>
                {`${label}:`}
            </label>
            <AntdInput
                name={name}
                defaultValue={meta.initialValue}
                onChange={(e) => helpers.setValue(e.target.value)}
                onBlur={field.onBlur}
                value={field.value}
                size={size}
                {...rest}
            />
            <ErrorMessage
                name={name}
            >
                {
                    (a) => (Array.isArray(a)
                    // @ts-ignore
                        ? a.map((msg) => (
                            <span>
                                <FontAwesomeIcon icon={faExclamationCircle} />
                                {msg}
                            </span>
                        ))
                        : (
                            <span>
                                <FontAwesomeIcon icon={faExclamationCircle} />
                                {a}
                            </span>
                        ))
                }
            </ErrorMessage>
        </Wrapper>
    );
};
export default Input;

const Wrapper = styled.div<{required: boolean}>`
    display:flex;
    flex-direction:column;  
    margin-bottom: 15px;

    label {
        font-weight: 500;
        ${(props) => props.required && "::after{ content:'*'; margin-left:5px; color:red; }"}
    }
    span {color:red;}
    svg {margin-right: 5px;}
`;
