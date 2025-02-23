import React, { useState, useEffect } from 'react';
import { Layout, InputNumber, Table, Button, Modal, Input, Form, message, Checkbox, Row, Col } from 'antd';
import { PlusOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import axios from 'axios';

const MainPage = () => {
    const [data, setData] = useState();
    const [search, setSearch] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [isAddModalVisible, setIsAddModalVisible] = useState(false);
    const [isRemoveModalVisible, setIsRemoveModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [removeMsg, setRemoveMsg] = useState(false);
    const [removeWeightValue, setRemoveWeightValue] = useState(0);
    const [removeAllInputAble, setremoveAllInputAble] = useState(false);
    const [form] = Form.useForm();
  
    // Fetch data from backend
    const fetchGroceries = async (searchKeyword) => {
      try {
        console.log("Hi! I'm fetching groceries!");
        const response = await axios.get('http://localhost:5000/api/queryTable', {
            params: { searchString: searchKeyword },
        });
        console.log("I got groceries!", response);
        setData(response.data.result);
        setSearchResult(response.data.result);
      } catch (err) {
        message.error('Failed to fetch groceries');
      }
    }
  
    useEffect(() => {
      fetchGroceries("");
      console.log("I am worthy!", data);
    }, []);

    useEffect(() => {
      console.log("I am not worthy!")
      if (Array.isArray(data)) {
        // Filtered groceries based on search
        setSearchResult(data.filter(item =>
          item.name.toLowerCase().includes(search.toLowerCase())
        ));
      }
    }, [data, search]); // Only run when query or data changes
  
    // Add item handler
    const handleAdd = async (values) => {
      try {
        console.log("kuroko is black.");
        console.log(values);
        // Validate the input
        // 1. Weight should be positive
        // 2. lastsFor should be positive
        if (values.weight <= 0) {
          alert("Weight cannot be negative. Please try again.");
        }

        // Alternative: input expiry date directly
        if (values.lastsFor <= 0) {
          alert("The number of days the food lasts cannot be negative. Please try again.");
        }
        await axios.post('http://localhost:5000/api/addItem', {
          newItem: values,
        });

        console.log('Item added successfully!');
        setIsAddModalVisible(false);
        //form.resetFields();
        await fetchGroceries("");
      } catch (err) {
        console.log('Failed to add item');
      }
    };
  
    // Remove item handler
    const handleRemove = async (values) => {
      try {
        console.log("I am warsan shire", values)
        removeMsg || removeAllInputAble ? await axios.put(`http://localhost:5000/api/removeItem`, {
          id: selectedItem._id,
        }) : await axios.put(`http://localhost:5000/api/updateItem`, {
          id: selectedItem._id,
          newWeight: selectedItem.weight - values.weight,
        })
        console.log('Item removed successfully!');
        setIsRemoveModalVisible(false);
        setRemoveMsg(false);
        setremoveAllInputAble(false);
        setRemoveWeightValue(0);
        await fetchGroceries("");
      } catch (err) {
        message.error('Failed to remove item');
      }
    };
    
    const handleCheckboxChange = (e) => {
      setremoveAllInputAble(e.target.checked)
    }

    // Table columns
    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Weight',
        dataIndex: 'weight',
        key: 'weight',
      },
      {
        title: 'Date',
        dataIndex: 'boughtAt',
        key: 'boughtAt',
      },
      {
        title: 'Lasts For (Days)',
        dataIndex: 'lastsFor',
        key: 'lastsFor',
      },
      {
        title: 'Actions',
        key: 'actions',
        render: (_, record) => (
          <Button
            type="primary"
            danger
            icon={<DeleteOutlined />}
            onClick={() => {
              setSelectedItem(record);
              setIsRemoveModalVisible(true);
            }}
          >
            Remove
          </Button>
        ),
      },
    ];
  
    return (<>
        <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => fetchGroceries("")}
            />
        <Layout>
          <h2 style={{ marginLeft: '20px' }}>Grocery Manager</h2>
          <div style={{ marginBottom: '16px', display: 'flex', gap: '10px' }}>
            <Input
              placeholder="Search groceries..."
              prefix={<SearchOutlined />}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => setIsAddModalVisible(true)}
            >
              Add Item
            </Button>
          </div>
          <Table columns={columns} dataSource={searchResult} rowKey="_id" />
        </Layout>
  
        {/* Add Item Modal */}
        <Modal
          title="Add Grocery Item"
          open={isAddModalVisible}
          onCancel={() => setIsAddModalVisible(false)}
          footer={null}
        >
          <Form form={form} onFinish={handleAdd} layout="vertical">
            <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please enter the name' }]}>
              <Input />
            </Form.Item>
            <Form.Item name="weight" label="Weight" rules={[{ required: true, message: 'Please enter the weight' }]}>
              <Input type="number"/>
            </Form.Item>
            <Form.Item name="boughtAt" label="Date" rules={[{ required: true, message: 'Please enter the date' }]}>
              <Input type="date" />
            </Form.Item>
            <Form.Item name="lastsFor" label="Lasts For (Days)" rules={[{ required: true, message: 'Please enter duration' }]}>
              <Input type="number" />
            </Form.Item>
            <Button type="primary" htmlType="submit">Add Item</Button>
          </Form>
        </Modal>
  
        {/* Remove Confirmation Modal */}
        <Modal
          title="Remove Grocery Item"
          open={isRemoveModalVisible}
          onCancel={() => {
            setRemoveWeightValue(0);
            setIsRemoveModalVisible(false);
            setRemoveMsg(false); 
            setremoveAllInputAble(false);
            form.resetFields();
          }}
          footer = {null}
        >
          <p>Enter the weight(g) to remove "{selectedItem?.name}"</p>
          <p>You currently have {selectedItem?.weight}g. </p>
          <Form form={form} onFinish={handleRemove} layout="vertical">
            <Row>
              <Col>
                <Form.Item name="weight" label="Weight (g)" rules={ removeAllInputAble ? [] : [
                    { required: true, message: 'Please enter the weight' },
                    { type: "number", min: 1, message: "Weight must be positive!"}
                  ]}>
                  <InputNumber disabled={removeAllInputAble} style={{ width: 300 }} value={removeWeightValue} onChange={v => { setRemoveWeightValue(v); setRemoveMsg(selectedItem.weight - v <= 0) }}/>
                </Form.Item>

              </Col>
              <Col>
                  {
                    removeMsg && !removeAllInputAble ? <p style={{color: "red"}}>NOTE: This value will remove the item entirely!</p> : <></>
                  }
              </Col>
            </Row>
            <Row>
              <Checkbox onChange = {(e) => {setremoveAllInputAble(e.target.checked);}}>
                Remove all
              </Checkbox>
            </Row>
            <br/>
            <Row>
              <Button type="primary" htmlType="submit" onChange={handleCheckboxChange}>Remove</Button>
            </Row>
          </Form>
        </Modal>
      </>
    );
  };
  
  export default MainPage;