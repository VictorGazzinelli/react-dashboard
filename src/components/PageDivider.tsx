import React, { ReactElement } from 'react';
import styled from 'styled-components';

interface IProps {
    sider?: ReactElement,
    content: ReactElement
}

const PageDivider: React.FC<IProps> = ({sider, content}) => {
    return (
			<Container isSubTitleClickable={false}>
				<div className={'TemplateSider-s'}>
						{sider}
				</div>
				<div className="TemplateContent-c">
						{content}
				</div>
			</Container>
    )
}

export default PageDivider;

const Container = styled.div<{ isSubTitleClickable: boolean }>`
    display: flex;
    flex: 1;
    overflow: hidden;

    .TemplateSider-s {
        display: flex;
        width: 300px;
        flex-direction: column;
        background-color: ${(props) => props.theme.ITENS_BACKGROUND};
        border-right: 1px solid #bcc0c78c;
        padding: 30px 22px 20px 22px;
        overflow: hidden;

        .span-main-title {
            display: block;
            font-size: 15px;
            font-weight: 600;
        }

        .span-sub-title {
            display: block;
            font-size: 17px;
            margin-top:10px;
            color: ${(props) => (props.isSubTitleClickable ? props.theme.SECONDARY_LIGHT : '')};
            cursor: ${(props) => (props.isSubTitleClickable ? 'pointer' : '')};;
        }

        .close-sider {
            font-size: 15px !important;
            position: absolute;
            color: #8e4dff;
            left: 325px;
            top: 34px;
        }

        &.closed {
            width: 0;
            border: 0;
            padding: 0;
        }
    }

    .TemplateContent-c {
        display: flex;
        flex: 1;
        background-color: ${(props) => props.theme.ITENS_BACKGROUND};
        border: 1px solid #bcc0c78c;
        margin: 7px;
        overflow: hidden;
        position: relative;
    }
`;