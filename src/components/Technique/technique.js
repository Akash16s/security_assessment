import React,{useEffect} from 'react';
import './technique.css';
import Table from 'react-bootstrap/Table';    

const TechniqueDetails = (props)=>{
    console.log(props.location.techniqueList);
    return (
        <div className='techniqueDetails'>
            <h2>
            {props.location.techniqueList['techniqueName']}
            </h2>
            <h5>
            {props.location.techniqueList['techniqueId']}
            </h5>
        </div>
    );
}

export default TechniqueDetails;

{/* <Table striped bordered hover variant="dark">
  <thead>
    <tr>
      <th>Tactic Id</th>
      <th>Tactic Name</th>
      <th>Tactic Prime Name</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td>Mark</td>
      <td>Otto</td>
    </tr>
  </tbody>
</Table> */}