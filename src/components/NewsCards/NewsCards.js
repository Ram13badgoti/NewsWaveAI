import React from 'react'
import NewsCard from '../NewsCard/NewsCard';
import {Grid,Typography,Grow} from '@material-ui/core'

import useStyles from './styles';



const infoCards = [
  { color: '#00838f', title: 'Latest News', text: 'Give me the latest news' },
  { color: '#1565c0', title: 'News by Categories', info: 'Business, Entertainment, General, Health, Science, Sports, Technology', text: 'Give me the latest Technology news' },
  { color: '#4527a0', title: 'News by Terms', info: 'Bitcoin, PlayStation 5, Smartphones, Donald Trump...', text: 'News about PlayStation 5' },
  { color: '#283593', title: 'News by Sources', info: 'CNN, Hindustan times, BBC News, The Times of India, IGN, Buzzfeed, ABC News...', text: 'Give me the news from Hindustan times' },
];
function NewsCards({articles,activeArticle}) {
    const classes= useStyles();
  
    if(articles.length===0){
      return(
        <Grow in>
        <Grid  className={classes.container} container alignItems="stretch"   spacing={3}>
          {infoCards.map((infoCard) => (
            <Grid item xs={12} sm={6} md={4} lg={3} className={classes.infoCard}>
              <div className={classes.card} style={{ backgroundColor: infoCard.color }}>
                <Typography variant="h5" component="h5">{infoCard.title}</Typography>
                {infoCard.info ? <Typography style={{fontSize:"16px",paddingTop:"10px"}} component="h6"><strong>{infoCard.title.split(' ')[2]}</strong>: <br />{infoCard.info}</Typography> : null}
                <Typography  style={{fontSize:"14px"}}  component="h6" >Try saying: <br /> <i style={{fontFamily:"Caveat, cursive"}}>{infoCard.text}</i></Typography>
              </div>
            </Grid>
          ))}
        </Grid>
      </Grow>

      )
    }
  return (
    <Grow in>
    <Grid className={classes.container} container alignItems="stretch" spacing={3}>
      {articles.map((article, i) => (
        <Grid item xs={12} sm={6} md={4} lg={3} style={{ display: 'flex' }}>
          <NewsCard  i={i} article={article} activeArticle={activeArticle}/>
        </Grid>
      ))}
    </Grid>
  </Grow>
);
};
export default NewsCards
