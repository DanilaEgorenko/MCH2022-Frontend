/* eslint-disable no-invalid-this */
import React, {FC, useEffect, useState} from 'react';
import {useParams} from 'react-router';
import Goods from '../components/goods/goods';

import podshipnikPicture from '../static/imgs/products/podshipnik.jpg';
import legkayaPromPicture from '../static/imgs/industry/legkayaProm.jpg';
import oilRefineryPicture from '../static/imgs/industry/oil_refinery.jpg';
import foodPromPicture from '../static/imgs/industry/foodProm.jpg';
import chemPromPicture from '../static/imgs/industry/chemProm.jpg';
import AutoPromPicture from '../static/imgs/industry/autoprom.jpg';
import medicinePicture from '../static/imgs/industry/medicine.jpeg';

import useMaterialize from '../hooks/useMaterialize';

import './pages.scss';
import SpinnerComponent from '../components/spinner/spinnerComponent';
import RootPage from './rootPage';

const CategoryPage: FC = () => {
  const [searchInput, setSearchInput] = useState('');
  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    const {value} = e.target;
    setSearchInput(value);
  }

  const [sortSelect, setSortSelect] = useState('1');
  function handleSelect(e: React.ChangeEvent<HTMLSelectElement>) {
    const {value} = e.target;
    console.log(value);
    setSortSelect(value);
    // setSortSelect(value);
  }

  const imgs: {[key: string]: string} = {
    'category1': legkayaPromPicture,
    'category2': oilRefineryPicture,
    'category3': foodPromPicture,
    'category4': chemPromPicture,
  };
  const names: string[] = ['category1', 'category2', 'category3', 'category4'];
  const {id}: {id?: number} = useParams();
  const M = useMaterialize();
  let scrollDelay = false;
  const [goodsArr, setGoodsArr] = useState(['Подшипник', 'Хрень']);
  useEffect(() => {
    const elems = document.querySelectorAll('select');
    M.FormSelect.init(elems, {});
    const distanceToPreloader = document.querySelector('.loader')?.getBoundingClientRect().y;
    window.addEventListener('scroll', () => {
      if (!scrollDelay && distanceToPreloader && scrollY > distanceToPreloader - 1400) {
        scrollDelay = true;
        setGoodsArr((goodsArr) => goodsArr = [...goodsArr, ...Array(10)]);
      }
      setTimeout(() => scrollDelay = false, 1500);
    });
    return window.removeEventListener('scroll', () => {
      window.addEventListener('scroll', () => {
        if (!scrollDelay && distanceToPreloader && scrollY > distanceToPreloader - 1400) {
          scrollDelay = true;
          setGoodsArr((goodsArr) => goodsArr = [...goodsArr, ...Array(10)]);
        }
        setTimeout(() => scrollDelay = false, 1500);
      });
    });
  }, []);
  // let filteredGoods = goodsArr.filter((el, i) => el.toLowerCase().includes(searchInput.toLowerCase()));
  // filteredGoods = filteredGoods.sort((a: string, b: string): any => {
  //   if (sortSelect === '4') return b < a ? 1 : -1;
  //   if (sortSelect === '5') return b > a ? 1 : -1;
  // });
  return (
    <>
      <RootPage nameOfActive='Category'>
        <div className='category_top'>
          {id && <h1 className='category_top__title'>{names[id - 1]}</h1>}
          {id && <img className='category_top__image'
            src={imgs[names[id - 1]]} alt='Фоновое изображение отрасли'/>}
        </div>
        <div className='container'>
          <h2>Товары</h2>
          <form>
            <div className='row'>
              <div className='input-field col s6'>
                <input
                  id='search'
                  type='text'
                  className='validate'
                  onInput={handleInput}
                />
                <label htmlFor='last_name'>Поиск</label>
              </div>
              <div className='input-field col s6'>
                <select
                  id='sort'
                  defaultValue={sortSelect}
                  onChange={handleSelect}
                >
                  <option value='1'>По умолчанию</option>
                  <option value='2'>Сначала новые</option>
                  <option value='3'>Сначала старые</option>
                  <option value='4'>От А до Я</option>
                  <option value='5'>От Я до А</option>
                </select>
                <label htmlFor='sort'>Сортировать</label>
              </div>
            </div>
          </form>
          <div className='jc-sp-btw'>
            {goodsArr.map((el, i) => (
              <Goods key={i}
                title={'Подшпиник ' + (i + 1)}
                photo={podshipnikPicture}
                company={1}
                description='I am a very simple card. I am good at containing small bits of information.
              I am convenient because I require little markup to use effectively.'
              />
            ))}
          </div>
        </div>
        <div className='flex'>
          <SpinnerComponent status={'loading'}></SpinnerComponent>
        </div>
      </RootPage>
    </>
  );
};

export default CategoryPage;
