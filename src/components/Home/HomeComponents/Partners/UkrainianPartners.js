import './Partners.css';
import { useQuery, gql } from '@apollo/client';
import Logo from './Logo';

const LOGOSUKR = gql`
  query GetHomePage {
    homePage {
      data {
        attributes{
            LogosUkrainianPartners (pagination: { start: 0, limit: 12 }){
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

function UkrainianPartners () {

  const {loading, error, data} = useQuery(LOGOSUKR);

  if(loading) return <p></p>
  if(error) return <p></p>

  const photoData = data.homePage.data.attributes.LogosUkrainianPartners.data;
  const photoURLs = photoData.map(photo => photo.attributes.url);

  while (photoURLs.length < 12) {
    photoURLs.push(...photoURLs);
  }
  
  const newPhotos = photoURLs.slice(0, 12);


  return (<div className='logos-slide' >
    {newPhotos.map((url, index) => (
        <Logo key={index} src={url} />
      ))}
  </div>)

}

export default UkrainianPartners;