import React, { Component, FormEvent } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Subscription } from 'rxjs';
import HttpApi from '../../assets/lib/httpapi';
import './login.scss';
import { User } from '../../models/User';
import LoadingComponent from '../loading/loading';
import toastr from 'toastr';
import { LoggedUser } from '../../App.context';



export default class LoginComponent extends Component<any, any> {


     static contextType = LoggedUser;

     subscriptions$ = new Subscription()

     state = {
          loading: false
     }


     componentWillUnmount() {
          this.subscriptions$.unsubscribe();
     }


     onSubmit = (e: FormEvent | any) => {

          e.preventDefault();
          console.log("Submited.")

          let { user: userInput, password } = e.target.children;

          let user = new User();
          user.nickname = userInput.value
          user.password = password.value

          this.setState({ loading: true });
          this.subscriptions$.add(
               HttpApi.post('/api/users/authenticate', user)
                    .subscribe(
                         (data: User) => {
                              console.log('[user logged] => ', data)
                              this.setState({ loading: false });
                              toastr.success(`Zalogowano jako użytkownik: ${data.nickname} `, "Logowanie");
                              console.warn(this.context)

                              localStorage.setItem("token", data.token);

                              this.context.updateUser(data);
                         },

                         (err: any) => {
                              console.error(err);
                              this.setState({ loading: false });
                              toastr.error(`Podano błędne dane logowania `, "Logowanie");

                         }
                    )
          )

     }


     render() {

          let { user, updateUser } = this.context;
          console.error(user)

          let loginForm = <form onSubmit={this.onSubmit}>
               Login:<br></br>
               <input type="text" name="user" />
               <br></br>
               Hasło: <br></br>
               <input type="password" name="password" />
               <br></br>
               <button className="button-submit">Zaloguj</button>

          </form>

          let userPanel = user ? <div>
               <div>ID: {user.userId}</div>
               <div>Nick: {user.nickname}</div>
               <div>Admin: {user.isAdmin ? "TAK" : "NIE"}</div>

               <button className="button-submit" onClick={() => {
                    localStorage.removeItem("token");
                    updateUser(null)
               }}>WYLOGUJ</button>

          </div> : null


          return (
               <section className="global-section">

                    {this.state.loading ? <LoadingComponent fly={true} /> : null}

                    <header className="global-section__header">

                         <div className="global-section__header-top">
                              <FontAwesomeIcon icon={'comment'} /> Login
                         </div>

                         <div className="global-section__header-bottom">
                              {user ? "Panel użytkownika" : "Formularz logowania"}
                         </div>

                    </header>


                    <div className="global-section__content">

                         {user ? userPanel : loginForm}

                    </div>

               </section>
          )
     }
}
