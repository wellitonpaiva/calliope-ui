import React from 'react'
import './App.css'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Typography, Container, Grid, Chip} from '@mui/material';

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      text: '', 
      result: '',
      duplications: [],
      uniqueElements: [],
      inputMode: true,
      highlightWord: ''
    }

    this.handleText = this.handleText.bind(this)
    this.handleRevise = this.handleRevise.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleReturn = this.handleReturn.bind(this)
    
  }

  handleText(e) {
    this.setState({text: e.target.value})

  }

  handleHighlight(e) {
    this.setState({highlightWord: e})
  }

  handleDelete(text) {

  }

  handleRevise() {
    let resultHtml = "";
    const duplications = this.findDuplication(this.state.text)  
    this.setState({duplications: duplications})
    this.state.text.split(' ').map(word => {
      if(duplications.find(w => w === word)) {
        resultHtml += "<p class='duplicated result'>" + word +" &nbsp;</p>"
      } else {
        resultHtml += "<p class='result'>" + word +"&nbsp;</p>"
      }
    })
    this.setState({result: resultHtml, inputMode: false})
    
  }

  handleReturn() {
    this.setState({result: "", inputMode: true})
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
        <AppBar position="static">
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <Typography variant="h6" noWrap>C A L L I O P E</Typography>
            </Toolbar>
          </Container>
        </AppBar>
        <Grid container spacing={2}>
          <Grid item xs={10}>
            {this.state.inputMode ? 
              <div>
                <TextField id="text" 
                  placeholder="Insira seu texto aqui" 
                  value={this.state.text}
                  onChange={this.handleText}
                  fullWidth
                  minRows='10'
                  multiline/>
                <Button variant="outlined" onClick={this.handleRevise}>Revisar</Button>
              </div>
            : 
            <div>
              
              <div>
                {this.state.text.split(' ').map(word => 
                  <p className={word === this.state.highlightWord ? 'duplicated result' : 'result'}>{word}&nbsp;</p>)}
              </div>
              <Button variant="outlined" onClick={this.handleReturn}>Retornar</Button>
            </div>
            }
          </Grid>
          <Grid item xs={2}>
            <div>Palavras Repetidas</div>
            {this.state.duplications.map(word => 
              <Chip label={word} variant="outlined" onClick={() => this.handleHighlight(word)}/>
            )}
          </Grid>
        </Grid>
          
        
        
      </div>
    )
  }
}

export default App
