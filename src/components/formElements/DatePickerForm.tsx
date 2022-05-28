import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { DatePicker as AntdDatePicker } from 'antd';
import { ErrorMessage, useField } from 'formik';
import moment from 'moment';
import styled from 'styled-components';

interface IProps{
    label: string,
    name: string,
    required?: boolean,
    id?: string,
}

const Input: React.FC<IProps> = ({
    name, required = false, label, id,
}) => {
    const [field, meta, helpers] = useField(name);

    const onGetChange = (date: moment.Moment | null) => {
        helpers.setValue(date?.format());
    };

    return (
        <Wrapper required={required}>
            <label htmlFor={name}>
                {`${label}:`}
            </label>

            <AntdDatePicker
                id={id}
                defaultValue={meta.initialValue}
                onBlur={field.onBlur}
                onChange={onGetChange}
                value={field.value ? moment(field.value) : null}
                format="DD/MM/YYYY"
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
    svg {margin-right: 5px;}
    .error-wrapper{
        display:flex;
        flex-direction:column;
    }
    .required-item-red{
        color:red;
    }
`;
const Span = styled.span`
    color:red;
`;
