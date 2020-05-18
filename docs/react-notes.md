**Components/Props**
- only props that extend Component should use state
- use functional components whenever possible
- the DOM is rerendered whenever state is changed
    *React Hooks*
     - Basically a way of only using functional componenets throughout
       the entire application
     - Biggest difference is - functional state overrides all data, so if you update
       state you need to update all of the fields
- Components that manage state should usually be lean and not interact too much
  with the UI rendering side of things
- Presentational Component - functional/stateless/dumb component
- Stateful components - containers/class based (extends Component)


**Component Lifecycle**
    1. constructor(props)
    2. getDerivedStateFromProps(props, state)
    3. render()
        - Then render child components
    4. componentDidMount()


**Pure Component**
- When you have a class component that needs to know about the state/props of its
  child components


#### For Styling
- semantic.min.css CDN
- stylesheet in index.html

*images go in /public dir*
*faker.js for generating mock data*



**Component/Container Layout**
Directory:
components/
    Post/
        Post.js
containers/
    Blog/
        FullPost/
            FullPost.css
            Fullpost.js
        NewPost
            NewPost.css
            NewPost.js
        
components - where we store the reusable custom components that can be used anywhere
in the application. Things such as some custom button or card

containers - seems like this is where you would store each page of the app
and then in that directory each "piece" of that page which will consist of
multiple components


**PropTypes**
- implement prop-types (npm package) for your components


**Context**
- Used to store global variables to be used throughout the project.
- Just have to wrap components with the Context object

**Axios**
- Can set defaults on axios in index.js

**Routing**
```<Route path="/" exact component={Posts}/>```

If you dont specify exact it will render this is the path matches the prefix.
So for anything that you want translated across all routes that are a child of a
particular prefix then you would not do exact and render it there

Otherwise for unique pages its prolly best to just do exact

- Create a NavBar

- If you need route info in some component that isnt a main page or something, you can
  just wrap the component with WithRouter and it will then have info about the routing

- For the view book modal, you can use the same ajax and component for both when you view it 
  from your bookshelf or when exploring - will just have to do a dynamic route

- Implement Lazy Loading with at least the App.js page



### Thoughts on switching to CS themed app instead of books
- Bookshelf -> Active Projects
- Persona -> Persona
- Explore -> Learn/Discover - Have suggested articles/books videos etc..
- Code -> Maybe a 4th option for practicing some coding

- For the code editor - have a docker container or pod that is spun up fresh for
  each execution of code
  Or maybe spin it up when they enter the editor and just do a clean up (or restart)
  every time code is executed. This should minimize the risk of injection attacks


## PROTOTYPE - V3 ##
### Forms
- Possibly create a helper function which accepts some params and returns a "form config" to avoid
  duplicating work
- formElement.id -- This passes the id of the current element to an event handler

-- Signup Form



### Redux
- Add the redux devtools
