import React, { useState } from "react";
import styled from "styled-components";
import GlobalStyle from "./globalStyles";
import forca0 from "./imgs/forca0.png";

export default function App() {
    const alfabeto = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
    const [clicadas, setClicadas] = useState([])

    console.log(clicadas)

    function RenderLetras(letraRecebida, indiceRecebido){
        let booleano = true
        if (clicadas.includes(letraRecebida)){
            booleano = true
        }else{
            booleano = false
        }

        return(
            <BotaoLetra onClick={() => ClickLetra(letraRecebida)} key={indiceRecebido} disabled={booleano} clicado={!booleano}>{letraRecebida.toUpperCase()}</BotaoLetra>
        )
    }

    function ClickLetra(letraClicada){
        const novoArray = [...clicadas, letraClicada]
        setClicadas(novoArray)

    }

  return (
    <>
    <GlobalStyle/>
    <Container>
      <img src={forca0} alt="vazia" />
      <div>
      <EscolhaBotao>Escolher palavra</EscolhaBotao>
      <div className="palavra">_____</div>
      </div>
      </Container>
      <div className="letras">
        {alfabeto.map((letra, indiceLetra) => RenderLetras(letra, indiceLetra))}
      </div>
      <div className="palpite">
        Já sei a palavra!
        <input type="text" />
        <button>Chutar</button>
        </div>
    </>
  );
}


const Container = styled.div`
    display: flex;

    div{
        display:flex;
        flex-direction: column;
        justify-content: space-between;
    }

`

const EscolhaBotao = styled.button`
    height: 50px;
    border: none;
    width: 140px;
    background-color:#27AE60;
    font-weight: 700;
    color: #ffffff;
    border-radius: 10px;
    cursor: pointer;


    `

const BotaoLetra = styled.button`
    height: 40px;
    width: 40px;
    border: 1px solid #4D75A0;
    border-radius: 5px;
    font-weight: bold;
    background-color: ${props => props.clicado ? "#E1ECF4" : "#9FAAB5"};
    color: ${props => props.clicado ? "#4D75A0":"#79818A"};
    margin: 5px 5px;
    cursor: ${props => props.clicado ? "pointer" : "not-allowed"};

`