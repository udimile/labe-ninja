import React from "react";
import moment from "moment";
import styled from "styled-components"
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';



const CardDetails = styled.div`

  border: solid 1px black;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 40%;
  justify-content: center;
 
 button{
   margin: 4px 0;
 }
 h3{
   margin: 0;
 }
`
const ContainerDetails = styled.div`
display: flex;
justify-content: center;
margin-top: 2%;

`

export default class ProductDetails extends React.Component {


  render() {

    const renderDetails = this.props.jobDetails.map((info) => {
      return (
        <div key={info.id}>
          <Typography variant="h3" component="div" sx={{ mb: 1.5 }}>{info.title}</Typography>
          <Typography sx={{ mb: 1.5 }}>{info.description}</Typography>
          <Typography sx={{ mb: 1.5 }}>Até {moment.utc(info.dueDate).format('MM/DD/YYYY')} por R${info.price},00</Typography>
          {info.paymentMethods.map((pay, index) => {
            return <Typography sx={{ mb: 1 }} key={index}>{pay}</Typography>
          })}
          <Button sx={{ mb: 1 }} variant="contained"  onClick={() => this.props.updateJobTrue(info.id)}>Adicionar ao carrinho</Button>
          <Button variant="contained"  onClick={() => this.props.changeScreen("hire")}>Continuar contratando</Button>
        </div>
      )
    })

    return <Card sx={{ maxWidth: 400, margin: "auto", mt: 10, textAlign: 'center', bgcolor: '#F5F4FC'}}>
    <CardContent sx={{ alignItems: 'center'}}>

      {renderDetails.length === 0 ? <h1>Carregando...</h1> : renderDetails}
      </CardContent> </Card>
  }
}
