import React from 'react';
import './App.css';

const LETTRES = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')



class Devinette extends React.Component {

 

  render() {
    return(
      <p className="devinette">{this.props.devinette}</p>
    )
  }

}

class Touche extends React.Component {

  render() {
    const lettre = this.props.lettre
    return(
      <button onClick={() => this.props.onClick(lettre)} disabled={this.props.clicked}>{lettre}</button>
    )
  }

}


class App extends React.Component {


  constructor(props) {
    super(props)
    this.secret = "LOUTRE"
    this.state = {
      lettres: [],
      found: false,
      devinette: Array(this.secret.length).fill('_'),
    }
    this.onClickLettre = this.onClickLettre.bind(this)
    this.onFound = this.onFound.bind(this)
    this.rejouer = this.rejouer.bind(this)
  }

  clavier() {
    const touches = []
    LETTRES.forEach((lettre, index) => {
      
      touches.push(<Touche 
      lettre={lettre} 
      key={index} 
      onClick={this.onClickLettre} 
      clicked={this.state.lettres.includes(lettre)}/>)
      if (touches.length === 13) {
        touches.push(<br key={'saut'}/>)
      }
    })
    return(
      <div className="clavier">{touches}</div>
    )
  }

  actualiserDevinette() {
    const devinette = this.state.devinette.slice()
    const lettres = this.state.lettres
    this.secret.split('').forEach((lettre, index) => {
      if (lettres.includes(lettre)) {
        devinette[index] = lettre
      }
    })
    this.setState({devinette: devinette})
    console.log(devinette.join('') === this.secret)
    if (devinette.join('') === this.secret) {
      this.onFound()
    }
    return devinette
  }

  onClickLettre(lettre){
    const {lettres} = this.state
    lettres.push(lettre)
    this.setState({lettres: [...lettres]})
    this.actualiserDevinette()
  }

  onFound() {
    this.setState({found: true})
    console.log('trouvé')
  }

  rejouer() {
    this.secret = "PASTEQUE"
    this.setState({
      lettres: [],
      found: false,
      devinette: Array(this.secret.length).fill('_'),
    })
    

  }



  render() {
    const clavier = this.clavier()
    return(
      <div className="pendu">
        <Devinette devinette={this.state.devinette}/>
        {this.state.found? <button className="rejouer" onClick={this.rejouer}> Rejouer ?</button> : clavier}
        <p> Score: {this.state.lettres.length}</p>
      </div>
    )
  }

}

export default App;
