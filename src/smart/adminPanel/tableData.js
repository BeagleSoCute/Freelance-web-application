import { Button } from "antd";

export const allUserColums = (navigate) => [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "View",
    dataIndex: "view",
    key: "view",
    width: "5%",
    render: (item, record) => (
      <Button onClick={() => navigate(`/user/${record.id}`)}>View</Button>
    ),
  },
  {
    title: "Edit",
    dataIndex: "edit",
    key: "edit",
    width: "5%",

    render: (item, record) => <Button>Edit</Button>,
  },
  {
    title: "Delete",
    dataIndex: "delete",
    key: "delete",
    width: "5%",

    render: (item, record) => <Button>Delete</Button>,
  },
];

export const serviceColums = (navigate) => {
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

export const requestColums = (navigate) => [
  {
    title: "Project Title",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "Reporter name ",
    dataIndex: "reporter",
    key: "reporter",
  },
  {
    title: "Type",
    dataIndex: "type",
    key: "type",
  },
  {
    title: "View Project",
    dataIndex: "view",
    key: "view",
    render: (item, record) => (
      <Button onClick={() => navigate(`/user/${record.id}`)}>View</Button>
    ),
  },
  {
    title: "Approve",
    dataIndex: "approve",
    key: "approve",
    render: (item, record) => (
      <Button onClick={() => navigate(`/user/${record.id}`)}>Approve</Button>
    ),
  },
  {
    title: "Reject",
    dataIndex: "reject",
    key: "reject",
    render: (item, record) => (
      <Button danger onClick={() => navigate(`/user/${record.id}`)}>
        Reject
      </Button>
    ),
  },
];
