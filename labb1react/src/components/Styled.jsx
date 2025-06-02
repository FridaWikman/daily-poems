import styled from 'styled-components'

const Li = styled.li`
  list-style-type: none;
  margin-right: 10px;
`
const Ul = styled.ul`
  display: flex;
  padding: 0;
`
const ListUl = styled.ul`
  padding: 0;
`
const HeadingL = styled.h1`
  text-align: center;
  font-family: 'Irvin-Heading', Inter, system-ui, Avenir, Helvetica, Arial,
    sans-serif;
  margin-bottom: 80px;
`
const DivWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: relative;
  margin: auto;
  left: -115px;
  max-width: 600px;
`
const Button = styled.button`
  margin-top: 20px;
  width: 110px;
  border-radius: 5px;
  padding: 4px 6px;
  align-self: center;
`
const HeadingM = styled.h3`
  font-style: italic;
  padding-bottom: 20px;
  margin-top: 10px;
`
const Paragraph = styled.p`
  margin: 6px;
`
const HeadingS = styled.h4`
  margin: 10px;
  font-weight: 300;
  text-decoration: underline;
  cursor: pointer;
`
const PoemDiv = styled.div`
  max-height: 100vh
  min-width: 600px;
  background-color: #fdfdff;
  margin: 40px;
  padding-top: 30px;
  padding-left:40px;
  padding-right: 40px;
  padding-bottom: 50px;
  border-radius: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`
const SmallerDiv = styled.div`
  max-width: 400px;
  margin-bottom: 20px;
`
const ListDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 50px;
  margin-left: 30px;
  width: 200px;
  align-items: center;
`
const BigWrapperDiv = styled.div`
  display: flex;
  justify-content: flex-start;
`
const InputDiv = styled.div`
  display: flex;
  padding-left: 5px;
  padding-right: 5px;
`
const SubDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`

export {
  Li,
  Ul,
  HeadingL,
  DivWrapper,
  Button,
  HeadingM,
  Paragraph,
  HeadingS,
  PoemDiv,
  SmallerDiv,
  ListDiv,
  BigWrapperDiv,
  InputDiv,
  SubDiv,
  ListUl,
}
