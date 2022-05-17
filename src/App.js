import React from "react";
import Header from "./components/Header";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import HirePage from "./pages/HirePage";
import RegisterForm from "./pages/RegisterForm";
import ProductDetails from "./pages/ProductDetails";
import { baseURL } from "./constants/baseURL";
import Axios from "axios";
import { key } from "./constants/apiKey";
import '@fontsource/roboto/700.css';
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./theme";


export default class App extends React.Component {
  state = {
    currentScreen: "home",
    jobList: [],
    jobDetails: [],
  };

  componentDidUpdate() {
    localStorage.setItem(
      "cart",
      JSON.stringify(this.state.jobList)
    );
  }

  componentDidMount() {
    const stuffInCart = JSON.parse(localStorage.getItem("cart"));
    if (stuffInCart) {
      this.setState({ jobList: stuffInCart });
    }
  }

  getJobById = (id) => {
    Axios.get(`${baseURL}/jobs/${id}`, key)
      .then(response => {
        this.setState({ jobDetails: [response.data] })
        this.changeScreen("productDetails")
      })
      .catch(err => { alert("Erro, atualize a página e tente novamente.") })
  }

  getAllJobs = () => {
    Axios.get(`${baseURL}/jobs`, key)
      .then((response) => {

        this.setState({ jobList: response.data.jobs })
      })
      .catch(err => { alert("Erro, atualize a página e tente novamente.") })
  }

  updateJobTrue = (id) => {
    const body = {
      taken: true
    }

    const checkTaken = this.state.jobList.filter((job) => {
      return job.taken
    }).map((job) => {
      return job.id
    })


    if (checkTaken.includes(id)) {
      alert("Ops! Serviço já adicionado!")
      return false
    } else {
      Axios.post(`${baseURL}/jobs/${id}`, body, key)
        .then(() => {
          alert("Serviço ninja adicionado ao carrinho!")
          this.getAllJobs()
        })
        .catch((error) => {
          alert("Erro, atualize a página e tente novamente.")
        })
    }
  }

  updateJobFalse = (id) => {
    const body = {
      taken: false
    }
    Axios.post(`${baseURL}/jobs/${id}`, body, key)
      .then(() => {
        alert("Serviço ninja removido do carrinho!")
        this.getAllJobs()
      })
      .catch((error) => {
        alert("Erro, atualize a página e tente novamente.")
      })
  }

  updateAllJobsFalse = (id) => {
    const body = {
      taken: false
    }
    Axios.post(`${baseURL}/jobs/${id}`, body, key)
      .then(() => {
        this.getAllJobs()
      })
      .catch((error) => {
        alert("Erro, atualize a página e tente novamente.")
      })
  }

  hireAllInCart = () => {
    const allJobsTakenFalse = this.state.jobList.filter((job) => {
      return job.taken
    })
      .map((job) => {
        return this.updateAllJobsFalse(job.id)
      })

    alert("Obrigado pela compra!")
  }

  emptyCart = () => {
    const allJobsTakenFalse = this.state.jobList.filter((job) => {
      return job.taken
    })
      .map((job) => {
        return this.updateAllJobsFalse(job.id)
      })

    alert("Os ninjas fugiram😨!!!")
  }

  renderScreen = () => {
    switch (this.state.currentScreen) {
      case "home":
        return <Home changeScreen={this.changeScreen} />;
      case "cart":
        return <Cart
          changeScreen={this.changeScreen}
          updateJobFalse={this.updateJobFalse}
          jobList={this.state.jobList}
          hireAllInCart={this.hireAllInCart}
          emptyCart={this.emptyCart}
        />;
      case "hire":
        return <HirePage
          getAllJobs={this.getAllJobs}
          jobList={this.state.jobList}
          updateJobTrue={this.updateJobTrue}
          getJobById={this.getJobById}
        />;
      case "register":
        return <RegisterForm/>;
      case "productDetails":
        return <ProductDetails
          updateJobTrue={this.updateJobTrue}
          changeScreen={this.changeScreen}
          jobDetails={this.state.jobDetails}
        />;
      default:
        return <Home changeScreen={this.changeScreen} />;
    }
  };

  changeScreen = (param) => {
    this.setState({ currentScreen: param });
  };

  render() {
    return (
      <ThemeProvider theme={theme} >
        <Header sx={{bgcolor: '#F5F4FC'}} changeScreen={this.changeScreen}></Header>
        {this.renderScreen()}
      </ThemeProvider>
    );
  }
}
