import { Table, Tag, Space, Button, Form, Input, Select } from "antd"
import Modal from "antd/lib/modal/Modal";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../store";
import { addCategory, deleteCategory, getCategories, updateCategory } from "../store/actions/categoryActions";
import { Category, CategoryFrom } from "../types/category";
import { SketchPicker } from 'react-color';
import {
    EditOutlined, DeleteOutlined
} from '@ant-design/icons';
import { Mode } from "../types/general";




const emptyFrom: CategoryFrom = {
    name: "",
    type: "expense",
    color: "black"
}
function Categories() {

    const { data } = useSelector((state: AppState) => state.categories)
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [mode, setMode] = useState<Mode>("new");
    const [form, setFrom] = useState<CategoryFrom>(emptyFrom);
    const [updateId, setUpdateId] = useState<number | null>(null);
    const [deleteId, setDeleteId] = useState<number | null>(null);


    const showModal = (mode: Mode) => {
        setIsModalVisible(true)
        setMode(mode)
    }

    const handleOk = () => {
        if (mode === "new")
            dispatch(addCategory(form))
        else if (mode === "edit" && typeof updateId === 'number') dispatch(updateCategory(form, updateId))
        else if (mode === "delete" && typeof deleteId === 'number') dispatch(deleteCategory(deleteId))
        setIsModalVisible(false);
        setMode("new");
        setFrom(emptyFrom)
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setMode("new");
        setFrom(emptyFrom)
        setUpdateId(null);
        setDeleteId(null)
    };
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
            render: (text: string, category: Category) => {
                return <Tag color={category.color}>{category.type.toUpperCase()}</Tag>
            }
        }, {
            title: 'Action',
            key: 'action',
            render: (text: string, category: Category) => (
                <Space size="middle">
                    <EditOutlined style={{ color: "#0390fc" }} disabled onClick={() => {
                        showModal("edit");
                        setFrom(category)
                        setUpdateId(category.id)
                    }}></EditOutlined>
                    <DeleteOutlined style={{ color: "#c20808" }} onClick={() => {
                        showModal("delete");
                        setDeleteId(category.id)
                    }}></DeleteOutlined>
                </Space>
            ),
        },
    ];

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCategories())
    }, [])
    return (
        <React.Fragment>
            <Button type="primary" onClick={() => showModal("new")} style={{ marginBottom: 16 }}>
                New Category
            </Button>
            <Modal title={mode === "new" ? "Create New Category" : mode === "edit" ? "Update Category" : "Delete Category"}
                visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} okButtonProps={{ disabled: !form.name && !(mode === "delete") }}>
                {mode === "edit" || mode === "new" ?
                    <Form
                        labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
                        <Form.Item label="Category Name" required rules={[
                            {
                                required: true,
                                message: 'Please input category name',
                            },
                        ]}>
                            <Input name="name" value={form.name} onChange={(e) => setFrom({ ...form, name: e.target.value })} />
                        </Form.Item>
                        <Form.Item label="Category Type">
                            <Select defaultValue="expense" value={form.type} onChange={type => setFrom({ ...form, type })}>
                                <Select.Option value="income">Income</Select.Option>
                                <Select.Option value="expense">Expense</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item label="Color">
                            <SketchPicker color={form.color} onChange={color => setFrom({ ...form, color: color.hex })}></SketchPicker>
                        </Form.Item>
                    </Form> : mode === "delete" ? <>Are you sure?</> : null}
            </Modal>
            <Table columns={columns} dataSource={data} />
        </React.Fragment>

    )
}

export default Categories
