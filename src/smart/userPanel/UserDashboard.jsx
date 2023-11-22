import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { AppContext } from "contexts/app.context";
import TableData from "components/common/TableData";
import { useNavigate } from "react-router-dom";
import {
  serviceColums,
  serviceRequestColums,
  projectColums,
  transactionColums,
} from "./tableData";
import OptionPanel from "./components/OptionPanel";
import {
  transformPrivideServiceTableData,
  transformRequestTableData,
  transformProjectTableData,
} from "./helpers/table.helper.js";
import ContentLayout from "layouts/ContentLayout";
import { getMyServiceList } from "services/service.service";
import { getMyProjectLists } from "services/project.service";
import { showTransactionData } from "services/escrow.service";

const UserDashboard = () => {
  const navigate = useNavigate();
  const { setLoading } = useContext(AppContext);
  const [findServiceList, setFindServiceList] = useState([]);
  const [provideServiceList, setProvideServiceList] = useState([]);
  const [requestList, setRequestList] = useState([]);
  const [projectList, setProjectList] = useState([]);
  const [currentTab, setCurrentTab] = useState("findService");
  const [transactionList, setTransactionList] = useState([]);
  useEffect(() => {
    setLoading(true);
    const init = async () => {
      const { success, payload } = await getMyServiceList();
      const resProjectList = await getMyProjectLists();
      const transactionData = await showTransactionData();
      if (success) {
        const provideServiceData = transformPrivideServiceTableData(
          payload.provideServiceLists
        );
        const findServiceData = transformPrivideServiceTableData(
          payload.findServiceList
        );
        const requestListData = transformRequestTableData(payload.requestList);
        setProvideServiceList(provideServiceData);
        setFindServiceList(findServiceData);
        setRequestList(requestListData);
      }
      if (resProjectList?.success) {
        setProjectList(
          transformProjectTableData(resProjectList?.payload.projectLists)
        );
        if (transactionData.success) {
          setTransactionList(transactionData.payload);
        }
      }
    };
    init();
    setLoading(false);
    // eslint-disable-next-line
  }, []);
  const handleChangeOption = (e) => {
    setCurrentTab(e.target.value);
  };
  const handleShowTableData = () => {
    if (currentTab === "findService") {
      return {
        column: serviceColums(navigate, currentTab),
        data: findServiceList,
      };
    } else if (currentTab === "provideService") {
      return {
        column: serviceColums(navigate, currentTab),
        data: provideServiceList,
      };
    } else if (currentTab === "requestService") {
      return { column: serviceRequestColums(navigate), data: requestList };
    } else if (currentTab === "transaction") {
      return { column: transactionColums(navigate), data: transactionList };
    } else {
      return { column: projectColums(navigate), data: projectList };
    }
  };
  return (
    <StyledDiv className="user-dashboard">
      <ContentLayout>
        <h1>Dashboard</h1>
        <OptionPanel onChangeOption={handleChangeOption} />
        <TableData
          columns={handleShowTableData()?.column}
          data={handleShowTableData()?.data}
        />
      </ContentLayout>
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  &.user-dashboard {
    height: 100vh;
    .myInfo {
      margin-bottom: 20px;
    }
  }
`;
export default UserDashboard;
