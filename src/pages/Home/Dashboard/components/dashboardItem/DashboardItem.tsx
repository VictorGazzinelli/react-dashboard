import { Tooltip } from 'antd';
import React, { ReactElement } from 'react';

import styled from 'styled-components';
interface IProps {
    icon?: React.ReactElement;
    text: string;
    onClick?: React.MouseEventHandler<HTMLDivElement> | undefined;
    disabled?: boolean;
    houver?: boolean;
    active?: boolean;
    avatarString?: string | ReactElement;
    isAvatarString?: boolean;
    id?: string;
    prefix?: boolean
}

const DashboardItem: React.FC<IProps> = ({ icon, text, onClick, disabled = false, houver = true, active = true, avatarString, isAvatarString = false, id, prefix = true }) => (
    <Tooltip
        placement="bottom"
        title={text}
    >
        <Wrapper id={id} active={active} houver={houver} disable={disabled} onClick={!disabled ? onClick : undefined}>
            {prefix &&
                <>
                    {isAvatarString ? <div className="icon-item">{avatarString}</div> : <div className="avatar-item">{icon}</div>}
                </>
            }
            <span className="string-wrapper">{text}</span>
        </Wrapper>
    </Tooltip>
);
export default DashboardItem;

const Wrapper = styled.div<{ disable: boolean, houver: boolean, active: boolean }>`
    border-radius: 3px;
    padding: 3px;
    margin-bottom: 5px;
    width: 100%;
    justify-content: start;
    display: flex;
    flex-direction: row;
    align-items: center;

    cursor: ${(props) => (props.disable ? 'not-allowed' : 'pointer')};
    background-color: ${(props) => props.disable && '#bcc0c78c'};
    background: ${(props) => (props.active ? '#e8e8e8' : props.theme.ITENS_BACKGROUND)};

    span {
        font-size: 11px;
        line-height: 23px !important;
    }

    .icon-item {
        width: 25px;
        height: 25px;

        display: flex;
        align-items: center;
        justify-content: center;
        color:#333;
        border: 1px solid rgb(143, 143, 143);
        border-radius: 3px;
    }

    .avatar-item {
        width: 25px;
        height: 25px;
        display: flex;
        align-items: center;
        justify-content: center;
        color:#333;
        border: 1px solid rgb(143, 143, 143);
        border-radius: 3px;
    }

    .string-wrapper {
        max-width: 90%;
        white-space: nowrap;                  
        overflow: hidden;
        text-overflow: ellipsis;
        padding-left: 15px;
        font-size: 14px;
    }

    :hover {
        background:  ${(props) => props.houver && '#e8e8e8'};
    }
`;