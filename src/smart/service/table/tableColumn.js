import { Button } from "antd";

export const serviceColums = (navigate,type) => {
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
      title: "View",
      dataIndex: "view",
      key: "view",
      render: (item, record) => (
        <Button onClick={() => navigate(`/post-details/${type}/${record.id}`)}>View</Button>
      ),
    },
  ];
};



export const candidateColums = (onSetSeeCandidate) => {
  return [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Request Date",
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
        <Button onClick={() => onSetSeeCandidate(record)}>View</Button>
      ),
    },
  ];
};
