import Cookies from 'js-cookie'
// list of category
export const fetch_list_category = () => dispatch => {
  dispatch({
    type: 'FETCH_LIST_CATEGORY_START'
  })
  fetch('http://127.0.0.1:8000/api/category/')
    .then(response => {
      return response.json()
    })
    .then(qs_categories => dispatch({
      type: 'FETCH_LIST_CATEGORY',
      payload: qs_categories
    }))
    .catch(err => dispatch({
      type: 'ERROR',
      payload: err
    }))
}
// items in category
export const fetch_items_in_category = (title, next=null) => dispatch => {
  dispatch({
    type: 'FETCH_ITEMS_START',
  })
  title = title.charAt(0).toUpperCase() + title.slice(1)
  let URL
  if (next){
    URL = next
  } else {
    URL = `http://127.0.0.1:8000/api/category/${title}?page=1`
  }
  fetch(URL)
    .then(response => {
      return response.json()
    })
    .then(category => 
      dispatch({
        type: 'FETCH_ITEMS_WITH_CATEGORY',
        payload: category,
        next: URL
      })
    )
    .catch(err => dispatch({
      type: 'ERROR',
      payload: err
    }))
}
// items without category
export const fetch_items_without_category = (next = null) => dispatch => {
  dispatch({
    type: 'FETCH_ITEMS_START'
  })
  // get next url is exist
  let URL
  if (next){
    URL = next 
  } else {
    URL = `http://127.0.0.1:8000/api/item/` 
  }
  fetch(URL)
    .then(response => {
      return response.json()
    })
    .then(qs_items => dispatch({
      type: 'FETCH_ITEMS_WITHOUT_CATEOGORY',
      payload: qs_items
    }))
    .catch(err => dispatch({
      type: 'ERROR',
      payload: err
    }))
}
// items info
export const fetch_item = (slug) => dispatch => {
  dispatch({
    type: 'FETCH_ITEM_START'
  })
  fetch(`http://127.0.0.1:8000/api/item/${slug}`)
    .then(response => {
      return response.json()
    })
    .then(item => dispatch({
      type: 'FETCH_ITEM',
      payload: item
    }))
    .catch(err => dispatch({
      type: 'ERROR',
      payload: err
    }))
}
// search items
export const search_items = (title = null, query = '', types = {}, min = '', max = '', next = null) => dispatch => {
  // send search data to the store
  dispatch({
    type: 'SEARCH_ITEMS_START',
    payload: {query, types, min, max}
  })
  // check category exist
  let category
  if (title != null) {
    // uppercase category name
    title = title.charAt(0).toUpperCase() + title.slice(1)
    category = `category=${title}&`
  } else {
    category = ''
  }
  // get types values
  let list_types = [] 
  for (let i in types){
    if (types[i]){
      list_types.push(i)
    }
  }
  // go to next url if it exist 
  let URL
  if (next) {
    URL = next
  } else {
   URL = `http://127.0.0.1:8000/api/item/?${category}search=${query}&types=${list_types.join()}&min_prise=${min}&max_prise=${max}`
  }
  // request
  fetch(URL)
    .then(response => {
      return response.json()
    })
    .then(qs_items =>{
      // search with or without category
      title == null ? 
        dispatch({
        type: 'SEARCH_ITEMS_WITHOUT_CATOGORY',
        payload: qs_items
      })
        :
      dispatch({
        type: 'SEARCH_ITEMS_WITH_CATEGORY',
        payload: qs_items
      })
    })
    .catch(err => {
      dispatch({
        type: 'ERROR',
        payload: err
      })
    })
}
// load up searched items on 'search in category' page
export const load_up_search = next => dispatch => {
  fetch(next)
  .then(response => {
    return response.json()
  })
  .then(items => dispatch({
    type: 'LOAD_UP_SEARCH',
    payload: items
  }))
  .catch(err => {
    dispatch({
      type: 'ERROR',
      payload: err
    })
  })
}
export const reload_sug = sug => dispatch => {
  dispatch({
    type: 'RELOAD_SUG',
    payload: sug
  })
}
// Main search value to state
export const reload_serch_value = value => dispatch => {
  dispatch({
    type: 'RELOAD_SEARCH_VALUE',
    payload: value
  })
}
// clear all forms
export const reset_forms = () => dispatch => {
  dispatch({
    type: 'RESET_FORMS'
  })
}
export const handleDialog = () => dispatch => {
  dispatch({
    type: 'HANDLE_DIALOG'
  })
}
// check is mount on 'home' page
export const home_toggle_isMount = value => dispatch => {
  dispatch({
    type: 'HOME_TOGGLE_ISMOUNT',
    payload: !value
  })
}

export const add_review = (id, nickname, stars, body) => dispatch => {
  const csrftoken = Cookies.get('csrftoken')
  fetch('http://127.0.0.1:8000/api/review/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': csrftoken
    },
    body: JSON.stringify({
      "nickname": nickname,
      "stars": stars,
      "body": body,
      "item": id
    })
  })
  .then(response => {
      return response.json()
    })
  .then(review => dispatch({
    type: 'ADD_REVIEW',
    payload: review
  }))
  .catch(err => {
      dispatch({
        type: 'ERROR',
        payload: err
      })
    })
}
