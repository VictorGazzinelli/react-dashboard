import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';

import paths from '../../../../routes/paths';
import { DashboardContext } from './ScreenDashboard';

import SysPinner from '../../../../components/SysPinner';
import SysDivider from '../../../../components/SysDivider';
import DashboardItem from '../components/dashboardItem/DashboardItem';
import PopoverCreateDashboard from '../components/modalCreateDashboard/PopoverCreateDashboard';
import { GlobalContext } from '../../../../GlobalContextProvider';
import useApiRequest from '../../../../hooks/useApiRequest';
import { IDashboardDto } from '../../../../services/dashboard/dashboardinterface';

const DashboardSide: React.FC = () => {
    const navigate = useNavigate();

    const {
        setSelectedDashboard,
        disableOptions,
        onDashboardCreate,
    } = useContext(DashboardContext)

    const { currentEmpreendimento, dashboardArray } = useContext(GlobalContext)
    const { IdEmpreendimento, IdDashboard } = useParams<{ IdEmpreendimento: string, IdDashboard: string }>()
    const listDashboards = useApiRequest((api) => api.dashboard.ListarDashboardPorEmpreendimento);

    const onComponentMount = () => {
        listDashboards.apiCall({ IdEmpreendimento: Number(IdEmpreendimento)})
            .then((response) => {
                if (response?.Dashboards.length > 0) 
								{
									dashboardArray.setValue(response.Dashboards);
                    if (!IdDashboard) {
                        setSelectedDashboard(response.Dashboards[0]);
                        navigate(paths.home.dashboard.goTo(IdEmpreendimento, response.Dashboards[0]?.IdDashboard));
                    } else {
                        let currentDashboard = response?.Dashboards.find((item: IDashboardDto) => item.IdDashboard == Number(IdDashboard));
                        navigate(paths.home.dashboard.goTo(IdEmpreendimento, currentDashboard ? currentDashboard?.IdDashboard : ''));
                        setSelectedDashboard(currentDashboard as IDashboardDto);
                    }
                } else {
									dashboardArray.setValue([])
                }
            });
    }
    useEffect(onComponentMount, [IdEmpreendimento]);

    const onRouteChange = () => {
        if (IdDashboard && dashboardArray.value.length > 0) {
            let currentDashboard = dashboardArray.findById(Number(IdDashboard), "IdDashboard")
            navigate(paths.home.dashboard.goTo(IdEmpreendimento, currentDashboard ? currentDashboard?.IdDashboard : ''));
            setSelectedDashboard(currentDashboard ? currentDashboard : undefined)
        }
    }
    useEffect(onRouteChange, [IdDashboard]);

    const onClick = (dashboard: IDashboardDto) => {
        setSelectedDashboard(dashboard)
        navigate(paths.home.dashboard.goTo(currentEmpreendimento?.IdEmpreendimento, dashboard?.IdDashboard));
    }

    return (
        <Container>
            <SysPinner spinning={false} />
            <div>
                <span className="span-main-title">{`Empreendimento ${IdEmpreendimento}`}</span>
            </div>
            <SysDivider title={'Dashboards'} />
            <div className="list-dashboard">
                {dashboardArray?.value.map((dashboard) => (
                    <DashboardItem
                        key={dashboard.IdDashboard}
                        id={dashboard.IdDashboard.toString()}
                        text={dashboard.Nome}
                        onClick={() => onClick(dashboard)}
                        active={dashboard.IdDashboard === Number(IdDashboard)}
                        disabled={disableOptions.value && (dashboard.IdDashboard !== Number(IdDashboard))}
                        prefix={false}
                    />
                ))}
            </div>

            <PopoverCreateDashboard
                onCreate={onDashboardCreate}
            />

        </Container>
    );
};
export default DashboardSide;

const Container = styled.div`    
    display: flex;
    flex-direction: column;
    position: relative;
    flex: 1;

    .ant-btn:hover, .ant-btn:focus {
        color: #fff !important;
    }

    .button-register {
        margin-top: 10%;
    }

    .list-dashboard {
        max-height: 560px;
        overflow: auto;
        overflow-x: hidden;
    }

    .span-main-title {
        display: block;
        font-size: 15px;
        font-weight: 600;
    }

    .span-sub-title {
        height: 100%;
        display: block;
        font-size: 17px;
        margin-top: 10px;
        cursor: pointer;
        color:${(props) => props.theme.SECONDARY_LIGHT};
        text-overflow: ellipsis;
        white-space: nowrap;
    }
`;