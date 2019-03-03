import React from 'react';
import './ip-list.css';




const IpList = ({ list }) => {
    return list.map((item, index) => (
        <div className="ip-list__item" key={index}>
            <h3 className="item__title" >
                IP:
            <span className="item__text" >{item.ip}</span>
            </h3>
            <h3>
                Страна:
            <span className="item__text" >{item.country}</span>
            </h3>
            <h3>
                Город:
            <span className="item__text" >{item.city}</span>
            </h3>
            <h3>
                Часовой пояс:
            <span className="item__text" >{item.time_zone}</span>
            </h3>
        </div>
    ));
};

export default IpList;