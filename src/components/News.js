import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';

export class News extends Component {

  constructor() {
    super();
    console.log("Hello I am a constructor from News Component");
    this.state = {
      articles: [],
      loading: false,
      page: 1
    }
  }
  // ek async function apni body k andar wait kr saktaa he kuch promisses ke resolve hone ka
  async componentDidMount() {
    console.log("cdm");
    let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=a6be903c18604fb29611931379e92eeb&page=1&pageSize=${this.props.pageSize}`;
    this.setState({loading: true})
    //to ye func intezaar krega "let data = await fetch(url);" is promise k poora hone ka
    let data = await fetch(url);
    let parsedData = await data.json()
    console.log(parsedData);
    this.setState({ articles: parsedData.articles, 
      totalArticles: parsedData.totalResults,
      loading: false
     })
  }

  handlePreClick = async () => {
    console.log("Previous clicked!");
    let newPage = this.state.page - 1;

    // Ensure we don't go below page 1
    if (newPage <= 0) {
      return;
    }

    let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=a6be903c18604fb29611931379e92eeb&page=${newPage}&pageSize=${this.props.pageSize}`;
    this.setState({loading: true})
    let data = await fetch(url);
    let parsedData = await data.json();

    // Check if the response contains articles
    if (parsedData.articles && parsedData.articles.length > 0) {
      console.log(parsedData);
      this.setState({
        page: newPage,
        articles: parsedData.articles,
        loading: false
      });
    } else {
      alert("No articles found for this page.");
    }
  }

  handleNextClick = async () => {
    console.log("Next clicked!");
    if (!(this.state.page + 1 > Math.ceil(this.state.totalArticles / this.props.pageSize))) {
     
      let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=a6be903c18604fb29611931379e92eeb&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
      this.setState({loading: true})
      //to ye func intezaar krega "let data = await fetch(url);" is promise k poora hone ka
      let data = await fetch(url);
      let parsedData = await data.json()
      console.log(parsedData);
      this.setState({
        page: this.state.page + 1,
        articles: parsedData.articles,
        loading: false
      })
    }
  }
  render() {
    return (
      <div className='container my-3 space-y-3'>
        <h2 className='text-center'>JSNews - Top Headlines</h2>
        {this.state.loading && <Spinner />}
        <div className="row row-eq-height ">
          {!this.state.loading && this.state.articles.map((element) => (
            <div className="col-md-4 col-sm-6 col-xs-12 mb-4" key={element.url}>
              <div className="card h-100">
                {/* Set a fixed height for each card */}
                <img src={element.urlToImage ? element.urlToImage : "https://images.wsj.net/im-841784/social"} className="card-img-top" alt={element.title} style={{ height: '200px' }} />
                <div className="card-body">
                  <h5 className="card-title">{element.title ? element.title.slice(0, 40) : ""}</h5>
                  <p className="card-text">{element.description ? element.description.slice(0, 80) : ""}</p>
                </div>
                <div className="card-footer">
                  <a href={element.url} className="btn btn-secondary">Read More</a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className='container d-flex justify-content-between'>
          <button disabled={this.state.page <= 1} type="button" className="btn btn-dark " onClick={this.handlePreClick}> &larr; previous</button>
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalArticles / this.props.pageSize)} type="button" className="btn btn-dark " onClick={this.handleNextClick}>Next &rarr; </button>
        </div>
      </div>


    )
  }
}

export default News;
