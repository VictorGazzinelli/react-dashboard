import React, { createContext, useContext, useEffect, useState } from 'react';
// import moment from 'moment';
import { message } from 'antd';
// import { UseBoolean, useBoolean } from 'react-hanger';
import { useNavigate, useParams } from 'react-router-dom';

// import paths from '../../../../routes/paths';
// import useDoRequest from '../../../../hooks/useDoRequest/useDoRequest';
// import { useArray, UseArrayActions } from '../../../../hooks/useArray';
// import { IServicoDto } from '../../../../services/servico/servicoInterface';
// import { IBarragemDto } from '../../../../services/barragem/barragemInterface';
// import { IEmpreendimentos } from '../../../../services/empreendimento/empreendimentoInterface';
// import { IDashboardDto, IInserirDashboardInput } from '../../../../services/dashboard/dashboardInterface';

import DashboardSide from './DashboardSide';
import DashboardContent from './DashboardContent';
import PageDivider from '../../../../components/PageDivider';
import { GlobalContext } from '../../../../GlobalContextProvider';
import { IDashboardDto, IInserirDashboardInput } from '../../../../services/dashboard/dashboardinterface';
import { useBoolean, UseBoolean } from 'react-hanger';
import useApiRequest from '../../../../hooks/useApiRequest';
import paths from '../../../../routes/paths';

export interface IDashboardContext {
    selectedDashboard: IDashboardDto | undefined,
    setSelectedDashboard: (dashboard: IDashboardDto | undefined) => void,
    dashboardTitle: string,
    setDashboardTitle: (dashboardTitle: string) => void,
    disableOptions: UseBoolean,
    popoverlDashboard: UseBoolean
    onDashboardDelete: (idDashboard: number) => void,
    onDashboardCreate: (name: string) => void,
    onDashboardEdit: (newName: string) => void,
}

export const DashboardContext = createContext({} as IDashboardContext);

const ScreenDashboard: React.FC = () => {
		const navigate = useNavigate();
    const { IdEmpreendimento, IdDashboard } = useParams<{ IdEmpreendimento: string, IdDashboard: string }>();
    const [dashboardTitle, setDashboardTitle] = useState<string>('');
    const [selectedDashboard, setSelectedDashboard] = useState<IDashboardDto>();
    const disableOptions = useBoolean(false);
		const popoverlDashboard = useBoolean(false);

    const { dashboardArray, currentEmpreendimento } = useContext(GlobalContext)

		const getDashboard = useApiRequest((api) => api.dashboard.ObterDashboard);
    const deleteDashboard = useApiRequest((api) => api.dashboard.DeletarDashboard);
    const createDashboard = useApiRequest((api) => api.dashboard.InserirDashboard);
    const editDashboard = useApiRequest((api) => api.dashboard.EditarDashboard);

		const onComponentMount = () => {
			if(!IdDashboard) return;
			getDashboard.apiCall({IdDashboard: Number(IdDashboard)})
				.then(response => {
					setSelectedDashboard(response.Dashboard)
					setDashboardTitle(response.Dashboard.Nome)
				})
		}
		useEffect(onComponentMount,[])

    const onDashboardCreate = (name: string) => {
        const dto: IInserirDashboardInput = {
            IdEmpreendimento: Number(IdEmpreendimento || 0),
						Nome: name,
						Widgets: ''
        };

        createDashboard.apiCall(dto).then((response) => {
            if (response?.IdDashboard) {
                message.success('Dashboard criado com sucesso!');
                popoverlDashboard.setValue(false);
                dashboardArray.push({ ...dto, IdDashboard: response.IdDashboard });
                setSelectedDashboard({ ...dto, IdDashboard: response.IdDashboard })
                setDashboardTitle(dto.Nome)
                navigate(paths.home.dashboard.goTo(currentEmpreendimento?.IdEmpreendimento, response?.IdDashboard));
            } else {
                message.error('Ocorreu um erro ao criar dashboard');
            }
        });
    }

    const onDashboardEdit = (newName: string) => {
				console.log('newName', newName)
        if (!selectedDashboard) return;

        const editDtoDashboard: IDashboardDto = ({ ...selectedDashboard, Nome: newName })

        editDashboard.apiCall(editDtoDashboard).then((response) => {
            if (response.IdDashboard) {
								dashboardArray.editById(editDtoDashboard.IdDashboard, { ...editDtoDashboard }, 'IdDashboard')
                setSelectedDashboard(editDtoDashboard)
                setDashboardTitle(editDtoDashboard.Nome);
                message.success('Dashboard editado com sucesso!');
            } else {
							message.error('Ocorreu um erro ao editar dashboard');
            }
        });
    }

    const onDashboardDelete = (IdDashboard: number) => {
        deleteDashboard.apiCall({ IdDashboard }).then((response) => {
            if (response) {
								message.success('Dashboard excluido com sucesso!');
                if (dashboardArray.value[0].IdDashboard === IdDashboard) {
                    if (dashboardArray.value.length > 1) {
                        navigate(paths.home.dashboard.goTo(currentEmpreendimento?.IdEmpreendimento, dashboardArray.value[1].IdDashboard));
                        setSelectedDashboard(dashboardArray.value[1]);
                    } else {
                        setDashboardTitle('')
                        setSelectedDashboard(undefined);
                        navigate(paths.home.dashboard.goTo(currentEmpreendimento?.IdEmpreendimento, ''));
                    }
                } else {
									navigate(paths.home.dashboard.goTo(currentEmpreendimento?.IdEmpreendimento, dashboardArray.value[0].IdDashboard));
                    setSelectedDashboard(dashboardArray.value[0]);
                }
                dashboardArray.removeById(Number(IdDashboard), 'IdDashboard');
            } else {
							message.error('Ocorreu um erro ao excluir dashboard');
            }
        });
    }

    const defaultValuesContext: IDashboardContext = {
        selectedDashboard,
        setSelectedDashboard,
        dashboardTitle,
        setDashboardTitle,
        disableOptions,
        popoverlDashboard,
        onDashboardCreate,
        onDashboardEdit,
        onDashboardDelete,
    };

    return (
        <DashboardContext.Provider value={defaultValuesContext}>
            <PageDivider
                sider={<DashboardSide />}
                content={<DashboardContent />}
            />
        </DashboardContext.Provider>
    );
};

export default ScreenDashboard;


