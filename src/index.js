// es6 import style
import './style.scss';
import debounce from 'lodash.debounce';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import youtubeSearch from './youtube-api';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videos: [],
      selectedVideo: null,
    };
    this.search = debounce(this.search, 300);
  }
  search(text) {
    youtubeSearch(text).then(videos => {
      this.setState({
        videos,
        selectedVideo: videos[0],
      });
    });
  }
  render() {
    return (
      <div>
        <SearchBar id="searchbar" onSearchChange={text => this.search(text)} />
        <div className="video-section">
          <VideoDetail video={this.state.selectedVideo} />
          <VideoList onVideoSelect={selectedVideo => this.setState({ selectedVideo })} videos={this.state.videos} />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('main'));
