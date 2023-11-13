import { Button } from "antd";

export const serviceColums = (navigate,type) => {
  return [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      width: "20%",
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
        <Button onClick={() => navigate(`/post-details/${type}/${record.id}`)}>
          View
        </Button>
      ),
    },
  ];
};

export const serviceRequestColums = (navigate) => {
  return [
    {
      title: "By",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      width: "20%"
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Area",
      dataIndex: "area",
      key: "area",
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
      render: (item, record) => (
        <Button onClick={() => navigate(`/post-details/${record.serviceType}/${record.id}`)}>View</Button>
      ),
    },
  ];
};