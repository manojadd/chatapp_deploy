import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import io from 'socket.io-client';
import {Grid, Row, Col} from 'react-flexbox-grid/lib/index';

export default class Feedback extends Component {

 constructor(props) {

   super(props);

   this.state={name:"",comments:"",display:"",socket:null}

   this.handleNameChange=this.handleNameChange.bind(this);

   this.handleCommentsChange=this.handleCommentsChange.bind(this);

   this.handleClick=this.handleClick.bind(this);

 }

 componentDidMount() {

   this.setState({socket:io('http://localhost:8000')})

 }

 handleNameChange(e){

   this.setState({name:e.target.value,display:""})

 }

 handleCommentsChange(e){

   this.setState({comments:e.target.value})

 }

 handleClick(){

   let obj={"name":"","comment":""};

   obj["name"]=this.state.name;

   obj["comment"]=this.state.comments;

   console.log("comment : ", obj["comment"]);

   this.state.socket.emit("feedback",obj);

   let a="We have received your feedback "+this.state.name+".Keep Supporting BOB!!"

   this.setState({display:a,name:"",comments:""})

 }

 render() {

   return (

     <div style={{height:"100%"}}>



     <center style={{height:"100%"}}>
          <Grid  style={{height:'100%', width:"60%"}}>
            <Row style={{ height:'100%',overflow:'hidden',width:"100%"}}>
              <Col xs={12} sm={12} md={12} lg={12} style={{height:'100%'}}>

     <Paper zDepth={4} style={{width:"100%",height:"100%"}}>

     <h2>FeedBack</h2>

     {this.state.display}

     <TextField hintText="Name" floatingLabelText="Your Name" value={this.state.name} onChange={this.handleNameChange}/><br />

     <TextField hintText="Comments" multiLine={true} rows={3} rowsMax={7} value={this.state.comments} onChange={this.handleCommentsChange} style={{width:"400px",marginLeft:"0px"}}/><br />

     <RaisedButton label="Submit" labelStyle={{color:"white"}} buttonStyle={{background:"#3F51B5 "}} onClick={this.handleClick} style={{marginTop:"50px"}}/><br/>

     </Paper>
    </Col>
  </Row>
  </Grid>

     </center>



     </div>

   );

 }

}