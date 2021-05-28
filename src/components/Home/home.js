import React, { useState, useEffect } from 'react';
import './home.css';
import { firestore } from '../../Firebase/Firebase';
import { Link } from 'react-router-dom';
// import DropdownButton from 'react-bootstrap/DropdownButton';    



const Home = () => {

    const LinkStyle = {
        textDecoration: 'none',
        color: 'black'
    }

    const saveTechniques = async (techniques) => {
        localStorage.setItem('techniques', JSON.stringify(techniques));
        setTechniques(techniques);
    }
    const getTechniques = async () => {
        let items = JSON.parse(localStorage.getItem('techniques'));
        return items;
    }

    const [techniques, setTechniques] = useState([]);

    const temp = [
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
        { 'techniqueId': 'TA0040', 'techniqueName': 'Impact', 'tactics': [] }
    ];

    const fetchTactics = async () => {

        console.log('fetchTacitc function called');

        await Promise.all(temp.map(async (technique) => {

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
        }));
        await saveTechniques(temp)

    }
    useEffect(() => {
        if (localStorage.getItem('techniques') === null) {
            fetchTactics();
        }
        else {
            getTechniques().then(async (data) => {
                setTechniques(data);
            });
        }
    }, [])

    return (
        <div className='home'>
            <p>
                Security Assesment
            </p>
            <section className='techniquesTiles'>
                {
                    techniques.map((technique) => (
                        <article key={technique.techniqueId} className="tilesContent">
                            <Link to={{
                                
                                pathname:`/technique/${technique.techniqueName}`,
                                techniqueList:technique
                                
                            }}style={LinkStyle}>
                                <p className='heading'>
                                    {technique.techniqueName}
                                </p>
                            </Link>
                            <p className='subtitle'>
                                {technique.tactics.length} techniques
                        </p>
                            <div className='tactics'>
                                {
                                    technique.tactics.slice(0, 5).map((item) => (
                                        <article key={item.tacticId}>
                                            <Link to={`/technique/${technique.techniqueName}`} style={LinkStyle}>
                                                <p className='tacticName'>{item.tacticName} </p>
                                            </Link>

                                        </article>
                                    ))
                                }
                                <Link to={`/technique/${technique.techniqueName}`} style={LinkStyle}>
                                    <button className='seeMoreBtn' >See More</button>
                                </Link>
                            </div>
                        </article>
                    ))
                }
            </section>
        </div>
    );
}



export default Home;
