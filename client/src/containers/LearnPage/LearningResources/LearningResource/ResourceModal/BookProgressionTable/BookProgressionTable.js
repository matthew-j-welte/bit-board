import React from 'react'
import { Table, Segment, Progress, Checkbox, Header } from 'semantic-ui-react'

const BookProgressionTable = () => {
  const rows = [
    "Scalar Types and Variables",
    "Functions and Returns",
    "Objects and Classes",
    "Basic Conditionals",
    "Advanced Conditionals",
    "Package System",
    "Basic Architecture",
    "Encapsulations and Inheritance Encapsulations and Inheritance Encapsulations and Inheritance",
    "Advanced Architecture",
    "Polymorphism and Abstracton",
    "Generic Functions and Decorators",
    "Advanced Algorithms",
    "Further Optimizations",
  ].map((chapter, ind) => (
    <Table.Row>
    <Table.Cell textAlign="center">{ind + 1}</Table.Cell>
    <Table.Cell>{chapter}</Table.Cell>
    <Table.Cell textAlign='center'><Checkbox/></Table.Cell>
    <Table.Cell textAlign='center'><Checkbox/></Table.Cell>
    <Table.Cell><Progress indicating style={{marginBottom: "0"}}/></Table.Cell>
  </Table.Row>
  ))
  
  return (
    <Segment basic style={{padding: "0", margin: "1em 1em 0em 1em"}}>
      <Header 
        textAlign="center" 
        content="Object Oriented Programming: Part1"
        size="huge"
        style={{margin: "1em"}}
      />
      <Table fluid celled compact>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell width={1}>Chapter</Table.HeaderCell>
            <Table.HeaderCell width={6}>Title</Table.HeaderCell>
            <Table.HeaderCell width={0.5}>Finished</Table.HeaderCell>
            <Table.HeaderCell width={0.5}>Tested</Table.HeaderCell>
            <Table.HeaderCell width={8}>Progress</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {rows}
        </Table.Body>
      </Table>
    </Segment>
  )
}

export default BookProgressionTable