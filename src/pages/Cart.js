import React from 'react'
import styled from 'styled-components'
import Button from '@mui/material/Button';
import emptyCart from '../images/emptyCart.png'
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

const CartContainer = styled.div`
    height: calc(100vh - 92.5px);

    img{
        width: 30%;
        height: 70%;
    }

    #payment {
        display: flex;
        justify-content: space-between;

        div {
            display: flex;
            width: 30%;
            justify-content: space-between;
                                
        }
                
    }
`

const EmptyCart = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
`

const CartPrice = styled.div`
    p{
        display: flex;
        align-items: center;
    }
`

export default class Cart extends React.Component {

    render() {

        const jobPrices = this.props.jobList.filter((job) => {
            return job.taken
        }).map((job) => {
            return job.price
        });

        const total = () => {
            let sum = 0;
            for (let value of jobPrices) {
                sum = sum + value;
            }
            return sum;
        }

        const itemCart = this.props.jobList.filter((job) => {
            return job.taken
        }).map((job) => {
            return <Card sx={{ width: '95vw', margin: "auto", mt: 2, bgcolor: '#F5F4FC' }} key={job.id}>
                <CardContent sx={{ display: 'grid', gridTemplateColumns: '5fr 1fr 1fr', alignItems: 'center' }}>
                    <p id="title"><strong>{job.title}</strong></p>
                    <p id="price">R${job.price},00</p>
                    <Button variant="contained" onClick={() => this.props.updateJobFalse(job.id)} sx={{ width: 100, justifySelf: 'flex-end' }}>Deletar</Button>
                </CardContent>
            </Card>
        });

        const botoes = () => {
            return <Card sx={{ width: '95vw', margin: "auto", mt: 2 }}>
                <CardContent sx={{ alignItems: 'center' }} id="payment">
                    <div>
                        <Button variant="contained" onClick={() => this.props.changeScreen("hire")}>Continuar contratando</Button>
                        <Button variant="contained" onClick={this.props.emptyCart}>Limpar Carrinho</Button>
                    </div>
                    <CartPrice>
                        <p>Valor total: R${total()},00 </p>
                        <Button variant="contained" onClick={this.props.hireAllInCart}>Contratar Serviço</Button>
                    </CartPrice>
                </CardContent>
            </Card>
        }
        return (
            <CartContainer>
                {itemCart}
                {itemCart.length === 0
                    ? (<EmptyCart><img src={emptyCart} />
                        <Typography sx={{ mt: 2, textAlign: 'center', fontSize: 24, ml: 5, color: '#7D67C5' }}>Seu carrinho está vazio</Typography>
                    </EmptyCart>)
                    : botoes()}
            </CartContainer>
        )
    }
}