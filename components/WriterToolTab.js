import React from "react";
import styled from "styled-components";

const WriterToolTab = ({ showPlagi, setShowPlagi }) => {
  return (
    <TabController>
      <TabControllerBtn
        IsActive={showPlagi === false}
        onClick={() => setShowPlagi(false)}
      >
        Writer Toolbox
      </TabControllerBtn>
      <TabControllerBtn
        IsActive={showPlagi === true}
        onClick={() => setShowPlagi(true)}
      >
        Plagiarism Checker
      </TabControllerBtn>
    </TabController>
  );
};

const TabController = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 8px 0;
`;

const TabControllerBtn = styled.button`
  background-color: transparent;
  width: 50%;
  border: 0px;
  outline: 0;
  padding: 8px 0;
  border-bottom: 3px solid
    ${({ IsActive }) => (IsActive ? "#40B1A7" : "#00000040")};
  color: ${({ IsActive }) => (IsActive ? "#40B1A7" : "#000")};
`;

export default WriterToolTab;
