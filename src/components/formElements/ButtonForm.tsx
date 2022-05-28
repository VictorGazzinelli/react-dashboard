import React from 'react';

import { Button as AntdButton } from 'antd';
import { useFormikContext } from 'formik';
import styled from 'styled-components';

interface IProps{
    text: string,
    id?: string,
    style?: React.CSSProperties | undefined,
}

const Button: React.FC<IProps> = ({ text, id, style}) => {
    const { isSubmitting, submitForm } = useFormikContext();

    return (
        <SButton  onClick={submitForm} style={style} id={id} type="primary" loading={isSubmitting}>
            {text}
        </SButton>
    );
};
export default Button;

const SButton = styled(AntdButton)`
    margin-top: 3px;
`
