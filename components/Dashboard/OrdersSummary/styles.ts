import styled from "styled-components";

export const Divider = styled.div`
  width: 100%;
  margin-top: 8px;
  margin-bottom: 8px;
  border-top: 1px dotted #BBB;
`
export const Order = styled.div`
 width: 100%;
 padding: 0 8px;

 display: flex;
 flex-direction: column;
 align-items: flex-start;
 justify-content: center;
 gap: 4px;
`
export const SpaceBetween = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`
export const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`
export const MainText = styled.h2`
  color: #13131A;
  font-size: 13px;
  font-weight: 600;
  align-self: flex-start;
`
export const SText = styled.span`
  color: #13131A;
  font-size: 12px;
  font-weight: 500;
  align-self: flex-start;
`
export const DoubleIcon = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 8px;
`