import { useEffect, useState, useContext } from "react";
import { AppContext } from "contexts/app.context";
import { Row, Col, Button } from "antd";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { notification } from "helpers/notification.helper";
import ContentLayout from "layouts/ContentLayout";
import TableData from "components/common/TableData";
import { serviceColums } from "./table/tableColumn";
import OptionPanel from "./components/OptionPanel";
import { getServiceLists } from "services/service.service";
import { transformServiceTableData } from "./helpers/table.helper";
const ServicePage = () => {
  const navigate = useNavigate();
  const [findServices, setFindServices] = useState([]);
  const [provideServices, setProvideServices] = useState([]);
  const [serviceType, setServiceType] = useState('findService');
  useEffect(() => {
    const init = async () => {
      const { success, payload } = await getServiceLists();
      if (success) {
        const { provideServiceLists, findServiceList } = payload;
        setFindServices(transformServiceTableData(findServiceList));
        setProvideServices(transformServiceTableData(provideServiceLists));
      }
    };
    init();
  }, []);
  const handleChangeService = (e) => {
    setServiceType(e.target.value);
  };
  return (
    <div>
      <ContentLayout>
        <OptionPanel onChangeServiceType={handleChangeService} />
        <TableData
          columns={serviceColums(navigate,serviceType)}
          data={serviceType === "findService" ? findServices : provideServices}
        />
      </ContentLayout>
    </div>
  );
};

export default ServicePage;
