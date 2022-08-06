import React from 'react'
import './App.css'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button';

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      text: '', 
      result: '',
      duplications: [],
      uniqueElements: []
    }

    this.handleText = this.handleText.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  handleText(e) {
    this.setState({text: e.target.value})

  }

  handleClick() {
    let resultHtml = "";
    const duplications = this.findDuplication(this.state.text)  
    this.state.text.split(' ').map(word => {
      if(duplications.find(w => w === word)) {
        resultHtml += "<p class='duplicated result'>" + word +" &nbsp;</p>"
      } else {
        resultHtml += "<p class='result'>" + word +"&nbsp;</p>"
      }
    })
    this.setState({result: resultHtml})
  }

  findDuplication(str) {
    const words = str.split(' ')
    const uniqueElements = new Set(words);
    const filteredElements = words.filter(item => {
        if (uniqueElements.has(item)) {
            uniqueElements.delete(item);
        } else {
            return item;
        }
    });

    return filteredElements
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
            <h1>Calliope</h1>
            <h2>Revisor de textos</h2>
          </header>
          <main className="App-main">
            <div>
              <TextField id="text" 
                className="textfield" 
                label="Insira seu texto aqui" 
                placeholder="Insira seu texto aqui" 
                value={this.state.text}
                onChange={this.handleText}
                multiline/>
              <Button variant="outlined" onClick={this.handleClick}>Revise</Button>
            </div>
            <div>
              <p className='result' dangerouslySetInnerHTML={{__html: this.state.result}}></p>
            </div>
          </main>
      </div>
    )
  }
}

export default App
