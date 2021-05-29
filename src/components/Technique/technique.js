import React from 'react';
import './technique.css';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import { v4 } from "uuid";
import { firestore } from '../../Firebase/Firebase';

const TechniqueDetails = (props) => {

    const getTechniques = async () => {
        let items = JSON.parse(localStorage.getItem('techniques'));
        return items;
    }

    const handleSwitches = async (id,level)=>{
        const localData = await getTechniques();
        let techniqueArray = localData.filter( function (t){
            return t.techniqueId === props.location.state.techniqueList['techniqueId'];
        });
        let tacticArray = techniqueArray[0].tactics.filter( function (t){
            return t.tacticId === id;
        });
        tacticArray[0].severityLevel = level;
        localStorage.setItem('techniques', JSON.stringify(localData));
        firestore.collection(`tactics`).doc(`${props.location.state.techniqueList['techniqueId']}`).collection(`techniques`).doc(`${id}`).update({
            'severityLevel' : level
        });
        console.log(localData);

    }

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
                            <th>Severity Meter</th>
                        </tr>
                    </thead>
                    <tbody >
                        {
                            props.location.state.techniqueList['tactics'].map((item) => (
                                <tr className='tr' key={item.tacticId}>
                                    <td>{item.tacticId}</td>
                                    <td>{item.tacticName}</td>
                                    <td>{item.tacticPrimeName}</td>
                                    <td>{
                                        <div>
                                             <Form.Check
                                                type="switch"
                                                id={v4()}
                                                toggle
                                                inline
                                                label="Low"
                                                onChange={()=>handleSwitches(item.tacticId,'Low')}
                                            />
                                             <Form.Check
                                                type="switch"
                                                id={v4()}
                                                toggle
                                                inline
                                                label="Medium"
                                                onChange={()=>handleSwitches(item.tacticId,'Medium')}
                                            />
                                            <Form.Check
                                                type="switch"
                                                id={v4()}
                                                toggle
                                                inline
                                                label="High"
                                                onChange={()=>handleSwitches(item.tacticId,'High')}
                                            />
                                        </div>
                                    }</td>
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


