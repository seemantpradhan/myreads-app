import React from 'react'
import {Link} from 'react-router-dom';
import ReadingSection from './ReadingSection';
import * as BooksAPI from '../BooksAPI';

class MyReads extends React.Component {
    state = {
        currentlyReadingShelf: [],
        wantToReadShelf: [],
        readShelf: []
    }

    componentDidMount(){
        this.refreshAllShelves();
    }

    refreshAllShelves=()=>{
        BooksAPI.getAll()
            .then((response)=>{
                this.setState({
                    currentlyReadingShelf : response.filter(book => book.shelf === "currentlyReading"),
                    wantToReadShelf : response.filter(book => book.shelf === "wantToRead"),
                    readShelf : response.filter(book => book.shelf === "read")
                });
            });
    }

    updateBookShelf=(book, shelf)=>{
        BooksAPI.update(book, shelf)
            .then((response)=>{ 
                if (response) this.refreshAllShelves();
                //console.log(response);
        });
    }

    render() {
        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <ReadingSection 
                        sectionHeader="Currently Reading" 
                        shelfData= {this.state.currentlyReadingShelf}
                        updateBookShelf = {this.updateBookShelf}
                    />
                    <ReadingSection 
                        sectionHeader="Want to Read" 
                        shelfData={this.state.wantToReadShelf} 
                        updateBookShelf = {this.updateBookShelf}
                    />
                    <ReadingSection 
                        sectionHeader="Read" 
                        shelfData={this.state.readShelf} 
                        updateBookShelf = {this.updateBookShelf}
                    />
                    <Link to='/search' className="open-search" >
                        <button style={{cursor:"pointer"}}>Add a book</button>
                    </Link>
                </div>
            </div>
        )
    }
}

export default MyReads;
