import {
  Checkbox,
  Col,
  DatePicker,
  Layout,
  Modal,
  Row,
  Select,
  Table,
  TimePicker,
  Typography,
} from "antd";
import React, { useEffect, useState } from "react";
import Button from "../../common/Button";
import Search from "../../common/Search";
import { EditorIcon } from "../../icons/EditorIcon";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../../.firebase/config";
interface Props {
  setTagIndex: React.Dispatch<React.SetStateAction<string>>;
}

const Setting = ({ setTagIndex }: Props) => {
  const [dataTicketPage, setDataTicketPage] = useState<any[]>([]);

  useEffect(() => {
    setTagIndex("setting");
    const data = async () => {
      onSnapshot(collection(db, "setting"), (snapshot: any) => {
        const books: any = [];
        snapshot.docs.forEach((doc: any) => {
          books.push({ ...doc.data(), id: doc.id });
        });
        setDataTicketPage(books);
      });
    };
    data();
  }, [setTagIndex]);

  const [modal, setModal] = useState(false);
  const [modalUpdate, setModalUpdate] = useState(false);
  

  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      render: (stt: number) => {
        return <div>{stt}</div>;
      },
    },
    {
      title: () => <div style={{}}>Mã gói</div>,
      dataIndex: "code",
      render: (stt: string) => {
        return <div style={{}}>{stt}</div>;
      },
    },
    {
      title: () => <div style={{}}>Tên gói</div>,
      dataIndex: "name",
      render: (stt: string) => {
        return <div style={{}}>{stt}</div>;
      },
    },
    {
      title: () => (
        <div
          style={{
            textAlign: "right",
          }}
        >
          Ngày áp dụng
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
      title: () => (
        <div
          style={{
            textAlign: "right",
          }}
        >
          Ngày hết hạn
        </div>
      ),
      dataIndex: "dateExport",
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
      title: () => <div style={{}}>Giá vé {"(VND/Vé)"}</div>,
      dataIndex: "price",
      render: () => {
        return <div style={{}}>90.000 VNĐ</div>;
      },
    },
    {
      title: () => <div style={{}}>Giá vé {"(VND/Combo)"}</div>,
      dataIndex: "priceC",
      render: () => {
        return <div style={{}}>360.000 VNĐ/4 Vé</div>;
      },
    },
    {
      title: () => <div style={{}}>Tình trạng</div>,
      dataIndex: "status",
      render: (status: boolean) => {
        switch (status) {
          case true:
            return (
              <div
                style={{
                  width: "fit-content",
                  padding: "0 12px",
                  display: "flex",
                  alignItems: "center",
                  fontSize: "12px",
                  fontWeight: "500",
                  color: "#03AC00",
                  backgroundColor: "#DEF7E0",
                  border: "1px solid #03AC00",
                  borderRadius: "4px",
                  height: "31px",
                }}
                >
                <span style={{ fontSize: "18px", marginRight: "8px" }}>●</span>
                Đang áp dụng
              </div>
            );
            case false:
              return (
                <div
                style={{
                  width: "fit-content",
                  padding: "0 12px",
                  display: "flex",
                  alignItems: "center",
                  fontSize: "12px",
                  fontWeight: "500",
                  color: "#FD5959",
                  backgroundColor: "#F8EBE8",
                  border: "1px solid #FD5959",
                  borderRadius: "4px",
                  height: "31px",
                }}
              >
                <span style={{ fontSize: "18px", marginRight: "8px" }}>●</span>
                Tắt
              </div>
            );
        }
      },
    },

    {
      title: "",
      render: () => {
        return (
          <div
            style={{
              color: "#FF993C",
              fontWeight: "500",
              fontSize: "14px",
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
            }}
            onClick={() => setModalUpdate(true)}
          >
            <EditorIcon />
            <span style={{ marginLeft: "4px" }}>Cập nhật</span>
          </div>
        );
      },
    },
  ];

  return (
    <Layout.Content
      style={{
        borderRadius: "24px",
        minHeight: "963px",
        backgroundColor: "white",
        padding: "34px 24.5px",
      }}
    >
      <Typography.Title
        style={{ marginBottom: "46px", fontSize: "36px", fontWeight: "700" }}
      >
        Danh sách gói vé
      </Typography.Title>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Search size="445px" placeholder="Tìm bằng số vé" />
        <div style={{ marginTop: "-4px" }}>
          <Button padding="0 24px" margin="0 10px" width="fit-content">
            <span
              style={{
                display: "inline-block",
                transform: "translate(-6px, 4px)",
              }}
            ></span>
            Xuất file (.csv)
          </Button>
          <Button width="180px" type="primary" onClick={() => setModal(true)}>
            Thêm gói vé
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
      <Modal
        visible={modalUpdate}
        onOk={() => setModalUpdate(false)}
        closeIcon={<></>}
        width="750px"
        bodyStyle={{ borderRadius: "16px" }}
        onCancel={() => setModalUpdate(false)}
        cancelText="Hủy"
        okButtonProps={{
          style: {
            marginRight: "230px",
            height: "40px",
            padding: "0 48px",
            borderRadius: "8px",
            backgroundColor: "#FF993C",
            border: "2px solid #FF993C",
            fontSize: "16px",
            fontWeight: "600",
          },
        }}
        cancelButtonProps={{
          style: {
            height: "40px",
            padding: "0 48px",
            borderRadius: "8px",
            border: "2px solid #FF993C",
            fontSize: "16px",
            color: "#FF993C",
            fontWeight: "600",
          },
        }}
        okText="Lưu"
      >
        <div style={{ display: "flex", justifyContent: "center" }}>
          <span
            style={{ fontSize: "24px", fontWeight: "600", marginTop: "-4px" }}
          >
            Cập nhật thông tin gói vé
          </span>
        </div>
        <Row>
          <Col span={11}>
            <div style={{ marginTop: "24px" }}>
              <span style={{ fontSize: "16px", margin: "opx 4px" }}>
                Mã sự kiện
              </span>
              <span style={{ color: "red" }}> *</span>
            </div>
            <input
              type="text"
              value="PKG20210502"
              style={{
                padding: "20px",
                marginTop: "4px",
                border: "1px solid #A5A8B1",
                borderRadius: "8px",
                height: "40px",
                width: "250px",
              }}
            />
          </Col>
          <Col span={11}>
            <div style={{ marginTop: "24px" }}>
              <span style={{ fontSize: "16px", margin: "opx 4px" }}>
                Tên sự kiện
              </span>
              <span style={{ color: "red" }}> *</span>
            </div>
            <input
              type="text"
              placeholder="Hội chợ triển lãm hàng tiêu dùng 2021"
              style={{
                padding: "20px",
                marginTop: "4px",
                border: "1px solid #A5A8B1",
                borderRadius: "8px",
                height: "40px",
                width: "370px",
              }}
            />
          </Col>
        </Row>

        <Row>
          <Col span={11}>
            <div style={{ marginTop: "24px", marginBottom: "4px" }}>
              <span style={{ fontSize: "16px", margin: "opx 4px" }}>
                Ngày áp dụng
              </span>
            </div>
            <DatePicker
              style={{ height: "40px", width: "145px" }}
              placeholder="dd:mm:yy"
            />
            <TimePicker
              use12Hours
              format="h:mm:ss"
              placeholder="hh:mm:yy"
              style={{ width: 140, height: "40px", marginLeft: "8px" }}
            />
          </Col>
          <Col span={12}>
            <div style={{ marginTop: "24px", marginBottom: "4px" }}>
              <span style={{ fontSize: "16px", margin: "0px 4px" }}>
                Ngày hết hạn
              </span>
            </div>
            <DatePicker
              style={{ height: "40px", width: "145px" }}
              placeholder="dd:mm:yyy"
            />
            <TimePicker
              placeholder="hh:mm:yy"
              use12Hours
              format="h:mm:ss"
              style={{ width: 140, height: "40px", marginLeft: "8px" }}
            />
          </Col>
        </Row>
        <div style={{ fontSize: "16px", margin: "28px 0 0 4px" }}>
          Giá vé áp dụng
        </div>
        <div
          style={{ display: "flex", alignItems: "center", fontSize: "16px" }}
        >
          <Checkbox style={{ width: "20px" }}></Checkbox>Vé lẻ (vnđ/vé) với giá
          <div
            style={{
              color: "#A5A8B1",
              alignItems: "center",
              margin: "0 4px",
              padding: "0 8px",
              display: "inline-flex",
              height: "40px",
              width: "150px",
              background: "#F1F4F8",
              borderRadius: "8px",
            }}
          >
            Giá vé
          </div>
          /vé
        </div>
        <div
          style={{
            marginTop: "8px",
            display: "flex",
            alignItems: "center",
            fontSize: "16px",
          }}
        >
          <Checkbox style={{ width: "20px" }}></Checkbox>Combo vé với giá
          <div
            style={{
              color: "#A5A8B1",
              alignItems: "center",
              margin: "0 4px",
              padding: "0 8px",
              display: "inline-flex",
              height: "40px",
              width: "150px",
              background: "#F1F4F8",
              borderRadius: "8px",
            }}
          >
            Giá vé
          </div>
          /
          <div
            style={{
              color: "#A5A8B1",
              alignItems: "center",
              margin: "0 4px",
              padding: "0 8px",
              display: "inline-flex",
              height: "40px",
              width: "150px",
              background: "#F1F4F8",
              borderRadius: "8px",
            }}
          >
            Giá vé
          </div>
          vé
        </div>
        <div style={{ fontSize: "16px", margin: "28px 0 0 4px" }}>
          Tình trạng
        </div>
        <Select
          showSearch
          size="large"
          style={{ width: "180px", marginBottom: "20px" }}
          placeholder="Đang áp dụng"
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

        <div>
          <span style={{ color: "red" }}> *</span>{" "}
          <span style={{ fontStyle: "italic" }}>là thông tin bắt buộc</span>
        </div>
      </Modal>
      <Modal
        visible={modal}
        onOk={() => setModal(false)}
        closeIcon={<></>}
        width="750px"
        bodyStyle={{ borderRadius: "16px" }}
        onCancel={() => setModal(false)}
        cancelText="Hủy"
        okButtonProps={{
          style: {
            marginRight: "230px",
            height: "40px",
            padding: "0 48px",
            borderRadius: "8px",
            backgroundColor: "#FF993C",
            border: "2px solid #FF993C",
            fontSize: "16px",
            fontWeight: "600",
          },
        }}
        cancelButtonProps={{
          style: {
            height: "40px",
            padding: "0 48px",
            borderRadius: "8px",
            border: "2px solid #FF993C",
            fontSize: "16px",
            color: "#FF993C",
            fontWeight: "600",
          },
        }}
        okText="Lưu"
      >
        <div style={{ display: "flex", justifyContent: "center" }}>
          <span
            style={{ fontSize: "24px", fontWeight: "600", marginTop: "-4px" }}
          >
            Thêm gói vé
          </span>
        </div>
        <div style={{ marginTop: "24px" }}>
          <span style={{ fontSize: "16px", margin: "opx 4px" }}>
            Tên gói vé
          </span>
          <span style={{ color: "red" }}> *</span>
        </div>
        <input
          type="text"
          placeholder="Nhập tên gói vé"
          style={{
            padding: "20px",
            marginTop: "4px",
            border: "1px solid #A5A8B1",
            borderRadius: "8px",
            height: "40px",
            width: "370px",
          }}
        />
        <Row>
          <Col span={11}>
            <div style={{ marginTop: "24px", marginBottom: "4px" }}>
              <span style={{ fontSize: "16px", margin: "opx 4px" }}>
                Ngày áp dụng
              </span>
            </div>
            <DatePicker
              style={{ height: "40px", width: "145px" }}
              placeholder="dd:mm:yy"
            />
            <TimePicker
              use12Hours
              format="h:mm:ss"
              placeholder="hh:mm:yy"
              style={{ width: 140, height: "40px", marginLeft: "8px" }}
            />
          </Col>
          <Col span={12}>
            <div style={{ marginTop: "24px", marginBottom: "4px" }}>
              <span style={{ fontSize: "16px", margin: "0px 4px" }}>
                Ngày hết hạn
              </span>
            </div>
            <DatePicker
              style={{ height: "40px", width: "145px" }}
              placeholder="dd:mm:yyy"
            />
            <TimePicker
              placeholder="hh:mm:yy"
              use12Hours
              format="h:mm:ss"
              style={{ width: 140, height: "40px", marginLeft: "8px" }}
            />
          </Col>
        </Row>
        <div style={{ fontSize: "16px", margin: "28px 0 0 4px" }}>
          Giá vé áp dụng
        </div>
        <div
          style={{ display: "flex", alignItems: "center", fontSize: "16px" }}
        >
          <Checkbox style={{ width: "20px" }}></Checkbox>Vé lẻ (vnđ/vé) với giá
          <div
            style={{
              color: "#A5A8B1",
              alignItems: "center",
              margin: "0 4px",
              padding: "0 8px",
              display: "inline-flex",
              height: "40px",
              width: "150px",
              background: "#F1F4F8",
              borderRadius: "8px",
            }}
          >
            Giá vé
          </div>
          /vé
        </div>
        <div
          style={{
            marginTop: "8px",
            display: "flex",
            alignItems: "center",
            fontSize: "16px",
          }}
        >
          <Checkbox style={{ width: "20px" }}></Checkbox>Combo vé với giá
          <div
            style={{
              color: "#A5A8B1",
              alignItems: "center",
              margin: "0 4px",
              padding: "0 8px",
              display: "inline-flex",
              height: "40px",
              width: "150px",
              background: "#F1F4F8",
              borderRadius: "8px",
            }}
          >
            Giá vé
          </div>
          /
          <div
            style={{
              color: "#A5A8B1",
              alignItems: "center",
              margin: "0 4px",
              padding: "0 8px",
              display: "inline-flex",
              height: "40px",
              width: "150px",
              background: "#F1F4F8",
              borderRadius: "8px",
            }}
          >
            Giá vé
          </div>
          vé
        </div>
        <div style={{ fontSize: "16px", margin: "28px 0 0 4px" }}>
          Tình trạng
        </div>
        <Select
          showSearch
          size="large"
          style={{ width: "180px", marginBottom: "20px" }}
          placeholder="Đang áp dụng"
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

        <div>
          <span style={{ color: "red" }}> *</span>{" "}
          <span style={{ fontStyle: "italic" }}>là thông tin bắt buộc</span>
        </div>
      </Modal>
    </Layout.Content>
  );
};

export default Setting;
