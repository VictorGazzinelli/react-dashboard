import React from 'react';

import { Spin } from 'antd';
import styled from 'styled-components';
interface IProps {
    spinning: boolean
}

const SysPinner: React.FC<IProps> = ({ spinning }) => (
    spinning
        ? (
            <StyledWrapper className="sysdam-spinner">
                <StyledDiv>
                    <Spin spinning />
                </StyledDiv>
            </StyledWrapper>
        )
        : null
);
export default SysPinner;

const StyledWrapper = styled.div`
    position:absolute;
    left:0;
    right:0;
    top:0;
    bottom:0;
    background-color: rgba(255, 255, 255, 0.5);
    z-index:1000;
`;

const StyledDiv = styled.div`
    display:flex;
    width:100%;
    height:100%; 
    justify-content:center;
    align-items:center;
`;
