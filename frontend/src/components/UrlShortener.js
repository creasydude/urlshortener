import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import axios from 'axios';

function UrlShortener() {
    const [normalUrl, setNormalUrl] = useState('');
    const [shortUrl, setShortUrl] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [loading, setLoading] = useState(true);
    const [copySuccess, setCopySuccess] = useState('Click To Copy!');
    const textAreaRef = useRef(null);
    const urlValidator = /^(ftp|http|https):\/\/[^ "]+$/;


    const getInputValue = (e) => {
        setNormalUrl(e.target.value);
    }

    const dataHandler = () => {
        if (normalUrl === '') {
            setErrMsg("YOU SHOULD TYPE URL !")
            setTimeout(() => {
                setErrMsg('')
            }, 5000);
        } else if (urlValidator.test(normalUrl) === false) {
            setErrMsg("URL INVALID !")
            setTimeout(() => {
                setErrMsg('')
            }, 5000);

        } else {
            axios.post('/api', {
                normalUrl: normalUrl
            })
                .then(res => {
                    setShortUrl(res.data.saveUrl.shortenedUrl);
                    setLoading(false);
                })
                .catch(err => {
                    setErrMsg(err.message);
                    setTimeout(() => {
                        setErrMsg('')
                    }, 5000);
                })
        }

    }

    const copyToClipboard = (e) => {
        textAreaRef.current.select();
        document.execCommand('copy');
        e.target.focus();
        setCopySuccess('Copied!');
    }

    const UrlInput = (
        <InputDiv>
            <p>Type The Url You Want To Short!</p>
            <div>
                <input type="text" onChange={getInputValue} placeholder="E.g. https://google.com" />
                <button onClick={dataHandler}>Short Url</button>
            </div>
            <p>{errMsg}</p>
        </InputDiv>
    );

    const UrlShortened = (
        <UrlShortDiv>
            <span>Url Shortened!</span>
            <div>
                <input readOnly type="text" value={`${window.location}${shortUrl}`} ref={textAreaRef} />
                <button onClick={copyToClipboard} >{copySuccess}</button>
            </div>
            <a href="#" onClick={() => window.location.reload(false)}>Short Another Url!</a>
        </UrlShortDiv>
    );

    return (
        <Container>
            {loading ? UrlInput : UrlShortened}
        </Container>
    )
}

export default UrlShortener;

const Container = styled.div`
    width: 100%;
    height: 800px;
    background-color: ${props => props.theme.bgColor};
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
`

const InputDiv = styled.div`
    padding: 5rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    & p {
        font-size: 20px;
        color: ${props => props.theme.mainTextColor};
    }

    & input {
    width: 300px;
    height: 35px;
    border: none;
    outline: none;
    background-color: ${props => props.theme.bgForNote};

    }

    & button {
    display: inline;
    margin-top: 2rem;
    width: 125px;
    height: 37px;
    border: none;
    background-color: ${props => props.theme.btnSubmit};
    font-weight: bold;
    transition: .6s;
    color: ${props => props.theme.mainTextColor};
    cursor: pointer;

    &:hover {
        background-color: ${props => props.theme.hfbBgColor};
    }

    }
`;

const UrlShortDiv = styled.div`
    padding: 5rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    & span {
        font-size: 20px;
        color: ${props => props.theme.mainTextColor};
    }

    & input {
    width: 300px;
    height: 35px;
    border: none;
    outline: none;
    background-color: ${props => props.theme.bgForNote};

    }

    & button {
    display: inline;
    margin-top: 2rem;
    width: 125px;
    height: 37px;
    border: none;
    background-color: ${props => props.theme.btnSubmit};
    font-weight: bold;
    transition: .6s;
    color: ${props => props.theme.mainTextColor};
    cursor: pointer;

    &:hover {
        background-color: ${props => props.theme.hfbBgColor};
    }

    }

    & a {
    margin-top: 2rem;
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