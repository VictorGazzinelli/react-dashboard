import React, { useContext } from 'react';
// import { useIntl } from 'react-intl';
import styled from 'styled-components';
import { useParams } from 'react-router';
import { UseBoolean } from 'react-hanger';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Typography, Tooltip, Popconfirm, Divider, Row, Col } from 'antd';

import SysDivider from '../../../../../components/SysDivider';
import { DashboardContext } from '../../screens/ScreenDashboard';
import PopoverRenameDashboard from '../popoverRenameDashboard/PopoverRenameDashboard';

interface IProps {
    visibleDrawer: UseBoolean,
}

const ButtonBar: React.FC<IProps> = ({ visibleDrawer }) => {
    // const intl = useIntl().formatMessage;
    const { IdDashboard } = useParams<{ IdDashboard: string }>();
    // const { onDashboardDelete, titleDashboard, onDashboardEdit,selectedDashboard } = useContext(DashboardContext)
		const { selectedDashboard } = useContext(DashboardContext)

    return (
        <Wrapper useMargin={!selectedDashboard?.Nome}>
            <Row className='row-actions'>
                <Col className='centralize-col'>
                    <Typography.Title level={4} className="title-dashboard">
                        {selectedDashboard?.Nome || 'Novo Dashboard'}
                    </Typography.Title>
                </Col>
                <Col className='centralize-col'>
                    {/* {selectedDashboard?.Nome &&  
                        <PopoverRenameDashboard
                            titleDashboard={titleDashboard}
                            onEdit={onDashboardEdit}
                        />
                    } */}
										{selectedDashboard?.Nome &&  
                        <PopoverRenameDashboard
                            titleDashboard={'Dashboard'}
                            onEdit={() => {}}
                        />
                    }
                </Col>
                <Col className='centralize-col'>
                    {selectedDashboard?.Nome  &&
                        <>
                            <Divider type="vertical" />
                            {/* <Popconfirm
                                title={intl({ id: 'Tem certeza que deseja excluir' }) + ` ${titleDashboard}?`}
                                okText={intl({ id: "Sim" })}
                                cancelText={intl({ id: "Não" })}
                                onConfirm={() => onDashboardDelete(Number(IdDashboard))}
                            > */}
														<Popconfirm
                                title={'Tem certeza que deseja excluir este dashboard?'}
                                okText={"Sim"}
                                cancelText={"Não"}
                                onConfirm={() => {}}
                            >
                                <Tooltip title={'Excluir'}>
                                    <Button
                                        id="t-button-deletar-dashboard"
                                        size="small"
                                        type="default"
                                        shape="circle"
                                        icon={
                                            <DeleteOutlined />
                                        }
                                    />
                                </Tooltip >
                            </Popconfirm>
                        </>
                    }
                </Col>
                <Col className='centralize-col'>
                    <Divider type="vertical" />
                    <Tooltip title={selectedDashboard?.Nome ? 'Novo widget' : 'Você ainda não tem dashboards. Clique no botão "Novo dashboard" para criar'}>
                        <Button
                            id="t-button-adicionar-widget"
                            size="small"
                            type="primary"
                            shape="circle"
                            disabled={!selectedDashboard?.Nome}
                            onClick={visibleDrawer.setTrue}
                            icon={
                                <PlusOutlined />
                            }
                        />
                    </Tooltip>
                </Col>
            </Row>
            {selectedDashboard?.Nome &&
                <SysDivider title='Lista de widgets' style={{ marginBottom: '15px' }} />
            }
        </Wrapper>
    );
};

export default ButtonBar;

const Wrapper = styled.div<{ useMargin: boolean }>`
    padding: 8px;
    padding-bottom: 0px;

    .centralize-col {
        display: flex;
        align-items: center;
    }

    .title-dashboard {
        display: flex;
        align-items: center;
        height: 100%;
        margin-bottom: 0px;
    }

    .row-actions {
        ${(props) => props.useMargin && 'margin-bottom:40px'};
    }
`;