import styled from "styled-components";
export const TodoFilter = ({ currentFilter, handleFilter, todoCounts }) => {
  return (
    <FilterWrapper>
      {Object.entries(todoCounts).map(([filter, count]) => (
        <FilterBtnWrapper onClick={() => handleFilter(filter)}>
          <Count $filter={filter}>{count}</Count>
          <FilterBtn key={filter} $iscurrentfilter={filter === currentFilter}>
            {filter}
          </FilterBtn>
        </FilterBtnWrapper>
      ))}
    </FilterWrapper>
  );
};

const FilterWrapper = styled.div`
  display: flex;
  gap: 0.2rem;
  padding: 0.4rem;
`;
const FilterBtnWrapper = styled.div`
  padding: 0.5rem 1rem;
  display: flex;
  align-items: center;
`;
const Count = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  background-color: ${(props) => {
    console.log(props.$filter);
    switch (props.$filter) {
      case "ALL":
        return "#010101";
      case "PENDING":
        return "#649ffffb";
      case "INPROGRESS":
        return "#ff5c5c";
      case "COMPLETED":
        return "#00cb1b";
      default:
        return "grey";
    }
  }};
  width: 1.8rem;
  height: 1.8rem;
  border-radius: 0.9rem;
  padding: 0.2rem;
  margin-right: 0.2rem;

  padding-top: 0.3rem;
  font-size: 0.9rem;
`;
const FilterBtn = styled.button`
  padding: 4px;
  cursor: pointer;
  font-size: 16px;
  border: none;
  background: transparent;
  position: relative;
  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: grey;
    transform: scaleX(${(props) => (props.$iscurrentfilter ? 1 : 0)});
    transition: transform 0.25s ease;
  }
`;
