import React, { useContext, useEffect, useRef, useMemo } from 'react';
import _ from "lodash";
import moment from 'moment';
import { UseBoolean } from 'react-hanger';
import { useParams } from 'react-router-dom';
import { Button as BtnAntd, Drawer, message, Space } from 'antd';
import styled from 'styled-components';
import { Formik, Form, FormikProps } from 'formik';

// import { enumTypeData } from '../../enum/enumTypeData';
// import enumTipoGrafico from '../../enum/enumTipoGrafico';
import { useArray } from '../../../../../hooks/useArray';
import { getTitle } from '../gridRender/handleTipoGrafico';
import { DashboardContext } from '../../screens/ScreenDashboard';
import { DashboardContentContext } from '../../screens/DashboardContent';

// import { IServicoDto, ITipoInformacaoDto } from '../../../../../services/servico/servicoInterface';
// import { IEditarDashboardWidgetsInput } from '../../../../../services/dashboard/dashboardInterface';
// import { IInstrumentoChild, ITipoInstrumento } from '../../../../../services/instrumento/instrumentoInterface';
// import { IEmpreendimentoBarragem, IEmpreendimentos } from '../../../../../services/empreendimento/empreendimentoInterface';

import SysEmpty from './../../../../../components/SysEmpty';
import { RangePicker, Button, Select, SelectOption, TreeSelect, Input, DatePicker } from './../../../../../components/formElements';
import { CloseOutlined } from '@ant-design/icons';

interface IProps {
    visibleDrawer: UseBoolean,
    layout: Array<any>,
    setLayout: (layout: Array<any>) => void,
    selectedWidget: any,
    setSelectedWidget: (item: any) => void,
}

const DrawerAddWidget: React.FC<IProps> = ({ visibleDrawer, layout, setLayout, selectedWidget, setSelectedWidget }) => {
    const { IdDashboard } = useParams<{ IdDashboard: string }>();
    const { arrDashboardGrid, } = useContext(DashboardContentContext);
    const { selectedDashboard, setSelectedDashboard } = useContext(DashboardContext);
    // const listTypeData = useArray<ITipoInformacaoDto>([]);
    // const listTypeInstrument = useArray<ITipoInstrumento>([]);
    const formikFormRef = useRef<FormikProps<any>>(null);

    // const obtertipoServico = useDoRequest((api) => api.servico.ObterTipoInformacaoPorIdServico);
    // const editarWidgets = useDoRequest((api) => api.dashboard.EditarDashboardWidgets);
    // const getTreeInstruments = useDoRequest((api) => api.instrumento.GetTreeInstruments);

    const componentDidMount = () => {
        // if (selectedWidget?.IdServico) {
        //     getServices(Number(selectedWidget.IdServico));
        // } else {
        //     getServices(1);
        // }

        // if (selectedWidget?.IdBarragem &&
        //     (selectedWidget?.typeData == enumTypeData.LEITURA_TIPO_INSTRUMENTOS_PERIODO || selectedWidget?.typeData == enumTypeData.LEITURA_INSTRUMENTOS_PERIODO)) {
        //     customChecks(selectedWidget.IdBarragem)
        // }
    }
    useEffect(componentDidMount, [visibleDrawer]);

    const closeDrawer = () => {
        setSelectedWidget(undefined);
        formikFormRef.current?.resetForm();
        visibleDrawer.setValue(false);
    }

    const formatGraph = (widget: any) => {
        // switch (widget.typeGraph) {
        //     case enumTipoGrafico.BAR_2D:
        //         return { ...widget, w: 4, h: 3 }
        //     case enumTipoGrafico.STACK_BAR_2D:
        //         return { ...widget, w: 4, h: 3 }
        //     case enumTipoGrafico.PIE:
        //         return { ...widget, w: 3, h: 3 }
        //     case enumTipoGrafico.TREE:
        //         return { ...widget, w: 4, h: 3 }
        //     case enumTipoGrafico.LINE_STACK_BAR_H:
        //         return { ...widget, w: 5, h: 3 }
        //     case enumTipoGrafico.LINE_BAR_H:
        //         return { ...widget, w: 3, h: 2 }
        //     case enumTipoGrafico.KPI_TOTAL:
        //         return { ...widget, w: 1, h: 1 }
        //     case enumTipoGrafico.KPI_PARTIAL:
        //         return { ...widget, w: 1, h: 1 }
        //     case enumTipoGrafico.KPI_PERCENTAGE:
        //         return { ...widget, w: 1, h: 1 }
        //     case enumTipoGrafico.LISTA:
        //         return { ...widget, w: 3, h: 2 }
        //     default:
        //         return { ...widget, w: 3, h: 3 }
				//}
			return { ...widget, w: 3, h: 3 }
    }

    const formatWidget = (data: any) => {
        const typeDataGraph = data.dataChart.split('-');
        // const typeChart = Number(typeDataGraph[0]);
        // const minW = (typeChart === enumTipoGrafico.KPI_PARTIAL) ||
        //     (typeChart === enumTipoGrafico.KPI_TOTAL) ||
        //     (typeChart == enumTipoGrafico.LISTA) ? 1 : 2;
				const minW = 2;

        let widget: any = formatGraph({
            descricao: data.description == '' ? `${getTitle(Number(typeDataGraph[0]))}` : data.description,
            x: 0,
            y: 2,
            w: 2,
            h: 2,
            minW: minW,
            typeData: Number(typeDataGraph[0]),
            typeGraph: Number(typeDataGraph[1]),
            periodo: data.period,
            dataInicio: data.period != 0 ? null : data.date[0].format('YYYY-MM-DDTHH:mm:ss'),
            dataFim: data.period != 0 ? null : data.date[1].format('YYYY-MM-DDTHH:mm:ss'),
            IdServico: Number(data.service)
        });
        widget.w = widget.w < minW ? minW : widget.w;

        // if (widget.typeData == enumTypeData.NUMERO_ANOMALIAS_ABERTAS ||
        //     widget.typeData == enumTypeData.NUMERO_ANOMALIAS_CORRIGIDAS ||
        //     widget.typeData == enumTypeData.NUMERO_ANOMALIAS_SEM_PLANO_ACAO ||
        //     widget.typeData == enumTypeData.CLASSIFICACAO_QUANTO_MAGNITUDE ||
        //     widget.typeData == enumTypeData.CLASSIFICACAO_QUANTO_CRITICIDADE ||
        //     widget.typeData == enumTypeData.CLASSIFICACAO_QUANTO_SITUAÇÃO) {

        //     let arr = [] as any
        //     listEmpreendimentos.value?.map((item: IEmpreendimentos) => {
        //         item.Barragens?.map((child: IEmpreendimentoBarragem) => {
        //             let idEmpreendedor = data.treeDams?.find((key: number) => child.IdBarragem == key);
        //             if (idEmpreendedor) {
        //                 arr.push(item.IdEmpreendimento)
        //             }
        //         })
        //     })
        //     widget = {
        //         ...widget,
        //         IdBarragem: data.treeDams,
        //         IdEmpreendimento: _.unionBy(arr),
        //         IdTipoInstrumento: [],
        //         IdInstrumento: [],
        //     }
        // } else if (widget.typeData == enumTypeData.NIVEIS_CONTROLE_EMPREENDIMENTO) {
        //     widget = {
        //         ...widget,
        //         IdBarragem: [],
        //         IdEmpreendimento: data.treeEnterprises,
        //         IdTipoInstrumento: [],
        //         IdInstrumento: [],
        //     }
        // } else if (widget.typeData == enumTypeData.LEITURA_TIPO_INSTRUMENTOS_PERIODO) {
        //     widget = {
        //         ...widget,
        //         IdBarragem: data.treeDams,
        //         IdEmpreendimento: [],
        //         IdTipoInstrumento: data.treeTypeInstruments,
        //         IdInstrumento: [],
        //     }
        // } else if (widget.typeData == enumTypeData.LEITURA_INSTRUMENTOS_PERIODO) {
        //     widget = {
        //         ...widget,
        //         IdBarragem: data.treeDams,
        //         IdEmpreendimento: [],
        //         IdTipoInstrumento: [],
        //         IdInstrumento: data.treeInstruments,
        //     }
        // } else {
        //     widget = {
        //         ...widget,
        //         IdBarragem: data.treeDams,
        //         IdEmpreendimento: [],
        //         IdTipoInstrumento: [],
        //         IdInstrumento: [],
        //     }
        // }

        return widget;
    }

    const validateService = (typeData: number, idService: number) => {
        // let index = listTypeData?.value.findIndex((item: ITipoInformacaoDto) => item.idTipoInformacao == typeData)
        // if (index >= 0) {
        //     if (listTypeData?.value[index]?.idServico == idService) {
        //         return true;
        //     } else {
        //         return false;
        //     }
        // } else {
        //     return false;
        // }
				return true;
    }

    const onSubmit = (data: any, options: any) => {
        if (!IdDashboard) return;
        if (!selectedDashboard?.IdDashboard) return;
        if (!validateService(Number(data?.dataChart?.split('-')[0]), data.service)) {
            message.error('O serviço selecionado não corresponde ao tipo de informação');
            options.setSubmitting(false)
            return;
        };

        let newWidget: any = formatWidget(data);
        if (!selectedWidget && layout.length > 0) {
            const highestY = layout.reduce(function (a, b) {
                return (a.y > b.y) ? a : b
            })
            newWidget.y = Number(highestY.y) + 1;
        }

        let letLayout: any[] = [];
        if (selectedWidget) {
            newWidget.i = selectedWidget.i;
            letLayout = [...layout].map((item: any) => {
                if (item.i == selectedWidget.i) {
                    return newWidget;
                } else {
                    return item;
                }
            });
            arrDashboardGrid.setValue(_.reject(arrDashboardGrid.value, { i: selectedWidget.i }));
        } else {
            newWidget.i = _.uniqueId("n");
            letLayout = [...layout, newWidget];
        }

        const listWidgets = letLayout.map((widget: any) => {
            return {
                coordX: widget.x,
                coordY: widget.y,
                coordW: widget.w,
                coordH: widget.h,
                descricao: widget.descricao,
                tipoGrafico: widget.typeGraph,
                tipoDado: widget.typeData,
                IdServico: widget.IdServico,
                IdBarragem: widget.IdBarragem,
                IdEmpreendimento: widget.IdEmpreendimento,
                IdTipoInstrumento: widget.IdTipoInstrumento,
                IdInstrumento: widget.IdInstrumento,
                periodo: widget.periodo,
                dataInicio: widget.dataInicio,
                dataFim: widget.dataFim,
            }
        });

        // const dto: IEditarDashboardWidgetsInput = {
        //     idDashboard: Number(IdDashboard) || selectedDashboard.idDashboard,
        //     widgets: JSON.stringify(listWidgets),
        // }

        // editarWidgets.doFormikRequest(dto, options).then((response) => {
        //     if (response && response.result) {
        //         setSelectedDashboard(response.result);
        //         setLayout([...letLayout]);
        //         options.resetForm()
        //     } else {
        //         message.error(`${intl({ id: 'Não foi possível adicionar o widget' })}.`);
        //     }
        //     closeDrawer();
        // });
    }

    const getServices = (e: number) => {
        // obtertipoServico.doRequest({ idServico: e }).then((response) => {
        //     if (response) {
        //         listTypeData.setValue(response);
        //     } else {
        //         message.error(`${intl({ id: 'Não foi possível listar os serviços' })}.`);
        //     }
        // });
    }

    const customChecks = (ids: Array<number>) => {
        // getTreeInstruments.doRequest(ids).then((response) => {
        //     if (response) {
        //         listTypeInstrument.setValue(response);
        //     } else {
        //         message.error(`${intl({ id: 'Erro ao buscar intrumentos' })}.`);
        //     }
        // });
    }

    const handleValidate = (values: any) => {
        // const erros = {} as any;
        // if (!values.service) {
        //     erros.service = `${intl({ id: 'Selecione um serviço' })}.`;
        // }
        // if (!values.dataChart) {
        //     erros.dataChart = `${intl({ id: 'Selecione a informação' })}.`;
        // }
        // if (!values.date && values.period == 0) {
        //     erros.date = `${intl({ id: 'Selecione um intervalo de tempo' })}.`;
        // }
        // if (values.treeEnterprises.length == 0 && values.treeDams.length == 0) {
        //     erros.treeEnterprises = `${intl({ id: 'Selecione pelo menos um empreendimento' })}.`;
        //     erros.treeDams = `${intl({ id: 'Selecione pelo menos uma barragem' })}.`;
        // }
        // if (values.dataChart.split('-')[0] != enumTypeData.NIVEIS_CONTROLE_EMPREENDIMENTO && values.treeDams.length == 0) {
        //     erros.treeEnterprises = `${intl({ id: 'Selecione pelo menos um empreendimento' })}.`;
        //     erros.treeDams = `${intl({ id: 'Selecione pelo menos uma barragem' })}.`;
        // }
        // return erros;
    };

    const verifyIsPeriod = (dataChart: any) => {
        // let idTipoGrafico = Number(dataChart.split('-')[0])
        // if (idTipoGrafico == enumTypeData.INSTRUMENTOS_ATIVOS || idTipoGrafico == enumTypeData.INSTRUMENTOS_LEITURA_ATRASO || idTipoGrafico == enumTypeData.INSTRUMENTO_ACIMA_NIVEL_CONTROLE_KPI_TOTAL ||
        //     idTipoGrafico == enumTypeData.INSTRUMENTOS_DESCALIBRADOS || idTipoGrafico == enumTypeData.NIVEIS_CONTROLE_EMPREENDIMENTO || idTipoGrafico == enumTypeData.ADERENCIA_PLANO_ACAO) {
        //     return false;
        // } else {
        //     return true;
        // }
				return false;
    };

    // const treeEnterprise = useMemo(() => {
    //     let arr = listEmpreendimentos.value.map((item: IEmpreendimentos) => ({
    //         title: item.Nome,
    //         key: Number(item.IdEmpreendimento),
    //         children: item.Barragens.map((child: IEmpreendimentoBarragem) => ({
    //             title: child.Nome,
    //             key: Number(child.IdBarragem),
    //             idEmpreendimento: Number(child.IdEmpreendimento),
    //             isLeaf: true
    //         }))
    //     }));

    //     return arr || [];
    // }, [listEmpreendimentos.value]);

    // const treeInstrument = useMemo(() => {
    //     let arr = listTypeInstrument.value.map((item: ITipoInstrumento) => ({
    //         title: item.nome,
    //         key: Number(item.idTipoInstrumento),
    //         children: item.instrumentos.map((child: IInstrumentoChild) => ({
    //             title: child.identificador,
    //             key: Number(child.idInstrumento),
    //             isLeaf: true,
    //         }))
    //     }));

    //     return arr || [];
    // }, [listTypeInstrument.value]);

    const renderTree = (typeData: number) => {
        // if (typeData == enumTypeData.NUMERO_ANOMALIAS_ABERTAS ||
        //     typeData == enumTypeData.NUMERO_ANOMALIAS_CORRIGIDAS ||
        //     typeData == enumTypeData.NUMERO_ANOMALIAS_SEM_PLANO_ACAO ||
        //     typeData == enumTypeData.CLASSIFICACAO_QUANTO_MAGNITUDE ||
        //     typeData == enumTypeData.CLASSIFICACAO_QUANTO_CRITICIDADE ||
        //     typeData == enumTypeData.CLASSIFICACAO_QUANTO_SITUAÇÃO) {
        //     return (
        //         <TreeSelect
        //             treeData={treeEnterprise}
        //             name="treeDams"
        //             label={`* ${intl({ id: 'Empreendimentos e Barragens' })}`}
        //             loading={listEmpreendimentosLoading}
        //             style={{ marginTop: 10 }}
        //         />
        //     );
        // } else if (typeData == enumTypeData.NIVEIS_CONTROLE_EMPREENDIMENTO) {
        //     return (
        //         <TreeSelect
        //             treeData={treeEnterprise}
        //             name="treeEnterprises"
        //             label={`* ${intl({ id: 'Empreendimentos' })}`}
        //             loading={listEmpreendimentosLoading}
        //             style={{ marginTop: 10 }}
        //             getFather
        //         />
        //     )
        // } else if (typeData == enumTypeData.LEITURA_TIPO_INSTRUMENTOS_PERIODO) {
        //     return (
        //         <>
        //             <TreeSelect
        //                 treeData={treeEnterprise}
        //                 name="treeDams"
        //                 label={`* ${intl({ id: 'Barragens' })}`}
        //                 loading={listEmpreendimentosLoading}
        //                 customCheck={customChecks}
        //                 style={{ marginTop: 10 }}

        //             />
        //             <TreeSelect
        //                 treeData={treeInstrument}
        //                 name="treeTypeInstruments"
        //                 label={`* ${intl({ id: 'Tipos instrumento' })}`}
        //                 loading={getTreeInstruments.loading}
        //                 style={{ marginTop: 10 }}
        //                 getFather
        //             />
        //         </>
        //     );
        // } else if (typeData == enumTypeData.LEITURA_INSTRUMENTOS_PERIODO) {
        //     return (
        //         <>
        //             <TreeSelect
        //                 treeData={treeEnterprise}
        //                 name="treeDams"
        //                 label={`* ${intl({ id: 'Barragens' })}`}
        //                 loading={listEmpreendimentosLoading}
        //                 customCheck={customChecks}
        //                 style={{ marginTop: 10 }}
        //             />
        //             <TreeSelect
        //                 treeData={treeInstrument}
        //                 name="treeInstruments"
        //                 label={`* ${intl({ id: 'Instrumentos' })}`}
        //                 loading={getTreeInstruments.loading}
        //                 style={{ marginTop: 10 }}

        //             />
        //         </>
        //     );
        // } else {
        //     return (
        //         <TreeSelect
        //             treeData={treeEnterprise}
        //             name="treeDams"
        //             label={`* ${intl({ id: 'Barragens' })}`}
        //             loading={listEmpreendimentosLoading}
        //             style={{ marginTop: 10 }}
        //         />
        //     );
        // }
				return (<div>Hello World!</div>)
    }

    const formatInitialValues = () => {
        return {
            service: selectedWidget?.IdServico ? selectedWidget.IdServico : 1,
            description: selectedWidget?.descricao ? selectedWidget.descricao : '',
            dataChart: selectedWidget?.typeData && selectedWidget?.typeGraph ? `${selectedWidget.typeData}-${selectedWidget.typeGraph}` : '',
            period: selectedWidget?.dataInicio && selectedWidget?.dataFim ? 0 : (selectedWidget?.periodo ? selectedWidget?.periodo : 30),
            date: selectedWidget?.dataInicio && selectedWidget?.dataFim ? [moment(selectedWidget.dataInicio || moment()), moment(selectedWidget.dataFim || moment())] : null,
            treeEnterprises: selectedWidget?.IdEmpreendimento ? selectedWidget.IdEmpreendimento : [],
            treeDams: selectedWidget?.IdBarragem ? selectedWidget.IdBarragem : [],
            treeTypeInstruments: selectedWidget?.IdTipoInstrumento ? selectedWidget.IdTipoInstrumento : [],
            treeInstruments: selectedWidget?.IdInstrumento ? selectedWidget.IdInstrumento : [],
        }
    }

    return (

        <Wrapper>


            <Formik
                enableReinitialize
                initialValues={formatInitialValues()}
                validate={(values) => handleValidate(values)}
                onSubmit={onSubmit}
                innerRef={formikFormRef}
                validateOnBlur
            >
                {(props: any) => (
                    <Form>
                        <Drawer
                            placement={"right"}
                            width={500}
                            onClose={() => closeDrawer()}
                            visible={visibleDrawer.value}
                            footer={
                                <Space
                                    style={{
                                        position: 'absolute',
                                        width: 'fit-content',
                                        height: '55px',
                                        top: 0,
                                        right: 24,
                                        display: 'flex',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                    <BtnAntd onClick={() => closeDrawer()}> {'Cancelar'} </BtnAntd>
                                    <Button
                                        id="t-cadastrar-widget"
                                        text={selectedWidget ? 'Editar' : 'Salvar'}
                                        style={{ width: '84.89px', margin: 'none', marginTop: 0 }}
                                    />
                                </Space>
                            }
                            closable={false}
                            title={
                                <div>
                                    <CloseOutlinedSys onClick={closeDrawer} color='#00000073' />
                                    <span>
                                        {selectedWidget ? 'Editar widget' : 'Novo widget'}
                                    </span>
                                </div>
                            }
                        >
                            {/* <Select
                                id="d-cadastrar-serviço"
                                label={`* ${intl({ id: 'Serviço' })}`}
                                onChange={getServices}
                                name="service"
                                disabled={obtertipoServico.loading || selectedWidget}
                                notFoundContent={<SysEmpty isEmpty={true} />}

                            >
                                {listService.value.map((item: IServicoDto) => (
                                    <SelectOption
                                        value={Number(item.idServico)}
                                        key={Number(item.idServico)}
                                    >
                                        {item.descricao}
                                    </SelectOption>
                                ))}
                            </Select> */}

                            {/* <Select
                                id="d-cadastrar-dado-grafico"
                                label={`* ${intl({ id: 'Informação' })}`}
                                name="dataChart"
                                loading={obtertipoServico.loading}
                                disabled={obtertipoServico.loading || selectedWidget}
                                notFoundContent={<SysEmpty isEmpty={true} />}
                            >
                                {listTypeData.value.map((item: ITipoInformacaoDto) => (
                                    <SelectOption
                                        key={`${item.idTipoInformacao}-${item.idTipoGrafico}`}
                                        value={`${item.idTipoInformacao}-${item.idTipoGrafico}`}
                                    >
                                        {`(${item?.idTipoGraficoNavigation?.nome}) ${item.nome}`}
                                    </SelectOption>
                                ))}
                            </Select> */}

                            {selectedWidget &&
                                <Input
                                    label={'Título'}
                                    name='description'
                                />
                            }

                            {verifyIsPeriod(props.values.dataChart) &&
                                <Select
                                    id="d-cadastrar-teste"
                                    label= {`* ${'Período'}`}
                                    name="period"
                                >
                                    <SelectOption value={30}>
																			'Últimos 30 dias'
                                    </SelectOption>
                                    <SelectOption value={60}>
																			'Últimos 60 dias'
                                    </SelectOption>
                                    <SelectOption value={90}>
																			'Últimos 90 dias'
                                    </SelectOption>
                                    <SelectOption value={180}>
																			'Últimos 180 dias'
                                    </SelectOption>
                                    <SelectOption value={365}>
																			'Últimos 365 dias'
                                    </SelectOption>
                                    <SelectOption value={36500}>
																			'Desde o início'
                                    </SelectOption>
                                    <SelectOption value={0}>
																			'Customizar data'
                                    </SelectOption>

                                </Select>
                            }

                            {props.values.period == 0 && verifyIsPeriod(props.values.dataChart) &&
                                <RangePicker
                                    label={`* ${'Selecione o período'}`}
                                    id="d-cadastrar-data"
                                    name='date'
                                />
                            }

                            {renderTree(Number(props.values.dataChart.split('-')[0]))}
                        </Drawer>
                    </Form>
                )}
            </Formik >
        </Wrapper>
    )
}

export default DrawerAddWidget;


const Wrapper = styled.div`

.ant-btn {
        margin-top: none;
    }

    
`

const CloseOutlinedSys = styled(CloseOutlined)`
    display: inline-block;
    margin-right: 12px;
    color: #00000073;
    font-weight: 700;
    font-size: 16px;
    font-style: normal;
    line-height: 1;
    text-align: center;
    text-transform: none;
    text-decoration: none;
    background: transparent;
    border: 0;
    outline: 0;
    cursor: pointer;
    transition: color .3s;
    text-rendering: auto;
    :hover {
        color: #000000;
    }

   
`