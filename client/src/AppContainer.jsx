import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Home from './pages/Home';
import Layers from './pages/Layers';
import Explore from './pages/Explore';
import Bookmarks from './pages/Bookmarks';
import Profile from './pages/Profile';
import LandingPage from './pages/LandingPage';
import SignUp from './pages/SignUp';
import LogIn from './pages/LogIn';

// import { isThisMonth } from 'date-fns';
import axios from 'axios';
import API from "./utils/API"
import ProfileSettings from './pages/Profile-Pages/ProfileSettings';
import Notifications from './pages/Profile-Pages/Notifications';
import ReviewHistory from './pages/Profile-Pages/ReviewHistory';
import Permissions from './pages/Profile-Pages/Permissions';
import LogOut from './pages/Profile-Pages/LogOut';

// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// import {fetchSearch} from './actions/searchAction';

import './App.css';

class AppContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
        searchResults: [],
        locationResults: [],
        categorySearch:"",
        loggedIn: '',
        username: null,
        redirectTo: null,
        yelpResults:[],
        myLat:"", 
        myLon:"",
        selectedLocation: false,
        markerData: '',
        categoryIcon: '',
        bookmarkArray: []
    }
  }

  componentDidMount() {
      this.getUser();
      console.log(this.state.loggedIn);
      console.log(this.state.username);
    this.setState({
        yelpResults: [
            {
                coordinates: {
                    latitude: 34.070777,
                    longitude: -118.441748
                },
                default_name: 'UCLA Physics and Astronomy Building',
                address1: '475 Portola Plaza',
                address2: 'Los Angeles, CA 90095'
            }
        ],
        myLat: 34.070777, 
        myLon: -118.441748, 
        searchResults: 'UCLA', 
        locationResults: 'UCLA Physics and Astronomy Building'})
  }

  updateUser = (loggedIn, username, redirectTo) => {
      this.setState({
          loggedIn,
          username,
          redirectTo
      });
  }

  getUser = () => {
      axios.get('/api/users').then(res => {
          console.log('get user response: ');
          console.log(res.data);
          if (res.data.user) {
              console.log('get user there is a user saved in the server session: ');

              this.setState({
                  loggedIn: true,
                  username: res.data.user.username
              })
          } else {
              console.log('get user: no user');
              this.setState({
                  loggedIn: false,
                  username: null
              })
          }
      })
  }

  searchLocation = (search, location, lat, lon, yelpResults) => {
      console.log("these are the search parameters -->", search, lat, location, lon)
        this.setState({
            searchResults: search, 
            locationResults: location, 
            myLat: lat, 
            myLon: lon, 
            yelpResults: yelpResults
        });
        // this.setState({myLat: lat, myLon: lon})
    console.log("search occurred -->>>", this.state.myLat, this.state.myLon);
  }

  userLoggedIn = user => {
      this.setState({loggedIn: user});
  }

  setLocation = () => {
      console.log('test');
      this.setState({selectedLocation: true})
  }

  setMarkerData = data => {
      this.setState({markerData: data})
      console.log(data);
  }

setCategories = categories => {
    this.setState({categorySearch: categories})
}

setCategoryIcon = icon => {
    this.setState({categoryIcon: icon})
}

fadeBookmark = data => {
    if (this.state.bookmarkArray.indexOf(data) === -1) {
        this.setState({bookmarkArray: [...this.state.bookmarkArray, data]});
    } else {
        return this.state.bookmarkArray;
    }
}


  render() {

        return (
            <Router>
                <div>
                    <Route 
                        path="/home"                 
                        render={props => <Home {...props} 
                            googleMapsLat={this.state.myLat}
                            googleMapsLon={this.state.myLon}
                            googleMapsResult={this.state.searchResults}  
                            googleMapsLocation={this.state.locationResults}
                            yelpResults={this.state.yelpResults}
                            selectedLocation={this.state.selectedLocation}
                            selectLocation={this.setLocation}
                            markerClick={this.markerClick}
                            setMarkerModal={this.setMarkerData}
                            markerResults={this.state.markerData}
                        />}

                        />
                    <Route 
                        path="/layers" 
                        component={Layers}
                        categories={this.state.categorySearch}
                        passCategoriesUp={this.setCategories}
                         />
                    <Route 
                        path="/explore" 
                        render={props => <Explore {...props} 
                            onSearchLocation={this.searchLocation}
                            yelpResults={this.state.yelpResults}
                            setCategoryIcon={this.setCategoryIcon}
                            categoryIcon={this.state.categoryIcon}
                            isBookmarked={this.fadeBookmark}
                            bookmarkArray={this.state.bookmarkArray}/>}
                        />
                    <Route 
                        path="/bookmarks" 
                        component={Bookmarks} />
                    <Route 
                        exact path="/profile" 
                        render={props => <Profile {...props} 
                            username={this.state.loggedIn.username}/>}
                        />
                    <Route 
                        exact path="/" 
                        component={LandingPage} />
                    <Route 
                        path="/signup" 
                        component={SignUp} />
                    <Route 
                        path="/login" 
                        render={props => <LogIn {...props} 
                            userLoggedIn={this.userLoggedIn} 
                            updateUser={this.updateUser} 
                            loggedIn={this.state.loggedIn}/>} />
    
    
                    <Route 
                        path="/profile/settings" 
                        render={props => <ProfileSettings {...props} 
                            username={this.state.loggedIn.username}/>} />
    
                    <Route 
                        path="/profile/notifications" 
                        render={props => <Notifications {...props} 
                            username={this.state.loggedIn.username}/>} />
    
                    <Route 
                        path="/profile/review-history" 
                        render={props => <ReviewHistory {...props} 
                            username={this.state.loggedIn.username}/>} />
    
                    <Route 
                        path="/profile/permissions" 
                        render={props => <Permissions {...props} 
                            username={this.state.loggedIn.username}/>} />
    
                    <Route 
                        path="/profile/logout" 
                        render={props => <LogOut {...props} 
                            updateUser={this.updateUser} 
                            username={this.state.loggedIn.username}
                            redirectTo={this.state.loggedIn.redirectTo}/>} />
    
                </div>
            </Router>
        )
    

  }
}

export default AppContainer;


// AppContainer.propTypes = {
//     fetchSearch: PropTypes.func.isRequired,
//     searchResults: PropTypes.array.isRequired
// }

// const mapStateToProps = state => ({
// // this creates this.state.posts
//     searchResults: state.searchResults.items
// });

// export default connect(mapStateToProps, { fetchSearch })(AppContainer);