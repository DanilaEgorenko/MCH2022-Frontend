import React, {FC, useEffect, useState} from 'react';
import {useParams} from 'react-router';
import RootPage from './rootPage';
import Category from '../components/category/category';

import legkayaPromPicture from '../static/imgs/industry/legkayaProm.jpg';
import oilRefineryPicture from '../static/imgs/industry/oil_refinery.jpg';
import foodPromPicture from '../static/imgs/industry/foodProm.jpg';
import chemPromPicture from '../static/imgs/industry/chemProm.jpg';

import AutoPromPicture from '../static/imgs/industry/autoprom.jpg';
import medicinePicture from '../static/imgs/industry/medicine.jpeg';

import './pages.scss';


interface Categories {
  msg: string;
  data: {
    id: number;
    title: string;
    industry_id: number;
  };
}

const IndustryPage: FC = () => {
  const imgs: {[key: string]: string} = {
    'category1': legkayaPromPicture,
    'category2': oilRefineryPicture,
    'category3': foodPromPicture,
    'category4': chemPromPicture,
  };
  const backgrounds: string[] = [oilRefineryPicture, AutoPromPicture, medicinePicture];
  const names: string[] = ['Машиностроение', 'MetalProd', 'OilProd'];
  const {id}: {id?: number} = useParams();
  const [categories, setCategories] = useState<Categories['data'][]>([]);
  useEffect(() => {
    const getIndustries = async () => {
      const res = await fetch(`http://localhost:8080/industry/${id}`)
        .then((res) => res.json());
      if (res.msg === 'OK') {
        setCategories(res.data);
      }
    };
    getIndustries();
  }, [id]);
  const [searchInput, setSearchInput] = useState('');
  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    const {value} = e.target;
    setSearchInput(value);
  }
  const filteredGoods = categories
    .filter((el) => el['title']
      .trim()
      .toLocaleLowerCase(['ru-RU', 'en-US'])
      .includes(searchInput.trim().toLocaleLowerCase(['ru-RU', 'en-US'])),
    );
  return (
    <RootPage nameOfActive='Industry'>
      <div className='row jc-sp-btw'>
        <div className='category_top'>
          {id && <h1 className='category_top__title'>{names[id - 1]}</h1>}
          {id && <img className='category_top__image'
            src={backgrounds[id - 1]} alt='Фоновое изображение отрасли'/>}
        </div>
        <div className='container'>
          <div className='row'>
            <h2 className='col s6'>Категории</h2>
            <div className='input-field col s6'>
              <input
                id='search'
                type='search'
                className='validate'
                onInput={handleInput}
              />
              <label htmlFor='search'>Поиск</label>
            </div>
          </div>
          <div className='jc-sp-btw'>
            {filteredGoods.map((el, i) => <Category key={i}
              title={el.title}
              link='/category'
              id={el.id}
              photo={imgs[el.title]}
              description={{companies: 2000, types: 500000}}
            />)}
          </div>
        </div>
      </div>
    </RootPage>
  );
};


export default IndustryPage;
