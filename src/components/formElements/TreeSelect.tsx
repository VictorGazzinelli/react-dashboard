import React, { useMemo } from 'react';
import { Tree, TreeProps, Spin } from 'antd';
import styled from 'styled-components';
import { DataNode } from 'antd/lib/tree';
import { ErrorMessage, useField } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

interface IProps extends TreeProps {
    treeData: DataNode[],
    required?: boolean,
    name: string,
    label?: string,
    loading?: boolean,
    customCheck?: (itens: Array<number>) => void,
    getFather?: boolean
}

const TreeSelect: React.FC<IProps> = ({ treeData, required = false, name, label, loading = false, customCheck, getFather = false, ...rest }) => {
    const [field, meta, helpers] = useField(name);

    const treeNodes = useMemo(() => {
        let arr = treeData.map((father: any) => ({
            title: father.title,
            key: father.key,
            children: father.children.map((child: any) => ({
                title: child.title,
                key: child.key,
                isLeaf: true,
                disableCheckbox: getFather ? true : false,
            }))
        }));

        return arr || [];
    }, [getFather, treeData]);

    const onCheckTreeNode = (nodes: DataNode[]) => {
        let arrSelectedNodes: number[] = [];
        nodes.map((node: DataNode) => {
            if (getFather) {
                if (!node.isLeaf) {
                    arrSelectedNodes.push(Number(node.key));
                }
            } else {
                if (node.isLeaf) {
                    arrSelectedNodes.push(Number(node.key));
                }
            }
        });

        helpers.setValue(arrSelectedNodes);
        if (customCheck) {
            customCheck(arrSelectedNodes)
        }
    };

    return (
        <Wrapper required={required}>
            <label htmlFor={name}>
                {label &&
                    `${label}:`
                }
            </label>
            {loading ? (
                <Spin />
            ) : (
                <Tree
                    checkable
                    onCheck={(keys, { checkedNodes }) => onCheckTreeNode(checkedNodes)}
                    defaultCheckedKeys={meta.initialValue}
                    checkedKeys={field.value}
                    treeData={treeNodes}
                    {...rest}
                />
            )}
            <ErrorMessage name={name}>
                {(a) => (Array.isArray(a) ? a.map((msg) => (
                    <span className='span-error'>
                        <FontAwesomeIcon icon={faExclamationCircle} />
                        {msg}
                    </span>
                )) : (
                    <span className='span-error'>
                        <FontAwesomeIcon icon={faExclamationCircle} />
                        {a}
                    </span>
                ))}
            </ErrorMessage>
        </Wrapper>
    )
}

export default TreeSelect;

const Wrapper = styled.div<{ required: boolean }>`
    display: flex;
    flex-direction: column;
    margin-bottom: 15px;

    label {
        font-weight: 500;
        ${(props) => props.required && "::after{ content:'*'; margin-left:5px; color:red; }"}
    }

    .span-error {
        color: red;
    }

    svg {
        margin-right: 5px;
    }

    .error-wrapper {
        display: flex;
        flex-direction: column;
    }
`;