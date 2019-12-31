import React , {Fragment, useEffect, useState} from 'react'
import { Category } from '../Category'

import { List, Item } from './styles'
//import { categories as mockCategories } from '../../../api/db.json'


function useCategoriesData(){
  console.log("useCategoriesData")
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)

    const getCategories = async () => {
      const response = await fetch('https://petgram-server.aryrosvall.now.sh/categories')
      const res = await response.json()
      setCategories(res)
      setLoading(false)
    };

    getCategories()
  }, [])

  return { categories, loading }
}

export const ListOfCategories = () => {
  const { categories, loading } = useCategoriesData()
  
  const [showFixed, setShowFixed] = useState(false)

  useEffect(() => {
    const onScroll = e => {
      const newShowFixed = window.scrollY > 200

      if(newShowFixed !== showFixed){
        setShowFixed(newShowFixed)
      }
    }

    document.addEventListener("scroll", onScroll)

    return () =>{
      document.removeEventListener("scroll", onScroll)
    }

  }, [showFixed])

  const renderList = (fixed) =>{
    return(
      <List fixed={fixed}>
        {
          categories.map(category => <Item key={category.id}><Category {...category}/></Item>)
        }
      </List>
    )
  }

  if(loading){
    return(
      <h4>{"Cargando..."}</h4>
    );
  }

  return (
    <Fragment>
      {renderList()}

      {showFixed && renderList(true)}
    </Fragment>
  )
}
