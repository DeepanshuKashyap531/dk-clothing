import styled from 'styled-components';

export const BackgroundImage = styled.div`
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    background-image: ${({imageUrl})=> `url(${imageUrl})`}
`

export const Body = styled.div`
    height: 90px;
    padding: 0 25px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 1px solid black;
    background-color: white;
    opacity: 0.7;
    position: absolute;

    h2 {
      font-weight: bold;
      margin: 0 6px 0;
      font-size: 22px;
      color: #4a4a4a;
      text-transform : uppercase;
    }

    p {
      font-weight: lighter;
      font-size: 16px;
    }
`

export const DirectoryItemContainer = styled.div`
  min-width: 30%;
  height: 350px;
  flex: 1 1 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
  margin: 0 7.5px 15px;
  overflow: hidden;
  position: relative;

  &:hover {
    cursor: pointer;

    & ${BackgroundImage} {
      transform: scale(1.1);
      transition: transform 6s cubic-bezier(0.25, 0.45, 0.45, 0.95);
    }

    & ${Body}{
      opacity: 0.9;
    }
}
  &:first-child {
    margin-right: 7.5px;
  }

  &:last-child {
    margin-left: 7.5px;
  }

   @media screen and (max-width: 768px) {
    min-width: 45%;
    height: 300px;

    &.large {
      height: 320px;
    }

    ${Body} {
      height: 80px;

      h2 {
        font-size: 20px;
      }

      p {
        font-size: 14px;
      }
    }
  }

  // 📱 Small screens / mobile
  @media screen and (max-width: 480px) {
    min-width: 100%;
    height: 250px;
    margin: 0 0 15px 0;

    &.large {
      height: 270px;
    }

    ${Body} {
      height: 70px;

      h2 {
        font-size: 18px;
      }

      p {
        font-size: 13px;
      }
    }

    &:first-child,
    &:last-child {
      margin: 0 0 15px 0;
    }
`

