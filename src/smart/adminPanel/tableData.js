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
      <Button onClick={() => navigate(`/profile/${record.id}`)}>View</Button>
    ),
  },
  // {
  //   title: "Edit",
  //   dataIndex: "edit",
  //   key: "edit",
  //   width: "5%",

  //   render: (item, record) => <Button>Edit</Button>,
  // },
  // {
  //   title: "Delete",
  //   dataIndex: "delete",
  //   key: "delete",
  //   width: "5%",

  //   render: (item, record) => <Button>Delete</Button>,
  // },
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

export const requestColums = (navigate, approveAction) => [
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
      <Button onClick={() => navigate(`/project/${record.projectID}`)}>
        View
      </Button>
    ),
  },
  {
    title: "Approve",
    dataIndex: "approve",
    key: "approve",
    render: (item, record) => (
      <Button onClick={() => approveAction(true, record.projectID)}>
        Approve
      </Button>
    ),
  },
  {
    title: "Deny",
    dataIndex: "deny",
    key: "deny",
    render: (item, record) => (
      <Button danger onClick={() => approveAction(false, record.projectID)}>
        Deny
      </Button>
    ),
  },
];

export const transactionColums = (navigate, refundMoneyData, status) => {
  return [
    {
      title: "Project title",
      dataIndex: "projectTitle",
      key: "projectTitle",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Seeker paid to the system",
      dataIndex: "isPaidBySeeker",
      key: "isPaidBySeeker",
    },
    {
      title: "Paid to Freelancer",
      dataIndex: "isPaidToFreelancer",
      key: "isPaidToFreelancer",
    },
    {
      title: "Seeker paid Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Paid to Freelancer date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "View Project",
      dataIndex: "view",
      key: "view",
      render: (item, record) => (
        <Button onClick={() => navigate(`/project/${record.projectID}`)}>
          View
        </Button>
      ),
    },
    {
      title: "Reund money to seeker",
      dataIndex: "refundToSeeker",
      key: "refundToSeeker",
      render: (item, record) => (
        <Button
          disabled={
            record.status === "refund to freelacner" ||
            record.status === "refund to seeker" ||
            record.status === "done"
          }
          danger
          onClick={() =>
            refundMoneyData("seeker", record.projectID, record.transactionID)
          }
        >
          Refund
        </Button>
      ),
    },
    {
      title: "Reund money to freelancer",
      dataIndex: "refundTofreelancer",
      key: "refundTofreelancer",
      render: (item, record) => (
        <Button
          disabled={
            record.tatus === "refund to seeker" ||
            record.status === "refund to freelacner" ||
            record.status === "done"
          }
          danger
          onClick={() =>
            refundMoneyData(
              "freelancer",
              record.projectID,
              record.transactionID
            )
          }
        >
          Refund
        </Button>
      ),
    },
  ];
};
