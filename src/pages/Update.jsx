import React, { useState } from 'react'
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router'



const Update = () => {
    const [book,setBook] = useState({
        title:"",
        desc: "",
        price:null,
        cover:"",
    })

    const navigate = useNavigate()
    const location = useLocation()
    // console.log(location.pathname.split("/")[2]);

    const bookId= location.pathname.split("/")[2]

    const handleChange = (e) =>{
        setBook((prev)=>({
            ...prev,
            [e.target.name] : e.target.value
            // 대괄호를 사용하지 않으면 문자열 "title"로 인식을 한다.
            // 대괄호를 사용하면 JavaScript는 e.target.name을 평가한 결과("title")를 키로 인식합니다.
        }))
    }
    const handleClick = async e =>{
        e.preventDefault() // 기본 폼 제출 동작(페이지 새로고침)을 방지합니다.
        try{
            await axios.put("http://localhost:5000/books/"+ bookId, book) //서버로 useState에 있는 book 데이터를 보낸다
            navigate("/") //book 데이터가 서버로 보내지면 성공해서 /으로 이동한다.
        }catch(err){
            console.log(err);
        }
    }
  return (
    <div className='form'>
        <h1>Update the Book</h1>
        <input type="text" placeholder='title' onChange={handleChange} name='title'/>
        <input type="text" placeholder='desc' onChange={handleChange} name='desc'/>
        <input type="number" placeholder='price' onChange={handleChange} name='price'/>
        <input type="text" placeholder='cover' onChange={handleChange} name='cover'/>
        <button className="formButton"onClick={handleClick}>Update</button>
    </div>
  )
}

export default Update