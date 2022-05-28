import React, { useEffect, useState, createContext, useContext } from 'react';
import _ from "lodash";
import styled from 'styled-components';
import { useParams } from 'react-router';
import { useBoolean } from 'react-hanger';
import { DeleteOutlined, EditOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import RGL, { WidthProvider } from "react-grid-layout";
import { message, Row, Col, Popconfirm, Tooltip, Divider } from 'antd';

import { DashboardContext } from './ScreenDashboard';
// import enumTipoGrafico from '../enum/enumTipoGrafico';
import { getTitle } from '../components/gridRender/handleTipoGrafico';
import { useArray, UseArrayActions } from '../../../../hooks/useArray';
// import { IWidget } from '../../../../services/dashboard/dashboardInterface';

import NewWidget from "../components/NewWidget";
import GridRender from '../components/gridRender/GridRender';
import ButtonBar from '../components/buttonBar/ButtonBar';
import SysPinner from '../../../../components/SysPinner';
import { IDashboardDto } from '../../../../services/dashboard/dashboardinterface';
import DrawerAddWidget from '../components/drawerAddWidget/DrawerAddWidget';

export interface IDashboardGridContext {
    arrDashboardGrid: UseArrayActions<any>
    canShowAllNiveis: () => boolean;
}

export const DashboardContentContext = createContext({} as IDashboardGridContext);

const ResponsiveReactGridLayout = WidthProvider(RGL);

const DashboardContent: React.FC = () => {
    const { selectedDashboard, setSelectedDashboard, setDashboardTitle, dashboardTitle, disableOptions } = useContext(DashboardContext);
    const [selectedWidget, setSelectedWidget] = useState<any>();
    const { IdDashboard } = useParams<{ IdDashboard: string }>();
    const { IdEmpreendimento } = useParams<{ IdEmpreendimento: string }>();
    const [layout, setLayout] = useState<any>([]);
    const visibleDrawer = useBoolean(false);
    const arrDashboardGrid = useArray<any>([]);

    // const obterDashboardPorId = useDoRequest((api) => api.dashboard.ObterDashboardPorId);
    // const editarDashboardWidget = useDoRequest((api) => api.dashboard.EditarDashboardWidget);

    const canShowAllNiveis = () => {
        return true;
    };

    // const onRouteChange = () => {
    //     if (!IdDashboard) return;
    //     // if (obterDashboardPorId.loading) return;
    //     if (!IdEmpreendimento) return;
    //     // obterDashboardPorId.doRequest({ idDashboard: Number(IdDashboard) }).then((response) => {
    //     //     if (response) {
    //     //         if (response?.idEmpreendimento == Number(IdEmpreendimento)) {
    //     //             arrDashboardGrid.setValue([]);
    //     //             setSelectedDashboard(response);
    //     //             setLayout(formatWidgets(response.widgets));
    //     //             setTitleDashboard(response.nome);
    //     //         }
    //     //     } else {
    //     //         message.error(intl({ id: 'Ocorreu um erro ao buscar os dados' }));
    //     //     }
    //     // });
    // }
		
		// const onObterDashboardOrEditarDashboardLoadingChange = () => {
		// 	disableOptions.setValue(obterDashboardPorId.loading || editarDashboardWidget.loading);
    //     return () => {
    //         disableOptions.setValue(true);
    //     }
		// }

    // useEffect(onObterDashboardOrEditarDashboardLoadingChange, [obterDashboardPorId.loading, editarDashboardWidget.loading])

		// const onIdDashboardChange = () => {
		// 	if (IdDashboard) {
		// 		onRouteChange();
		// 	}
		// 	return () => {
		// 			setTitleDashboard('');
		// 			arrDashboardGrid.clear();
		// 			setSelectedDashboard(undefined);
		// 	}
		// }

    // useEffect(onIdDashboardChange, [IdDashboard]);

    // const formatWidgets = (widgets: string | null) => {
    //     let arrWidgetsLayout: any[] = [];
    //     if (widgets != null && widgets != "") {
    //         const listWidgets = JSON.parse(widgets);
    //         listWidgets.map((item: IWidget) => {
    //             const typeChart = Number(item.tipoGrafico);
    //             const minW = (typeChart === enumTipoGrafico.KPI_PARTIAL) ||
    //                 (typeChart === enumTipoGrafico.KPI_TOTAL) ||
    //                 (typeChart == enumTipoGrafico.LISTA) ||
    //                 (typeChart == enumTipoGrafico.KPI_PERCENTAGE) ? 1 : 2;
    //             arrWidgetsLayout.push({
    //                 i: _.uniqueId("n"),
    //                 descricao: item.descricao,
    //                 typeGraph: Number(item.tipoGrafico),
    //                 typeData: Number(item.tipoDado),
    //                 IdServico: item.IdServico,
    //                 IdBarragem: item.IdBarragem,
    //                 IdEmpreendimento: item.IdEmpreendimento,
    //                 IdTipoInstrumento: item.IdTipoInstrumento,
    //                 IdInstrumento: item.IdInstrumento,
    //                 x: item.coordX,
    //                 y: item.coordY,
    //                 w: item.coordW < minW ? minW : item.coordW,
    //                 h: item.coordH,
    //                 minW: minW,
    //                 periodo: item.periodo,
    //                 dataInicio: item.dataInicio,
    //                 dataFim: item.dataFim
    //             })
    //         });
    //     }
    //     return arrWidgetsLayout;
    // }

    const onLayoutChange = (currentLayout: any) => {
        const changedLayout = currentLayout?.map((currentSize: any) => {
						//@ts-ignore
            let obj = _.find([...layout], function (obj) {
                return obj.i == currentSize.i
            });
            return {
                ...obj, h: currentSize.h, w: currentSize.w, x: currentSize.x, y: currentSize.y
            }
        });
        setLayout(changedLayout);
        onSaveLayout(changedLayout);
    }

    const onSaveLayout = (array: Array<any>) => {
        if (!selectedDashboard) return;
        if (!selectedDashboard.IdDashboard) return;
        if (!selectedDashboard.Nome) return;

        const listWidgets = array?.map((grid: any) => {
            return {
                coordX: grid.x,
                coordY: grid.y,
                coordW: grid.w,
                coordH: grid.h,
                descricao: grid.descricao,
                tipoGrafico: grid.typeGraph,
                tipoDado: grid.typeData,
                IdServico: grid.IdServico,
                IdBarragem: grid.IdBarragem,
                IdEmpreendimento: grid.IdEmpreendimento,
                IdTipoInstrumento: grid.IdTipoInstrumento,
                IdInstrumento: grid.IdInstrumento,
                periodo: grid.periodo,
                dataInicio: grid.dataInicio,
                dataFim: grid.dataFim
            }
        })
        const dashboard : IDashboardDto = {
            IdDashboard: Number(IdDashboard) || selectedDashboard.IdDashboard,
						IdEmpreendimento: Number(IdEmpreendimento),
            Nome: selectedDashboard?.Nome || dashboardTitle,
            Widgets: JSON.stringify(listWidgets),
        }

        if (dashboard.Widgets == selectedDashboard.Widgets) return;

        // editarDashboardWidget.doRequest(dashboard).then((response) => {
        //     if (response) {
        //         setSelectedDashboard(response);
        //         setTitleDashboard(response.nome);
        //     } else {
        //         message.error(intl({ id: 'Erro ao atualizar dashboard.' }));
        //     }
        // })
    }

    const onRemoveItem = (idWidget: string) => {
        const localLayout = _.reject([...layout], { i: idWidget });
        setLayout(localLayout);
        if (localLayout.length == 0) {
            onSaveLayout([]);
        }
    }

    const editWidget = (widget: any) => {
        setSelectedWidget(widget);
        visibleDrawer.setValue(true);
    };

    const defaultValuesContext: IDashboardGridContext = {
        arrDashboardGrid,
        canShowAllNiveis,
    };

    return (
        <DashboardContentContext.Provider value={defaultValuesContext}>
            <Container>
                <SysPinner spinning={false} />
                <ButtonBar visibleDrawer={visibleDrawer} />
                <DrawerAddWidget
                    visibleDrawer={visibleDrawer}
                    layout={layout}
                    setLayout={setLayout}
                    selectedWidget={selectedWidget}
                    setSelectedWidget={setSelectedWidget}

                />
                {layout?.length === 0
                    ? (
                        <NewWidget visibleDrawer={visibleDrawer} hasDashboard={!!dashboardTitle && !!selectedDashboard} />
                    ) : (
                        <ResponsiveReactGridLayout
                            className="widget-container"
                            containerPadding={[8, 8]}
                            margin={[25, 25]}
                            onLayoutChange={(e) => onLayoutChange(e)}
                            verticalCompact={false}
                            preventCollision={true}   // This turns off rearrangement so items will not be pushed arround.
                            compactType={null}
                        >
                            {layout.map((el: any, idx: number) => (
                                <div
                                    data-grid={el}
                                    className={`widget widget-${idx} overflowDefinition`}
                                    key={el.i}
                                >
                                    <Row className="row-grid-render">
                                        <Tooltip placement="top" title={el.descricao ? `${el.descricao}` : `${getTitle(el.typeData, !canShowAllNiveis())}`}>
                                            <Col span={20} className="text-muted">
                                                <h3> {el.descricao ? `${el.descricao}` : `${getTitle(el.typeData, !canShowAllNiveis())}`} </h3>
                                            </Col>
                                        </Tooltip>
                                        <Col span={4} className="col-button">
                                            <Tooltip placement="top" title={'Editar'}>
                                                <EditOutlined
                                                    className="remove-widget-button hide"
                                                    onClick={() => editWidget(el)}
                                                />
                                            </Tooltip>
                                            <Divider type="vertical" className="remove-widget-button hide" />
                                            <Popconfirm
                                                title={'Deseja remover o gráfico selecionado?'}
                                                icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                                                placement="bottomRight"
                                                onConfirm={() => onRemoveItem(el.i)}
                                            >
                                                <Tooltip placement="top" title={'Excluir'}>
                                                    <DeleteOutlined
                                                        className="remove-widget-button hide"
                                                    />
                                                </Tooltip>
                                            </Popconfirm>
                                        </Col>
                                    </Row>
                                    <GridRender chartObject={el} />
                                </div>
                            ))}
                        </ResponsiveReactGridLayout>
                    )}
            </Container >
        </DashboardContentContext.Provider >
    );
};

export default DashboardContent;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    padding: 25px;

    .text-muted {
        padding-left: 10px;
        padding-top: 6px;
        font-weight: bold !important;
    }

    .text-muted h3 {
        font-size: 12px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }

    .hide {
        display: none
    }

    .remove-widget-button {
        padding: 2px;
        cursor: pointer;
        font-size: 14px;
    }

    .row-grid-render {
        display: flex;
    }

    .col-button {
        display: flex;
        justify-content: end !important;
        padding-top: 6px;
        padding-right: 6px;
    }

    .ant-statistic-title {
        color: #000;
    }

    .widget {
        background-color: white;
        border-radius: 5px;
        border: 1px solid rgb(232, 232, 232);
        margin-bottom: 25px;
        box-shadow: rgb(139, 147, 255) 5px 5px 12px -10px;

        &:hover {
            .remove-widget-button {
                display:block
            }
        }
    }

    .react-grid-item.react-grid-placeholder {
        background-color: ${(props) => props.theme.PRIMARY_MAIN};
        border-radius: 10px;
    }

    .widget-bar {
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid lightgray;
        padding: 8px;
        cursor: move;
    }

    .widget-remove {
        cursor: default;
        padding: 3px;
    }

    .widget-container {
        width: 100%;
        height: 100vh !important;
        background-color: #fff;
        overflow: overlay;
        overflow-x: hidden;
        ::-webkit-scrollbar {
                display: none;
            }
        -ms-overflow-style: none;
        scrollbar-width: none;
    }



    .overflowDefinition {
        overflow: hidden;
    }
`;
