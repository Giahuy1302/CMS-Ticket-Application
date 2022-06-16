import {
  Col,
  DatePicker,
  Layout,
  Radio,
  RadioChangeEvent,
  Row,
  Select,
  Table,
  Typography,
} from "antd";
import React, { useEffect, useState } from "react";
import Button from "../../common/Button";
import Search from "../../common/Search";
import moment from "moment";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../.firebase/config";

interface Props {
  setTagIndex: React.Dispatch<React.SetStateAction<string>>;
}

const Check = ({ setTagIndex }: Props) => {
  const [dataTicketPage, setDataTicketPage] = useState<any[]>([]);
  useEffect(() => {
    setTagIndex("check");
    const data = async () => {
      const ticket = await getDocs(collection(db, "check"));
      const ticketData = ticket.docs.map((item: any) => {
        return {
          ...item.data(),
          id: item.id,
        };
      });
      setDataTicketPage(ticketData);
    };
    data();
  }, [setTagIndex]);

  const [value, setValue] = useState(1);

  const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value);
  };

  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      render: (stt: number) => {
        return <div>{stt}</div>;
      },
    },
    {
      title: () => <div style={{}}>Số vé</div>,
      dataIndex: "ticketNumber",
      render: (code: number) => {
        return <div style={{}}>{code}</div>;
      },
    },
    {
      title: () => <div style={{}}>Tên sự kiện</div>,
      dataIndex: "eventName",
      render: (name: string) => {
        return <div style={{}}>{name}</div>;
      },
    },
    {
      title: () => (
        <div
          style={{
            textAlign: "right",
          }}
        >
          Ngày sử dụng
        </div>
      ),
      dataIndex: "dateUsed",
      render: (date: string) => {
        return (
          <div
            style={{
              textAlign: "right",
            }}
          >
            {date}
          </div>
        );
      },
    },

    {
      title: "Loại vé",
      dataIndex: "type",
      render: (type: string) => {
        return <div>{type}</div>;
      },
    },
    {
      title: "Cổng check-in",
      dataIndex: "port",
      render: (port: string) => {
        return <div>{port}</div>;
      },
    },
    {
      title: "",
      dataIndex: "verify",
      render: (verify: boolean) => {
        switch (verify) {
          case true:
            return (
              <div
                style={{
                  color: "#FD5959",
                  fontWeight: "500",
                }}
                >
                Đã đối soát
              </div>
            );
            case false:
              return (
                <div
                style={{
                  color: "#A5A8B1",
                  fontWeight: "500",
                }}
              >
                Chưa đối soát
              </div>
            );
        }
      },
    },
  ];

  return (
    <div style={{ display: "flex" }}>
      <Layout.Content
        style={{
          borderRadius: "24px",
          maxWidth: "1097px",
          minHeight: "963px",
          backgroundColor: "white",
          padding: "28px",
          marginRight: "32px",
        }}
      >
        <Typography.Title
          style={{ marginBottom: "46px", fontSize: "36px", fontWeight: "700" }}
        >
          Đối soát vé
        </Typography.Title>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Search size="445px" placeholder="Tìm bằng số vé" />
          <div style={{ marginTop: "-4px" }}>
            <Button margin="0 10px" width="170px" type="primary">
              Chốt đối soát
            </Button>
          </div>
        </div>
        <Table
          bordered={false}
          style={{ marginTop: "30px", alignItems: "center" }}
          dataSource={dataTicketPage}
          columns={columns}
          pagination={{
            pageSize: 12,
            style: {
              marginTop: "48px",
              display: "flex",
              justifyContent: "center",
            },
            size: "small",
            prevIcon: () => <span style={{ color: "#A5A8B1" }}> &#9664;</span>,
            nextIcon: <span style={{ color: "#A5A8B1" }}> &#9654;</span>,
          }}
        />
      </Layout.Content>
      <Layout.Content
        style={{
          borderRadius: "24px",
          minWidth: "446px",
          minHeight: "963px",
          backgroundColor: "white",
          padding: "34px 24.5px",
        }}
      >
        <Typography.Title
          style={{
            marginTop: "-12px",
            marginBottom: "32px",
            fontSize: "24px",
            fontWeight: "700",
          }}
        >
          Lọc vé
        </Typography.Title>
        <Select
          showSearch
          size="large"
          style={{ width: "100%", marginBottom: "20px" }}
          placeholder="Search to Select"
          optionFilterProp="children"
          filterOption={(input, option) =>
            (option!.children as unknown as string).includes(input)
          }
          filterSort={(optionA, optionB) =>
            (optionA!.children as unknown as string)
              .toLowerCase()
              .localeCompare(
                (optionB!.children as unknown as string).toLowerCase()
              )
          }
        ></Select>
        <Row>
          <Col span={11} style={{ fontSize: "16px" }}>
            Tình trạng đối soát
          </Col>
          <Col span={11}>
            <Radio.Group onChange={onChange} value={value}>
              <Radio value={1} style={{ display: "block" }}>
                Tất cả
              </Radio>
              <Radio value={2} style={{ display: "block" }}>
                Đã đối soát
              </Radio>
              <Radio value={3} style={{ display: "block" }}>
                Chưa đối soát
              </Radio>
            </Radio.Group>
          </Col>
        </Row>
        <Row style={{ marginTop: "40px" }}>
          <Col span={11} style={{ fontSize: "16px" }}>
            Loại vé
          </Col>
          <Col span={11}>Vé cổng</Col>
        </Row>
        <Row style={{ marginTop: "24px" }}>
          <Col span={11} style={{ fontSize: "16px" }}>
            Từ ngày
          </Col>
          <Col span={11}>
            <DatePicker
              style={{ height: "40px", marginTop: "-6px", width: "100%" }}
              defaultValue={moment("2021/05/01", "DD/MM/YYYY")}
              format={"DD/MM/YYYY"}
            />
          </Col>
        </Row>
        <Row style={{ marginTop: "30px" }}>
          <Col span={11} style={{ fontSize: "16px" }}>
            Đến ngày
          </Col>
          <Col span={11}>
            <DatePicker
              style={{ height: "40px", marginTop: "-6px", width: "100%" }}
              placeholder="dd/mm/yyy"
              format={"DD/MM/YYYY"}
            />
          </Col>
        </Row>
        <Row style={{ margin: "32px auto" }}>
          <Button margin="0 auto">Lọc</Button>
        </Row>
      </Layout.Content>
    </div>
  );
};

export default Check;
