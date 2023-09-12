import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'

export class News extends Component {

  static defaultProps = {
    country: 'in',
    pageSize: 9,
    category: 'general'
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  }
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1
    }
  }
  async componentDidMount() {
    // Fetch data based on the current page
    this.updateNews(this.state.page);
  }
  
  async updateNews(page) {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a6be903c18604fb29611931379e92eeb&page=${page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
  
    try {
      let data = await fetch(url);
      if (!data.ok) {
        throw new Error(`Network response was not ok (${data.status} ${data.statusText})`);
      }
      let parsedData = await data.json();
      console.log(parsedData);
      this.setState({
        articles: parsedData.articles,
        totalArticles: parsedData.totalResults,
        loading: false
      });
    } catch (error) {
      console.error("Error fetching data:", error);
      this.setState({ loading: false });
    }
  }
  
  handlePreClick = () => {
    console.log("Previous clicked!");
    let newPage = this.state.page - 1;
  
    // Ensure we don't go below page 1
    if (newPage >= 1) {
      this.setState({ page: newPage }, () => {
        this.updateNews(newPage);
      });
    }
  }
  
  handleNextClick = () => {
    console.log("Next clicked!");
    if (this.state.page + 1 <= Math.ceil(this.state.totalArticles / this.props.pageSize)) {
      let newPage = this.state.page + 1;
      this.setState({ page: newPage }, () => {
        this.updateNews(newPage);
      });
    }
  }
  render() {
    return (
      <div className='container my-3 space-y-3'>
        <h1 className='text-center m-4'>JSNews - Top Headlines</h1>
        {this.state.loading && <Spinner />}
        <div className="row row-eq-height">
          {!this.state.loading && this.state.articles.map((element) => {
            return <div className="col-md-4 col-sm-6 col-xs-12 mb-4" key={element.url}>
              <NewsItem title={element.title?element.title:""} description={element.description?element.description:""} imgUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
            </div>
          })}
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
