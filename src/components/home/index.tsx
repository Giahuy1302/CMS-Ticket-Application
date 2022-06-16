import { Col, DatePicker, Layout, Row, Typography } from "antd";
import React, { useEffect } from "react";
import { Area } from "@ant-design/plots";
import moment from "moment";
import { Doughnut } from "react-chartjs-2";
import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";

interface Props {
  setTagIndex: React.Dispatch<React.SetStateAction<string>>;
}
Chart.register(CategoryScale);
const Home = ({ setTagIndex }: Props) => {
  useEffect(() => {
    setTagIndex("home");
  });

  const dataDoughnut1 = {
    labels: undefined,
    datasets: [
      {
        label: undefined,
        data: [13568, 56024],
        backgroundColor: ["#FF8A48", "#4F75FF"],
      },
    ],
  };
  const dataDoughnut2 = {
    labels: undefined,
    datasets: [
      {
        label: undefined,
        data: [60, 100],
        backgroundColor: ["#FF8A48", "#4F75FF"],
      },
    ],
  };
  const data = [
    {
      timePeriod: "THỨ 2",
      value: 140,
    },
    {
      timePeriod: "THỨ 3",
      value: 180,
    },
    {
      timePeriod: "THỨ 4",
      value: 165,
    },
    {
      timePeriod: "THỨ 5",
      value: 230,
    },
    {
      timePeriod: "THỨ 6",
      value: 215,
    },
    {
      timePeriod: "THỨ 7",
      value: 215,
    },
    {
      timePeriod: "CN",
      value: 190,
    },
  ];

  const config = {
    data,
    labels: data.map((item) => item.timePeriod),
    xField: "timePeriod",
    yField: "value",
    xAxis: {
      range: [0, 1],
    },
    line: {
      color: "#FF993C",
      size: 2,
      height: 400,
    },
    areaStyle: () => {
      return {
        fill: "l(270) 0:#ffffff 0.5:rgb(255 153 60 / 79%) 1:#FF993C",
        height: 300,
      };
    },
  };

  return (
    <Layout.Content
      style={{
        borderRadius: "24px",
        minHeight: "963px",
        backgroundColor: "white",
        padding: "28.5px 24.5px",
      }}
    >
      <Typography.Title style={{ fontSize: "36px", fontWeight: "700" }}>
        Thống kê
      </Typography.Title>
      <div
        style={{
          height: "40px",
          marginTop: "36px",
          display: "flex",
          justifyContent: "end",
          paddingRight: "40px",
        }}
      >
        <DatePicker defaultValue={moment("2015/01/01")} />
      </div>
      <Area {...config} />
      <div style={{ marginTop: "64px" }}>Tổng doanh thu theo tuần</div>
      <h1 style={{ fontWeight: "bold", display: "inline" }}>525.145.000 </h1>
      <span style={{ display: "inline" }}>đồng</span>
      <Row>
        <Col span={5}>
          <div
            style={{
              height: "40px",
              marginTop: "36px",
            }}
          >
            <DatePicker defaultValue={moment("2015/01/01")} />
          </div>
        </Col>
        <Col
          span={12}
          style={{
            height: "40px",
            marginTop: "36px",
          }}
        >
          Gói gia đình
        </Col>
        <Col
          span={5}
          style={{
            height: "40px",
            marginTop: "36px",
          }}
        >
          Gói sự kiện
        </Col>
      </Row>
      <Row>
        <Col span={12} style={{ padding: "0 150px" }}>
          <Doughnut data={dataDoughnut1} />
        </Col>
        <Col span={12} style={{ padding: "0 150px" }}>
          <Doughnut data={dataDoughnut2} />
        </Col>
      </Row>
    </Layout.Content>
  );
};

export default Home;
