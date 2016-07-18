var Message = React.createClass({
  render: function() {
    return (
      <p>
        Hello World Mess
      </p>
    );
  }
});
ReactDOM.render(<Message />, document.getElementById('root'));



var Card = React.createClass({
  getInitialState: function() {
    return {};
  },
  componentDidMount: function() {
    var self = this;
    $.get("https://api.github.com/users/" + this.props.login, function(data){
      console.log(data);
      self.setState(data);
    });
  },
  render: function() {
   return (
     <div>
      <img src={this.state.avatar_url} width="100"/>
      <h3>{this.state.login}</h3>
      <hr />
     </div>
   )
  }
});

var Form = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    var loginInput = ReactDOM.findDOMNode(this.refs.login);
    this.props.addCard(loginInput.value);
    loginInput.value = '';
  },
  render: function(){
    return (
      <form onSubmit={this.handleSubmit}>
        <input placeholder ="github login" ref="login"/>
        <button>Add</button>
      </form>
    );
  }
});

var Main = React.createClass({
  getInitialState: function() {
    return {
      logins:[]
    }
  },
  addCard: function(data) {
    this.setState({logins: this.state.logins.concat(data)});
  },
  render: function() {
    var cards = this.state.logins.map(function(login){
      return (
        <Card login={login} />
      )
    });
    return (
      <div>
        <Form addCard={this.addCard}/>
        {cards}
      </div>
    )
  }
});

ReactDOM.render(<Main />, document.getElementById('github'));



var StarsFrame = React.createClass({
  render: function(){
    return (
      <div id= "stars-frame">
        <div className="well">
          <span className="glyphicon glyphicon-star"></span>
          <span className="glyphicon glyphicon-star"></span>
          <span className="glyphicon glyphicon-star"></span>
          <span className="glyphicon glyphicon-star"></span>
          <span className="glyphicon glyphicon-star"></span>
          <span className="glyphicon glyphicon-star"></span>
        </div>
      </div>
    )
  }
});

var ButtonFrame = React.createClass({
  render: function(){
    return (
      <div id= "button-frame">
        <button className="btn btn-primary">==</button>
      </div>
    )
  }
});

var AnswerFrame = React.createClass({
  render: function(){
    return (
      <div id= "answer-frame">
        <div className="well">
        </div>
      </div>
    )
  }
})

var Game = React.createClass({
  render: function(){
    return (
      <div id = "game">
        <h2>Play Nine</h2>
        <StarsFrame />
        <ButtonFrame />
        <AnswerFrame />
      </div>
    )
  }
});

ReactDOM.render(<Game />, document.getElementById('container'));
