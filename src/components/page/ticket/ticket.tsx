import {
  Col,
  DatePicker,
  Layout,
  Modal,
  Radio,
  Row,
  Table,
  Typography,
} from "antd";
import React, { useEffect, useState } from "react";
import Button from "../../common/Button";
import Search from "../../common/Search";
import { FilterIcon } from "../../icons/FilterIcon";
import { Checkbox } from "antd";
import { db } from "../../../.firebase/config";
import { collection, onSnapshot, addDoc } from "firebase/firestore";

interface Props {
  setTagIndex: React.Dispatch<React.SetStateAction<string>>;
}
const Ticket = ({ setTagIndex }: Props) => {
  const [dataTicketPage, setDataTicketPage] = useState<any[]>([]);
  const [data, setData] = useState<any[]>([]);
  useEffect(() => {
    setTagIndex("ticket");
    const data = async () => {

      onSnapshot(collection(db, "ticket"), (snapshot: any) => {
        const books: any = [];
        snapshot.docs.forEach((doc: any) => {
          books.push({ ...doc.data(), id: doc.id });
        });
        setDataTicketPage(books);
        setData(books);
      });
    };
    data();
  }, [setTagIndex]);

  const [datefrom, setFrom] = useState<Date>();
  const [dateto, setTo] = useState<Date>();
  const [status, setStatus] = useState(-2);

  const [check, setCheck] = useState<number[]>([1, 2, 3, 4, 5]);

  const onClick = (val: number) => {
    if (check.includes(val)) {
      setCheck(check.filter((item) => item !== val));
    } else {
      if (val === 0) {
        if (check.length === 5) {
          setCheck([]);
        } else {
          setCheck([1, 2, 3, 4, 5]);
        }
      } else {
        setCheck([...check, val]);
      }
    }
  };

  const [modal, setModal] = useState(false);

  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      render: (stt: string) => {
        return <div>{stt}</div>;
      },
    },
    {
      title: () => <div style={{ marginLeft: "64px" }}>Booking code</div>,
      dataIndex: "code",
      render: (stt: string) => {
        return <div style={{ marginLeft: "64px" }}>{stt}</div>;
      },
    },
    {
      title: "S??? v??",
      dataIndex: "ticketNumber",
    },
    {
      title: () => <div style={{ marginLeft: "64px" }}>T??nh tr???ng s??? d???ng</div>,
      dataIndex: "status",
      render: (status: number) => {
        switch (status) {
          case 0:
            return (
              <div
                style={{
                  marginLeft: "64px",
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
                <span style={{ fontSize: "18px", marginRight: "8px" }}>???</span>
                Ch??a s??? d???ng
              </div>
            );
          case 1:
            return (
              <div
                style={{
                  marginLeft: "64px",
                  width: "fit-content",
                  padding: "0 12px",
                  display: "flex",
                  alignItems: "center",
                  fontSize: "12px",
                  fontWeight: "500",
                  color: "#919DBA",
                  backgroundColor: "#EAF1F8",
                  border: "1px solid #919DBA",
                  borderRadius: "4px",
                  height: "31px",
                }}
              >
                <span style={{ fontSize: "18px", marginRight: "8px" }}>???</span>
                ???? s??? d???ng
              </div>
            );
          case -1:
            return (
              <div
                style={{
                  marginLeft: "64px",
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
                <span style={{ fontSize: "18px", marginRight: "8px" }}>???</span>
                H???t h???n
              </div>
            );
        }
      },
    },
    {
      title: () => (
        <div
          style={{
            textAlign: "right",
            marginRight: "32px",
          }}
        >
          Ng??y s??? d???ng
        </div>
      ),
      dataIndex: "dateUsed",
      render: (date: string) => {
        return (
          <div
            style={{
              textAlign: "right",
              marginRight: "32px",
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
            marginRight: "32px",
          }}
        >
          Ng??y xu???t v??
        </div>
      ),
      dataIndex: "dateExport",
      render: (date: string) => {
        return (
          <div
            style={{
              textAlign: "right",
              marginRight: "32px",
            }}
          >
            {date}
          </div>
        );
      },
    },
    {
      title: "C???ng check-in",
      dataIndex: "portCheckIn",
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
        Danh s??ch v??
      </Typography.Title>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Search size="445px" placeholder="T??m b???ng s??? v??" />
        <div style={{ marginTop: "-4px" }}>
          <Button margin="0 10px" width="128px" onClick={() => setModal(true)}>
            <span
              style={{
                display: "inline-block",
                transform: "translate(-6px, 4px)",
              }}
            >
              <FilterIcon />
            </span>
            L???c v??
          </Button>
          <Button
            width="180px"
          >
            Xu???t file (.csv)
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
        visible={modal}
        onOk={() => {
          const newArr1 = data.filter((item) => {
            if (status !== -2) {
              return item.status === status;
            }
            return true;
          });
          const newArr2 = newArr1.filter((item) =>
            check.includes(
              Number(item.portCheckIn.slice(item.portCheckIn.length - 1))
            )
          );
          const newArr3 = newArr2.filter((item) => {
            if (
              datefrom &&
              dateto &&
              item.dateExport < datefrom.toLocaleDateString() &&
              item.dateExport > dateto.toLocaleDateString()
            )
              return false;
            return true;
          });
          setDataTicketPage(newArr3);
          setModal(false);
        }}
        closeIcon={<></>}
        width="630px"
        bodyStyle={{ borderRadius: "16px" }}
        onCancel={() => setModal(false)}
        cancelText="H???y"
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
            display: "none",
          },
        }}
        okText="L???c"
      >
        <div style={{ display: "flex", justifyContent: "center" }}>
          <span
            style={{ fontSize: "24px", fontWeight: "600", marginTop: "-4px" }}
          >
            L???c v??
          </span>
        </div>
        <Row>
          <Col span={11}>
            <div style={{ marginTop: "24px", marginBottom: "4px" }}>
              <span style={{ fontSize: "16px", margin: "opx 4px" }}>
                T??? ng??y
              </span>
            </div>
            <DatePicker
              onChange={(e) => {
                setFrom(e?.toDate());
              }}
              style={{ height: "40px", width: "145px" }}
              placeholder="dd:mm:yy"
            />
          </Col>
          <Col span={12}>
            <div style={{ marginTop: "24px", marginBottom: "4px" }}>
              <span style={{ fontSize: "16px", margin: "0px 4px" }}>
                ?????n ng??y
              </span>
            </div>
            <DatePicker
              onChange={(e) => {
                setTo(e?.toDate());
              }}
              style={{ height: "40px", width: "145px" }}
              placeholder="dd:mm:yyy"
            />
          </Col>
        </Row>
        <div style={{ fontSize: "16px", margin: "28px 0 0 4px" }}>
          T??nh tr???ng s??? d???ng
        </div>

        <Radio.Group onChange={(e) => setStatus(e.target.value)}>
          <Radio value={-2} style={{ width: "135px" }}>
            T???t c???
          </Radio>
          <Radio value={1} style={{ width: "135px" }}>
            ???? s??? d???ng
          </Radio>
          <Radio value={0} style={{ width: "135px" }}>
            Ch??a s??? d???ng
          </Radio>
          <Radio value={-1} style={{ width: "135px" }}>
            H???t h???n
          </Radio>
        </Radio.Group>
        <div style={{ fontSize: "16px", margin: "28px 0 0 4px" }}>
          C???ng Check-in
        </div>

        <Row>
          <Col span={8}>
            <Checkbox checked={check.length === 5} onClick={() => onClick(0)}>
              Check All
            </Checkbox>
          </Col>
          <Col span={8}>
            <Checkbox checked={check.includes(1)} onClick={() => onClick(1)}>
              C???ng 1
            </Checkbox>
          </Col>
          <Col span={8}>
            <Checkbox checked={check.includes(2)} onClick={() => onClick(2)}>
              C???ng 2
            </Checkbox>
          </Col>
          <Col span={8}>
            <Checkbox checked={check.includes(3)} onClick={() => onClick(3)}>
              C???ng 3
            </Checkbox>
          </Col>
          <Col span={8}>
            <Checkbox checked={check.includes(4)} onClick={() => onClick(4)}>
              C???ng 4
            </Checkbox>
          </Col>
          <Col span={8}>
            <Checkbox checked={check.includes(5)} onClick={() => onClick(5)}>
              C???ng 5
            </Checkbox>
          </Col>
        </Row>
      </Modal>
    </Layout.Content>
  );
};

export default Ticket;