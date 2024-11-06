import React from "react";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Form, Divider, Button, Select, Input } from "antd";
const { TextArea } = Input;

export default function (props) {
    return (
        <Form.List name="modules">
            {(fields, { add, remove }) => {
                return (
                    <div>
                        {fields.map((field, index) => (
                            <div key={field.key}>
                                <Divider>Module {index + 1}</Divider>
                                <Form.Item
                                    name={[index, "module_name"]}
                                    label="Module Name"
                                    rules={[{ required: true }]}
                                >
                                    <Input placeholder="Module Name" />
                                </Form.Item>
                                <Form.Item
                                    label="Expected Number of meetings"
                                    name={[index, "expected_meetings"]}
                                    rules={[{ required: true }]}
                                >
                                    <Input type="number" />
                                </Form.Item>
                                <Form.Item name={[index, "detailed_description"]} label="Detailed description">
                                    <TextArea rows={4} />
                                </Form.Item>
                                {fields.length > 1 ? (
                                    <Button
                                        type="danger"
                                        className="dynamic-delete-button"
                                        onClick={() => remove(field.name)}
                                        icon={<MinusCircleOutlined />}
                                    >
                                        Remove Above Module
                                    </Button>
                                ) : null}
                            </div>
                        ))}
                        <Divider />
                        <Form.Item>
                            <Button
                                type="dashed"
                                onClick={() => add()}
                                style={{ width: "60%" }}
                            >
                                <PlusOutlined /> Add Module
                            </Button>
                        </Form.Item>
                    </div>
                );
            }}
        </Form.List>
    );
}
