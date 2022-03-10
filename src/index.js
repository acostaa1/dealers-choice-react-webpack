import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'


const root = document.querySelector('#root');

class App extends React.Component {
    constructor (){
        super();
        this.state = {
            groceries: [],
            selectedGroceryId: '',
        }
    }
    async componentDidMount(){
        try {
            const response = await axios.get('/api/groceries');
            const groceries = response.data;
            this.setState({groceries})
        } catch (error) {
            console.log(error)
        }
    }
    render() {
        return (
            <div>
                <div className='new'> 
                    <h3>Add <i>Expensive</i> Items To Your List</h3>
                    <form>
                        <label >Item</label> 
                        <input name = "name" placeholder = "what do you need?"/>
                        <label className = "section">Section</label>
                            <select name = "section">
                                {this.state.groceries.map(item => {
                                    return (<option key= {item.id}> {item.section} </option>)
                                })}
                            </select>
                        <label className = "price">Price $</label>
                        <input name= "price" placeholder = "hint: it should be pricey"/>
                        <button className = "add">Add Item</button>
                    </form>
                </div>
                <div>
                    <ul>
                        {this.state.groceries.map(item => <li key = {item.id}>{item.name}   <button className = 'delete'>X</button> </li>)}
                    </ul>
                </div>
            </div>
        )
    }
}

ReactDOM.render(<App />, root)