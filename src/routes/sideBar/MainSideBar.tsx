import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext } from 'react';
import { useNavigate, useLocation, useMatch } from 'react-router-dom';
import { faHome, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { Avatar, Tooltip } from 'antd';

import paths from '../paths';
import logoInspecao from '../../images/logo/logo_Inspecao.png';
import { GlobalContext } from '../../GlobalContextProvider';

const MainSideBar: React.FC = () => {
    const navigate = useNavigate();

    const selectedHome = !!useMatch(paths.home.root);

		const location = useLocation();

		const { currentEmpreendimento } = useContext(GlobalContext)

    const SidebarIcon: React.FC<{
        type: string,
        icon: IconDefinition,
        onClick: () => void,
        selected: boolean,
        className?: string
    }> = ({ type, icon, onClick, selected, }) => (

        <SIconWrapper
            onClick={onClick}
        >
            <Tooltip placement="right" title={type}>
                <IconSelectedWrapper
                    selected={selected}
                >
                    <FontAwesomeIcon
                        icon={icon}
                    />
                </IconSelectedWrapper>
            </Tooltip>
        </SIconWrapper>
    );

    return (
        <SideBar>
            <div onClick={() => navigate(paths.root)} className="logo-wrapper">
                <img src={logoInspecao} alt="main-icon" />
            </div>

            <SidebarIcon
                type={'Menu Principal'}
                icon={faHome}
                onClick={
                    () => { if (location.pathname.split('/')[1] !== 'home') navigate(paths.home.dashboard.goTo(currentEmpreendimento?.IdEmpreendimento, '')) }
                }
                selected={selectedHome}
            />

            <SAvatarWrapper>
							<Tooltip placement="right" title={'Minha conta'}>
									<Avatar size={32} />
							</Tooltip>
            </SAvatarWrapper>

        </SideBar>
    );
};

export default MainSideBar;

const SideBar = styled.div`
    background:#FFF;
    height:100%;
    width:60px;
    border-right: 1px solid #bcc0c78c;
    position: relative;

    display:flex;
    flex-direction:column;

    .logo-wrapper{
        height:56px;
        width: 100%;
        cursor:pointer;
        padding-top:13px;

        display:flex;
        align-items:center;
        justify-content:center;
    }

    img{
        height:30px;
        width: 30px;
    }

    .sideBar-divider{
        height:1px;
        background: #EEEEEE;
        margin: 10px 10px 0px 10px;
    }
`;

const SIconWrapper = styled.div`

    width: 100%;
    cursor:pointer;
    margin-top: 10px;

    display:flex;
    align-items:center;
    justify-content:center;
    font-size:15px;

    .close-sider {
            font-size: 15px !important;
            /* position: absolute; */
            color: #8e4dff;
            left: 325px;
            top: 34px;
        }
`;

const IconSelectedWrapper = styled.div<{ selected: boolean }>`
    background:${(props) => props.selected && props.theme.PRIMARY_MAIN};
    color:${(props) => props.selected && 'white'};
    height: 35px;
    width: 35px;
    border-radius:5px;

    display:flex;
    align-items:center;
    justify-content:center;

    :hover {
        background-color:${(props) => !props.selected && '#e8e8e8'};
    }

    :active {
        background-color:${(props) => !props.selected && '#cacaca'};
    }

`;

const SAvatarWrapper = styled.div`
    position:absolute;
    bottom:10px;
    width: 100%;

    display:flex;
    justify-content:center;
    align-items:center;
    flex-direction:column;
`;
