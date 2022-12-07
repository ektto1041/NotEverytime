import React from 'react';
import './lectureResultItem.scss';

const Column = ({
  width,
  thead,
  data,
}) => {
  return (
    <div className='lecture-result-item-column' style={{ width, }}>
      <div className='lecture-result-item-thead'>
        {thead}
      </div>
      {data?.map(item => (
        <div className='lecture-result-item-tbody'>
          {item}
        </div>
      ))}
    </div>
  );
};

const LectureResultItem = () => {
  return (
    <div className='lecture-result-item-container'>
      <div className='lecture-result-item-header'>
        <div className='lecture-result-item-title'>
          수학1
        </div>
      </div>
      <div className='lecture-result-item-body'>
        <Column width='28%' thead='과목코드' data={['X253']} />
        <Column width='28%' thead='교수명' data={['황성임 교수님']} />
        <Column width='28%' thead='수업시간' data={['월 09:00 ~ 10:30', '화 09:00 ~ 10:30']} />
        <Column width='16%' thead='수업 학기' data={['2022-2학기', '2022-1학기', '2021-2학기', '2021-1학기']} />
      </div>
    </div>
  );
};

export default LectureResultItem;