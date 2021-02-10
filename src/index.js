// importing modules
import React from 'react';
import ReactDOM from 'react-dom';
import useTextToxicity from "react-text-toxicity";
import logo from './assets/goku.gif'
import './index.css';
import Plot from 'react-plotly.js';
 
// functoion for prediction and plotting
function Toxicity(props ) {
  // classifying the text using react-text-toxicity
  const predictions = useTextToxicity(props.predictions);
  const style = { margin: 10 };

  if (!predictions) 
  // while result is loading this part will be fetched
  return <div style={style}><img src={logo} alt="loading..." /></div>;

  // else we will get label and probability from prediction
  var arr_label=[]
  var arr_probability=[]

  // preprocessng those for plotting session
  for (var i=0;i<predictions.length;i++)
  {
    arr_label.push(predictions[i].label)
    var split=predictions[i].probability
    var strtonum=parseFloat(split.replace(/[^\d.-]/g, ''));
    arr_probability.push(strtonum)
}

  return (
    <div style={style}>
    <Plot
        data={[
          {type: 'pie', labels: [arr_label[0],arr_label[1],arr_label[2],arr_label[3],arr_label[4],arr_label[5],arr_label[6]], 
          values: [arr_probability[0],arr_probability[1],arr_probability[2],arr_probability[3],arr_probability[4],arr_probability[5],arr_probability[6]]},
        ]}
        layout={ {width: 320, height: 440, title: 'Predictions',paper_bgcolor:"#FFF3"}  }
      />
    </div>
  );
}

class Main extends React.Component {
  constructor(props) 
  {
    super(props);
    this.state = { input: '' };
  }
 
  // after submission handling the text and pass it to Toxicity() , and returns plot
  handlesubmit = (event) => 
  {
    event.preventDefault();
    var pred= this.state.input
    ReactDOM.render(<Toxicity predictions={pred} />, document.getElementById('demo'));
  }

  // for keep updating input value 
  currentchange = (event) => 
  {
    this.setState({input: event.target.value});

  }
  render() 
  
  // for showing the text which is being typing
  {
    let header = '';
    if (this.state.input) {
      header = <h1><p>Typing : </p> {this.state.input}</h1>;
    } else {
      header = '';
    }
    return (

<>
<section className="product">
  <div  className="product__photo">
    <div className="photo-container">
      <div className="photo-main">
        <div id="demo" className="controls">
        </div>
      </div>
    </div>
  </div>

<div id="root" className="product__info">
  <div className="description">
    <br/> <br/><br/><br/>
      <form onSubmit={this.handlesubmit}>
          {header}
          <h3>Type About Someone You Hate:</h3>
            <textarea
              type='text'
              onChange={this.currentchange}
              placeholder="type.." 
            />
            <br/>
            <button class="button button1">Green</button>

      </form>
    <br/> <br/><br/><br/>
  </div>
</div>
</section>
</>
);

  }
}

ReactDOM.render(<Main />, document.getElementById('root'));
