import { useState } from "react";
import { Layout, Menu, Button } from "antd";
import { useLocation, useNavigate } from "react-router-dom";

const { Sider } = Layout;

const items = [
    //{ key: "/", label: "Main" },
    { key: "/Main", label: "Main" },
    { key: "/Recipe", label: "Recipe" },
    { key: "/Secret", label: "Secret..." },
]

export default () => {
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const pathSnippets = location.pathname.split('/');

    const handleMenuClick = (e) => {
        console.log('click ', e);
        switch(e.key) {
            case "/":
                navigate('/');
                break;
            case "/Main":
                navigate('/Main');
                break;
            case "/Recipe":
                navigate('/Recipe');
                break;
            case "/Secret":
                navigate('/Secret');
                break;
            default:
                break;
        }
    };
    
    return <>
        <Sider 
            breakpoint="lg"
            collapsible
            onCollapse={setCollapsed}
            width={200}
            style={{backgroundColor: 'white'}}            
            >
            <Button type="primary" onClick={() => setCollapsed(!collapsed)} style={{ marginBottom: 16 }}/>
            <Menu mode="inline" defaultSelectedKeys={['1']} inlineCollapsed={collapsed} selectedKeys = {location.pathname} items={items} onClick={handleMenuClick}/>
        </Sider>
    </>
};