import axios from 'axios';
import { useEffect, useState } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import styled from 'styled-components';



function ShowUrlShortened() {
    let { url } = useParams();
    const [errMsg , setErrMsg] = useState('');

    useEffect(() => {
        axios.get(`/api/${url}`)
        .then(res => {
            window.location.assign(res.data.normalUrl);
        })
        .catch(err => {
            if (err.message === "Request failed with status code 404") {
                setErrMsg('404 Not Found !')
            } else if (err.message === "Request failed with status code 500") {
                setErrMsg('500 Internal Server Error!')
            }
        })
    }, [])

    const Redirecting = (
        <div>
            <p>Redirecting ...</p>
        </div>
    );

    const IfErr = (
        <ErrDiv>
            <p>{errMsg}</p>
            <a href="/">Return To Main Page!</a>
        </ErrDiv>
    );

    return (
        <Container>
            {errMsg ? IfErr : Redirecting }
        </Container>
    )
}

export default ShowUrlShortened;

const Container = styled.div`
    width: 100%;
    height: 800px;
    background-color: ${props => props.theme.bgColor};
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    & p {
        margin: 5rem;
        font-size: 20px;
        color: ${props => props.theme.mainTextColor};
    }

    & a {
    /* margin-top: 2rem; */
    display: flex;
    justify-content: center;
    align-items: center;
    width: 200px;
    height: 55px;
    border: none;
    text-align: center;
    text-decoration: none;
    background-color: ${props => props.theme.btnSubmit};
    font-weight: bold;
    transition: .6s;
    color: ${props => props.theme.mainTextColor};

    &:hover {
        background-color: ${props => props.theme.hfbBgColor};
    }
    }
`;

const ErrDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`