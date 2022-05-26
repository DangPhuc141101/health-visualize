import { Radio } from 'antd';
import 'antd/dist/antd.css';
import React, {memo} from 'react';
import './features.css';

const Features = (props) => {
  
  const onChange = (e) => {
    props.parentCallBack(e.target.value, props.index)
  };


  return (
    <div className='features_container'>
      <Radio.Group onChange={onChange} >
        <Radio id='1' value='Sum'>Sum</Radio>
        <Radio id='2' value='Average'>Average</Radio>
        <Radio id='3' value='Min'>Min</Radio>
        <Radio id='4' value='Max'>Max</Radio>
      </Radio.Group>
    </div>
  )
}

export default memo(Features)