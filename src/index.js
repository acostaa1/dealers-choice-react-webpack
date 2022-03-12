import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'


const root = document.querySelector('#root');

class App extends React.Component {
    constructor (){
        super();
        this.state = {
            groceries: [],
            inputGroceryName: '',
            inputGrocerySection: '',
            inputGroceryPrice: '',
        };
        this.create= this.create.bind(this);
        this.nameChange = this.nameChange.bind(this);
        this.sectionChange = this.sectionChange.bind(this);
        this.priceChange = this.priceChange.bind(this);
        
    }
    async create(name, section, price) {
        const item = (await axios.post(`/api/groceries/${name}/${section}/${price}`)).data;
        const groceries = [...this.state.groceries, item];
        this.setState({groceries})
    }
    async createRandom() {
        const item = (await axios.post(`/api/groceries/`)).data;
        const groceries = [...this.state.groceries, item];
        this.setState({groceries})
    }
    async remove(item) {
        await axios.delete(`/api/groceries/${item.id}`);
        const groceries = this.state.groceries.filter((_item) => _item.id !== item.id)
        this.setState({groceries})
    }
    nameChange(event) {
        this.setState({inputGroceryName: event.target.value})

    }
    sectionChange(event) {
        this.setState({inputGrocerySection: event.target.value})

    }
    priceChange(event) {
        this.setState({inputGroceryPrice: event.target.value})

    }
    handleClick = () => {
        this.createRandom()
    }
    
    async componentDidMount(){
        try {
            const response = await axios.get('/api/groceries');
            const groceries = response.data;
            const section = groceries[0].section;
            this.setState({groceries, inputGrocerySection: section})
        } catch (error) {
            console.log(error)
        }
    }
    render() {
        const groceries = this.state.groceries;
        //console.log(this.state.inputGroceryPrice);
        //console.log(groceries);
        if(groceries[0]) 
        return (
            <div>
                <div className='new'> 
                    <h3>Add <i>Expensive</i> Items To Your List</h3>
                    <form onSubmit={()=> this.create(this.state.inputGroceryName, this.state.inputGrocerySection, this.state.inputGroceryPrice)}>
                        <label >Item</label> 
                        <input name = "name" placeholder = "what do you need?" onChange = {this.nameChange}/>
                        <label className = "section">Section</label>
                            <select onChange= {this.sectionChange}>
                                {groceries.map(item => {
                                    return (<option key= {item.id} value= {item.section}> {item.section} </option>)
                                })}
                            </select>
                        <label className = "price">Price $</label>
                        <input name= "price" placeholder = "hint: it should be pricey" onChange = {this.priceChange}/>
                        <button type = "submit" className = "add" >Add Item</button>
                        <button className ="lucky" onClick={this.handleClick}>I'm Feeling Lucky!</button>
                    </form>
                </div>
                <div>
                    <ul>
                        {this.state.groceries.map(item => <li key = {item.id}>{item.name} can be found in the {item.section} section, and will cost ${item.price} <button onClick = {()=> this.remove(item)}className = 'delete'>X</button> </li>)}
                    </ul>
                </div>
            </div>
        )
        return(
            <div>
            <h1>loading...</h1>
            <button className ="lucky" onClick={this.handleClick}>I'm Feeling Lucky!</button>
            </div>
        )
    }
}

ReactDOM.render(<App />, root)