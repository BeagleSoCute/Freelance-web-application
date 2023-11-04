import { Button } from "antd";

export const serviceColums = (navigate) => {
  return [
    {
      title: "ID",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Post Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "View",
      dataIndex: "view",
      key: "view",
      render: (item, record) => (
        <Button onClick={() => navigate(`/user/${record.id}`)}>View</Button>
      ),
    },
  ];
};
