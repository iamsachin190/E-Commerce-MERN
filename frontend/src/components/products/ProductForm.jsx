import React, { useState } from 'react'
import axios from 'axios' 

export default function ProductForm() {

  const [formData , setFormData] = useState({
    name:"",
    price: "",
    description: "",
    category:"",
    image: "",
  })

  const handleChange = (e) =>{
    setFormData({...ProductForm , [e.target.name]:e.target.value})
  }

  const handleFilechange = (e) =>{
    setFormData({...ProductForm, image: e.target.files[0] })
  }

  const handleSubmit = async (e) => {
    e.preventDefault(); 
  const data  = new FormData()
  data.append('name', formData.name)
  data.append('price', formData.price)
  data.append('description', formData.description)
  data.append('category', formData.category)
  data.append('image', formData.image)

  try {
    const response = await axios.post('http://localhost:8000/api/product/create', data)
    console.log("product created succefully " , response.data)
    alert("Product created succefully")
  } catch (err) {
    console.error("Error while uploading product " , err)
    alert("Error while creating the product ")
  }
}
  return (
    <>
     <div>
      <h2>Create product</h2>

      <div>
        <form onSubmit={handleSubmit}>
        <input type="text" placeholder='Product Name' value={formData.name} onChange={handleChange} name='name'/>
        <input type="number" placeholder='Price' name='price' value={formData.price}  onChange={handleChange}/>
        <textarea
                name="description"
                placeholder="Product Description"
                value={formData.description}
                onChange={handleChange}
                required
            ></textarea>
        <select name="category" value={formData.category}  onChange={handleChange}>
          <option value="Electronics">Electronics</option>
          <option value="Fashion">Fashion</option>
        </select>
        <input type="file" name="image" onChange={handleFilechange}/>
        <button type="submit">Submit</button>
        </form>
      </div>
     </div>
    </>
  )
}
