import Link from "next/link";
import styled from "styled-components";

export const Section = styled.section`
  background-color: #F6F6F6;
  padding: 25px 0;
`
export const Wrapper = styled.div`
  width: 100%;
  max-width: 1080px;
  padding: 0 16px;
	margin-left: auto;
	margin-right: auto;

	display: flex;
	flex-direction: column;
	align-items: center;
  gap: 24px;
  min-height: 86vh;

  @media screen and (max-width: 768px) {
    padding: 0 8px;
  }
`
export const Title = styled.h1`
  color: #13131A;
  font-size: 16px;
  font-weight: 600;
`
export const Menu = styled.div`
  width: 100%;
	display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
`
export const Card = styled.div`
  width: 100%;
  padding: 16px 12px;
  background-color: #FFF;
  border-radius: 10px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;

	display: flex;
	flex-direction: column;
	align-items: center;
  gap: 8px;
`
export const CardTitle = styled.h5`
  color: #13131A;
  font-size: 18px;
  font-weight: 600;
  align-self: flex-start;
`
export const CardNumber = styled.span`
  color: #13131A;
  font-size: 16px;
  font-weight: 500;
  align-self: flex-start;
`
export const BigMenu = styled.div`
  width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
`
export const BigCard = styled.div`
  width: 100%;
  padding: 16px 12px;
  background-color: #FFF;
  border-radius: 10px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;

	display: flex;
	flex-direction: column;
	align-items: center;
  gap: 8px;
`
export const BigTitle = styled.h2`
  color: #13131A;
  font-size: 16px;
  font-weight: 600;
  align-self: flex-start;
  padding: 0 8px;
`
export const Product = styled.div`
 width: 100%;
 padding: 0 8px;

 display: flex;
 flex-direction: row;
 align-items: center;
 gap: 16px;
`
export const ImageWrapper = styled(Link)`
  position: relative;
  max-width: 50px;

  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;

  > div {
    position: unset !important;
  }

  .image {
    object-fit: contain;
    width: 100% !important;
    position: relative !important;
    height: unset !important;

    &:hover {
      transform: scale(1.1);
      transition: transform 0.5s ease-in-out;
    }
  }
`
export const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
`
export const TopicWrapper = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
`
export const Brand = styled.h3`
  color: #13131A;
  font-size: 13px;
  font-weight: 600;
  text-transform: uppercase;
`
export const PTitle = styled.h2`
  color: #13131A;
  font-size: 13px;
  font-weight: 500;
`
export const Price = styled.span`
  color: #13131A;
  font-size: 12px;
  font-weight: 600;
`
export const Quantity = styled.span`
  color: #13131A;
  font-size: 12px;
  font-weight: 500;
`