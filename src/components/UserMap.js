import React, { useState } from 'react';
import { MdLocationOn } from 'react-icons/md';
import {AiOutlineClose} from 'react-icons/ai';
import styled from 'styled-components';
import Modal from 'react-modal';

import { GoogleMap, LoadScript } from '@react-google-maps/api';

export default function UserMap({username, location}){
    const [showMap, setShowMap] = useState(false);

    const mapStyles = {        
        height: "80%",
        width: "100%"
    };

    return(
        <Container>
            <MdLocationOn onClick={() => setShowMap(true)} />
            <Modal style={style} isOpen={showMap} ariaHideApp={false}>
                <Close>
                    <h2>{`${username}'s location`}</h2>
                    <AiOutlineClose onClick={() => setShowMap(false)} />
                </Close>
                <LoadScript googleMapsApiKey='AIzaSyCrS0yA_nRVYgBh7IQAKTz3xDjKgD7sAGI'>
                    <GoogleMap
                        mapContainerStyle={mapStyles}
                        zoom={13}
                        center={{lat:parseFloat(location.latitude),lng:parseFloat(location.longitude)}}
                    />
                </LoadScript>
            </Modal>
        </Container>
    )
}

const Container = styled.span`
    svg{
        color: white;
        cursor: pointer;
        font-size: 23px;
    }
`;

const Close = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    margin-top: -10px;
    
    h2{
        font-size: 30px;
        font-weight: bold;
    }

    svg{
        cursor: pointer;
        font-size: 20px;
    }
`;

export const style = {
    overlay:{
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        display: "flex",
    },
    
    content: {
        top:"30%",
        margin: "0 auto",
        backgroundColor: "#333",
        width:"50%",
        height:"35%",
        opacity: "1",
        borderRadius: "10px", 
        color: 'white',
    }
}