import React, { ReactElement, useContext, useEffect, useState } from 'react';
import _ from "lodash";
import moment from 'moment';
import styled from 'styled-components';

import SysPinner from '../../../../../components/SysPinner';
import { DashboardContentContext } from '../../screens/DashboardContent';
// import { getUrlRequest, handleRequestReponse } from './handleTipoGrafico';
import useApiRequest from '../../../../../hooks/useApiRequest';

interface IProps {
    chartObject: any,
}

const GridRender: React.FC<IProps> = ({ chartObject }) => {
    const { arrDashboardGrid, canShowAllNiveis } = useContext(DashboardContentContext);
    const [chartComponent, setChartComponent] = useState<ReactElement>(<div></div>);
    // const genericRequest = useApiRequest(api => getUrlRequest(api, chartObject.typeData));

    async function onMount() {
        // let obj = _.find(arrDashboardGrid.value, function (obj) { return obj.i == chartObject.i });
        // if (genericRequest.loading) return;
        // if (!obj) {
        //     const dto = {
        //         IdBarragem: chartObject.IdBarragem,
        //         IdEmpreendimento: chartObject.IdEmpreendimento,
        //         IdTipoInstrumento: chartObject.IdTipoInstrumento,
        //         IdInstrumento: chartObject.IdInstrumento,
        //         dataInicio: chartObject.periodo != 0 && chartObject.periodo ? moment().subtract(Number(chartObject.periodo), 'days').format('YYYY-MM-DDTHH:mm:ss') : chartObject.dataInicio,
        //         dataFim: chartObject.periodo != 0 && chartObject.periodo ? moment().format('YYYY-MM-DDTHH:mm:ss') : chartObject.dataFim
        //     }
        //     await genericRequest.doRequest(dto).then(r => {
        //         setChartComponent(handleRequestReponse(r, chartObject.typeGraph, chartObject.typeData, !canShowAllNiveis()));
        //         chartObject.dataComponent = r;
        //     })
        //     arrDashboardGrid.push(chartObject)
        // } else {
        //     setChartComponent(handleRequestReponse(obj.dataComponent, obj.typeGraph, obj.typeData, !canShowAllNiveis()));
        // }
    }
    useEffect(() => {
        onMount()

        return () => {
            setChartComponent(<div></div>)
        }
    }, [chartObject]);

    return (
        <Wrapper>
            <SysPinner spinning={false} />
            {chartComponent}
        </Wrapper>
    );
};

export default GridRender;

const Wrapper = styled.div`
    height: 100%;
    width: 100%;
    padding-bottom: 18px;
`;