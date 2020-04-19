import React from 'react';
import { Cards, Chart, CountryPicker} from './components';
import styles from './App.module.css';
import { fetchData } from './api'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVirus } from '@fortawesome/free-solid-svg-icons'
class App extends React.Component {

    state = {
        data: {},
        country: ''
    }

    async componentDidMount() {
        const fetchedData = await fetchData();

        this.setState({data: fetchedData})
    }
    handleCountryChange = async (country) => {

        const fetchedData = await fetchData(country);

        this.setState({data: fetchedData, country: country})
    }

    render() {
        const { data, country } = this.state;
        return (
            <div className ={styles.container}>
                <h1 className="title">COVID-19   TRACKER</h1>
                <FontAwesomeIcon icon={faVirus} size="7x" color ="rgba(0, 230, 64, 0.8)"/>
                <Cards data = {this.state.data}/>
                <CountryPicker handleCountryChange = {this.handleCountryChange}/>
                <Chart data = {data} country = {country}/>
            </div>
        )
    }
}

export default App;
