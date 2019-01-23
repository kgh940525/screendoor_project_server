import React, { Component } from 'react'
import SigninModal from '../components/SigninModal'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as signinActions from '../modules/signinUser'
import * as userActions from '../modules/currentUser'


class SigninContainers extends Component {
    
    
    handleChange = (e) => {
        
        const {signinActions} = this.props;
        signinActions.setSignInUser({'property':e.target.name,'value':e.target.value})
    }
  
    handleSubmit = async (e) => {
      e.preventDefault();
      const {userActions,signinActions} = this.props;
      const {user_id, user_password,result} = this.props;
      const user = {
            user_id: user_id,
            user_password: user_password,
            result: result
      }
        const response = await fetch('/api/signin', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });
          const body = await response.json();
          console.log("여기바디"+body);
          console.log("여기바디"+body.status);
          
          signinActions.postSignInUser(body);
          userActions.setCurrentUser(body);  
          if(body.status === 200){
         alert(user_id +"님 로그인 되었습니다.")
          }else if(body.status === 401){
            alert(body.status +"로그인 실패 되었습니다.")
          }else if(body.status === 501){
            alert(body.status +"Connection Error")
          }
    }
    
    
    

  render() {
    const { handleChange, handleSubmit } = this
    const { user_id, user_password,result} = this.props
    console.log("여기는 SigninContainers"+result)
    return (
      <SigninModal
        onSubmit={handleSubmit}
        onChange={handleChange}
        user_id={user_id}
        user_password={user_password}
        result={result}/>
    )
  }
}

export default connect(
    (state) => ({
      user_id: state.signinUser.get('user_id'),
      user_password:state.signinUser.get('user_password'),
      result: state.signinUser.get('result')
    }),
    (dispatch) => ({
      signinActions: bindActionCreators(signinActions,dispatch),
      userActions: bindActionCreators(userActions,dispatch)
    })
)(SigninContainers)