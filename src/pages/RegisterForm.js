import Axios from "axios";
import React from "react";
import styled from "styled-components";
import { key } from "../constants/apiKey";
import { baseURL } from "../constants/baseURL";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import moment from "moment";

import DateAdapter from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';

export default class RegisterForm extends React.Component {
  state = {
    title: "",
    pricetag: "",
    description: "",
    deadline: moment().format('MM/DD/YYYY'),
    checkCredit: false,
    checkDebit: false,
    checkPaypal: false,
    checkInvoice: false,
    checkPix: false,
  };

  handleTitle = (event) => {
    this.setState({ title: event.target.value });
  };

  handlePriceTag = (event) => {
    this.setState({ pricetag: event.target.value });
  };

  handleDescription = (event) => {
    this.setState({ description: event.target.value });
  };

  handleCredit = (event) => {
    this.setState({ checkCredit: event.target.checked });
  };

  handleDebit = (event) => {
    this.setState({ checkDebit: event.target.checked });
  };

  handleInvoice = (event) => {
    this.setState({ checkInvoice: event.target.checked });
  };

  handlePaypal = (event) => {
    this.setState({ checkPaypal: event.target.checked });
  };

  handlePix = (event) => {
    this.setState({ checkPix: event.target.checked });
  };

  paymentList = () => {
    const arr = [];

    if (this.state.checkCredit) {
      arr.push("Cartão de Crédito");
    }

    if (this.state.checkDebit) {
      arr.push("Cartão de Débito");
    }

    if (this.state.checkPaypal) {
      arr.push("Paypal");
    }

    if (this.state.checkInvoice) {
      arr.push("Boleto");
    }

    if (this.state.checkPix) {
      arr.push("Pix");
    }

    return arr;
  };

  createJob = () => {
    const body = {
      title: this.state.title,
      description: this.state.description,
      price: Number(this.state.pricetag),
      paymentMethods: this.paymentList(),
      dueDate: this.state.deadline,
    };

    Axios.post(`${baseURL}/jobs`, body, key)
      .then((response) => {
        alert("Bem vindo(a) à comunidade ninja!");
        this.setState({
          title: "",
          pricetag: "",
          description: "",
          deadline: moment().format('MM/DD/YYYY'),
          checkCredit: false,
          checkDebit: false,
          checkPaypal: false,
          checkInvoice: false,
          checkPix: false,
        });
      })
      .catch((err) => {
        console.log(err.response)
        alert(`Ops! a tentativa de criar um novo ninja falhou. Tente Novamente`)
      });
  };

  render() {

    return (
      <Card sx={{ width: 500, margin: "auto", mt: 10, textAlign: 'center', bgcolor: '#F5F4FC' }}>
        <CardContent sx={{ alignItems: 'center' }}>
          <Typography variant="h3" component="div" sx={{ mb: 2.5 }}>Cadastre Seu Serviço</Typography>
          <Box
            component="form"
            sx={{
              alignItems: 'center',
              '& > :not(style)': { m: 1, width: '25ch' }
            }}
            noValidate
            autoComplete="off"
          >

            <label>
              <TextField id="outlined-basic" label="Título" variant="outlined"
                placeholder="Título"
                value={this.state.title}
                onChange={this.handleTitle}
                sx={{ borderBottom: 1, borderRadius: 1, mb: 2, width: '80%' }}
              />
            </label>
            <label>
              <TextField id="outlined-basic" label="Descrição" variant="outlined"
                placeholder="Descrição"
                value={this.state.description}
                onChange={this.handleDescription}
                sx={{ borderBottom: 1, borderRadius: 1, mb: 2, width: '80%' }}
              />
            </label>
            <label>
              <TextField id="outlined-basic" label="Preço" variant="outlined"
                placeholder="R$"
                type="number"
                value={this.state.pricetag}
                onChange={this.handlePriceTag}
                sx={{ borderBottom: 1, borderRadius: 1, mb: 2, width: '80%' }}
              />
            </label>

          </Box>

          <Typography variant="h6" component="div" sx={{ mb: 2 }}>Formas de Pagamento</Typography>
          <FormGroup sx={{ width: '80%', margin: 'auto' }}>
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              onChange={this.handleCredit}
              checked={this.state.checkCredit}
              label="Cartão de Crédito" />
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              onChange={this.handleDebit}
              checked={this.state.checkDebit}
              label="Cartão de Débito" />
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              onChange={this.handleInvoice}
              checked={this.state.checkInvoice}
              label="Boleto" />
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              onChange={this.handlePaypal}
              checked={this.state.checkPaypal}
              label="Paypal" />
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              onChange={this.handlePix}
              checked={this.state.checkPix}
              label="Pix" />
          </FormGroup>
          <br />
          <LocalizationProvider dateAdapter={DateAdapter}>
            <DatePicker
              label="Prazo"
              value={this.state.deadline}
              onChange={(newValue) => {
                this.setState({ deadline: newValue });
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          <div>
            <Button
              variant="contained"
              onClick={this.createJob}
              sx={{ mt: 2 }}
            >Cadastrar Serviços</Button>
          </div>
        </CardContent>
      </Card>
    );
  }
}
