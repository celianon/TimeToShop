const initialState  = {
  // request status
  errors: null,
  fetching: false,
  fetched: false,
  // data
  qs_categories: [],
  qs_items: [],
  item: {},
  category: {item: []},
  // is mount on 'home' page
  home_is_mount: false,
  // paginations on 'home' page
  next: null,
  // paginations on 'search in category' page
  page: 1,
  // search status
  searching: false,
  searched: false,
  // search params
  query: '',
  types: {},
  min: '',
  max: '',
  // need reset ?
  reset: false,
  // search suggestion
  list_suggestions: [],
  suggestions: [],
  // dialog window state
  open: false
}

let suggestions = []

export default function(state = initialState, actions){
  switch(actions.type){
    // start fetching on 'category list' page
    case 'FETCH_LIST_CATEGORY_START':
      return {
        ...state,
        fetching: true
      }
    // fetched data to state on 'category list' page
    case 'FETCH_LIST_CATEGORY':
      return {
        ...state,
      fetching: false,
      fetched: true,
      qs_categories: actions.payload
      }
    // any erorrs
    case 'ERROR':
      return {
        ...state,
        fetching: false,
        errors : actions.payload,
        next: null
      }
    // start fetching items on 'home' and 'search in category' pages
    case 'FETCH_ITEMS_START':
      return {
        ...state,
        fetching: true,
        next: null
      }
    // fetched data to state on 'search in category' page
    case 'FETCH_ITEMS_WITH_CATEGORY':
      // get next url
      let next = actions.next.split('?page=')[0] + `?page=${state.page + 1}`
      // search suggest by titles
      actions.payload.item.map(i => suggestions.push(i.title))
      // get changed filters
      let types = {}
      actions.payload.filters.split(',').map((filter) => types[filter.trim()] = false)
      
      return {
        ...state,
        fetching: false,
        fetched: true,
        category: {
          ...state.category,
          ...actions.payload,
          item: [
            ...state.category.item,
            ...actions.payload.item
          ]
        },
        page: state.page + 1,
        next: next,
        list_suggestions: suggestions,
        types: types
      }
    // if pages is runing out
    case 'FETCH_ITEMS_WITH_CATEGORY_NOT_THIS_PAGE':
      return {
        ...state,
        next: null,
        fetching: false,
        fetched: true,
      }
    // fetched data to state on 'home' page
    case 'FETCH_ITEMS_WITHOUT_CATEOGORY':
      // search suggest by titles
      actions.payload.results.map(i => suggestions.push(i.title))
      return {
        ...state,
        fetching: false,
        fetched: true,
        // add new list of items to previous list of items
        qs_items: [...state.qs_items, ...actions.payload.results],
        next: actions.payload.next,
        list_suggestions: suggestions
      }
    // start fetching on 'item' page
    case 'FETCH_ITEM_START':
      return {
        ...state,
        fetching: true
      }
    // fetched data to state on 'item' page
    case 'FETCH_ITEM':
      return {
        ...state,
      fetching: false,
      fetched: true,
      open: false,
      item: actions.payload
      }
    // search queries to state
    case 'SEARCH_ITEMS_START':      
      return {
        ...state,
        searching: true,
        query: actions.payload.query,
        types: actions.payload.types,
        min: actions.payload.min,
        max: actions.payload.max,
      }
    // fetched searched items on 'search in category' page
    case 'SEARCH_ITEMS_WITH_CATEGORY':
      return {
        ...state,
        searching: false,
        searched: true,
        next: actions.payload.next,
        category: {
          ...state.category,
          item: actions.payload.results,
        },
        reset: false
      }
    // load up items on 'search in category' page,
    case 'LOAD_UP_SEARCH':
      return {
        ...state,
        next: actions.payload.next,
        category: {
          ...state.category,
          item: [
            ...state.category.item,
            ...actions.payload.results
          ]
        }
      }
    // fetched searched items on 'home' page
    case 'SEARCH_ITEMS_WITHOUT_CATOGORY':
      return {
        ...state,
        searching: false,
        searched: true,
        qs_items: actions.payload.results,
        next: actions.payload.next,
        reset: false
      }
    // reload search suggestions
    case 'RELOAD_SUG':
      return {
        ...state,
        suggestions: actions.payload
      }
    case 'RESET_FORMS':
      return {
        ...state,
        query: '',
        types: {},
        min: '',
        max: '',
        reset: true
      }
    // update search input to state
    case 'RELOAD_SEARCH_VALUE':
      return {
        ...state,
        query: actions.payload
      }
    // check is mount on 'home' page
    case 'HOME_TOGGLE_ISMOUNT':
      return {
        ...state,
        home_is_mount: actions.payload
      }
    // handle show dilog review form on 'item' page
    case 'HANDLE_DIALOG':
      return {
        ...state,
        open: !state.open
      }
    // add review from dilog review form on 'item' page
    case 'ADD_REVIEW':
      return {
        ...state,
        item: {
          ...state.item,
          reviews: [
            ...state.item.reviews,
            actions.payload
          ]
        }
      }
    default:
      return state
  } 
}