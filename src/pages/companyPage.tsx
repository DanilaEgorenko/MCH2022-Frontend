import React, {FC} from 'react';
import RootPage from './rootPage';

import {CompanyI} from '../redux/reducers/authReducer';

import factoryPlaceholder from '../static/imgs/Industrial_Power_plant_1.svg';

import '../index.scss';

interface TableRowProps {
  [key: string]: string | React.ReactNode;
}

const TableRow: FC<TableRowProps> = ({leftText, rightText}) => (
  <div className="row">
    <div className="col s4 left-align">
      {leftText}
    </div>
    <div className="col s8 right-align">
      {rightText}
    </div>
  </div>
);

const CompanyPage: FC = () => {
  const companyData: CompanyI = {
    itn: '101010101012',
    psrn: '1313131313013',
    name: 'Корпорация добра',
    legalName: 'ОАО "всех обманули Корпорация зла"',
    email: 'corp@evilorgood.com',
    link: 'https://gitlab.com/Denactive/mch2022-frontend',
    category: {
      title: 'Интернет-реклама',
      industry: 'Реклама и маркетинг',
    },
    placeOfIncorporation: 'Москва',
    placeOfProduction: 'Липецк',
    representative: 'Зубенко Михаил Петрович',
    phone: '8-800-000-00-00',
  };

  return (
    <RootPage nameOfActive='Company'>
      <h3 className="text">
        Компания&nbsp;
        &ldquo;<a className='grey-text text-darken-3' href={companyData.link}>{companyData.name}</a>&rdquo;
      </h3>
      <div className="row jc-sp-btw">
        <div className='col s3'>
          <div className='row'>
            <img src={factoryPlaceholder} className='responsive-img' alt='company logo'/>
          </div>
          <div className='row'>
            <a href={companyData.link} target='_blank' rel='noreferrer' className='col s10 offset-s1'>
              <button className='btn grey darken-3 waves-effect waves-light'>
                На сайт
                <i className='material-icons right'>call_made</i>
              </button>
            </a>
          </div>
        </div>
        <div className='col s9'>
          <div className="row">
            <h4>О компании</h4>
            <hr />
            <p className="flow-text">
              Наш информационный портал, предназначен для размещения справочной информации,
              новостей, отзывов о компаниях.
              Здесь собраны самые свежие и актуальные публикации о событиях.
              На нашем портале быстро найдете любую организацию в интересующей вас сфере деятельности.
              Доступна такая информация как: контактные телефоны, адреса, филиалы, фотографии
            </p>
          </div>

          <div className="row">
            {/* TODO: Является ли она производителем товаров
            Документы: сметы, каталоги  */}
            <h4>Сведения</h4>
            <hr />
            <TableRow leftText={'Название'} rightText={companyData.name}/>
            <TableRow leftText={'Юридическое название'} rightText={companyData.legalName}/>
            <TableRow leftText={'ИНН'} rightText={companyData.itn}/>
            <TableRow leftText={'ОГРН'} rightText={companyData.psrn}/>
            <TableRow leftText={'Отрасль'} rightText={companyData.category.industry}/>
            <TableRow leftText={'Категория'} rightText={companyData.category.title}/>
            <TableRow leftText={'Место регистрации'} rightText={companyData.placeOfIncorporation}/>
            <TableRow leftText={'Место производства'} rightText={companyData.placeOfProduction}/>
          </div>

          <div className="row">
            <h4>Контакты</h4>
            <hr />
            <TableRow leftText={'Сайт'} rightText={
              <a href={companyData.link} target='_blank' rel='noreferrer'>
                {companyData.name}
              </a>
            }/>
            <TableRow leftText={'Представитель компании'} rightText={companyData.representative}/>
            <TableRow leftText={'E-mail'} rightText={<a href={`mailto:${companyData.email}`} target='_blank' rel='noreferrer'>
              {companyData.email}
            </a>}/>
            <TableRow leftText={'Телефон'} rightText={<a href={`tel:${companyData.phone}`} target='_blank' rel='noreferrer'>
              {companyData.phone}
            </a>}/>
          </div>
        </div>
      </div>
    </RootPage>
  );
};


export default CompanyPage;
