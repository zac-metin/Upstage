import React from 'react'
import {connect} from 'react-redux'
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {TextField} from 'material-ui'
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin();

import {fetchLocations} from '../actions/locations'
import {fetchEvents} from '../actions/events'
import {saveLocationId, saveLocationName} from '../actions/users'
import PopularPlaces from './SearchBarPopularPlaces'

class SearchBar extends React.Component{
  state={
    value:'',
    showResults:true
  }

  handleUpdateInput = (event) => {
    this.setState({
      value: event.target.value,
      showResults:true
    });
  };

  handleClick = () => {
    this.props.dispatch(fetchLocations(this.state.value))
  }
  handleSelect = (result) => {
    this.setState({
      value:`${result.name} ${result.state} ${result.country}`,
      showResults:false,
    })
    this.props.dispatch(saveLocationId(result.id))
    this.props.dispatch(saveLocationName(result))
  }

  render(){

    let searchResults=[];
    if (this.props.searchResults) {
        searchResults=this.props.searchResults
      }
    return (
    <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
      <div className='search-bar'>
        <PopularPlaces />
        <div id='or'>
          OR
        </div>
        <div id='search-text-field'>
          <TextField
          id='text-field-controlled'
          hintText="city name"
          floatingLabelText="Search for a city..."
          value={this.state.value}
          onChange={this.handleUpdateInput}
          />
        </div>
      <button id='search-button' onClick={()=>this.handleClick()}> search </button>
        <div className='search-results'>
          {searchResults!=[] && this.state.showResults &&
            <div>
                {searchResults.map((result,index)=>{return(
                <div id="search-result-item" key={index} onClick={()=>this.handleSelect(result)}>
                  {result.name} {result.state} {result.country}
                </div>
                )})
              }
            </div>
          }
        </div>
      </div>
    </MuiThemeProvider>
    )
  }
}

const mapState2Props = (state)=>{
  return {
    searchResults:state.location.name
  }
}

export default connect(mapState2Props)(SearchBar)
