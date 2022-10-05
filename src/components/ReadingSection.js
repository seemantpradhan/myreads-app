import React from 'react'

class ReadingSection extends React.Component {

  handleShelfChange(book,event){
    let updatedShelf= event.target.value;
    this.props.updateBookShelf(book,updatedShelf);
  }

  render() {
        let {shelfData,sectionHeader}= this.props;
        
        return (
            <div className="bookshelf">
            {sectionHeader? <h2 className="bookshelf-title">{sectionHeader}</h2> : null }
            <div className="bookshelf-books">
            <ol className="books-grid">
                {
                    !shelfData ? null :
                    shelfData.map(book=>
                        (
                        <li key={book.id}>
                            <div className="book">
                                <div className="book-top">
                                {(book.imageLinks && book.imageLinks.thumbnail) ? 
                                    (<div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>)
                                        : (<div className="book-cover" style={{ width: 128, height: 193 }}></div>) }
                                <div className="book-shelf-changer">
                                    <select value={book.shelf} onChange={(event) => this.handleShelfChange(book,event)}> 
                                    <option value="move" disabled>Move to...</option>
                                    <option value="currentlyReading">Currently Reading {(book.shelf==="currentlyReading")? '\u2714' : null }</option>
                                    <option value="wantToRead">Want to Read {(book.shelf==="wantToRead")? '\u2714' : null }</option>
                                    <option value="read">Read {(book.shelf==="read")? '\u2714' : null }</option>
                                    <option value="none">None</option>
                                    </select>
                                </div>
                                </div>
                                <div className="book-title">{ book.title }</div>
                                <div className="book-authors">{ book.authors? book.authors.join(", "):null }</div>
                            </div>
                        </li>
                        )
                    )
                }
            </ol>
            </div>
        </div>
        )
    }
}

export default ReadingSection;
