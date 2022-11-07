import React, {FC, useEffect, useState} from 'react';
import RootPage from './rootPage';
import Category from '../components/category/category';

import oilRefineryPicture from '../static/imgs/industry/oil_refinery.jpg';
import AutoPromPicture from '../static/imgs/industry/autoprom.jpg';
import medicinePicture from '../static/imgs/industry/medicine.jpeg';
import informatikaPicture from '../static/imgs/industry/informatika.jpg';

import '../index.scss';

interface Industries {
  msg: string;
  data: {
    includes(arg0: string): unknown;
    id: number;
    title: string;
  };
}

const MainPage: FC = () => {
  const imgs: {[key: string]: string} = {
    'Машиностроение': oilRefineryPicture,
    'MetalProd': AutoPromPicture,
    'OilProd': medicinePicture,
    'CalculatingProf': informatikaPicture,
  };
  const [industries, setIndustries] = useState<Industries['data'][]>([]);
  useEffect(() => {
    const getIndustries = async () => {
      const res = await fetch('http://localhost:8080/industries')
        .then((res) => res.json());
      if (res.msg === 'OK') {
        setIndustries(res.data);
      }
    };
    getIndustries();
  }, []);
  const [searchInput, setSearchInput] = useState('');
  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    const {value} = e.target;
    setSearchInput(value);
  }
  const filteredGoods = industries
    .filter((el) => el['title']
      .trim()
      .toLocaleLowerCase(['ru-RU', 'en-US'])
      .includes(searchInput.trim().toLocaleLowerCase(['ru-RU', 'en-US'])),
    );
  return (
    <RootPage nameOfActive='Main'>
      <div className='input-field col s6'>
        <input
          id='search'
          type='search'
          className='validate'
          onInput={handleInput}
        />
        <label htmlFor='search'>Поиск</label>
      </div>
      <div className='row jc-sp-btw'>
        {filteredGoods.map((el, i) => <Category key={i}
          title={el.title}
          link='/industry'
          id={el.id}
          photo={imgs[el.title]}
          description={{categories: 2337, companies: 4000, types: 5000}}
        />)}
      </div>
    </RootPage>
  );
};


export default MainPage;
