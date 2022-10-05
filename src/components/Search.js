import React from 'react'
import {Link} from 'react-router-dom';
import ReadingSection from './ReadingSection';
import {searchTerms} from '../utilities/searchTerms';
import * as BooksAPI from '../BooksAPI';

class Search extends React.Component {
    state = {
        searchData: null,
        allShelfData:null,
        showSearchResult: false,
    }

    componentDidMount(){
        this.getAllShelves();
    }

    getAllShelves=()=>{
        BooksAPI.getAll()
            .then((response)=>{
                this.setState({
                    allShelfData : response
                });
            });
    }

    handleFieldChange = (value) => {
        if (searchTerms.includes(value)) {
            this.refreshSearchData(value);
        }
        else {
            this.setState({
                searchData : null
            });
        }
    }

    refreshSearchData = (searchQuery)=>{
        BooksAPI.search(searchQuery)
            .then((response)=>{
                // this.setState({
                //     searchData : response,
                //     showSearchResult : true
                // });
                this.updateSearchWithShelf(response)
            });
    }

    updateSearchWithShelf = (searchResponse) =>{
        let {allShelfData,} = this.state;
        let shelfDataBookArray = allShelfData.map(book => book.id);
        searchResponse.forEach(book => {
            if (shelfDataBookArray.includes(book.id))
                book.shelf=allShelfData[shelfDataBookArray.indexOf(book.id)].shelf;
            else 
                book.shelf= 'none';
        });
        this.setState({
            searchData : searchResponse
        });
    }

    updateBookShelf=(book, shelf)=>{
        let {searchData} = this.state;
        let newSearchData=[...searchData];
        let bookObj=newSearchData.find(obj=>obj.id===book.id);

        newSearchData[newSearchData.indexOf(bookObj)].shelf=shelf;
        this.setState({
            searchData : newSearchData
        });
        BooksAPI.update(book, shelf)
            .then((response)=>{
                //if (response) this.refreshSearchData();
                //console.log(response);
        });
    }

    render() {

        return (
            <div className="app"> 
            <div className="search-books">
                <div className="search-books-bar">
                    {/* <button className="close-search" style={{cursor:"pointer"}} onClick={() => this.props.history.goBack()}>
                        Close
                    </button> */}
                    <Link to='/' className="close-search"></Link>
                    <div className="search-books-input-wrapper">
                        <input type="text" placeholder="Search by title or author"
                            onChange={(e) => this.handleFieldChange(e.target.value)}
                        />
                    </div>
                </div>
                {(!this.state.searchData) ? null : (
                <div className="search-books-results">
                    <ReadingSection 
                        shelfData= {this.state.searchData}
                        updateBookShelf = {this.updateBookShelf}
                    />
                </div>)
                } 
            </div>

            </div>
        )
    }
}

export default Search;
