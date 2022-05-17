import React, { Component } from "react";
import styled from "styled-components";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import littlelogo from '../images/ninj.png'

const Logo = styled.div`
  display: flex;
  align-items: center;  
  color: #494949;
  img{
    width: 40px;
    filter: invert(80%) sepia(0%) saturate(0%) hue-rotate(293deg) brightness(105%) contrast(94%);
  }
`

const Headers = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 15px;
  background-color: #F5F4FC;

  @media (max-width: 400px) {
    flex-direction: column;
  }
`;

export default class Header extends Component {
  render() {
    return (
      <Headers>
        <Logo>
          <img src={littlelogo} />
          <Typography variant="h5">LabeNinjaS2</Typography>
        </Logo>
        <div>
          <Button variant="contained" sx={{ m: 1 }} onClick={() => this.props.changeScreen("home")}>Home</Button>
          <Button variant="contained" sx={{ m: 1 }} onClick={() => this.props.changeScreen("cart")}>
            Carrinho
          </Button>
        </div>
      </Headers>
    );
  }
}
