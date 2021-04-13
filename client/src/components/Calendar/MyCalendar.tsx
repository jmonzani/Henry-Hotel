import { Space, DatePicker } from 'antd';
import './MyCalendar.less'
import { Button } from 'antd';
// import { useDispatch } from 'react-redux';



export function MyCalendar() {

  //   const dispatch = useDispatch

  //   const handleClick = (event:any) => {
  //    dispatch(event.target.id)
  // }

  const { RangePicker } = DatePicker

  return (

    <div className='backgroundPage'>
      <Space direction="vertical" size={12}>
        <div className='Calendar'>
          <RangePicker className='backgroundPageA' open={true} />
        </div>
      </Space>
      <div className='fuckBtn'>
        <Button className='buttonBabe' type="primary">UPGRADE DATES</Button>
      </div>
    </div>

  )
}


