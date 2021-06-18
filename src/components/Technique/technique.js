import React, {useState} from 'react';
import './technique.css';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import { v4 } from "uuid";
import { firestore } from '../../Firebase/Firebase';

const TechniqueDetails = (props) => {

    const severityParameters = ['Exploitability', 'Impact'];

    const getTechniques = async () => {
        let items = JSON.parse(localStorage.getItem('techniques'));
        return items;
    }

    const handleSwitches = async (id, level, severityParameter) => {
        const localData = await getTechniques();
        let techniqueArray = localData.filter(function (t) {
            return t.techniqueId === props.location.state.techniqueList['techniqueId'];
        });
        let tacticArray = techniqueArray[0].tactics.filter(function (t) {
            return t.tacticId === id;
        });

        if (severityParameter === 'Exploitability') {
            tacticArray[0].Exploitability = level;
        } if (severityParameter === 'Impact') {
            tacticArray[0].Impact = level;
        } 

        localStorage.setItem('techniques', JSON.stringify(localData));

        if (severityParameter === 'Exploitability') {
            firestore.collection(`tactics`).doc(`${props.location.state.techniqueList['techniqueId']}`).collection(`techniques`).doc(`${id}`).update({
                "Exploitability" : level
            });
        } if (severityParameter === 'Impact') {
            firestore.collection(`tactics`).doc(`${props.location.state.techniqueList['techniqueId']}`).collection(`techniques`).doc(`${id}`).update({
                "Impact" : level
            });
        } 
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
                            {
                                severityParameters.map((item) => (
                                    <th>{item}</th>
                                ))
                            }
                        </tr>
                    </thead>
                    <tbody >
                        {
                            props.location.state.techniqueList['tactics'].map((item) => (
                                <tr className='tr' key={item.tacticId}>
                                    <td>{item.tacticId}</td>
                                    <td>{item.tacticName}</td>
                                    <td>{item.tacticPrimeName}</td>
                                    {
                                        severityParameters.map((sP) => (
                                            <td>{
                                                <div>
                                                    <Form.Check
                                                        type="switch"
                                                        id={v4()}
                                                        toggle
                                                        inline
                                                        checked={item[sP] === 'Low' ? true : false}
                                                        label="Low"
                                                        onChange={() => handleSwitches(item.tacticId, 'Low', sP)}
                                                    />
                                                    <Form.Check
                                                        type="switch"
                                                        id={v4()}
                                                        toggle
                                                        checked={item[sP] === 'Medium' ? true : false}
                                                        inline
                                                        label="Medium"
                                                        onChange={() => handleSwitches(item.tacticId, 'Medium', sP)}
                                                    />
                                                    <Form.Check
                                                        type="switch"
                                                        id={v4()}
                                                        toggle
                                                        inline
                                                        checked={item[sP] === 'High' ? true : false}
                                                        label="High"
                                                        onChange={() => handleSwitches(item.tacticId, 'High', sP)}
                                                    />
                                                </div>
                                            }</td>
                                        ))
                                    }
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

// <td>{
//                                         <div>
//                                             <Form.Check
//                                                 type="switch"
//                                                 id={v4()}
//                                                 toggle
//                                                 inline
//                                                 checked={item.Exploitability === 'Low' ? true : false}
//                                                 label="Low"
//                                                 onChange={() => handleSwitches(item.tacticId, 'Low', 'Exploitability')}
//                                             />
//                                             <Form.Check
//                                                 type="switch"
//                                                 id={v4()}
//                                                 toggle
//                                                 checked={item.Exploitability === 'Medium' ? true : false}
//                                                 inline
//                                                 label="Medium"
//                                                 onChange={() => handleSwitches(item.tacticId, 'Medium', 'Exploitability')}
//                                             />
//                                             <Form.Check
//                                                 type="switch"
//                                                 id={v4()}
//                                                 toggle
//                                                 inline
//                                                 checked={item.Exploitability === 'High' ? true : false}
//                                                 label="High"
//                                                 onChange={() => handleSwitches(item.tacticId, 'High', 'Exploitability')}
//                                             />
//                                         </div>
//                                     }</td>
//                                     <td>{
//                                         <div>
//                                             <Form.Check
//                                                 type="switch"
//                                                 id={v4()}
//                                                 toggle
//                                                 inline
//                                                 checked={item.Impact === 'Low' ? true : false}
//                                                 label="Low"
//                                                 onChange={() => handleSwitches(item.tacticId, 'Low', 'Impact')}
//                                             />
//                                             <Form.Check
//                                                 type="switch"
//                                                 id={v4()}
//                                                 toggle
//                                                 checked={item.Impact === 'Medium' ? true : false}
//                                                 inline
//                                                 label="Medium"
//                                                 onChange={() => handleSwitches(item.tacticId, 'Medium', 'Impact')}
//                                             />
//                                             <Form.Check
//                                                 type="switch"
//                                                 id={v4()}
//                                                 toggle
//                                                 inline
//                                                 checked={item.Impact === 'High' ? true : false}
//                                                 label="High"
//                                                 onChange={() => handleSwitches(item.tacticId, 'High', 'Impact')}
//                                             />
//                                         </div>
//                                     }</td>
//                                     <td>{
//                                         <div>
//                                             <Form.Check
//                                                 type="switch"
//                                                 id={v4()}
//                                                 toggle
//                                                 inline
//                                                 checked={item.Severity === 'Low' ? true : false}
//                                                 label="Low"
//                                                 onChange={() => handleSwitches(item.tacticId, 'Low', 'Severity')}
//                                             />
//                                             <Form.Check
//                                                 type="switch"
//                                                 id={v4()}
//                                                 toggle
//                                                 checked={item.Severity === 'Medium' ? true : false}
//                                                 inline
//                                                 label="Medium"
//                                                 onChange={() => handleSwitches(item.tacticId, 'Medium', 'Severity')}
//                                             />
//                                             <Form.Check
//                                                 type="switch"
//                                                 id={v4()}
//                                                 toggle
//                                                 inline
//                                                 checked={item.Severity === 'High' ? true : false}
//                                                 label="High"
//                                                 onChange={() => handleSwitches(item.tacticId, 'High', 'Severity')}
//                                             />
//                                         </div>
//                                     }</td>