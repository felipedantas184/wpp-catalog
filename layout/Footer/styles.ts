import styled from "styled-components";

export const Container = styled.section`
  background-color: #5A189A;

  display: flex;
  flex-direction: column;
  align-items: center;
`
export const Wrapper = styled.div`
  width: 100%;
  max-width: 1080px;
  padding: 32px 16px 24px 16px;
	margin-left: auto;
	margin-right: auto;

	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
`
export const LogoWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 120px;

  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  > div {
    position: unset !important;
  }

  .image {
    object-fit: contain;
    width: 100% !important;
    position: relative !important;
    height: unset !important;
  }
`
export const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
`
export const Group = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;
`
export const Title = styled.h4`
  color: #F6F6F6;
  font-size: 18px;
`
export const List = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
`
export const ListItem = styled.li`
  color: #E1E1E1;
  font-size: 16px;
`
export const SocialNav = styled.ul`
	list-style: none;
  
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
`
export const SocialItem = styled.li`
  font-size: 16px;
	transition: all 0.2s ease-in-out;
  -webkit-tap-highlight-color: rgba(0,0,0,0);
  -webkit-tap-highlight-color: transparent;

  &::after {
    display:block;
    content: '';
    border-bottom: solid 2px #EB5757;  
    transform: scaleX(0);  
    transition: transform 250ms ease-in-out;
  }
  &:hover::after {
    transform: scaleX(1);
  }

  a {
    text-decoration: none;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 8px;
    color: #F1F1F1;
  }
`
export const Copyright = styled.div`
  background-color: #13131A;
  width: 100%;
  padding: 16px 0;
	margin-left: auto;
	margin-right: auto;

	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
`
export const CopyrightSpan = styled.span`
  color: #E5E5E5;
  font-size: 14px;
  text-align: center;
`