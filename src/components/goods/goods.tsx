import React, {FC} from 'react';
import {Link} from 'react-router-dom';

import './goods.scss';

interface categoryProps {
  title: string;
  photo: string;
  company: number;
  description: string;
}

const Goods: FC<categoryProps> = ({title, photo, company, description}) => (
  <>
    <Link className="card-link" to={`/company/${company}`}>
      <div className="card medium scale-transition">
        <div className="card-image">
          <img src={photo} alt="Картинка отрасли"/>
          <div className="background-photo"></div>
          <span className="card-title">{title.toUpperCase()}</span>
        </div>
        <div className="card-content theme-text">
          <p>{description}</p>
        </div>
      </div>
    </Link>
  </>
);

export default Goods;
