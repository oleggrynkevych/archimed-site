import './Partners.css';
import { useQuery, gql } from '@apollo/client';
import Logo from './Logo';

const LOGOSEMB = gql`
  query GetHomePage {
    homePage {
      data {
        attributes{
            LogosEmbassies{
            data{
              attributes{
                url
              }
             }
           } 
        }
       }
     }
   }
`

function EmbassiesPartners () {
  let firstSlideTime = '16s';

  const {loading, error, data} = useQuery(LOGOSEMB);

  if(loading) return <p></p>
  if(error) return <p></p>

  const photoData = data.homePage.data.attributes.LogosEmbassies.data;
  const photoURLs = photoData.map(photo => photo.attributes.url);

  while (photoURLs.length < 12) {
    photoURLs.push(...photoURLs);
  }
  
  const newPhotos = photoURLs.slice(0, 12);


  return (<div className='logos-slide' style={{ animation: `${firstSlideTime} slide infinite linear` }}>
    {newPhotos.map((url, index) => (
        <Logo key={index} src={url} />
      ))}
  </div>)

}

export default EmbassiesPartners;