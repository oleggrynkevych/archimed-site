import { useQuery, gql } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import Markdown from 'marked-react';

const ETHICSCODE = gql`
query GetEthicsCode ($locale: I18NLocaleCode) {
    ethicsCode (locale: $locale) {
      data {
        attributes {
          Text
        }
      }
    }
  }
`

function EthicsCode(){
    const { i18n } = useTranslation();
    const locale = i18n.language === 'ua' ? 'uk' : i18n.language;

    const {loading, error, data} = useQuery(ETHICSCODE, {
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
              {data.ethicsCode.data.attributes.Text}
            </Markdown>
          </div>  
        </div>
    )
}

export default EthicsCode;