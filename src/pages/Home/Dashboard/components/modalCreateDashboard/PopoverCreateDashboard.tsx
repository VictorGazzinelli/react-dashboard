import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Row, Form, Button, Input, Popover, Tooltip } from 'antd';
import { DashboardContext } from '../../screens/ScreenDashboard';

interface IProps {
    onCreate: (name: string) => void,
}

const PopoverCreateDashboard: React.FC<IProps> = ({ onCreate }) => {

    const [nameForm, setNameForm] = useState<string>('');
    const { popoverlDashboard } = useContext(DashboardContext)

    useEffect(() => {
        setNameForm('');
    }, [popoverlDashboard.value]);

    const onSubmit = () => {
        onCreate(nameForm);
    };

    const onStatusChange = (visible: boolean) => {
        popoverlDashboard.setValue(visible);
    }

    return (
        <Popover
            title={'Novo dashboard'}
            trigger="click"
            placement="bottom"
            visible={popoverlDashboard.value}
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
            <Tooltip title={'Criar um novo dashboard'}>
                <Button
                    type="primary"
                    className="button-register"
                    onClick={() => popoverlDashboard.setValue(!popoverlDashboard.value)}
                >
                    {'Novo dashboard'}
                </Button>
            </Tooltip>
        </Popover>
    );
}

export default PopoverCreateDashboard;

const RowButton = styled(Row)`
    display: flex !important;
    justify-content: center !important;
`;

const StyledButton = styled(Button)`
    margin-top: 10px;
`;

const ContainerPopover = styled(Form)`
    min-width: 300px;
`


