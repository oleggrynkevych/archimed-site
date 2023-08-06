import Iframe from 'react-iframe';
import './PrivacyPolicy.css';
import { useQuery, gql } from '@apollo/client';
import { useTranslation } from 'react-i18next';

const POLICY = gql`
query GetPrivacyPolicy ($locale: I18NLocaleCode) {
    privacyPolicy (locale: $locale) {
      data {
        attributes {
          Link
        }
      }
    }
  }
`

function PrivacyPolicy(){
    const { i18n } = useTranslation();
    const locale = i18n.language === 'ua' ? 'uk' : i18n.language;

    const {loading, error, data} = useQuery(POLICY, {
        variables: 
            {
                locale: locale,
            }
    });

    if( loading ) return <p></p>
    if( error ) return <p></p>

    return(
        <div className='privacy-policy'>
            <Iframe url={data.privacyPolicy.data.attributes.Link} />        
        </div>
    )
}

export default PrivacyPolicy;