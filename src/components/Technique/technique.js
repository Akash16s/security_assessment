import React, {useState} from 'react';
import './technique.css';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import { v4 } from "uuid";
import { firestore } from '../../Firebase/Firebase';

const TechniqueDetails = (props) => {

    const severityParameters = ['Exploitability', 'Impact'];

    const [propsTactics, setPropsTactics] = useState(props.location.state.techniqueList['tactics']);

    const getTechniques = async () => {
        let items = JSON.parse(localStorage.getItem('techniques'));
        return items;
    }

    const filterTechniques = async (localData) => {
        let techniqueArray = localData.filter(function (t) {
            return t.techniqueId === props.location.state.techniqueList['techniqueId'];
        });
        return techniqueArray;
    }

    const handleSwitches = async (id, level, severityParameter) => {
        let localData = await getTechniques();
        
        let techniqueArray = await filterTechniques(localData);

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

        localData = await getTechniques();

        techniqueArray = await filterTechniques(localData);

        setPropsTactics(techniqueArray[0].tactics);
    
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
                            propsTactics.map((item) => (
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
