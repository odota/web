import React from 'react';
import { connect } from 'react-redux';

import { Link } from 'react-router';

const NavBar = (props) => {
   var navLeft, navRight
   if(props.isFetching){
      navLeft = (<li><i className="fa fa-spinner fa-spin"></i></li>);
      navRight = (<li><i className="fa fa-spinner fa-spin"></i></li>);
   }
   else{
      navLeft = Object.keys(props.data.navbar_pages).map(page =>
          <li key={page}><Link to={'/'+page}>{props.data.navbar_pages[page].name}</Link></li>
      );

      if(props.data.user)
      {
         navRight = (
             <span>
               <li>
                  <Link to={"/players/"+props.data.user.account_id}>Profile</Link>
               </li>
               <li>
                  <a href="/logout">Logout</a>
               </li>
         </span>);
      }
      else
      {
         navRight = (<li><a href="/login">Login</a></li>);
      }
   }

   return (<div style={{marginBottom:"0px"}} className="navbar">
      <div className="navbar-header">
         <a href="/" className="navbar-brand">
            <strong className="theme-blue">YASP</strong>
         </a>
         <a data-toggle="collapse" data-target=".navbar-collapse" className="navbar-toggle">
            <span className="icon-bar" />
            <span className="icon-bar" />
            <span className="icon-bar" />
         </a>
      </div>
      <div id="navbar" className="navbar-collapse collapse">
         <ul className="nav navbar-nav">
            {navLeft}
         </ul>
         <ul className="nav navbar-nav navbar-right">
            {navRight}
         </ul>
      </div>
   </div>)
};

function mapStateToProps(data)
{
   return data.reducers.metadata;
}
export default connect(mapStateToProps)(NavBar);