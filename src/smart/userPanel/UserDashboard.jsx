import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { AppContext } from "contexts/app.context";
import TableData from "components/common/TableData";
import { useNavigate } from "react-router-dom";
import { serviceColums, serviceRequestColums } from "./tableData";
import OptionPanel from "./components/OptionPanel";
import { transformPrivideServiceTableData, transformRequestTableData } from "./helpers/table.helper.js";
import ContentLayout from "layouts/ContentLayout";
import { getMyServiceList } from "services/service.service";

const UserDashboard = () => {
  const navigate = useNavigate();
  const { setLoading } = useContext(AppContext);
  const [findServiceList, setFindServiceList] = useState([]);
  const [provideServiceList, setProvideServiceList] = useState([]);
  const [requestList, setRequestList] = useState([])
  const [currentTab, setCurrentTab] = useState("findService");
  useEffect(() => {
    setLoading(true);
    const init = async () => {
      const {success, payload} = await getMyServiceList();
      if(success){
        const provideServiceData =
        transformPrivideServiceTableData(payload.provideServiceLists);
        const findServiceData =
        transformPrivideServiceTableData(payload.findServiceList);
       const requestListData= transformRequestTableData(payload.requestList)
        setProvideServiceList(provideServiceData);
        setFindServiceList(findServiceData);
        setRequestList(requestListData)
    };
      }
     
    init();
    setLoading(false);
    // eslint-disable-next-line
  }, []);
  const handleChangeOption = (e) => {
    setCurrentTab(e.target.value);
  };
  const handleShowTableData = () => {
    if (currentTab === "findService") {
      return { column: serviceColums(navigate,currentTab), data: findServiceList };
    } else if (currentTab === "provideService") {
      return { column: serviceColums(navigate,currentTab), data: provideServiceList };
    } else if(currentTab ==="requestService"){ 
      return { column: serviceRequestColums(navigate,currentTab), data: requestList };
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