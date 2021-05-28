import React, { useState, useEffect } from 'react';
import './home.css';
import { firestore } from '../../Firebase/Firebase';
import DropdownButton from 'react-bootstrap/DropdownButton';    

const Home = () => {

    const [techniques,setTechniques] = useState([]);

    const temp =[
        { 'techniqueId': 'TA0043', 'techniqueName': 'Reconnaissance', 'tactics': [], },
        { 'techniqueId': 'TA0042', 'techniqueName': 'Resource Development', 'tactics': [] },
        { 'techniqueId': 'TA0001', 'techniqueName': 'Initial Access', 'tactics': [] },
        { 'techniqueId': 'TA0002', 'techniqueName': 'Execution', 'tactics': [] },
        { 'techniqueId': 'TA0003', 'techniqueName': 'Persistence', 'tactics': [] },
        { 'techniqueId': 'TA0004', 'techniqueName': 'Privilege Escalation', 'tactics': [] },
        { 'techniqueId': 'TA0005', 'techniqueName': 'Defense Evasion', 'tactics': [] },
        { 'techniqueId': 'TA0006', 'techniqueName': 'Credential Access', 'tactics': [] },
        { 'techniqueId': 'TA0007', 'techniqueName': 'Discovery', 'tactics': [] },
        { 'techniqueId': 'TA0008', 'techniqueName': 'Lateral Movement', 'tactics': [] },
        { 'techniqueId': 'TA0009', 'techniqueName': 'Collection', 'tactics': [] },
        { 'techniqueId': 'TA0011', 'techniqueName': 'Command and Control', 'tactics': [] },
        { 'techniqueId': 'TA0010', 'techniqueName': 'Exfiltration', 'tactics': [] },
        { 'techniqueId': 'TA0040', 'techniqueName': 'Impact', 'tactics': [] }];


    const fetchTactics = () => {

        console.log('fetchTacitc function called');

        temp.forEach(async (technique) => {

            console.log('first for each called');

            let collection = `tactics/${technique.techniqueId}/techniques`;
            const response = firestore.collection(collection);
            const data = await response.get();
            data.docs.forEach((item) => {
                technique.tactics.push(
                    {
                        "tacticPrimeName": item.data().primeName,
                        "tacticName": item.data().name,
                        "tacticId": item.data().id
                    }
                );
            });
        });
        setTechniques(temp);
    }
    useEffect(() => {
        fetchTactics();
    }, [])

    return (
        <div className='home'>
            <p>
                Security Assesment
            </p>
            <section className='techniquesTiles'>
                {
                    techniques.map((item) => (
                        <article key={item.techniqueId} className="tilesContent">
                            <p className='heading'>
                                {item.techniqueName}
                            </p>
                            <p className='subtitle'>
                                {item.tactics.length} techniques
                        </p>
                            <div className='tactics'>
                            {
                                item.tactics.map( (item)=>(
                                    <article key={item.tacticId}>
                                        {item.tacticName}
                                    </article>
                                ))
                            }
                        </div>
                        </article>
                    ))
                }
            </section>
        </div>
    );
}
export default Home;
