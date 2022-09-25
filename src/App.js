import React, { useState } from "react";
import styled from "styled-components";
import GlobalStyle from "./globalStyles";
import forca0 from "./imgs/forca0.png";
import forca1 from "./imgs/forca1.png";
import forca2 from "./imgs/forca2.png";
import forca3 from "./imgs/forca3.png";
import forca4 from "./imgs/forca4.png";
import forca5 from "./imgs/forca5.png";
import forca6 from "./imgs/forca6.png";
import palavras from "./palavras";

export default function App() {
    const alfabeto = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
    const [clicadas, setClicadas] = useState([])
    const [arrayPalavra, setArrayPalavra] = useState([])
    const [stringPalavra, setStringPalavra] = useState("")
    const [erros, setErros] = useState(0)
    const [acertos, setAcertos] = useState(0)
    const [arraySemAcentos, setArraySemAcentos] = useState([])
    const [tentativa, setTentativa] = useState([])
    
    console.log(arrayPalavra)
    console.log(acertos)

    function EscolherPalavra(){
        const random = Math.floor(Math.random() * palavras.length);
        const palavraSorteada = palavras[random]
        console.log(palavraSorteada);
        

        const novoArrayPalavra = []
        const underlines = []
        const novoArraySemAcentos = []
        const result = palavraSorteada.normalize('NFD').replace(/[\u0300-\u036f]/g, "")

        for (let i = 0; i < palavraSorteada.length; i++){
            novoArrayPalavra.push(palavraSorteada[i])
            novoArraySemAcentos.push(result[i])
            underlines.push('_')
        }
                  

        setStringPalavra(palavraSorteada)
        setArrayPalavra(novoArrayPalavra)
        setArraySemAcentos(novoArraySemAcentos)
        setTentativa(underlines)
        setClicadas([])
        setAcertos(0)
        setErros(0)
    }

    function RenderLetras(letraRecebida, indiceRecebido){
        let desativado = true
        if (clicadas.includes(letraRecebida) || arrayPalavra.length === 0 || erros === 6){
            desativado = true
        }else{
            desativado = false
        }

        return(
            <BotaoLetra onClick={() => ClickLetra(letraRecebida)} key={indiceRecebido} disabled={desativado} clicado={!desativado}>{letraRecebida.toUpperCase()}</BotaoLetra>
        )
    }

    function ClickLetra(letraClicada){
        const novoArray = [...clicadas, letraClicada]
        setClicadas(novoArray)
        if(arraySemAcentos.includes(letraClicada)){
            let repeticoes = 0
            const indices = []
            let atualizado = [...tentativa]

            for (let i = 0; i<arraySemAcentos.length; i++){
                if (letraClicada === arraySemAcentos[i]){
                    repeticoes++
                    indices.push(i)
                }
            }
            indices.forEach((indice) => atualizado[indice] = letraClicada)
            // for (let i = 0; i < indices.length; i++){
            //     atualizado[indice]
            // }
            setTentativa(atualizado)
            setAcertos(acertos + repeticoes)
        } else{
            setErros(erros +1)
        }

        
    }

    function Monitor(){
        let cor = "black"
        if (erros === 6){
            cor = "red"
        } else if(acertos === arraySemAcentos.length){
            cor = "green"
        }
        return(
            <PalavraAtual corzinha={cor}>{(erros === 6)? stringPalavra: tentativa}</PalavraAtual>
        )
    }
    

    function ImagemForca(){
        switch(erros){
            case 6:
                return forca6               
            case 5:
                return forca5
            case 4:
                return forca4               
            case 3:
                return forca3               
            case 2:
                return forca2               
            case 1:
                return forca1               
            default:
                return forca0
        }
    }

  return (
    <>
      <GlobalStyle />
      <Container>
        <img src={ImagemForca()} alt="vazia" />
        <div>
          <EscolhaBotao onClick={EscolherPalavra}>
            Escolher palavra
          </EscolhaBotao>
          <Monitor/>
        </div>
      </Container>
      <Teclado>
        {alfabeto.map((letra, indiceLetra) => RenderLetras(letra, indiceLetra))}
      </Teclado>
      <Palpite>
        Já sei a palavra!
        <input type="text" />
        <BotaoChute>Chutar</BotaoChute>
      </Palpite>
    </>
  );
}


const Container = styled.div`
    display: flex;

    div{
        display:flex;
        flex-direction: column;
        justify-content: space-between;
        margin: 0 auto;
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
const BotaoChute = styled(BotaoLetra)`
    width: auto;
    background-color: #E1ECF4;
    color: #4D75A0;
    cursor: pointer;
`

const Teclado = styled.div`
    flex-wrap: wrap;
    width: 650px;
    margin: 0 auto;
`

const Palpite = styled.div`
    width: 650px;
    margin: 0 auto;
`
const PalavraAtual = styled.div`
    font-size: 50px;
    font-weight: 700;
    letter-spacing: 5px;
    color: ${props => props.corzinha};
`