import './PrivacyPolicy.css';
import { useQuery, gql } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import Markdown from 'marked-react';

const POLICY = gql`
query GetPrivacyPolicy ($locale: I18NLocaleCode) {
    privacyPolicy (locale: $locale) {
      data {
        attributes {
          Text
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
          <div className='privacy-policy-container'>
            <Markdown>
              {data.privacyPolicy.data.attributes.Text}
            </Markdown>
          </div>  
        </div>
    )
}

export default PrivacyPolicy;