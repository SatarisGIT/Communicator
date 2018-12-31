import React, { Component } from 'react'
import './loading.scss'

interface ILoadingProps {
     fly?: boolean;
}

interface ILoadingState { }

export default class LoadingComponent extends Component<ILoadingProps, ILoadingState> {


     render() {

          let { fly } = this.props

          console.log("FLY~!", fly)
          console.log(this.props)

          if (fly) {
               return (
                    <div className="loader-fly">
                         <div className={`loading`} >
                              <div className="loading__csharp">#</div>
                         </div>
                    </div>
               )
          }


          return (
               <div className={`loading`} >
                    <div className="loading__csharp">#</div>
               </div>
          )


     }
}
