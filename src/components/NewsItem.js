import React, { Component } from 'react'

export class NewsItem extends Component {

  render() {
    let { title, description, imgUrl, newsUrl, author, date, source } = this.props;
    return (
      /*
      <div className='my-3 '>
        <div className="card" style={{width: '18rem'}}>
          <img src={imgUrl} className="card-img-top" alt="no image" />
          <div className="card-body">
            <h5 className="card-title" style={{minHeight:'50px', maxHeight:'50px',overflow: 'hidden', textOverflow: 'ellipsis'}}>{title}...</h5>
            <p className="card-text" style={{minHeight:'50px', maxHeight:'50px',overflow: 'hidden', textOverflow: 'ellipsis'}}>{description}...</p>
            <a href={newsUrl} target='_blank' className="btn btn-sm btn-secondary">Read More</a>
          </div>
        </div>
      </div>
      */
      <div className="my-3">
        <div className="card h-100">
          <span className='position-absolute top-0 translate-middle badge rounded-pill bg-danger' style={{ left: '90%', zIndex: 1 }}>{source}</span>
          {/* Set a fixed height for each card */}
          <img src={!imgUrl ? "https://images.wsj.net/im-841784/social" : imgUrl} className="card-img-top" style={{ height: '200px' }} />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <p className='text-danger'><small>By {author ? author : "Unknown"} on {new Date(date).toGMTString()}</small></p>
          </div>
          <div className="card-footer">
            <a rel='noreferrer' href={newsUrl} target='_blank' className="btn btn-secondary">Read More</a>
          </div>
        </div>
      </div>
    )
  }
}

export default NewsItem
