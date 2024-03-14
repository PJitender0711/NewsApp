import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";
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
  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalArticles: 0
    }
    document.title = `${this.capitalizeFirstLetter(this.props.category)}-JSNews`;
  }
  async componentDidMount() {
    // Fetch data based on the current page
    this.updateNews(this.state.page);
  }

  async updateNews() {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a6be903c18604fb29611931379e92eeb&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      totalArticles: parsedData.totalResults,
      loading: false
    });
  }

  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 });
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a6be903c18604fb29611931379e92eeb&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState((prevState) => ({
      articles: prevState.articles.concat(parsedData.articles),
      totalArticles: parsedData.totalResults,
      loading: false
    }));
  };

  /*

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
  */

  render() {
    return (
      <>
        <h1 className='text-center m-4'>JSNews - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
        {/* {this.state.loading && <Spinner />} */}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalArticles}
          loader={<div className="text-center"><Spinner /></div>}
        >
          <div className="container">
            <div className="row row-eq-height">
              {!this.state.loading && this.state.articles.map((element) => {
                return <div className="col-md-4 col-sm-6 col-xs-12 mb-4" key={element.url}>
                  <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imgUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                </div>
              })}
            </div>
          </div>
        </InfiniteScroll>
        {/* <div className='container d-flex justify-content-between'>
          <button disabled={this.state.page <= 1} type="button" className="btn btn-dark " onClick={this.handlePreClick}> &larr; previous</button>
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalArticles / this.props.pageSize)} type="button" className="btn btn-dark " onClick={this.handleNextClick}>Next &rarr; </button>
        </div> */}
      </>
    )
  }
}

export default News;
