import React, { Component } from 'react';
import { render } from 'react-dom';
import _ from 'lodash';
import './style/style.css';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';

const API_KEY = 'AIzaSyDKjRPdaV2oKrhB1xN0fHY5F35TEV33EKk';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      videos: [],
      selectedVideo: null
    }

    this.videoSearch('Stephen Colbert');
  }

  videoSearch(term) {
      YTSearch({key: API_KEY, term: term}, videos => {
      this.setState({
        videos: videos,
        selectedVideo: videos[0]
      });
    });
  }

  render() {
    //throttles the live updating of search results
    const vidSearch = _.debounce((term) => {this.videoSearch(term)}, 300);

    return (
      <div>
        <SearchBar onSearchTermChange={vidSearch}/>
        <VideoDetail video={this.state.selectedVideo} />
        <VideoList 
          onVideoSelect={selectedVideo => this.setState({selectedVideo: selectedVideo})}
          videos={this.state.videos}
        />
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
