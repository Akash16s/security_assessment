import React, { useEffect } from 'react';
import './technique.css';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';

const TechniqueDetails = (props) => {
    

    return (
        
        <div className='techniqueDetails'>
            <h2>
                {props.location.state.techniqueList['techniqueName']}
            </h2>
            <h5>
                {props.location.state.techniqueList['techniqueId']}
            </h5>
            <section className='tacticsTable'>
                <Table striped bordered hover variant="dark" responsive>
                    <thead>
                        <tr>
                            <th>Tactic Id</th>
                            <th>Tactic Name</th>
                            <th>Tactic Prime Name</th>
                        </tr>
                    </thead>  
                    <tbody >
                   {
                       props.location.state.techniqueList['tactics'].map((item)=>(
                        <tr className='tr' key={item.tacticId}>
                        <td>{item.tacticId}</td>
                        <td>{item.tacticName}</td>
                        <td>{item.tacticPrimeName}</td>
                    </tr>
                       ))
                   } 
                    </tbody>
                </Table>
            </section>
        </div>
    );
}

export default TechniqueDetails;

