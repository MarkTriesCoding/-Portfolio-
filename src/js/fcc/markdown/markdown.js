////
//IMPORT LIBRARIES
////
import marked from 'marked'
import React from 'react'
import ReactDOM from 'react-dom'
import Madewith from './Madewith.jsx'

////
//IMPORT CSS (WEBPACK)
////
import '../../../scss/fcc/markdown.scss'



////
//VARS
////
const renderer = new marked.Renderer();
const defaultText =
`# Hi. This is React Markdown Previewer.
## You can type in the editor here
### and it will convert it into Markdown

Heres a, \`<div></div>\`, between 2 backticks.



Here is:
* a
* list
* of
* items

>Blockquotes are fun to make
>>so are nested Blockquotes

Here's some **bold text**


Here is some code
\`\`\`
handleChange(e){
  this.setState({
  markdown:e.target.value
});
\`\`\`

Here is a [Reddit Link](www.reddit.com)

![Calgary Flames Logo](http://tsnimages.tsn.ca/ImageProvider/TeamLogo?seoId=calgary-flames&width=420&height=420)
`

////
//THIRD-PARTY MARKED OPTIONS
////
marked.setOptions({
  breaks: true

});

 renderer.link = function(url,title,text){
   return (`<a target="_blank" href="${url}">${text}` + `</a>`);
}

////
//MARKDOWN COMPONENT
////
class MarkDown extends React.Component{
  constructor(props){
    super(props);
    this.state={
      markdown:defaultText,
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e){
    this.setState({
      markdown:e.target.value
    });
  }
  render(){
    return(  <div>
              <div class="brand"><a href='/'>mh.dev</a></div>
              <header id="intro"> Markdown Language Tester</header>
              <section id="markdown">
              <div className = "section"><span>Editor</span>  <textarea id="editor" onChange={(e)=>{this.handleChange(e)}} type="text">{this.state.markdown}</textarea></div>
              <div className = "section"><span>Previewer</span>  <div id="preview" dangerouslySetInnerHTML={{__html: marked(this.state.markdown, { renderer: renderer })}}></div></div>
              </section>
              <Madewith />
             </div>
    );
  }
}

////
//RENDER APP
////
ReactDOM.render(<MarkDown />,document.getElementById('app'))
