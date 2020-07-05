import React from 'react'
import styled from 'styled-components'

const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  height: 90vh;
`

const MessageBox = styled.div`
  padding: 5rem;
  margin: auto;
  font-size: 3rem;
  color: #ccc;
  text-align: center;
`
MessageBox.displayName = 'MessageBox'
const App = () => {
  return (
    <Container>
      <MessageBox>Coming soon!</MessageBox>
    </Container>
  )
}

export default App
