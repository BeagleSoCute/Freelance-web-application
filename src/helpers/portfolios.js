export const diplayRelatedPortfolios = (allPort, relatedPort) => {
  if(!allPort || allPort.length === 0 ||  !relatedPort || relatedPort.length === 0){
    return []
  }

  const filteredPortfolio = allPort.filter((item) =>
    relatedPort.includes(item._id)
  );
  return filteredPortfolio;
};
