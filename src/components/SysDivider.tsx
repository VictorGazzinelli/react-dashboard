import React from 'react';

import styled from 'styled-components';

interface IProps{
    title:string,
    style?: React.CSSProperties | undefined
}

const SysLineDivider: React.FC<IProps> = ({ title, style }) => (
    <SDivider style={style}>
        <div className="line-divider" />
        <span className="divider-title">{title}</span>
    </SDivider>
);
export default React.memo(SysLineDivider);

const SDivider = styled.div`
    position: relative;
    height: fit-content;
    margin: 40px 0px 25px 0px;

    .line-divider{
        background: #e8e8e8;
        width: 100%;
        height: 1px;
    }
    .divider-title{
        position: absolute;
        top: -12px;
        left: 0px;
        background-color: #FFF;
        padding-right: 5px;
        font-weight: 600;
    }
`;
