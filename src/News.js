import React, { Component } from 'react';

export default class News extends Component {
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            page: 1,
            totalResults: 0
        };
    }

    async componentDidMount() {
        await this.fetchArticles();
    }

    async fetchArticles(page = 1) {
        try {
            const apiKey = '6e7a487d0cbd4690b002cb6ad42e6e05'; // Replace 'YOUR_API_KEY' with your actual API key go to apinews
            const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}&pageSize=6&page=${page}`;
            const response = await fetch(url);
            const data = await response.json();
            this.setState({
                articles: data.articles,
                totalResults: data.totalResults,
                page
            });
        } catch (error) {
            console.error('Error fetching articles:', error);
        }
    }

    async next() {
        const nextPage = this.state.page + 1;
        await this.fetchArticles(nextPage);
    }

    async back() {
        const prevPage = this.state.page - 1;
        await this.fetchArticles(prevPage);
    }

    render() {
        const { articles, page, totalResults } = this.state;

        return (
            <div>
                <div className='d-flex justify-content-between'>
                    <div className='container'>
                        <div className='row'>
                            {articles.map((element, index) => (
                                <div className='col-md-4 my-3' key={index}>
                                    <div className="card" style={{ width: '18rem', backgroundColor: this.props.mode === 'dark' ? 'black' : 'white' }}>
                                        <img src={!element.urlToImage ? 'https://akm-img-a-in.tosshub.com/indiatoday/images/story/202401/moto-razrjpg-120902-16x9.jpg?VersionId=d7Zj0hgLqG2p4MnmDt0t3yavKZp0TpL9' : element.urlToImage} className="card-img-top" alt="..." />
                                        <div className="card-body" style={{ color: this.props.mode === 'dark' ? 'white' : 'black' }}>
                                            <h5 className="card-title">{element.title}</h5>
                                            <p className="card-text">{element.description}</p>
                                            <a href={element.url} className="btn btn-primary">Go somewhere</a>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className='conatiner d-flex justify-content-around '>
                            <button type="button" disabled={page <= 1} onClick={() => this.back()} className="btn btn-dark">&larr; Previous</button>
                            <div className="pageNumber">
                                <p style={{ fontSize: '25px', border: 'solid 3px black', width: '32px', textAlign: 'center', borderRadius: '50%' }}>{page}</p>
                            </div>
                            <button type="button" disabled={page >= Math.ceil(totalResults / 6)} onClick={() => this.next()} className="btn btn-dark">Next &rarr;</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
