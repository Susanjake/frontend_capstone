import { Row, Space, Typography } from "antd"

const { Title } = Typography;


export default function () {
    return (
        <div style={{ height: "100vh" }}>
            <Row type="flex" justify="center" align="middle" style={{ minHeight: "100vh" }}>
                <Title
                    level={1}
                    style={{ color: "darkblue", textAlign: "center",fontWeight:900,fontSize:"70px",
                    textShadow:"2px 0 #fff, -2px 0 #fff, 0 2px #fff, 0 -2px #fff,1px 1px #fff, -1px -1px #fff, 1px -1px #fff, -1px 1px #fff"
                }}
                >
                    Samarthya
                </Title>
                <Title
                    style={{ color: "black", textAlign: "center",fontWeight:500,fontSize:"36px",fontStyle:"italic",
                    textShadow:"2px 0 #fff, -2px 0 #fff, 0 2px #fff, 0 -2px #fff,1px 1px #fff, -1px -1px #fff, 1px -1px #fff, -1px 1px #fff"
                }}
                >
                    Cultivating Talent, Elevating Performance.
                </Title>
                
            </Row>

        </div>
    )
}