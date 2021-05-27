import React,{useState,useEffect} from 'react';
import './home.css';
import {firestore} from '../../Firebase/Firebase';

const Home = () =>{

    const [tactics,setTactics] = useState([]);

    const fetchData = async () => {
        var temp = [];
        const response = firestore.collection(`tactics`);
        const data = await response.get();

        data.docs.forEach((item) => {
            // temp.push( {
            //     id:item.id,
            //     color: item.data().complete ? 'green': '    black',
            //     data: item.data()

            // });  
            console.log(item);
        })

    }
    useEffect(() => {
        fetchData();
    }, [])

    return (
        <div className='home'>
           <p>
            Security Assesment
            </p> 
        </div>
    );
}
export default Home;
