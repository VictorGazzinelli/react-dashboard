import React from 'react';
import styled from 'styled-components';
import { Card, Row, message } from 'antd';
import { UseBoolean } from 'react-hanger';

interface IProps {
    visibleDrawer: UseBoolean,
    hasDashboard?: boolean
}

const NewWidget: React.FC<IProps> = ({ hasDashboard, visibleDrawer }) => {

    function showDrawer() {
        visibleDrawer.setValue(true);
    }

    function showMessage() {
        message.info({
            content: 'Você precisa cadastrar um Dashboard primeiro!',
            style: {
                flex: 1,
                justifyContent: 'center',
                marginLeft: 417
            },
        })
    }

    return (
        <Wrapper>
            <span className='message-new-widget'>
                {hasDashboard ?
                    'Seja bem vindo ao seu novo dashboard. Clique no botão abaixo para adicionar novos widgets e começar a criar o seu painel':
                    'Selecione ou crie um novo dashboard para começar a adicionar novos widgets'
                }
            </span>
            <Card
                className='add-widget-card'
                onClick={hasDashboard ? showDrawer : () => showMessage()}
            >
                <Row className="plus-circle row-layout">
                    <span>+</span>
                </Row>
                <Row className='row-layout'>
                    <span>{'Adicionar um novo widget'}</span>
                </Row>
            </Card>
        </Wrapper>
    );
};

export default NewWidget;

const Wrapper = styled.div`
    background-color: #fff;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .add-widget-card {
        cursor: pointer;
        user-select: none;
        color: ${(props) => props.theme.PRIMARY_MAIN};
        margin-top: 50px;
        border-radius: 10px;
        border: 1px solid rgb(232, 232, 232);
        box-shadow: rgb(139, 147, 255) 5px 5px 12px -10px;

        &:hover {
            box-shadow: rgb(0, 14, 214) 5px 5px 12px -10px;
        }
    }

    .plus-circle {
        font-size: 30px;
        align-self: center;
    }

    .message-new-widget {
        display: flex;
        justify-content: center;
        text-align: center;
        width: 50%;
        font-size: 17px;
    }

    .row-layout {
        width: 100%;
        display: flex;
        justify-content: center;
    }
`;