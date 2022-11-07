import React, {FC} from 'react';
import {Link} from 'react-router-dom';

import './category.scss';

interface categoryProps {
  title: string;
  photo: string;
  link: string;
  id?: number;
  description: {
    categories?: number;
    companies: number;
    types: number;
  };
}

const Category: FC<categoryProps> = ({title, photo, link, id, description}) => {
  let classCategories = '';
  if (description.categories && description.categories >= 2000) classCategories = 'success';
  if (description.categories && description.categories <= 1000) classCategories = 'bad';
  let classCompanies = '';
  if (description.companies >= 1000) classCompanies = 'success';
  if (description.companies <= 500) classCompanies = 'bad';
  let classTypes = '';
  if (description.types >= 20000) classTypes = 'success';
  if (description.types <= 1000) classTypes = 'bad';
  return (
    <>
      <Link className="card-link" to={`${link}/${id}`}>
        <div className="card medium scale-transition">
          <div className="card-image">
            <img src={photo} alt="Картинка отрасли" />
            <div className="background-photo"></div>
            <span className="card-title">{title.toUpperCase()}</span>
          </div>
          <div className="card-content theme-text">
            {description.categories && <p className={classCategories}>{description.categories} категорий</p>}
            <p className={classCompanies}>{description.companies} компаний</p>
            <p className={classTypes}>{description.types} видов продукции</p>
          </div>
        </div>
      </Link>
    </>
  );
};

export default Category;
