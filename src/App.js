import React,{useLayoutEffect,useEffect,useState} from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';
import NewsCards from './components/NewsCards/NewsCards';
import NewsCard from './components/NewsCard/NewsCard';
import env from "react-dotenv";
import classNames from 'classnames';
import useStyles from './styles'
import wordsToNumbers from 'words-to-numbers';
import {Card,CardActions,CardActionArea,CardContent,CardMedia,Button , Typography} from '@material-ui/core'
const myapi=process.env.REACT_APP_MYAPI_KEY;

const alanKey = process.env.REACT_APP_ALANAPI_KEY;




const App=()=>{
    const [activeArticle, setActiveArticle] = useState(0);
    const [newsArticles, setNewsArticles] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
const classes =useStyles();
// useEffect(()=>{

  useLayoutEffect(() => {
    function updateScreen(time) {
      // Make visual updates here.
        alanBtn({
         key:alanKey,
          onCommand: ({ command, articles, number }) => {
            if (command === 'newHeadlines') {
              setNewsArticles(articles);
              setActiveArticle(-1);
            }else if (command === 'highlight') {
              setActiveArticle((prevActiveArticle) => prevActiveArticle + 1);
            } else if (command === 'open') {
              const parsedNumber = number.length > 2 ? wordsToNumbers((number), { fuzzy: true }) : number;
              const article = articles[parsedNumber - 1];
    console.log(article.length)
              if (parsedNumber > articles.length) {
                alanBtn().playText('Please try that again...');
              } else if (article) {
                window.open(article.url, '_blank');
              
              } else {
                alanBtn().playText('Please try that again...');
              }
            }
          },
        });
      }

      requestAnimationFrame(updateScreen);
    }, [])
    
// console.log(newsArticles,activeArticle);
return (
    <div>
      <div className={classes.logoContainer}>
        {newsArticles.length ? (
          <div className={classes.infoContainer}>
            <div className={classes.card}><Typography variant="h5" component="h2">Try saying: <br /><br />Open article number [4]</Typography></div>
            <div className={classes.card}><Typography variant="h5" component="h2">Try saying: <br /><br />Go back</Typography></div>
          </div>
        ) : null}
        <img src="https://i.ibb.co/v17s8Rz/alan.jpg" className={classes.alanLogo} alt="logo" />
      </div>
      <NewsCards articles={newsArticles} activeArticle={activeArticle} />
   
    
    </div>
  );
};
export default App;
