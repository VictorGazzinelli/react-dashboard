import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { EditOutlined } from '@ant-design/icons';
import { Button, Divider, Form, Input, Popover, Row, Tooltip } from 'antd';

interface IProps {
    onEdit: (newName: string) => void;
    titleDashboard: string
}

const PopoverRenameDashboard: React.FC<IProps> = ({ onEdit, titleDashboard }) => {
    const [nameForm, setNameForm] = useState<string>('');
    const [status, setStatus] = useState<boolean>(false)

    useEffect(() => {
        setNameForm(titleDashboard || '');

        return () => {
            setNameForm('');
        }
    }, [status])

    const onSubmit = () => {
        onEdit(nameForm);
        setStatus(false);
    }

    const onStatusChange = (visible: boolean) => {
        setStatus(visible);
    }

    return (
        <Popover
            title={'Editar dashboard'}
            trigger="click"
            placement="left"
            visible={status}
            onVisibleChange={onStatusChange}
            content={
                <ContainerPopover onFinish={onSubmit} >
                    <Row>
                        <Input
                            autoFocus
                            className={'identificador-input-inner'}
                            id="name"
                            type={'text'}
                            required={true}
                            onChange={(e) => setNameForm(e.target.value)}
                            value={nameForm}
                        />
                    </Row>
                    <RowButton>
                        <StyledButton htmlType="submit" type="primary" size="small">
                            {'Salvar'}
                        </StyledButton>
                    </RowButton>
                </ContainerPopover>
            }
        >
            <Divider type="vertical" />
            <Tooltip title={'Editar'}>
                <Button
                    id="t-button-adicionar-widget"
                    size="small"
                    type="default"
                    shape="circle"
                    onClick={() => setStatus(!status)}
                    icon={
                        <EditOutlined />
                    }
                />
            </Tooltip>
        </Popover>
    )
}

export default PopoverRenameDashboard;

const ContainerPopover = styled(Form)`
    min-width: 300px;
`

const RowButton = styled(Row)`
    display: flex;
    justify-content: end;
`;

const StyledButton = styled(Button)`
    margin-top: 10px;
`;