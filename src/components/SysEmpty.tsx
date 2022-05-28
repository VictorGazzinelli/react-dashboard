import React from 'react';
import { Empty } from 'antd';
import styled from 'styled-components';

interface ISysEmpty {
    isEmpty?: boolean;
    children?: React.ReactNode
}

const SysEmpty = ({ isEmpty, children }: ISysEmpty) => {

    return (
        isEmpty
            ? (
                <EmptyWrapper>
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={'Não há dados'} />
                </EmptyWrapper>
            )
            : <>{children}</>
    );
};

export default SysEmpty;
const EmptyWrapper = styled.div`
    display:flex;
    flex:1;
    align-items:center;
    justify-content:center;
`;
