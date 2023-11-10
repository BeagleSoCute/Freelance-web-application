import { Button } from "antd";

export const serviceColums = (navigate) => {
  return [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      width: "30%",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Area",
      dataIndex: "area",
      key: "area",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Post Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "View",
      dataIndex: "view",
      key: "view",
      render: (
        item,
        record //navigate(`/admin-approve-post/${item._id}`)
      ) => (
        <Button onClick={() => navigate(`/admin-approve-post/${record.id}`)}>
          View
        </Button>
      ),
    },
  ];
};
