import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router'
const Books = () => {
    const [books,setBooks] = useState([])
    useEffect(()=>{
        const fecthAllBooks = async () =>{
            try{
                const res = await axios.get("http://localhost:5000/books") //get방식으로 요청 후에 응답으로 res를 받는다.
                console.log(res.data); //db에 있는 데이터를 출력 get 방식
                setBooks(res.data) // 받은 데이터들을 setBooks 함수를 활용해서 books 에 저장한다.
                    
            }catch(err){
                console.log(err);
            }
        }
        fecthAllBooks()
    },[])


    const handleDelete = async(id) =>{
        try{
            await axios.delete("http://localhost:5000/books/"+id)
            window.location.reload()
        }catch(err){
            console.log(err);
        }
    }



  return (
    <div>
        <h1>Book Shop</h1>
        <div className="books">
            {books.map(book=>(
                <div key ={book.id} className="book">
                   {book.cover && <img src={book.cover} alt=''/>}
                   <h2>{book.title}</h2>
                   <p>{book.desc}</p>
                   <span>{book.price}</span>
                   <button className='delete'onClick={()=> handleDelete(book.id)}>Delete</button>
                   <button className='update'><Link to={`/update/${book.id}`}>Update</Link></button>
                </div>
            ))}

        </div>
        <button><Link to="/add">Add new book</Link></button>
    </div>
  )
}

export default Books