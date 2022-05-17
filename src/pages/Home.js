import React from "react";
import styled from "styled-components";
import Button from '@mui/material/Button';
import logo from '../images/labeninjas2.png'
import Typography from '@mui/material/Typography';

const HomeContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #F5F4FC;
  height: calc(100vh - 92.5px);
  div{
    width: 50%;
    margin-right: 2%;
    margin-left: 5% ;
    
  } 
  img{
    width: 40vw;
    height: 80vh;
  } 

  @media (max-width: 400px) {
    flex-direction: column;

    div {
      p{
        display: none;
      }
    }

    img {
      width: 90vw;
      height: 90vw;
    }
  }
`;

export default class Home extends React.Component {
  render() {
    return (
      <HomeContainer>
        <div>
          <Typography sx={{ mb: 2, textAlign: 'justify', fontSize: 24, mb: 5 }}>
            Labeninjas é uma startup destinada à busca e oferta de prestações de serviço. Aqui, os ninjas podem oferecer seus serviços livremente, enquanto as pessoas com demandas específicas podem encontrar perfis bem alinhados ao que precisam.
          </Typography>
          <Button variant="contained" sx={{ mr: 1 }} onClick={() => this.props.changeScreen("hire")}>
            Contratar um ninja
          </Button>
          <Button variant="contained" sx={{ mr: 1 }} onClick={() => this.props.changeScreen("register")}>
            Quero ser um ninja
          </Button>
        </div>
        <img src={logo} alt='logo com ninja' />
      </HomeContainer>
    );
  }
}
