import React from 'react';
import styled from 'styled-components';
import { useBoolean } from 'react-hanger';
import { ErrorMessage, useField } from 'formik';
import { DatePicker, Tag } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

interface IProps {
    label?: string,
    name: string,
    required?: boolean,
    id?: string,
}

const RangePickerForm: React.FC<IProps> = ({ name, required = false, label, id }) => {
    const rangePickerStatus = useBoolean(false);
    const [field, meta, helpers] = useField(name);

    return (
        <Wrapper required={required}>
            {label &&
                <label htmlFor={name}>
                    {`${label}:`}
                </label>
            }

            <DatePicker.RangePicker
                id={id}
                defaultValue={meta.initialValue}
                onBlur={field.onBlur}
                onChange={(dates) => helpers.setValue(dates)}
                value={field.value ? field.value : null}
                format="DD/MM/YYYY"
                onOpenChange={(open: boolean) => rangePickerStatus.setValue(open)}
                open={rangePickerStatus.value}
            />

            <ErrorMessage name={name}>
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

export default RangePickerForm;

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
    .required-item-red{
        color:red;
    }
`;